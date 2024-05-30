'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Login failed');
      return;

    } 
      const { token } = await response.json();
      localStorage.setItem("token", token);
      router.push("/user");

  }catch (error){
    console.error('Login Error:', error);
    setError('An unexpected error occured. Please try again.')
  }
  };

  return (
    <div>
      <div className="container justify-content-center">
        <h1 className="p-4">Welcome to Login Page</h1>
        <form action="" onSubmit={handleLogin}>
          <div className="mb-2">
            <label className="p-2 form-label" htmlFor="email">
              Email Id
            </label>
            <input
              className="input-text form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label className="p-2 form-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-text form-control"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div> }
          <button className="border border-info btn btn-primary m-2 p-2" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
