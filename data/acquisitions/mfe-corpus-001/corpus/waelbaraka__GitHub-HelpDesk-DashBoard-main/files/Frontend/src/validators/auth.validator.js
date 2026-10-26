// src/validators/auth.validator.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// --- MODIFIED registerSchema ---
export const registerSchema = z.object({
  organizationName: z.string().min(1, { message: "Company name is required" }),
  // fullName: z.string().min(1, { message: "Full name is required" }), // REMOVE THIS
  firstName: z.string().min(1, { message: "First name is required" }).max(50, { message: "First name too long" }), // ADD THIS
  lastName: z.string().min(1, { message: "Last name is required" }).max(50, { message: "Last name too long" }),  // ADD THIS
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  phone: z.string().optional(), // Assuming phone is optional and not heavily validated here
});