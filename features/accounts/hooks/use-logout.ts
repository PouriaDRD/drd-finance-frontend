"use client";

import { useState } from "react";

import { toast } from "sonner";

import { logoutAction } from "../actions";
import { useUser } from "../context";

export function useLogout() {
	const [isLoading, setIsLoading] = useState(false);
	const { logoutUser } = useUser();

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await logoutAction();
			logoutUser();
			// redirect to login page
			toast.success("با موفقیت خارج شدید");

			window.location.href = "/auth/login";
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.error("[LogoutAction]", error);
			}

			toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		handleLogout,
	};
}
