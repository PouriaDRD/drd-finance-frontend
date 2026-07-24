import z from "zod";

import { reportSchema } from "../schemas";

export type ReportSchema = z.infer<typeof reportSchema>;
