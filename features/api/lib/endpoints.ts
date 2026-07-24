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
		myActiveCategories: "finance/my-categories/active/",
		createCategory: "finance/my-categories/create/",
		updateCategory: (id: string) => `finance/my-categories/${id}/update/`,

		myTransactionsInMonth: (month: number, year: number) =>
			`finance/my-transactions/summary/${year}/${month}/`,

		myTransactionsInYear: (year: number) =>
			`finance/my-transactions/summary/${year}/`,

		createTransaction: "finance/my-transactions/create/",

		updateTransaction: (id: string) =>
			`finance/my-transactions/${id}/update/`,

		deleteTransaction: (id: string) =>
			`finance/my-transactions/${id}/delete/`,
	},
};
