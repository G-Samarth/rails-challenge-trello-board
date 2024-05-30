import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const appRouter = trpc
  .router<Context>()
  .query("getLists", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.list.findMany({
        include: {
          cards: true,
        },
      });
    },
  })
  .mutation("addList", {
    input: z.object({
      title: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.list.create({
        data: {
          title: input.title,
        },
      });
    },
  })
  .mutation("deleteList", {
    input: z.string(),
    resolve: async ({ input, ctx }) => {
      const list = await ctx.prisma.list.findUnique({
        where: { id: input },
      });

      if (!list) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        });
      }

      return ctx.prisma.list.delete({
        where: {
          id: input,
        },
      });
    },
  })
  .mutation("addCard", {
    input: z.object({
      listId: z.string(),
      content: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const list = await ctx.prisma.list.findUnique({
        where: { id: input.listId },
      });

      if (!list) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        });
      }

      return ctx.prisma.card.create({
        data: {
          content: input.content,
          listId: input.listId,
        },
      });
    },
  })
  .mutation("deleteCard", {
    input: z.string(),
    resolve: async ({ input, ctx }) => {
      const card = await ctx.prisma.card.findUnique({
        where: { id: input },
      });

      if (!card) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Card not found",
        });
      }

      return ctx.prisma.card.delete({
        where: {
          id: input,
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
