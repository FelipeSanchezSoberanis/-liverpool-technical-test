"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function AuthCallbackLogin() {
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) redirect("/pokemons");
  }, [isLoading, isAuthenticated]);

  return (
    <div className="position-absolute top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center">
      {isLoading && <div className="spinner-border text-primary"></div>}
    </div>
  );
}
