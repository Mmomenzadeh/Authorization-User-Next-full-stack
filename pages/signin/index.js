import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  const signInHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });

    if (res.status === 200) {
      setUserData({
        identifier: "",
        password: "",
      });
      alert("logIn...");
      router.push("/dashboard");
    } else {
    }
  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            value={userData.identifier}
            onChange={(e) =>
              setUserData({ ...userData, identifier: e.target.value })
            }
          />
          <label>Username | Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          className="register-btn"
          value="Sign In"
          onClick={signInHandler}
        />
      </form>
    </div>
  );
}

export default Index;
