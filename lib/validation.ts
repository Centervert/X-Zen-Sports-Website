import { z } from "zod"
import validator from "validator"

// Base contact schema
const baseContactSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
  
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
  
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number must be in format (XXX) XXX-XXXX"),
})

// Form-specific schemas
export const tourRequestSchema = baseContactSchema.extend({
  formType: z.literal("Tour Request"),
  timestamp: z.string().optional(),
  smsConsent: z.boolean().optional(),
})

export const contactFormSchema = baseContactSchema.extend({
  formType: z.literal("contact"),
  timestamp: z.string().optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  comment: z.string().max(1000, "Comment must be less than 1000 characters").optional(),
})

export const freeClassSchema = baseContactSchema.extend({
  formType: z.literal("Free Class Request"),
  classInterest: z.string().max(100, "Class interest must be less than 100 characters").optional(),
  preferredTime: z.string().max(50, "Preferred time must be less than 50 characters").optional(),
  goal: z.string().max(200, "Goal must be less than 200 characters").optional(),
})

export const consultationSchema = baseContactSchema.extend({
  formType: z.literal("Private Coaching Consultation"),
  timestamp: z.string().optional(),
  fitnessGoals: z.string().max(200, "Fitness goals must be less than 200 characters").optional(),
  contactMethod: z.string().max(50, "Contact method must be less than 50 characters").optional(),
})

// Sanitization functions
export function sanitizeString(input: string): string {
  return validator.escape(input.trim())
}

export function sanitizeEmail(email: string): string {
  return validator.normalizeEmail(email) || email
}

export function sanitizePhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "")
  
  // Format as (XXX) XXX-XXXX
  if (digits.length >= 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }
  
  return phone
}

// Validation helper
export function validateFormData(data: any, schema: z.ZodSchema) {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }
    }
    return { success: false, errors: [{ field: 'unknown', message: 'Validation failed' }] }
  }
}
