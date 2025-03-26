"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

// (!) needs testing
// change email (will send verification to new address)
// only possible for email auth provider
export const updateEmail = async (
  prevState: UpdateEmailState,
  formData: FormData
) => {
  const supabase = await createClient();

  // get + validate form data
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

  console.log("NEW EMAIL: ", newEmail);

  try {
    // update user email
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
  prevState: UpdatePasswordState,
  formData: FormData
) => {
  const supabase = await createClient();

  // get + validate form data
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
    // get user to retrieve email
    const { data, error: userError } = await supabase.auth.getUser();

    if (!data.user?.email || userError) {
      console.error("Failed to retrieve user: ", userError);
      return {
        message:
          "Failed to update password, please logout and login to try again.",
        success: false,
      };
    }

    // check credentials by attempting login
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.user.email,
      password: oldPassword,
    });

    if (authError) {
      console.error("Login error: ", authError.message);
      return {
        message: "Failed to update password",
        success: false,
        errors: { oldPassword: ["Invalid credentials"] },
      };
    }

    // update user with new password
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

// (!!) NOT USED
// refresh email
// in case user has changed the email connected to their google account
// click button to update email in app
// maybe not necessary (?)
export const refreshEmail = async () => {
  const supabase = await createClient();

  try {
    const { data, error: authError } = await supabase.auth.getUser();
    if (authError || !data?.user) {
      return {
        success: false,
        message:
          "Something went wrong, please logout and log back into your account",
      };
    }

    // (!!!) TEST if this will send an email to address

    const { error } = await supabase.auth.updateUser({
      email: data.user.user_metadata.email,
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

// TODO
// password recovery

// delete profile
export const deleteUserProfile = async () => {
  // create server client to get current user
  // create admin client to delete user
  const supabase = await createClient();
  const supabaseAdmin = await createAdminClient();

  try {
    // get current user
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data?.user) {
      throw new Error("User error: could not return current user");
    }

    // logout current user before deletion
    const { error: authError } = await supabase.auth.signOut();

    if (authError) {
      console.error("Error signing out: ", authError.message);
      throw new Error("Auth error: could not signout user");
    }

    // use admin client to delete user
    const { error: adminError } = await supabaseAdmin.auth.admin.deleteUser(
      data.user.id
    );

    if (adminError) {
      throw new Error("Admin error: failed to delete user");
    }
  } catch (error) {
    console.error("Failed to delete user: ", error);
    return { success: false };
  }

  // redirect outside of try/catch
  // redirect to dedicated goodbye page (?)
  redirect("/?delete=true");
};
