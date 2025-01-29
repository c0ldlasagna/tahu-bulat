'use client';
import React, { useState, useContext } from "react";
import Tahubulatlogo from "../../components/TahuBulatLogo";
import { overlock } from "../fonts";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth.context";

export default function SignInPage() {
  const {setUser} = useContext(AuthContext);
  const router = useRouter();
  const  [email, setemail]= useState('');
  const [password, setpassword]= useState('');
  const [error,setError]= useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userObj = await signIn(email, password);
      console.log(userObj);
      const username = userObj.user.user_metadata;
      setUser(username);
      router.push("/");
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        alert('An unknown error occurred');
      }

      }
  };
  return (
    <div className={`${overlock.className} flex min-h-screen`}>
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className={`${overlock.className} antialiased text-3xl font-bold text-gray-800 text-center mb-6`}>
            Sign in
            <a href={"/"}>
            <Tahubulatlogo/>
            </a>
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-black bg-yellow-400 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Sign-Up Link */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block w-1/2">
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.svg')" }}
        ></div>
      </div>
    </div>
  );
}
