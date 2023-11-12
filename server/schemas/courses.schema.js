const z = require("zod");

const courseSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(1),
  userOwner: z.string().min(1),
});

module.exports = {
  courseSchema,
};
