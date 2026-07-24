"use client";

import {
	createContext,
	type ReactNode,
	use,
	useCallback,
	useEffect,
	useEffectEvent,
	useMemo,
	useState,
} from "react";

import { getUser } from "../actions/user.action";
import type { PublicUser } from "../types";

interface UserContextType {
	user: PublicUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	loginUser(user: PublicUser): void;
	logoutUser(): void;

	refetchUser(): Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<PublicUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const onInit = useEffectEvent(async () => {
		try {
			const response = await getUser();

			if (response.success && response.data) {
				setUser(response.data);
			} else {
				setUser(null);
			}
		} finally {
			setIsLoading(false);
		}
	});

	useEffect(() => {
		onInit();
	}, []);

	const refetchUser = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getUser();

			if (response.success && response.data) {
				setUser(response.data);
			} else {
				setUser(null);
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const loginUser = useCallback((user: PublicUser) => {
		setUser(user);
	}, []);

	const logoutUser = useCallback(() => {
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			loginUser,
			logoutUser,
			refetchUser,
		}),
		[user, isLoading, loginUser, logoutUser, refetchUser],
	);

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	const context = use(UserContext);

	if (!context) {
		throw new Error("useUser must be used inside UserProvider");
	}

	return context;
}
