import { object, string } from "zod";

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
  }),
});
