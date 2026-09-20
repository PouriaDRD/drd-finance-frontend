"use client";

import { useState } from "react";

import { Edit3, Plus, ReceiptText } from "lucide-react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui";

import { Transaction } from "../../types";
import { TransactionForm } from "../forms";

interface Props {
	transaction?: Transaction;
	onSuccess?: () => void;
}

export function TransactionDialog({ transaction, onSuccess }: Props) {
	const [open, setOpen] = useState(false);
	const isEdit = Boolean(transaction);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button
						variant={isEdit ? "ghost" : "default"}
						size={isEdit ? "icon-sm" : "sm"}>
						{isEdit ? (
							<Edit3 className="size-4" />
						) : (
							<>
								<Plus className="size-4" />
								تراکنش جدید
							</>
						)}
					</Button>
				}
			/>

			<DialogContent
				className={`
					max-h-[90dvh] w-[calc(100%-1.5rem)]
					max-w-lg overflow-y-auto p-0
				`}>
				<DialogHeader
					className={`
						border-b px-5 py-4 text-start
					`}>
					<div className="flex items-center gap-3">
						<div
							className={`
								flex size-10 shrink-0
								items-center justify-center
								rounded-xl bg-primary/10
								text-primary
							`}>
							<ReceiptText className="size-5" />
						</div>

						<div>
							<DialogTitle>
								{isEdit ? "ویرایش تراکنش" : "تراکنش جدید"}
							</DialogTitle>

							<DialogDescription className="mt-1">
								{isEdit
									? "اطلاعات تراکنش را اصلاح و ذخیره کنید."
									: "اطلاعات تراکنش را وارد کنید."}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="p-5">
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
