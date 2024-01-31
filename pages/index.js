import React, { useEffect, useState } from "react";
import Link from "next/link";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const [userStatus, setUserStatus] = useState({
    isLoggedIn: false,
    isAdmin: false,
  });
  useEffect(() => {
    const userAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const userData = await res.json();
        // console.log(userData);
        if (res.status === 200) {
          setUserStatus({
            isLoggedIn: true,
            isAdmin: userData.role === "ADMIN" ? true : false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    userAuth();
  }, []);

  const logOutUserHandler = () => {
    fetch("/api/auth/signout")
      .then((res) => {
        setUserStatus({
          isLoggedIn: false,
          isAdmin: false,
        });
        alert("user successfully logout ...");
        router.push("/");
      })
      .catch((err) => console.log({ "log out has error ": err }));
  };
  // console.log(userStatus);
  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          <>
            {userStatus.isLoggedIn ? (
              <>
                {/* User is login */}

                <li>
                  <Link href="/dashboard">
                    <span>
                      <FontAwesomeIcon icon={faBars} />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li onClick={logOutUserHandler}>
                  <Link href="#">
                    <span>
                      <FontAwesomeIcon icon={faSignOut} />
                    </span>
                    Logout
                  </Link>
                </li>
                {/* User is login */}
              </>
            ) : (
              <>
                {/* User not login */}
                <li>
                  <Link href="/signin">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign up
                  </Link>
                </li>
                {/* User not login */}
              </>
            )}
          </>

          {userStatus.isAdmin && (
            <>
              {/* User is login & admin */}
              <li>
                <Link href="/p-admin">
                  <span>
                    <FontAwesomeIcon icon={faSolarPanel} />
                  </span>
                  Admin panel
                </Link>
              </li>
            </>
          )}
        </ul>
        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
