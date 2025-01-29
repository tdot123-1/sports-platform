"use client";

import { loginWithPassword, State } from "@/lib/actions/auth/actions";
import { useActionState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction, pending] = useActionState(
    loginWithPassword,
    initialState
  );
  return (
    <>
      <form action={formAction}>
        <div className="mb-4">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="text"
            aria-describedby="email-error"
            disabled={pending}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            aria-describedby="password-error"
            disabled={pending}
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error) => (
                <p className="text-sm mt-2 text-destructive italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={pending}>
            Login
          </Button>
        </div>
        <div>
          {state.message && (
            <p className="text-sm mt-2 text-destructive italic text-center">
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
