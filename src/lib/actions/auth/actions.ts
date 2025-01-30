"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
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

export interface State {
  errors?: {
    id?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message: string;
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
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error: ", error.message);
      return { message: `Login error: ${error.message}` };
    }

    // revalidate layout
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred" };
  }

  redirect("/");
};

// signup with email + password
export const signupWithPassword = async (
  prevState: State,
  formData: FormData
) => {
  const validatedFields = SignupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to signup. Please try again.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error: ", error.message);
      return { message: `Signup error: ${error.message}` };
    }

    // revalidate layout
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred" };
  }

  // maybe redirect to page with message abt email confirmation (?)
  redirect("/auth/signup");
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
