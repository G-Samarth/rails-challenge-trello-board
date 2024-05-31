import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const appRouter = trpc
  .router<Context>()
  .query("getLists", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.list.findMany({
        include: {
          cards: {
            orderBy: { position: "asc" },
          },
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

      await ctx.prisma.card.deleteMany({
        where: { listId: input },
      });

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

      // Get the current max position in the list
      const maxPosition = await ctx.prisma.card
        .findMany({
          where: { listId: input.listId },
          orderBy: { position: "desc" },
          take: 1,
        })
        .then((cards: { position: number }[]) => (cards[0]?.position ?? 0) + 1);

      return ctx.prisma.card.create({
        data: {
          content: input.content,
          listId: input.listId,
          position: maxPosition,
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
  })
  .mutation("updateCardPosition", {
    input: z.object({
      cardId: z.string(),
      newListId: z.string(),
      newPosition: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const { cardId, newListId, newPosition } = input;

      const card = await ctx.prisma.card.findUnique({
        where: { id: cardId },
      });

      if (!card) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Card not found",
        });
      }

      // Move the card to the new list and update its position
      await ctx.prisma.card.update({
        where: { id: cardId },
        data: {
          listId: newListId,
          position: newPosition,
        },
      });

      // Update the positions of other cards in the destination list
      await ctx.prisma.$transaction(async (prisma: typeof ctx.prisma) => {
        const cards = await prisma.card.findMany({
          where: { listId: newListId },
          orderBy: { position: "asc" },
        });

        for (let i = 0; i < cards.length; i++) {
          await prisma.card.update({
            where: { id: cards[i].id },
            data: { position: i },
          });
        }
      });

      return card;
    },
  });

export type AppRouter = typeof appRouter;
