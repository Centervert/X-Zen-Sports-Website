"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      // Add your error reporting service here
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h1>
        <p className="text-gray-300 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        <div className="space-y-4">
          <Button onClick={resetError} className="w-full">
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="w-full"
          >
            Refresh Page
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-400">Error Details</summary>
            <pre className="mt-2 text-xs text-red-400 bg-gray-900 p-2 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    if (process.env.NODE_ENV === "production") {
      // Add your error reporting service here
    }
  }
}
