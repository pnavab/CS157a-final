'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_POST_URL = "/api/posts";
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

export default function Home() {
  const [allPosts, setAllPosts] = useState();
  const router = useRouter();

  const handleClick = () => {
    router.push('/posts/new');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_POST_URL);
        const data = await response.json();
        const postUsers = await Promise.all(data.map(post => getUser(post.user_id)));
        setAllPosts(data.map((post, index) => ({ ...post, user: postUsers[index] })));

      } catch (error) {
        console.error('Error fetching information: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-8">
        <h1 className="text-6xl font-bold mb-8">All Posts</h1>
        {allPosts && allPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 shadow-md rounded-md mb-5 w-96">
            <a href={`/posts/${post.id}`} className="text-blue-500 font-bold text-lg mb-2 hover:underline">
              {post.title}
            </a>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <p className="text-gray-500">Posted by: {post.user}</p>
          </div>
        ))}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClick}
        >
          New Post
        </button>
      </div>
    </>
  )
}
