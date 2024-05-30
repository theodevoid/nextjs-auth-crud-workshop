import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z.string().min(3).max(80),
  body: z.string().min(3).max(280),
});

export type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;
