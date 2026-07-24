import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: {
			default: "Finance",
			template: "Finance | %s",
		},
		description: "Finance in Finance Manager",
	};
}

function FinanceLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default FinanceLayout;
