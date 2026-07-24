export const queryKeys = {
	auth: {
		myLoginHistory: ["authentication", "my-login-history"],
	},

	accounts: {
		me: ["accounts", "me"],
	},

	finance: {
		myCategories: ["finance", "my-categories"],
		myActiveCategories: ["finance", "my-active-categories"],
		myTransactionsInMonth: (month: number, year: number) => [
			"finance",
			"my-transactions",
			"summary",
			year,
			month,
		],
		myTransactionsInYear: (year: number) => [
			"finance",
			"my-transactions",
			"summary",
			year,
		],
	},
};
