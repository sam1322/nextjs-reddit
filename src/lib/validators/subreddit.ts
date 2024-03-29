import { z } from "zod";

export const SubredditValidator = z.object({
  name: z.string().min(3).max(21),
//   description: z.string().min(3).max(100),
//   type: z.enum(["public", "private", "restricted"]),
});

export const SubredditSubscriptionValidator = z.object({
    subredditId:z.string(),
})


export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;
export type SubredditSubscriptionPayload = z.infer<typeof SubredditSubscriptionValidator>;