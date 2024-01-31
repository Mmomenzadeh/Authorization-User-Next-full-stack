import userModel from "@/model/userModel";
import { VerfiyToken } from "@/utils/auth";
import React from "react";

function Dashboard({ userData }) {
  return (
    <>
      <h1 style={{ color: "#fff" }}>
        {userData.firstName} - {userData.lastName} - Welcome To Dashboard
      </h1>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const userPayload = VerfiyToken(token);

  if (!userPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const userData = await userModel.findOne(
    { email: userPayload.email },
    "firstName lastName "
  );

  return {
    props: { userData: JSON.parse(JSON.stringify(userData)) },
  };
}

export default Dashboard;
