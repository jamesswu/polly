import { createTRPCRouter } from "./trpc";
import { questionRouter } from "./routers/question";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  question: questionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
