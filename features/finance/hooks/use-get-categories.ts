"use client";

import { useEffect, useState } from "react";

import { getCategories } from "../actions";
import { PublicCategory } from "../types";

interface options {
	showAll?: boolean;
}

export function useGetCategories({ showAll = true }: options) {
	const [isLoadingCategories, setIsLoading] = useState(true);
	const [categories, setCategories] = useState<PublicCategory[]>([]);

	const handleGetCategories = () => {
		setIsLoading(true);
		getCategories({ showAll: showAll })
			.then((response) => {
				if (response.success) {
					setCategories(response.data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getCategories({ showAll: showAll })
			.then((response) => {
				if (response.success) {
					setCategories(response.data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [showAll]);

	return {
		categories,
		isLoadingCategories,
		handleGetCategories,
	};
}
