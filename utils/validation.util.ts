import * as zod from "zod";

export const registrationSchema = zod
  .object({
    firstName: zod
      .string()
      .nonempty({ message: "First name is required" })
      .max(120, { message: "First name cannot be longer than 120 characters" }),
    lastName: zod
      .string()
      .nonempty({ message: "Last name is required" })
      .max(120, { message: "Last name cannot be longer than 120 characters" }),
    email: zod
      .string()
      .email({ message: "Email is not valid" })
      .max(120, { message: "Email cannot be longer than 120 characters" }),
    password: zod
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    rePassword: zod
      .string()
      .nonempty({ message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
  });

export const loginSchema = zod.object({
  email: zod
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: zod.string({ required_error: "Password is required" }),
});
