"use client";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { formatTimeToNow } from "@/lib/utils";
import { CommentRequest } from "@/lib/validators/comment";
import { Comment, CommentVote, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import CommentVotes from "./CommentVotes";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { toast } from "./ui/Toast/use-toast";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  postId: string;
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
}

const PostComment: FC<PostCommentProps> = ({
  postId,
  comment,
  votesAmt,
  currentVote,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const { loginToast } = useCustomToasts();
  const { data: session } = useSession();
  const router = useRouter();
  const [isReplying, setIsReplying] = useState(false);
  const [input, setInput] = useState<string>("");

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };
      const { data } = await axios.patch(
        "/api/subreddit/post/comment",
        payload
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Comment wasn't posted successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
      setIsReplying(false);
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text} </p>

      <div className="flex items-center gap-x-2 mt-2 flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />
        <Button
          onClick={() => {
            if (!session) return router.push("/login");
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" /> Reply
        </Button>

        {isReplying ? (
          <div className="grid w-full gap-1.5">
            <Label>Your comment</Label>
            <div className="mt-2">
              <div className="mt-2">
                <Textarea
                  id="comment"
                  value={input}
                  rows={1}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  variant="subtle"
                  tabIndex={-1}
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  disabled={input.length == 0}
                  onClick={() => {
                    if (!input) return;
                    postComment({
                      postId,
                      text: input,
                      replyToId: comment.replyToId ?? comment.id,
                    });
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        {/* <button className="text-xs text-zinc-500">Give Award</button>
        <button className="text-xs text-zinc-500">Share</button>
        <button className="text-xs text-zinc-500">Report</button>
        <button className="text-xs text-zinc-500">Save</button> */}
      </div>
    </div>
  );
};

export default PostComment;
