import axios from "axios";
import { useEffect, useState } from "react";
import { Comment, CommentSectionProps } from "../../icons/types";

const API_URL = "http://localhost:3000";

const CommentSection: React.FC<CommentSectionProps> = ({
  filmId,
  currentUserId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

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
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId || !newComment.trim() || !filmId) return;

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
    if (!currentUserId || !replyContent.trim()) return;

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

  const handleLike = async (commentId: string) => {
    if (!currentUserId) return;

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
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="my-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
      <div className="border border-white flex items-center">
        <form
          onSubmit={handleCommentSubmit}
          className="flex w-full items-center p-2"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-2 border rounded bg-gray-700 text-white mr-2"
            placeholder="Write a comment here...   yeah I have wacthed this film its amazing ...  thank you admin its one of my favorites "
          />
          <button
            type="submit"
            className="px-1 py-1 bg-red-600 text-white text-mmd rounded font-cursive hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>

      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-white">{comment.content}</p>
          <p className="text-sm text-gray-400">By: {comment.userId.name}</p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleLike(comment._id)}
              className={`mr-2 ${
                comment.likes && comment.likes.includes(currentUserId)
                  ? "text-blue-500"
                  : "text-gray-400"
              } hover:text-blue-600`}
            >
              👍 {comment.likes ? comment.likes.length : 0}
            </button>
            <button
              onClick={() => setReplyingTo(comment._id)}
              className="text-yellow-500 hover:text-yellow-600 text-sm"
            >
              Reply
            </button>
          </div>
          {comment.replies &&
            comment.replies.map((reply) => (
              <div
                key={reply._id}
                className="ml-8 mt-2 bg-gray-600 p-2 rounded"
              >
                <p className="text-white">{reply.content}</p>
                <p className="text-sm text-gray-400">By: {reply.userId.name}</p>
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
