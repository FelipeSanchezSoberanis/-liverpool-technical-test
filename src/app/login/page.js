"use client";

import { useAuth0 } from "@auth0/auth0-react";

/**
 * @file View in charge of showing login button.
 */
export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-3">
        <h1 className="text-center">
          <span className="text-primary">Liverpool</span> Technical Test
        </h1>
        <h2 className="text-center">React Front End Developer</h2>
        <div className="row  row-cols-2 row-cols-sm-3 pt-3 pb-3 justify-content-center">
          <img className="col" src="/react.png" />
        </div>
        <div className="row p-3 justify-content-center">
          <div className="col-auto">
            <button onClick={loginWithRedirect} className="btn btn-primary">
              <i className="bi bi-door-open pe-1"></i>Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
