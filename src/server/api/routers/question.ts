import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  create: protectedProcedure
    .input(z.object({question: z.string().min(5).max(500)}))
    .mutation(({ctx,input}) => {
      if (!ctx.token) throw new Error("UNAUTHORIZED");
      return ctx.prisma.question.create({
        data: {
          question: input.question,
          options: [],
          ownerToken: ctx.token
        } 
      })
    }),
  getById: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(({ctx,input}) => {
      if (!ctx.token) throw new Error("UNAUTHORIZED");
      return ctx.prisma.question.findFirst({
        where: {
          id: input.id
        }
      })
    })
});
