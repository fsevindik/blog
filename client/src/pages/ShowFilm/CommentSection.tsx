import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment, CommentSectionProps, User } from "../../types/types";

const API_URL = "https://serverfilmolog.onrender.com";

const CommentSection: React.FC<CommentSectionProps> = ({
  filmId,
  currentUserId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<number>(5);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedUsers, setLikedUsers] = useState<{ [key: string]: string }>({});
  const [visibleReplies, setVisibleReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (filmId) {
      fetchCommentsAndLikedUsers();
    }
  }, [filmId]);

  const fetchCommentsAndLikedUsers = async () => {
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
              comment.reaction.usersLiked.includes(currentUserId ?? "")
          )
          .map((comment) => comment._id)
      );
      setLikedComments(liked);

      const usersMap: { [key: string]: string } = {};
      for (const comment of response.data) {
        const likedUsersString = await fetchLikedUsers(comment._id);
        usersMap[comment._id] = likedUsersString;
      }
      setLikedUsers(usersMap);
    } catch (error) {
      console.error("Error fetching comments and liked users:", error);
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
      fetchCommentsAndLikedUsers();
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
      fetchCommentsAndLikedUsers();
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

      const updatedReaction = response.data.reaction;

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, reaction: updatedReaction }
            : comment
        )
      );

      setLikedComments((prev) => {
        const newSet = new Set(prev);
        if (updatedReaction.usersLiked.includes(currentUserId)) {
          newSet.add(commentId);
        } else {
          newSet.delete(commentId);
        }
        return newSet;
      });

      const likedUsersString = await fetchLikedUsers(commentId);
      setLikedUsers((prev) => ({
        ...prev,
        [commentId]: likedUsersString,
      }));
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
      return response.data.map((user: User) => user.name).join(", ");
    } catch (error) {
      console.error("Error fetching liked users:", error);
      return "";
    }
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 5, comments.length));
  };

  return (
    <div className="my-4 bg-gray-800 p-4 md:p-4 sm:p-3 rounded-lg shadow-lg w-full max-w-3xl  mx-auto">
      <h2 className="text-xl md:text-xl sm:text-lg font-semibold text-white mb-4 sm:mb-2">Comments</h2>
      {userId && userName ? (
        <div className="border border-white flex items-center rounded-lg mb-4 sm:mb-3">
          <form
            onSubmit={handleCommentSubmit}
            className="flex w-full items-center p-2 sm:p-1"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow p-2 sm:p-1 border rounded bg-gray-700 text-white mr-2 md:text-base sm:text-sm text-base"
              placeholder="Write a comment here..."
              rows={3}
              style={{ resize: "none" }}
            />
            <button
              type="submit"
              className="px-3 py-2 md:px-3 md:py-2 sm:px-2 sm:py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors md:text-base sm:text-sm text-base"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex my-2 justify-center bg-red-700 p-2 sm:p-1 rounded-lg shadow-lg w-full max-w-3xl mx-auto text-white overflow-hidden">
          <p className="text-center md:text-base sm:text-sm text-base">
            You need to login to comment and for many other features. ⚠️
          </p>
        </div>
      )}

      {comments.slice(0, visibleComments).map((comment) => (
        <div
          key={comment._id}
          className="bg-gray-900 p-6 md:p-3 sm:p-2 rounded-lg mb-4 sm:mb-3 border border-yellow-500 "
        >
          <div className="flex items-center justify-between mb-2 sm:mb-1 ">
            <p className="text-white md:text-base sm:text-sm text-base">{comment.content}</p>
            <p className="text-sm sm:text-xs text-yellow-500 mt-auto">
              {comment.userId && comment.userId.name
                ? comment.userId.name
                : "Unknown User"}
            </p>
          </div>
          <div className="flex items-center mb-2 sm:mb-1">
            {userId ? (
              <Tooltip
                title={likedUsers[comment._id] || "Loading..."}
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
                  } hover:text-blue-600 md:text-base sm:text-sm text-base`}
                >
                  👍 {comment.reaction ? comment.reaction.like : 0}
                </button>
              </Tooltip>
            ) : (
              <button
                className={`mr-2 text-gray-400 cursor-not-allowed md:text-base sm:text-sm text-base`}
                disabled
              >
                👍 {comment.reaction ? comment.reaction.like : 0}
              </button>
            )}
          </div>
          <div className="flex items-center mt-2 sm:mt-1">
            {userId ? (
              <>
                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="text-yellow-500 hover:text-white hover:bg-yellow-500 md:text-sm sm:text-xs text-sm p-1 md:px-3 sm:px-2 px-3 rounded-md bg-slate-600 transition-all duration-200"
                >
                  Reply
                </button>
                {comment.replies && comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleRepliesVisibility(comment._id)}
                    className="ml-4 sm:ml-2 flex items-center justify-center md:text-sm sm:text-xs text-sm text-blue-400 hover:text-white p-1 rounded-full bg-slate-700 hover:bg-blue-500 transition-all duration-200 md:w-8 md:h-8 sm:w-6 sm:h-6 w-8 h-8"
                    title={visibleReplies[comment._id] ? "Hide Replies" : "Show Replies"}
                  >
                    {visibleReplies[comment._id] ? (
                      <span className="md:text-lg sm:text-sm text-lg">↑</span>
                    ) : (
                      <span className="md:text-lg sm:text-sm text-lg">↓</span>
                    )}
                  </button>
                )}
              </>
            ) : (
              <button
                className="text-gray-400 cursor-not-allowed md:text-sm sm:text-xs text-sm p-1 rounded-md bg-slate-600"
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
                className="ml-8 sm:ml-4 mt-2 sm:mt-1 bg-gray-700 rounded-r-md rounded-bl-md border border-gray-600 p-2 sm:p-1"
              >
                <p className="text-white mb-1 md:text-base sm:text-xs text-base">{reply.content}</p>
                <p className="text-sm sm:text-xs text-yellow-400 text-right">
                  {reply.userId && reply.userId.name
                    ? reply.userId.name
                    : "Unknown User"}
                </p>
              </div>
            ))}
          {replyingTo === comment._id && (
            <div className="mt-2 sm:mt-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-2 sm:p-1 border rounded bg-gray-600 text-white md:text-base sm:text-sm text-base"
                placeholder="Write a reply..."
                rows={2}
                style={{ resize: "none" }}
              />
              <div className="mt-2 sm:mt-1 flex">
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="px-4 py-2 md:px-4 md:py-2 sm:px-2 sm:py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2 transition-colors md:text-base sm:text-xs text-base"
                >
                  Submit
                </button>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 md:px-4 md:py-2 sm:px-2 sm:py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors md:text-base sm:text-xs text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {comments.length > visibleComments && (
        <div className="flex justify-center mt-4 sm:mt-2">
          <button
            onClick={loadMoreComments}
            className="px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center md:text-base sm:text-sm text-base"
          >
            <span className="mr-1">Load More</span>
            <span className="md:text-lg sm:text-sm text-lg">↓</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;