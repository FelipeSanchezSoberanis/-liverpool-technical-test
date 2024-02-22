"use client";

import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="position-absolute w-100 vh-100 start-0 top-0 d-flex justify-content-center align-items-center">
      <button onClick={loginWithRedirect} className="btn btn-primary">
        Log in
      </button>
    </div>
  );
}
