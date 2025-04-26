"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FaTimes, FaUser, FaLock, FaQrcode, FaEye, FaEyeSlash } from "react-icons/fa"

interface LoginFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!showQrCode) {
      if (!username || !password) {
        setError("Username and password are required")
        return
      }

      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
      }
    } else {
      setError("")
      router.push("/dashboard")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-md shadow-sm w-full max-w-md relative overflow-hidden border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors z-10"
        >
          <FaTimes size={18} />
        </button>

        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-medium text-center text-black">Sign In</h2>
        </div>

        <div className="p-5">
          {error && <div className="mb-4 p-3 bg-gray-50 text-red-600 text-xs rounded-md">{error}</div>}

          {!showQrCode ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-700 hover:text-black">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm"
              >
                Sign In
              </button>

              <div className="relative flex items-center justify-center mt-4">
                <div className="border-t border-gray-200 absolute w-full"></div>
                <div className="bg-white px-4 relative text-sm text-gray-500">or</div>
              </div>

              <button
                type="button"
                onClick={() => setShowQrCode(true)}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm"
              >
                <FaQrcode size={16} />
                Sign in with QR Code
              </button>
            </form>
          ) : (
            <div className="py-4 flex flex-col items-center">
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div
                  className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center"
                  style={{ width: "200px", height: "200px" }}
                >
                  <FaQrcode size={120} className="text-gray-700" />
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-800 mb-2">Scan QR Code to Login</h3>
              <p className="text-gray-600 text-center text-sm mb-6">
                Open your mobile app and scan this QR code to log in instantly
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowQrCode(false)}
                  className="flex-1 border border-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-gray-700 hover:text-black">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
