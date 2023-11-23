'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const BASE_POST_URL = "/api/posts";
const BASE_COMMENT_URL = "/api/comments";
const BASE_USER_URL = "/api/users";

function getUser(userId) {
  return fetch(`${BASE_USER_URL}/${userId}`)
    .then(response => response.json())
    .then(data => data.username)
    .catch(error => {
      console.error('Error fetching user: ', error);
      return null;
    });
}

async function createComment(description, userId, postId) {
  const response = await fetch(`${BASE_COMMENT_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      user_id: userId,
      post_id: postId
    }),
  });
  const data = await response.json();
  return data;
}

export default function Home() {
  const path = usePathname();
  const postId = path.slice(path.lastIndexOf('/') + 1);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentDesc, setNewCommentDesc] = useState('');
  const [newCommentUserId, setNewCommentUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch post data
        const postResponse = await fetch(`${BASE_POST_URL}/${postId}`);
        const postData = await postResponse.json();
        const postUser = await getUser(postData.user_id);
        setPost({ ...postData, user: postUser });
        
        // Fetch comment data
        const commentResponse = await fetch(`${BASE_COMMENT_URL}/${postId}`);
        const commentData = await commentResponse.json();
        const commentUsers = await Promise.all(commentData.map(comment => getUser(comment.user_id)));
        setComments(commentData.map((comment, index) => ({ ...comment, user: commentUsers[index] })));
      } catch (error) {
        console.error('Error fetching information: ', error);
      }
    };

    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newCommentDesc && newCommentUserId) {
      try {
        const newComment = await createComment(newCommentDesc, newCommentUserId, postId);
        setComments([...comments, { ...newComment, user: await getUser(newComment.user_id) }]);
        setNewCommentDesc('');
        setNewCommentUserId('');
      } catch (error) {
        console.error('Error creating comment: ', error);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="post" className="bg-gray-200 p-4 rounded-md mb-8 w-9/12">
        {post && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.description}</p>
            <p>Posted by: {post.user}</p>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Comment Section</h1>
      <div id="comments" className="w-7/12">
        {comments && comments.map(comment => (
          <div key={comment.id} className="border border-gray-300 rounded-md p-4 mb-1">
            <p>{comment.description}</p>
            <p>Posted by: {comment.user}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="bg-gray-200 p-4 rounded-md mt-8">
        <input 
          type="text" 
          placeholder="Description" 
          value={newCommentDesc} 
          onChange={(e) => setNewCommentDesc(e.target.value)}
          className="mb-2 p-2 rounded-md border border-gray-300"
        />
        <input 
          type="text" 
          placeholder="User ID" 
          value={newCommentUserId} 
          onChange={(e) => setNewCommentUserId(e.target.value)}
          className="mb-2 p-2 rounded-md border border-gray-300"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Comment</button>
      </form>
    </div>
  )
}
