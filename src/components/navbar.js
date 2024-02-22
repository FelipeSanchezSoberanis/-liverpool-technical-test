"use client";

import { reset } from "@/stores/auth-slice";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const { logout } = useAuth0();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout({ openUrl: false });
    dispatch(reset());
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Tech test</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/pokemons">
                Pokemons
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/formulario">
                Dynamic inputs
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </Link>
              <ul className="dropdown-menu end-0" style={{ left: "auto" }}>
                <li>
                  <div className="dropdown-item">{auth.name}</div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="dropdown-item">
                    <button onClick={handleLogout} className="btn btn-primary w-100">
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
