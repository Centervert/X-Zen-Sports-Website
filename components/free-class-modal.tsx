"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FreeClassModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FreeClassModal({ isOpen, onClose }: FreeClassModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    classInterest: "",
    preferredTime: "",
    goal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      console.log("[v0] Free Class Modal: Submitting form data:", formData)

      const formattedPhone = formData.phone.replace(/\D/g, "")
      const phoneFormatted =
        formattedPhone.length === 10
          ? `(${formattedPhone.slice(0, 3)}) ${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6)}`
          : formData.phone

      console.log("[v0] Free Class Modal: Sending request to /api/submit-lead")

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: phoneFormatted,
          formType: "Free Class Request",
        }),
      })

      console.log("[v0] Free Class Modal: Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Free Class Modal: Error response:", errorData)
        if (errorData.details && Array.isArray(errorData.details)) {
          const errorMessages = errorData.details.map((err: any) => err.message).join(", ")
          setError(errorMessages)
        } else {
          setError(errorData.error || "Something went wrong. Please try again.")
        }
        setIsSubmitting(false)
        return
      }

      console.log("[v0] Free Class Modal: Submission successful")
      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          classInterest: "",
          preferredTime: "",
          goal: "",
        })
      }
    } catch (error) {
      console.error("[v0] Free Class Modal: Submission error:", error)
      setError("Unable to submit form. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setShowSuccess(false)
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">Start Your Free Class</DialogTitle>
          <p className="text-gray-400 text-center">
            Tell us about yourself and we'll get you started on your martial arts journey
          </p>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
            <p className="text-gray-400 mb-8">
              We'll contact you shortly to schedule your free class. Get ready to start your journey!
            </p>
            <Button onClick={handleClose} className="bg-primary hover:bg-primary/90">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {error && <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white mb-2 block">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white mb-2 block">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white mb-2 block">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="classInterest" className="text-white mb-2 block">
                What class are you interested in? *
              </Label>
              <Select
                value={formData.classInterest}
                onValueChange={(value) => setFormData({ ...formData, classInterest: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="bjj">Brazilian Jiu-Jitsu</SelectItem>
                  <SelectItem value="boxing">Boxing</SelectItem>
                  <SelectItem value="mma">Mixed Martial Arts</SelectItem>
                  <SelectItem value="muay-thai">Muay Thai</SelectItem>
                  <SelectItem value="wrestling">Wrestling</SelectItem>
                  <SelectItem value="fitness">Fitness Conditioning</SelectItem>
                  <SelectItem value="youth">Youth Programs</SelectItem>
                  <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferredTime" className="text-white mb-2 block">
                Preferred Workout Time *
              </Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="morning">Morning (5:00 AM - 11:00 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (11:00 AM - 4:00 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4:00 PM - 9:00 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal" className="text-white mb-2 block">
                What is your ultimate goal? *
              </Label>
              <Textarea
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                required
                placeholder="Tell us what you want to achieve..."
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            >
              {isSubmitting ? "Submitting..." : "Start Your Free Class"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
