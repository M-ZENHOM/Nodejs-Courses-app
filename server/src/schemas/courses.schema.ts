import z from "zod";

export const courseSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(1),
  userOwner: z.string().min(1),
});
