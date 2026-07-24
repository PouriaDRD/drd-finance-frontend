import type { Types } from "mongoose";

export type MongoTransform<T> = T & {
	_id: Types.ObjectId;
	__v?: number;
};

export function mongooseTransform<T extends object>(
	_: unknown,
	ret: MongoTransform<T>,
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, __v, ...data } = ret;

	return {
		id: _id.toString(),
		...data,
	};
}
