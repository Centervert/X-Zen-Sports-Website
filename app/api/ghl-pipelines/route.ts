export async function GET() {
  try {
    const apiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID

    if (!apiKey || !locationId) {
      return Response.json(
        {
          error: "Missing GoHighLevel credentials",
          message: "Please ensure GHL_API_KEY and GHL_LOCATION_ID are set in environment variables",
        },
        { status: 400 },
      )
    }

    const endpoints = [
      `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
      `https://rest.gohighlevel.com/v1/opportunities/pipelines?locationId=${locationId}`,
      `https://rest.gohighlevel.com/v1/pipelines?locationId=${locationId}`,
    ]

    let lastError = null

    for (const endpoint of endpoints) {
      try {
        console.log(`[v0] Trying endpoint: ${endpoint}`)

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28", // Add API version header
          },
        })

        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Successfully fetched pipelines")

          // Format the response to show pipelines and their stages clearly
          const formattedPipelines =
            data.pipelines?.map((pipeline: any) => ({
              pipelineId: pipeline.id,
              pipelineName: pipeline.name,
              stages:
                pipeline.stages?.map((stage: any) => ({
                  stageId: stage.id,
                  stageName: stage.name,
                  position: stage.position,
                })) || [],
            })) || []

          return Response.json({
            success: true,
            locationId,
            endpointUsed: endpoint,
            pipelines: formattedPipelines,
            rawData: data,
          })
        }

        lastError = {
          endpoint,
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        }
        console.log(`[v0] Endpoint failed:`, lastError)
      } catch (err) {
        console.log(`[v0] Endpoint error:`, err)
        lastError = {
          endpoint,
          error: err instanceof Error ? err.message : "Unknown error",
        }
      }
    }

    // If all endpoints failed, return the last error
    return Response.json(
      {
        error: "Failed to fetch pipelines from GoHighLevel",
        message: "All API endpoints returned errors. Please verify your API key and location ID.",
        attempts: lastError,
        troubleshooting: {
          step1: "Verify GHL_API_KEY is correct in environment variables",
          step2: "Verify GHL_LOCATION_ID is correct",
          step3: "Check that the API key has permissions to read opportunities/pipelines",
          step4: "Ensure the API key is not expired",
        },
      },
      { status: 404 },
    )
  } catch (error) {
    console.error("[v0] Error fetching GHL pipelines:", error)
    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
