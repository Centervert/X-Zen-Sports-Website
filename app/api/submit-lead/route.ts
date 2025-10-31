import { NextResponse } from "next/server"
import {
  tourRequestSchema,
  contactFormSchema,
  freeClassSchema,
  consultationSchema,
  sanitizeString,
  sanitizeEmail,
  validateFormData,
} from "@/lib/validation"

const GHL_CONFIG = {
  apiKey: process.env.GHL_API_KEY || "",
  locationId: process.env.GHL_LOCATION_ID || "",
  pipelineId: process.env.GHL_PIPELINE_ID || "",
  stageId: process.env.GHL_PIPELINE_STAGE_ID || "",
  baseUrl: "https://services.leadconnectorhq.com",
}

export async function POST(request: Request) {
  console.log("[v0] API: Received POST request to /api/submit-lead")

  try {
    const body = await request.json()
    console.log("[v0] API: Request body:", body)

    // Determine which schema to use based on formType
    let schema
    switch (body.formType) {
      case "Tour Request":
        schema = tourRequestSchema
        break
      case "contact":
        schema = contactFormSchema
        console.log("[v0] API: Using contact form schema")
        break
      case "Free Class Request":
        schema = freeClassSchema
        break
      case "Private Coaching Consultation":
        schema = consultationSchema
        break
      default:
        console.log("[v0] API: Invalid form type:", body.formType)
        return NextResponse.json({ error: "Invalid form type" }, { status: 400 })
    }

    // Validate and sanitize input
    console.log("[v0] API: Validating form data...")
    const validation = validateFormData(body, schema)

    if (!validation.success) {
      console.log("[v0] API: Validation failed:", validation.errors)
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    console.log("[v0] API: Validation successful")

    // Sanitize the validated data
    const sanitizedData = {
      ...validation.data,
      firstName: sanitizeString(validation.data.firstName),
      lastName: sanitizeString(validation.data.lastName),
      email: sanitizeEmail(validation.data.email),
      phone: validation.data.phone,
    }

    console.log("[v0] API: Submitting to Zapier...")
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/24403206/u93b7oq/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedData),
    })

    if (!zapierResponse.ok) {
      console.log("[v0] API: Zapier submission failed:", zapierResponse.status)
    } else {
      console.log("[v0] API: Zapier submission successful")
    }

    if (GHL_CONFIG.apiKey && GHL_CONFIG.locationId) {
      try {
        // Create contact in GoHighLevel
        const contactPayload: any = {
          firstName: sanitizedData.firstName || "",
          lastName: sanitizedData.lastName || "",
          email: sanitizedData.email || "",
          phone: sanitizedData.phone || "",
          source: sanitizedData.formType || "Website Form",
          tags: ["Website Lead", sanitizedData.formType || "Tour Request"],
          locationId: GHL_CONFIG.locationId,
        }

        const customFields = []

        if (sanitizedData.smsConsent) {
          customFields.push({ key: "sms_consent", field_value: "true" })
        }

        // Set "Needs Opportunity" custom field to "Yes"
        customFields.push({
          id: "XWUPG31bKmlFJZH5nl1P",
          field_value: "Yes",
        })

        if (customFields.length > 0) {
          contactPayload.customFields = customFields
        }

        console.log("[v0] API: Creating GHL contact...")
        const contactResponse = await fetch(`${GHL_CONFIG.baseUrl}/contacts/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_CONFIG.apiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify(contactPayload),
        })

        let contactId: string | null = null

        if (!contactResponse.ok) {
          const errorData = await contactResponse.json()

          // Check if this is a duplicate contact error
          if (
            contactResponse.status === 400 &&
            errorData.message?.includes("duplicated contacts") &&
            errorData.meta?.contactId
          ) {
            // Contact already exists - use the existing contactId
            contactId = errorData.meta.contactId
            console.log("[v0] API: Contact already exists (expected), using existing contactId:", contactId)

            try {
              const updateResponse = await fetch(`${GHL_CONFIG.baseUrl}/contacts/${contactId}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${GHL_CONFIG.apiKey}`,
                  "Content-Type": "application/json",
                  Version: "2021-07-28",
                },
                body: JSON.stringify({
                  customFields: [
                    {
                      id: "XWUPG31bKmlFJZH5nl1P",
                      field_value: "Yes",
                    },
                  ],
                }),
              })

              if (updateResponse.ok) {
                console.log("[v0] API: Successfully updated 'Needs Opportunity' field for existing contact")
              } else {
                console.error("[v0] API: Failed to update custom field for existing contact")
              }
            } catch (updateError) {
              console.error("[v0] API: Error updating custom field:", updateError)
            }
          } else {
            // Different error - log and continue
            console.error("[v0] API: GHL contact creation failed:", contactResponse.status, errorData)
            throw new Error(`GHL contact creation failed: ${contactResponse.status}`)
          }
        } else {
          // Contact created successfully
          const contactData = await contactResponse.json()
          console.log("[v0] API: GHL contact created successfully with 'Needs Opportunity' field set to Yes")
          contactId = contactData.contact?.id || contactData.id
        }
      } catch (ghlError) {
        console.error("[v0] API: Error submitting to GoHighLevel:", ghlError)
        // Don't fail the entire request if GHL fails
      }
    } else {
      console.log("[v0] API: Skipping GHL integration - API key or location ID not configured")
    }

    console.log("[v0] API: Returning success response")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API: Error in submit-lead:", error)
    return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 })
  }
}
