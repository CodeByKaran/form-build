"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  // Use the useSession hook to get session info
  const { data: session, status } = useSession();

  // Check if the session is loading or not
  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return (
    <div>
      {!session ? (
        <span className="font-poppins font-normal">Not logged in...</span>
      ) : (
        <p className="font-poppins font-black">User: {session.user?.name}</p>
      )}
    </div>
  );
};

export default Dashboard;
