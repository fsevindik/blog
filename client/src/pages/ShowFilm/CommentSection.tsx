import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment, CommentSectionProps } from "../../icons/types";

const API_URL = "https://serverfilmolog.onrender.com";

const CommentSection: React.FC<CommentSectionProps> = ({
  filmId,
  currentUserId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [visibleReplies, setVisibleReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (filmId) {
      fetchComments();
    }
  }, [filmId]);

  const fetchComments = async () => {
    if (!filmId) return;
    try {
      const response = await axios.get<Comment[]>(
        `${API_URL}/comments/film/${filmId}`
      );
      setComments(response.data);
      const liked = new Set(
        response.data
          .filter(
            (comment) =>
              comment.reaction &&
              comment.reaction.usersLiked.includes(currentUserId)
          )
          .map((comment) => comment._id)
      );
      setLikedComments(liked);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newComment.trim() || !filmId) return;

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
    if (!userId || !replyContent.trim()) return;

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

  const handleLike = async (commentId: string, commentUserId: string) => {
    if (!userId) return;
    if (currentUserId === commentUserId) {
      console.log("You can't like your own comment");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/comments/${commentId}/like`,
        {
          userId: currentUserId,
        }
      );

      const updatedComment = response.data;

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );

      setLikedComments((prev) => {
        const newSet = new Set(prev);
        if (updatedComment.reaction.usersLiked.includes(currentUserId)) {
          newSet.add(commentId);
        } else {
          newSet.delete(commentId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const fetchLikedUsers = async (commentId: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/comments/${commentId}/likes`
      );
      return response.data.map((user: any) => user.name).join(", ");
    } catch (error) {
      console.error("Error fetching liked users:", error);
      return "";
    }
  };

  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
      {userId && userName ? (
        <div className="border border-white flex items-center">
          <form
            onSubmit={handleCommentSubmit}
            className="flex w-full items-center p-2"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow p-2 border rounded bg-gray-700 text-white mr-2"
              placeholder="Write a comment here..."
            />
            <button
              type="submit"
              className="px-1 py-1 bg-red-600 text-white text-mmd rounded font-cursive hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex my-2 justify-center bg-red-700 p-2 rounded-lg shadow-lg w-full max-w-3xl mx-auto text-white overflow-hidden">
          <p className="text-center">
            You need to login to comment and for many other features. ⚠️
          </p>
        </div>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-gray-900 p-4 rounded-lg mb-4 border border-yellow-500"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white">{comment.content}</p>
            <p className="text-sm text-yellow-500 mt-auto">
              {comment.userId ? comment.userId.name : "Unknown User"}
            </p>
          </div>
          <div className="flex items-center mb-2">
            {userId ? (
              <Tooltip
                title={async () => await fetchLikedUsers(comment._id)}
                className={`mr-2 ${
                  likedComments.has(comment._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                } hover:text-blue-600`}
              >
                <button
                  onClick={() => handleLike(comment._id, comment.userId._id)}
                  className={`mr-2 ${
                    likedComments.has(comment._id)
                      ? "text-blue-500"
                      : "text-gray-400"
                  } hover:text-blue-600`}
                >
                  👍 {comment.reaction ? comment.reaction.like : 0}
                </button>
              </Tooltip>
            ) : (
              <button
                className={`mr-2 text-gray-400 cursor-not-allowed`}
                disabled
              >
                👍 {comment.reaction ? comment.reaction.like : 0}
              </button>
            )}
          </div>
          <div className="flex items-center mt-2">
            {userId ? (
              <>
                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="text-yellow-500 hover:text-white hover:scale-90 text-sm p-1 rounded-md bg-slate-600 hover:bg-yellow-500"
                >
                  Reply
                </button>
                <button
                  onClick={() => toggleRepliesVisibility(comment._id)}
                  className={`ml-4 text-sm hover:text-white hover:scale-95 p-1 rounded-md bg-slate-600 hover:bg-yellow-500 ${
                    comment.replies && comment.replies.length > 0
                      ? "text-blue-400"
                      : "text-gray-400"
                  }`}
                >
                  {visibleReplies[comment._id]
                    ? "Hide Replies"
                    : "Show Replies"}
                </button>
              </>
            ) : (
              <button
                className="text-gray-400 cursor-not-allowed text-sm p-1 rounded-md bg-slate-600"
                disabled
              >
                Reply
              </button>
            )}
          </div>
          {visibleReplies[comment._id] &&
            comment.replies &&
            comment.replies.map((reply) => (
              <div
                key={reply._id}
                className="ml-8 mt-2 bg-gray-700 p-3 rounded-md border border-gray-600"
              >
                <p className="text-white mb-1">{reply.content}</p>
                <p className="text-sm text-yellow-400 text-right mt-auto">
                  By:{" "}
                  {reply.userId && reply.userId.name
                    ? reply.userId.name
                    : "Unknown User"}
                </p>
              </div>
            ))}
          {replyingTo === comment._id && (
            <div className="mt-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-2 border rounded bg-gray-600 text-white"
                placeholder="Write a reply..."
              />
              <div className="mt-2 flex">
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                  Submit Reply
                </button>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
