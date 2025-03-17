import { useRouter } from "next/navigation";
import { registerUser, RegisterFormData } from "@/lib/api/registerUser";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function useRegister() { 

    const { 
        register, 
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<RegisterFormData>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const submit = handleSubmit(async (data) => {
        try {
          await registerUser(data);
          router.push("/login");
        } catch (error) {
          const message = (error as Error).message;
          setError("root", { message });
          setErrorMessage(message);
        }
      });

    return { register, submit, errors, isSubmitting, errorMessage };
}