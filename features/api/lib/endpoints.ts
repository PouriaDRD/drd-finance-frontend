export const endpoints = {
	auth: {
		myLoginHistory: "authentication/my-login-history/",
		login: "authentication/login/",
		register: "authentication/register/",
		refresh: "authentication/refresh/",
	},

	account: {
		me: "accounts/me/",
	},

	finance: {
		myCategories: "finance/my-categories/",
		myActiveCategories: "finance/my-active-categories/",
		createCategory: "finance/create-category/",
		updateCategory: (id: string) => `finance/update-category/${id}/`,
	},
};
