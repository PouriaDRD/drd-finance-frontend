/**
 * Finance API layer
 *
 * All HTTP calls for finance feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Category, CategorySchema } from "../types";

export const financeApi = {
	getMyCategories: () => {
		return apiClient.get<Category[]>(endpoints.finance.myCategories);
	},

	getMyActiveCategories: () => {
		return apiClient.get<Category[]>(endpoints.finance.myActiveCategories);
	},

	createCategory: (data: CategorySchema) => {
		return apiClient.post<Category>(endpoints.finance.createCategory, data);
	},

	updateCategory: (categoryId: string, data: CategorySchema) => {
		return apiClient.patch<Category>(
			endpoints.finance.updateCategory(categoryId),
			data,
		);
	},
};
