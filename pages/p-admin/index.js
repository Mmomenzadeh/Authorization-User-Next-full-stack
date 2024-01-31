import ConectToDb from "@/configs/db";
import userModel from "@/model/userModel";
import { VerfiyToken } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

function PAdmin({ data }) {
  return (
    <h1 style={{ color: "#fff" }}>
      {data?.firstName} {data?.lastName} Welcome To Admin Panel ❤️
    </h1>
  );
}

export async function getServerSideProps(context) {
  ConectToDb();
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
    "firstName lastName role"
  );

  if (userData.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  // console.log(userData);
  return {
    props: { data: JSON.parse(JSON.stringify(userData)) },
  };
}

export default PAdmin;
