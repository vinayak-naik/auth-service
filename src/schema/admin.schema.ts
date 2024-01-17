import { object, string } from "zod";

export const loginAdminSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export const verifyOTPSchema = object({
  body: object({
    verificationCode: string({ required_error: "First Name is Required" }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});
