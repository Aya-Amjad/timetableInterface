import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Navbar({ user, logOut }) {
  // استخدام js-cookie لفحص وجود الـ access token في الكوكيز
  const hasAccessToken = Cookies.get('userToken');

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {hasAccessToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary " to="">
                    Generate Timetable
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary" to="Addprofessor">
                    Professor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary" to="Addroom">
                    Room
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary" to="Addcourse">
                    Course
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!hasAccessToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary" to="Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold fs-5 text-secondary" to="Signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <p className="nav-link fw-bold fs-5 text-secondary" onClick={logOut}>
                    Log out
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
