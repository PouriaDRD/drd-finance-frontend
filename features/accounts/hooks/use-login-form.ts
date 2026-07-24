"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createSession, login } from "../actions";
import { useUser } from "../context";
import { loginSchema } from "../schemas";
import { LoginResponse } from "../types";

interface Props {
	onSuccess?: () => void;
}

export function useLoginForm({ onSuccess }: Props) {
	const [isPending, setIsPending] = useState(false);

	const { refetchUser } = useUser();

	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleOnSuccess = async (data: LoginResponse) => {
		await Promise.all([
			createSession({
				token: data.token,
			}),

			refetchUser(),
		]);

		toast.success("حساب کاربری با موفقیت وارد شد!");

		form.reset();

		onSuccess?.();

		const redirectTo = next ?? "/panel/dashboard";

		router.push(redirectTo as "/");
	};

	const submit = form.handleSubmit(async (values) => {
		setIsPending(true);
		try {
			const data = await login(values);

			if (data.success) {
				handleOnSuccess(data.data);
			} else {
				toast.error(data.error.toString());
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error logging in user: ", error);
			}
			toast.error("خطا در ورود رخ داد!");
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
