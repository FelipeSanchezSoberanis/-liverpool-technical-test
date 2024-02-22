"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./globals.css";

import { SWRConfig } from "swr";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setName } from "@/stores/auth-slice";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={store}>
      <Auth0Provider
        domain="dev-xjgkgbbbpbo086ch.us.auth0.com"
        clientId="5AYBJcopjb0AOkKT7jAZu90rdrpmFATd"
        authorizationParams={{ redirect_uri: "http://localhost:3000/auth-callback/login" }}
      >
        <SWRConfig value={{ provider: () => new Map() }}>
          <App children={children} />
        </SWRConfig>
      </Auth0Provider>
    </Provider>
  );
}

function App({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const dispath = useDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated) dispath(setName(user.name));
  }, [isLoading, isAuthenticated]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
