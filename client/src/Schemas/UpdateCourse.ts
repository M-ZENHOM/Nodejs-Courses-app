import { z } from 'zod'

export const UpdateCourseSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    price: z.string().min(1, { message: "Price is required" }).regex(/^\d+$/, { message: "Must be a postive number" }).optional()
})