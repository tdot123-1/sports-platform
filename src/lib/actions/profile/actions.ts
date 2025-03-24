"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateEmailSchema = z.object({
  newEmail: z
    .string({
      invalid_type_error: "Please provide an email address",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(254, { message: "Maximum characters exceeded" })
    .email({ message: "Please provide a valid email address" }),
});

const UpdatePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        invalid_type_error: "Please provide a password",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(254, { message: "Maximum characters exceeded" }),
    newPassword: z
      .string({
        invalid_type_error: "Please provide a password",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(254, { message: "Maximum characters exceeded" }),
    confirmNewPassword: z
      .string({
        invalid_type_error: "Please confirm your password",
      })
      .min(6, { message: "Please confirm your password" })
      .max(254, { message: "Maximum characters exceeded" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export interface UpdateEmailState {
  errors?: {
    newEmail?: string[];
  };
  message: string;
  success: boolean;
}

export interface UpdatePasswordState {
  errors?: {
    oldPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
  };
  message: string;
  success: boolean;
}

// change email (will send verification to new address)
export const updateEmail = async (
  prevState: UpdateEmailState,
  formData: FormData
) => {
  const supabase = await createClient();

  const validatedFields = UpdateEmailSchema.safeParse({
    newEmail: formData.get("newEmail"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update email. Please try again.",
      success: false,
    };
  }

  const { newEmail } = validatedFields.data;

  try {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error("Error updating email: ", error.message);
      return {
        message: "Failed to update email address, please try again later",
        success: false,
      };
    }

    // revalidate layout
    revalidatePath("/profile");
    return {
      success: true,
      message:
        "A verification email has been sent to the submitted address. Please click the link to confirm.",
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred", success: false };
  }
};

// change password
export const updatePassword = async (
  email: string,
  prevState: UpdatePasswordState,
  formData: FormData
) => {
  const supabase = await createClient();

  const validatedFields = UpdatePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed change password. Please try again.",
      success: false,
    };
  }

  const { oldPassword, newPassword } = validatedFields.data;

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    });

    if (authError) {
      console.error("Login error: ", authError.message);
      return {
        message: "Failed to update password",
        success: false,
        errors: { oldPassword: "Invalid credentials" },
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Error updating password: ", error.message);
      return {
        message: "Failed to update password, please try again later",
        success: false,
      };
    }

    return {
      success: true,
      message: "Password succesfully updated.",
    };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { message: "An unexpected error occurred", success: false };
  }
};

// password recovery

// delete profile
