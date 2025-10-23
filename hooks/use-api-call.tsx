"use client"

import { useState, useEffect } from "react"

interface LoadingState {
  isLoading: boolean
  error: string | null
}

export function useApiCall() {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  })

  const execute = async <T,>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    setState({ isLoading: true, error: null })
    
    try {
      const result = await apiCall()
      setState({ isLoading: false, error: null })
      onSuccess?.(result)
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({ isLoading: false, error: errorMessage })
      onError?.(error instanceof Error ? error : new Error(errorMessage))
      return null
    }
  }

  return {
    ...state,
    execute,
  }
}

// Loading spinner component
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]}`} />
  )
}

// Loading overlay component
export function LoadingOverlay({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  if (!isLoading) return <>{children}</>

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-black/80 rounded-lg p-6 flex items-center space-x-3">
          <LoadingSpinner />
          <span className="text-white font-medium">Loading...</span>
        </div>
      </div>
    </div>
  )
}
