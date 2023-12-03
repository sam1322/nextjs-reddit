import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { CommentVoteValidator, PostVoteValidator } from "@/lib/validators/vote";
import { CachedPost } from "@/types/redis";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    // const post = await db.post.findUnique({
    //   where: {
    //     id: commentId,
    //   },
    //   include: {
    //     author: true,
    //     votes: true,
    //   },
    // });

    // if (!post) {
    //   return new Response("post not found", { status: 404 });
    // }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
        });
        return new Response("OK");
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        });

        //   //recount the votes
        //   const votesAmt = post.votes.reduce((acc, vote) => {
        //     if (vote.type == "UP") return acc + 1;
        //     if (vote.type == "DOWN") return acc - 1;
        //     return acc;
        //   }, 0);

        //   if (votesAmt >= CACHE_AFTER_UPVOTES) {
        //     const cachePayload: CachedPost = {
        //       authorUsername: post.author.username ?? "",
        //       id: post.id,
        //       title: post.title,
        //       content: JSON.stringify(post.content),
        //       currentVote: voteType,
        //       createdAt: post.createdAt,
        //     };
        //     await redis.hset(`post:${postId}`, cachePayload);
        //   }
        return new Response("OK");
      }
    }
    // if no existing vote,create a new vote
    await db.commentVote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        commentId,
      },
    });

    // Recount the votes
    // const votesAmt = post.votes.reduce((acc, vote) => {
    //   if (vote.type === "UP") return acc + 1;
    //   if (vote.type === "DOWN") return acc - 1;
    //   return acc;
    // }, 0);

    // if (votesAmt >= CACHE_AFTER_UPVOTES) {
    //   const cachePayload: CachedPost = {
    //     authorUsername: post.author.username ?? "",
    //     content: JSON.stringify(post.content),
    //     id: post.id,
    //     title: post.title,
    //     currentVote: voteType,
    //     createdAt: post.createdAt,
    //   };

    //   await redis.hset(`post:${postId}`, cachePayload); // Store the post data as a hash
    // }

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 400 });
    }

    return new Response("Could not register your vote, please try again.", {
      status: 500,
    });
  }
}
