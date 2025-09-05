import { object, string } from "zod";

export const registerSchema = object({
  name: string().nonempty("Name is required"),
  email: string().nonempty("Email is required").email("Not a valid email"),
  phone: string().nonempty("Phone number is required").min(10, "Phone number must be at least 10 digits"),
  password: string().nonempty("Password is required").min(6, "Password too short - should be 6 chars minimum"),
  confirmPassword: string().nonempty("Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});


export const loginSchema = object({
  email: string().nonempty("Email is required").email("Not a valid email"),
  password: string().nonempty("Password is required"),
});

export const token = object({
  refreshToken: string().nonempty("refresh token is required")
});
