'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";

const BASE_POST_URL = "/api/posts";

async function submitPost(title, description) {
    console.log("reached function call");
    const response = await fetch(`${BASE_POST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        user_id: cookieCutter.get("userID")
      }),
    });
    const data = await response.json();
    return data;
}

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const newPost = await submitPost(title, description);
      console.log("New post created:", newPost);
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post: ', error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleCreatePost} className="max-w-md w-full bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  )
}
