"use client";

import { useEffect, useState } from "react";

import { getTransactions } from "../actions";
import { PublicTransaction } from "../types";

export function useGetTransactions() {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<PublicTransaction[]>([]);

	const handleGetTransactions = () => {
		setIsLoading(true);
		getTransactions()
			.then((response) => {
				if (response.success) {
					setTransactions(response.data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getTransactions()
			.then((response) => {
				if (response.success) {
					setTransactions(response.data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return {
		transactions,
		isLoadingTransactions: isLoading,
		handleGetTransactions,
	};
}
