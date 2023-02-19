import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  addQuestion: protectedProcedure
    .input(z.object({question: z.string().min(5).max(500)}))
    .mutation(({ctx,input}) => {
      return ctx.prisma.question.create({
        data: {
          question: input.question,
          options: [],
        } 
      })
    }),
});
