import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Submit to Zapier webhook (existing integration)
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/24403206/u93b7oq/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!zapierResponse.ok) {
      console.error(`Zapier webhook responded with status: ${zapierResponse.status}`)
    }

    // Submit to GoHighLevel if API key is configured
    if (process.env.GHL_API_KEY) {
      try {
        const GHL_BASE_URL = "https://services.leadconnectorhq.com"
        const locationId = process.env.GHL_LOCATION_ID || "yq9QKLKQtl7mZLQUZysX"

        // Create contact in GoHighLevel
        const contactPayload = {
          firstName: body.firstName || "",
          lastName: body.lastName || "",
          email: body.email || "",
          phone: body.phone || "",
          source: body.formType || "Website Form",
          tags: ["Website Lead", body.formType || "Tour Request"],
          locationId: locationId,
        }

        if (body.smsConsent) {
          contactPayload.customFields = [{ key: "sms_consent", field_value: "true" }]
        }

        console.log("[v0] Creating GHL contact:", contactPayload)

        const contactResponse = await fetch(`${GHL_BASE_URL}/contacts/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GHL_API_KEY}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify(contactPayload),
        })

        if (!contactResponse.ok) {
          const errorText = await contactResponse.text()
          console.error(`GHL contact creation failed: ${contactResponse.status}`, errorText)
          throw new Error(`GHL contact creation failed: ${contactResponse.status}`)
        }

        const contactData = await contactResponse.json()
        const contactId = contactData.contact?.id || contactData.id

        console.log("[v0] GHL contact created:", contactId)

        if (contactId) {
          const pipelineId = process.env.GHL_PIPELINE_ID || "XMhsday0hthcPjTcG5In"
          const stageId = process.env.GHL_PIPELINE_STAGE_ID || "03962edc-b501-4acd-8a96-54292180f1bc" // "New Lead" stage

          const opportunityPayload = {
            pipelineId: pipelineId,
            locationId: locationId,
            name: `${body.firstName} ${body.lastName} - ${body.formType || "Tour Request"}`,
            contactId: contactId,
            status: "open",
            pipelineStageId: stageId,
            source: body.formType || "Website Form",
          }

          console.log("[v0] Creating GHL opportunity:", opportunityPayload)

          const opportunityResponse = await fetch(`${GHL_BASE_URL}/opportunities/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.GHL_API_KEY}`,
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
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error forwarding to webhook:", error)
    return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 })
  }
}
