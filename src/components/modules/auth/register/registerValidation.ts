import { z } from "zod";
import { allergyOptions, genderOptions } from "./register.const";

export const customerValidationSchema = z.object({
  user: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email()
      .trim(),
    phone: z.string().min(1, "Phone number is required").trim(),
    password: z
      .string()
      .nonempty("password is required")
      .min(6, { message: "password can`t be less than 6 character" })
      .max(20, { message: "password can`t be more than 20 character" })
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(value),
        {
          message:
            "password must be contain one capital letter, one small letter, one number and one special chareacter ",
        }
      ),
  }),
  customer: z.object({
    name: z.string().min(1, "Name is required"),
    profileImage: z.string().url().optional(),
    address: z.string().min(1, "Address is required"),
    allergies: z
      .array(z.enum([...allergyOptions] as [string, ...string[]]))
      .optional(),
    gender: z.enum([...genderOptions] as [string, ...string[]], {
      required_error: "gender is required",
    }),
    dateOfBirth: z.string().min(1, "Birth date is required"),
  }),
});
