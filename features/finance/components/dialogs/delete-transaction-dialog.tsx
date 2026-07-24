"use client";

import { TrashIcon } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Spinner,
} from "@/components/ui";

import { useDeleteTx } from "../../hooks";
import { Transaction } from "../../types";

interface Props {
	transaction: Transaction;
	collapsed?: boolean;
	onSuccess?: () => void;
}

export function DeleteTransactionDialog({
	transaction,
	collapsed = false,
	onSuccess,
}: Props) {
	const { handleOnDelete, isLoading } = useDeleteTx({
		transaction,
		onSuccess,
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button
						size={"xs"}
						variant="outline"
						className={collapsed ? "size-10 p-0" : "justify-start"}>
						{isLoading ? (
							<Spinner className="size-3.5 shrink-0 text-destructive" />
						) : (
							<TrashIcon className="size-3.5 shrink-0 text-destructive" />
						)}

						{!collapsed && (
							<span className="text-destructive">
								{isLoading ? "در حال حذف..." : "حذف"}
							</span>
						)}
					</Button>
				}
			/>

			<AlertDialogContent dir="rtl">
				<AlertDialogHeader>
					<AlertDialogTitle>حذف تراکنش</AlertDialogTitle>

					<AlertDialogDescription>
						آیا مطمئن هستید که می‌خواهید این تراکنش را حذف کنید؟
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="flex-col">
					<AlertDialogCancel>انصراف</AlertDialogCancel>

					<AlertDialogAction
						onClick={handleOnDelete}
						disabled={isLoading}
						className="bg-destructive hover:bg-destructive/90">
						{isLoading ? <Spinner className="size-4" /> : "حذف"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
