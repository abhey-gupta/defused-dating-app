"use client";

import { useState } from "react";
import jwt from "jsonwebtoken"; // Import JWT library

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simulate authentication (replace this with actual authentication logic)
    if (username === "alex" && password === "alex123") {
      // Generate JWT token
      //   const token = jwt.sign({ username: "alex" }, "secret_key");
      const token = "eyJhbGciOiJIUz";
      // Store token in local storage
      Cookies.set("token", token);
      // Set token state
      setToken(token);
      // Clear username and password fields
      setUsername("");
      setPassword("");
      setError("");
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="p-4 w-1/3 mx-auto mt-5 bg-[#ffffff60] rounded-lg">
      <h1 className="font-semibold text-2xl text-center">Welcome, User</h1>
      <p className="text-center my-2">
        Find new friends. But first, let's set you up
      </p>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p>{error}</p>}
      <Button className="bg-pink-500 my-3" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
