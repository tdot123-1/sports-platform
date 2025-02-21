"use client";

import { logOut } from "@/lib/actions/auth/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LogOutIcon } from "lucide-react";

const LogoutMenuItem = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await logOut();

      if (result.success) {
        toast("Logged out", {
          description: "Until next time!",
        });

        router.push("/login");
      } else {
        setError(result.message || "Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error on logout: ", error)
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          disabled={isLoading}
          className="hover:bg-zinc-100"
          onClick={handleClick}
        >
          <LogOutIcon />
          Logout
        </SidebarMenuButton>
      </SidebarMenuItem>
      {error && (
        <p className="text-sm mt-2 text-destructive italic text-center">
          {error}
        </p>
      )}
    </>
  );
};

export default LogoutMenuItem;
