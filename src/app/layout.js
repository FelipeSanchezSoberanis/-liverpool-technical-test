"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { SWRConfig } from "swr";
import { Auth0Provider } from "@auth0/auth0-react";

export default function RootLayout({ children }) {
  return (
    <Auth0Provider
      domain="dev-xjgkgbbbpbo086ch.us.auth0.com"
      clientId="5AYBJcopjb0AOkKT7jAZu90rdrpmFATd"
      authorizationParams={{ redirect_uri: "http://localhost:3000/auth-callback/login" }}
    >
      <SWRConfig value={{ provider: () => new Map() }}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </SWRConfig>
    </Auth0Provider>
  );
}
