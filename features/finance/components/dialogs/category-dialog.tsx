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

import { Category } from "../../types";
import { CategoryForm } from "../forms";

interface Props {
	category?: Category;
	onSuccess?: () => void;
}

export function CategoryDialog({ category, onSuccess }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size={"xs"}>
						{category ? <EditIcon /> : <PlusIcon />}
						{category ? "ویرایش" : "ایجاد دسته‌بندی"}
					</Button>
				}></DialogTrigger>

			<DialogContent className="w-full max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ChartBarStacked className="size-5" />
						ایجاد دسته‌بندی
					</DialogTitle>

					<DialogDescription>
						اطلاعات زیر را برای ایجاد دسته بندی کامل کنید!
					</DialogDescription>
				</DialogHeader>

				<div className="p-4">
					<CategoryForm
						category={category}
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
