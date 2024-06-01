import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z.object({
      title: z.string().min(3).max(80),
      body: z.string().min(3).max(280),
      recipientId: z.string().cuid(),
    })
  ).mutation(async ({ ctx, input }) => {
    const { db, session } = ctx;

    await db.post.create({
      data: {
        body: input.body,
        title: input.title,
        authorId: session.user.id,
        recipientId: input.recipientId,
      }
    })
  }),
  getUserPosts: publicProcedure.input(
    z.string().cuid()
  ).query(async ({ ctx, input }) => {
    const { db, session } = ctx;

    const posts = db.post.findMany({
      where: {
        recipientId: input
      },
      include: {
        author: true
      }
    })

    return posts;
  }),
  deletePost: protectedProcedure.input(
    z.string().cuid()
  ).mutation(async ({ ctx, input }) => {
    const { db, session } = ctx;

    await db.post.delete({
      where: {
        id: input,
        authorId: session.user.id,
      }
    })
  })
});
