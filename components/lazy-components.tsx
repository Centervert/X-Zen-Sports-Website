"use client"

import { lazy, Suspense } from "react"
import { LoadingSpinner } from "@/hooks/use-api-call"

// Lazy load heavy components
export const FreeClassModal = lazy(() => import("@/components/free-class-modal").then(module => ({ default: module.FreeClassModal })))
export const ConsultationModal = lazy(() => import("@/components/consultation-modal").then(module => ({ default: module.ConsultationModal })))
export const ClassesSection = lazy(() => import("@/components/classes-section").then(module => ({ default: module.ClassesSection })))
export const CoachesSection = lazy(() => import("@/components/coaches-section").then(module => ({ default: module.CoachesSection })))
export const ProgramsSection = lazy(() => import("@/components/programs-section").then(module => ({ default: module.ProgramsSection })))
export const AboutSection = lazy(() => import("@/components/about-section").then(module => ({ default: module.AboutSection })))

// Wrapper components with loading states
export function LazyFreeClassModal(props: any) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><LoadingSpinner /></div>}>
      <FreeClassModal {...props} />
    </Suspense>
  )
}

export function LazyConsultationModal(props: any) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><LoadingSpinner /></div>}>
      <ConsultationModal {...props} />
    </Suspense>
  )
}

export function LazyClassesSection() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" /></div>}>
      <ClassesSection />
    </Suspense>
  )
}

export function LazyCoachesSection() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" /></div>}>
      <CoachesSection />
    </Suspense>
  )
}

export function LazyProgramsSection() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" /></div>}>
      <ProgramsSection />
    </Suspense>
  )
}

export function LazyAboutSection() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" /></div>}>
      <AboutSection />
    </Suspense>
  )
}
