"use client";

import { logOut } from "@/lib/actions/auth/actions";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
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
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button disabled={isLoading} onClick={handleClick} variant={`outline`}>
        Logout
      </Button>
      {error && (
        <p className="text-sm mt-2 text-destructive italic text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default LogoutButton;
