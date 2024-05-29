"use client"

import { handleLogin } from "@/lib/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./submit-button";

export type FormState = string | undefined

export default function SigninForm() {
  const [error, formAction] = useFormState(handleLogin, "")

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1707660380407-c1edb3396c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNzAxODM4MA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="hero"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action={formAction}>
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {error && (
            <div>
              <p className="!text-red">{error}</p>
            </div>
          )}
          {/* <!-- Login Button --> */}
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

