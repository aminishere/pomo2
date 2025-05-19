// src/pages/Account.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { username } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <p className="text-lg">Username: <strong>{username}</strong></p>
    </div>
  );
};

export default Account;
