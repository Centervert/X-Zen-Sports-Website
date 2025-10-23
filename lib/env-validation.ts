// Environment validation
export function validateEnvironment() {
  const requiredEnvVars: string[] = [
    // Add any required environment variables here
    // 'GHL_API_KEY', // Optional - only required if using GoHighLevel
    // 'GHL_LOCATION_ID', // Optional - has fallback
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`)
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
  }
}

// Validate on import
if (typeof window === 'undefined') { // Only run on server
  validateEnvironment()
}
