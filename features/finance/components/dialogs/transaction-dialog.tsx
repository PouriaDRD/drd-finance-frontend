"use client";

import { useState } from "react";

import { ChartBarStacked, EditIcon, PlusIcon } from "lucide-react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui";

import { PublicTransaction } from "../../types";
import { TransactionForm } from "../forms";

interface Props {
	transaction?: PublicTransaction;
	onSuccess?: () => void;
}

export function TransactionDialog({ transaction, onSuccess }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size={"xs"}>
						{transaction ? <EditIcon /> : <PlusIcon />}
						{transaction ? "ویرایش تراکنش" : "ایجاد تراکنش"}
					</Button>
				}></DialogTrigger>

			<DialogContent className="w-full max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ChartBarStacked className="size-5" />
						ایجاد تراکنش
					</DialogTitle>

					<DialogDescription>
						اطلاعات زیر را برای ایجاد تراکنش کامل کنید!
					</DialogDescription>
				</DialogHeader>

				<div className="p-4">
					<TransactionForm
						transaction={transaction}
						onSuccess={() => {
							setOpen(false);
							onSuccess?.();
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
