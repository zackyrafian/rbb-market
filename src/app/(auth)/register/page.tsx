"use client";

import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const { register, submit, errors, isSubmitting, errorMessage } = useRegister();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <form onSubmit={submit} className="space-y-4">
        <InputField label="Username" type="text" error={errors.username?.message} {...register("username", { required: "Username is required" })} />
        <InputField label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <InputField label="Password" type="password" error={errors.password?.message} {...register("password", { required: "Password is required" })} />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

function InputField({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input {...props} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-500 bg-red-100 p-2 rounded text-center">{message}</p>;
}
