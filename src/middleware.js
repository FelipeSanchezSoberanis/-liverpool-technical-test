import { NextResponse } from "next/server";

export function middleware(request) {
  if (
    !request.nextUrl.pathname.startsWith("/pokemons") &&
    !request.nextUrl.pathname.startsWith("/formulario") &&
    !request.nextUrl.pathname.startsWith("/favorite-pokemons")
  )
    return NextResponse.next();

  const isAuthenticated = request.cookies.get(
    "auth0.5AYBJcopjb0AOkKT7jAZu90rdrpmFATd.is.authenticated"
  );

  if (isAuthenticated && isAuthenticated.value === "true") return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));
}
