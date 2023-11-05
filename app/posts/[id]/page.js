'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  const path = usePathname();
  const post_id = path.slice(path.lastIndexOf('/') + 1);
  const base_url = "http://localhost:3000/api/posts";
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/${post_id}`);
        const data = await response.json();
        console.log("data is ", data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [post_id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      )}
    </main>
  )
}
