"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle } from "lucide-react"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    fitnessGoals: "",
    contactMethod: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const normalizePhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const normalizeName = (value: string) => {
    return value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const handleInputChange = (field: string, value: string) => {
    let normalizedValue = value

    if (field === "firstName" || field === "lastName") {
      normalizedValue = normalizeName(value)
    } else if (field === "phone") {
      normalizedValue = normalizePhone(value)
    } else if (field === "email") {
      normalizedValue = value.toLowerCase()
    }

    setFormData((prev) => ({ ...prev, [field]: normalizedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const estTimestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })

      const webhookData = {
        ...formData,
        timestamp: estTimestamp,
        formType: "Private Coaching Consultation",
      }

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          fitnessGoals: "",
          contactMethod: "",
        })
        onClose()
      }, 3000)
    } catch (error) {
      // Handle error silently
    }
  }

  const fitnessGoalOptions = [
    "Weight Loss",
    "Muscle Building",
    "Self Defense",
    "Competition Training",
    "General Fitness",
    "Stress Relief",
    "Youth Development",
    "Rehabilitation",
  ]

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in private coaching. Our team will contact you within 24 hours to schedule
              your free consultation.
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Free Consultation</DialogTitle>
          <p className="text-muted-foreground text-center">
            Let's discuss your fitness goals and create a personalized training plan
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="border-muted/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="border-muted/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              required
              className="border-muted/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="border-muted/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fitnessGoals">Primary Fitness Goals *</Label>
            <Select
              value={formData.fitnessGoals}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, fitnessGoals: value }))}
            >
              <SelectTrigger className="border-muted/20 focus:border-primary">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent>
                {fitnessGoalOptions.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Preferred Contact Method *</Label>
            <RadioGroup
              value={formData.contactMethod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, contactMethod: value }))}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone-contact" />
                <Label htmlFor="phone-contact" className="cursor-pointer">
                  Phone Call
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-contact" />
                <Label htmlFor="email-contact" className="cursor-pointer">
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text-contact" />
                <Label htmlFor="text-contact" className="cursor-pointer">
                  Text Message
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person-contact" />
                <Label htmlFor="in-person-contact" className="cursor-pointer">
                  In Person
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.phone ||
                !formData.email ||
                !formData.fitnessGoals ||
                !formData.contactMethod
              }
            >
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
