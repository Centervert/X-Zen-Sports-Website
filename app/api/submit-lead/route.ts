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
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InlxOVFLTEtRdGw3bVpMUVVaeXNYIiwidmVyc2lvbiI6MSwiaWF0IjoxNzM0NzQ5NTU5NzU5LCJzdWIiOiJvRGRGRGxGRGxGRGxGRGxGRGxGRGxGIn0.example", // Your actual API key
  locationId: "yq9QKLKQtl7mZLQUZysX",
  pipelineId: "XMhsday0hthcPjTcG5In",
  stageId: "03962edc-b501-4acd-8a96-54292180f1bc",
  baseUrl: "https://services.leadconnectorhq.com",
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Determine which schema to use based on formType
    let schema
    switch (body.formType) {
      case "Tour Request":
        schema = tourRequestSchema
        break
      case "contact":
        schema = contactFormSchema
        break
      case "Free Class Request":
        schema = freeClassSchema
        break
      case "Private Coaching Consultation":
        schema = consultationSchema
        break
      default:
        return NextResponse.json({ error: "Invalid form type" }, { status: 400 })
    }

    // Validate and sanitize input
    const validation = validateFormData(body, schema)
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Sanitize the validated data
    const sanitizedData = {
      ...validation.data,
      firstName: sanitizeString(validation.data.firstName),
      lastName: sanitizeString(validation.data.lastName),
      email: sanitizeEmail(validation.data.email),
      phone: validation.data.phone,
    }

    // Submit to Zapier webhook (existing integration)
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/24403206/u93b7oq/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedData),
    })

    if (!zapierResponse.ok) {
      // Log error but don't fail the request
    }

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

      if (sanitizedData.smsConsent) {
        contactPayload.customFields = [{ key: "sms_consent", field_value: "true" }]
      }

      const contactResponse = await fetch(`${GHL_CONFIG.baseUrl}/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_CONFIG.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(contactPayload),
      })

      if (!contactResponse.ok) {
        const errorText = await contactResponse.text()
        throw new Error(`GHL contact creation failed: ${contactResponse.status}`)
      }

      const contactData = await contactResponse.json()
      const contactId = contactData.contact?.id || contactData.id

      if (contactId) {
        const opportunityPayload = {
          pipelineId: GHL_CONFIG.pipelineId,
          locationId: GHL_CONFIG.locationId,
          name: `${body.firstName} ${body.lastName} - ${body.formType || "Tour Request"}`,
          contactId: contactId,
          status: "open",
          pipelineStageId: GHL_CONFIG.stageId,
          source: body.formType || "Website Form",
        }

        console.log("[v0] Creating GHL opportunity:", opportunityPayload)

        const opportunityResponse = await fetch(`${GHL_CONFIG.baseUrl}/opportunities/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_CONFIG.apiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify(opportunityPayload),
        })

        if (!opportunityResponse.ok) {
          const errorText = await opportunityResponse.text()
          console.error(`GHL opportunity creation failed: ${opportunityResponse.status}`, errorText)
        } else {
          const opportunityData = await opportunityResponse.json()
          console.log("[v0] GHL opportunity created:", opportunityData.opportunity?.id || opportunityData.id)
        }
      }
    } catch (ghlError) {
      console.error("Error submitting to GoHighLevel:", ghlError)
      // Don't fail the entire request if GHL fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error forwarding to webhook:", error)
    return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 })
  }
}
