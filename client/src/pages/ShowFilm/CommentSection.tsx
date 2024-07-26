import axios from "axios";
import { useEffect, useState } from "react";
import HearthIcon from "../../icons/HearthIcon";
import ReplayIcon from "../../icons/ReplayIcon";
import SmileIcon from "../../icons/SmileIcon";
import ThumbsUpIcon from "../../icons/ThumbsUpIcon";
import { Comment, CommentSectionProps } from "../../icons/types";

const API_URL = "http://localhost:3000";

const CommentSection = ({ filmId, currentUserId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [filmId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/comments/film/${filmId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) return;

    try {
      await axios.post(`${API_URL}/comments`, {
        filmId,
        userId: currentUserId,
        content: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    if (!currentUserId) return;

    try {
      await axios.post(`${API_URL}/comments/${commentId}/replies`, {
        userId: currentUserId,
        content: replyContent,
      });
      setReplyingTo(null);
      setReplyContent("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleReaction = async (
    commentId: string,
    reactionType: "like" | "heart" | "smile"
  ) => {
    if (!currentUserId) return;

    try {
      await axios.post(
        `${API_URL}/reactions/${filmId}/comments/${commentId}/postreactions`,
        {
          userId: currentUserId,
          reactionType,
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>

      {currentUserId && (
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit Comment
          </button>
        </form>
      )}

      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-white">{comment.content}</p>
          <p className="text-sm text-gray-400">By: {comment.userId.name}</p>

          <div className="flex mt-2">
            <button
              onClick={() => handleReaction(comment._id, "like")}
              className="mr-2"
            >
              <ThumbsUpIcon className="text-blue-500" size={4} />{" "}
              {comment.reaction.like}
            </button>
            <button
              onClick={() => handleReaction(comment._id, "heart")}
              className="mr-2"
            >
              <HearthIcon className="text-red-500" size={0} />{" "}
              {comment.reaction.heart}
            </button>
            <button
              onClick={() => handleReaction(comment._id, "smile")}
              className="mr-2"
            >
              <SmileIcon className="text-yellow-500" size={0} />{" "}
              {comment.reaction.smile}
            </button>
          </div>

          {comment.replies.map((reply) => (
            <div key={reply._id} className="ml-8 mt-2 bg-gray-600 p-2 rounded">
              <p className="text-white">{reply.content}</p>
              <p className="text-sm text-gray-400">By: {reply.userId.name}</p>
            </div>
          ))}

          {currentUserId && (
            <div className="mt-2">
              {replyingTo === comment._id ? (
                <div className="text-black">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-200 text-black"
                    placeholder="Write a comment..."
                  />

                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Submit Reply
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="mt-2 flex items-center text-blue-500"
                >
                  <ReplayIcon className="mr-1" size={5} /> Reply
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
