"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createSession, registerAdmin } from "../actions";
import { useUser } from "../context";
import { registerAdminSchema } from "../schemas";
import { RegisterResponse } from "../types";

interface Props {
	onSuccess?: () => void;
}

export function useRegisterAdminForm({ onSuccess }: Props) {
	const [isPending, setIsPending] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const { refetchUser } = useUser();

	const form = useForm({
		resolver: zodResolver(registerAdminSchema),
		defaultValues: {
			email: "",
			name: "",
			secret: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleOnSuccess = async (data: RegisterResponse) => {
		await Promise.all([
			createSession({
				token: data.token,
			}),

			refetchUser(),
		]);

		toast.success("حساب کاربری با موفقیت ایجاد شد!");

		form.reset();

		onSuccess?.();

		const redirectTo = next ?? "/panel/dashboard";

		router.push(redirectTo as "/");
	};

	const submit = form.handleSubmit(async (values) => {
		setIsPending(true);
		try {
			const data = await registerAdmin(values);

			if (data.success) {
				handleOnSuccess(data.data);
			} else {
				toast.error(data.error.toString());
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error registering user: ", error);
			}
			toast.error("خطا در ثبت نام رخ داد!");
		} finally {
			setIsPending(false);
		}
	});

	return {
		form,
		submit,
		isPending: isPending,
	};
}
