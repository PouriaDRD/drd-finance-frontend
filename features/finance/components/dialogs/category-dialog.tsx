"use client";

import { useState } from "react";

import { Edit3, Plus, Tags } from "lucide-react";

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
	const isEdit = Boolean(category);

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
								دسته‌بندی جدید
							</>
						)}
					</Button>
				}
			/>

			<DialogContent
				className={`
					max-h-[90dvh] w-[calc(100%-1.5rem)]
					max-w-md overflow-y-auto p-0
				`}>
				<DialogHeader className="border-b px-5 py-4 text-start">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<Tags className="size-5" />
						</div>

						<div>
							<DialogTitle>
								{isEdit ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}
							</DialogTitle>

							<DialogDescription className="mt-1">
								{isEdit
									? "اطلاعات و وضعیت دسته‌بندی را اصلاح کنید."
									: "یک دسته‌بندی برای درآمد یا هزینه ایجاد کنید."}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="p-5">
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
