"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useRegisterAdminForm } from "../../hooks";
import {
	ConfirmPasswordField,
	EmailField,
	NameField,
	PasswordField,
	SecretField,
} from "../fields";

interface Props {
	onSuccess?: () => void;
}

export function RegisterAdminForm({ onSuccess }: Props) {
	const { form, submit, isPending } = useRegisterAdminForm({
		onSuccess() {
			onSuccess?.();
		},
	});

	return (
		<form id="register-admin-form" onSubmit={submit}>
			<FieldGroup>
				{/* Email Name */}
				<EmailField control={form.control} name="email" label="ایمیل" />

				{/* Referral Code */}
				<NameField
					control={form.control}
					name="name"
					label="نام کامل"
				/>

				{/* Secret */}
				<SecretField
					control={form.control}
					name="secret"
					label="سکرت"
				/>

				{/* Password */}
				<PasswordField
					control={form.control}
					name="password"
					label="رمز عبور"
				/>

				{/* Confirm Password */}
				<ConfirmPasswordField
					control={form.control}
					name="confirmPassword"
					label="تکرار رمز عبور"
				/>
			</FieldGroup>

			<Button
				type="submit"
				form="register-admin-form"
				className="w-full mt-6"
				disabled={isPending}>
				{isPending ? <Spinner /> : "ثبت نام مدیر"}
			</Button>
		</form>
	);
}
