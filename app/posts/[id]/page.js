'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const BASE_POST_URL = "http://localhost:3000/api/posts";
const BASE_COMMENT_URL = "http://localhost:3000/api/comments";
const BASE_USER_URL = "http://localhost:3000/api/users";

function getUser(userId) {
  //to get username
  return fetch(`http://localhost:3000/api/users/${userId}`)
    .then(response => response.json())
    .then(data => data.username)
    .catch(error => {
      console.error('Error fetching user: ', error);
      return null;
  });
}

export default function Home() {
  const path = usePathname();
  const postId = path.slice(path.lastIndexOf('/') + 1);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetch(`${BASE_POST_URL}/${postId}`);
        const postData = await postResponse.json();
        const postUser = await getUser(postData.user_id);
        setPost({ ...postData, user: postUser });
        
        const commentResponse = await fetch(`${BASE_COMMENT_URL}/${postId}`);
        const commentData = await commentResponse.json();
        console.log("comment data is ", commentData);
        setComments(commentData);

        const userPromises = commentData.map(comment => getUser(comment.user_id));
        const users = await Promise.all(userPromises);

        // Update comments with user names
        setComments(commentData.map((comment, index) => ({ ...comment, user: users[index] })));
      } catch (error) {
        console.error('Error fetching information: ', error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <>
    <div  className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="post">
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Posted by: {post.user}</p>
          </div>
        )}
      </div>
      <h1>Comment Section</h1>
      <div id="comments" className="">
        {comments && comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.description}</p>
            <p>Posted by: {comment.user}</p>
          </div>
        ))}
      </div>
    </div>
    </> 
  )
}
