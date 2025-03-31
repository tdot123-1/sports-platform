"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string().uuid(),
  email: z
    .string({
      invalid_type_error: "Please provide an email address",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(254, { message: "Maximum characters exceeded" })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string({
      invalid_type_error: "Please provide a password",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(254, { message: "Maximum characters exceeded" }),
  confirmPassword: z
    .string({
      invalid_type_error: "Please confirm your password",
    })
    .min(6, { message: "Please confirm your password" })
    .max(254, { message: "Maximum characters exceeded" }),
});

const SignupSchema = FormSchema.omit({ id: true }).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

const LoginSchema = FormSchema.omit({ id: true, confirmPassword: true });

const RecoverPasswordSchema = FormSchema.omit({
  id: true,
  password: true,
  confirmPassword: true,
});

export interface State {
  errors?: {
    id?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message: string;
  success: boolean;
}

// login with email + password
export const loginWithPassword = async (
  prevState: State,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to log in. Please try again.",
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  const token = formData.get("token");

  if (!token || token.toString().length < 20) {
    return {
      message: "Please complete the Captcha challenge.",
      success: false,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken: token.toString() },
    });

    if (error) {
      console.error("Login error: ", error.message);
      return { message: `Login error: ${error.message}`, success: false };
    }

    // revalidate layout
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred", success: false };
  }

  return { message: "", success: true };
};

// signup with email + password
export const signupWithPassword = async (
  prevState: State,
  formData: FormData
) => {
  const signupEnabled = process.env.SIGNUP_ENABLED;

  if (signupEnabled !== "true") {
    return { message: "Signup not yet possible.", success: false };
  }

  const validatedFields = SignupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to signup. Please try again.",
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  const token = formData.get("token");

  if (!token || token.toString().length < 20) {
    return {
      message: "Please complete the Captcha challenge.",
      success: false,
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { captchaToken: token.toString() },
    });

    if (error) {
      console.error("Signup error: ", error.message);
      if (error.code === "user_already_exists") {
        return {
          message: "This email is already in use. Please log in instead.",
          success: false,
        };
      }
      return { message: `Signup error: ${error.message}`, success: false };
    }

    // revalidate layout
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Signup complete!",
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred", success: false };
  }

  // maybe redirect to page with message abt email confirmation (?)
  // redirect("/auth/signup");
};

export const logOut = async () => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out: ", error.message);
      return { message: `Error: ${error.message}`, success: false };
    }
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred.", success: false };
  }

  // revalidate layout
  revalidatePath("/", "layout");
  return { success: true };
};

export const sendResetPasswordEmail = async (
  prevState: State,
  formData: FormData
) => {
  const validatedFields = RecoverPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed send recovery email. Please try again.",
      success: false,
    };
  }

  const { email } = validatedFields.data;

  const token = formData.get("token");

  if (!token || token.toString().length < 20) {
    return {
      message: "Please complete the Captcha challenge.",
      success: false,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      captchaToken: token.toString(),
      redirectTo: `${process.env.APP_URL}/?source=recovery`,
    });

    if (error) {
      console.error("Error recovering password: ", error.message);
      return {
        message: `Failed to send recovery email, please try again.`,
        success: false,
      };
    }

    return {
      message: "Please click the link in your email to update your password",
      success: true,
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred.", success: false };
  }
};
