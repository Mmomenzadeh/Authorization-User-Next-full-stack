import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {

  const router = useRouter() ; 
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });

  // console.log(userData);

  const registerUserHandler = async (event) => {
    event.preventDefault();

    // console.log(userData);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.status === 201) {
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
      });
      alert("user sucessfully created !");
      router.replace("/p-admin")
      // console.log(res);
    } else if (res.status === 422) {
      alert("entery is not valid  !");
    } else if (res.status === 500) {
      console.log(res);
      alert("internall server error !");
    }
  };
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            required
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
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
          value="Sign Up"
          onClick={registerUserHandler}
        />
      </form>
    </div>
  );
}

export default Index;
