'use client';
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { getUserId } from "./serverAction";
import Link from "next/link";

const BASE_USER_URL = "/api/users";

export default function Navbar() {
  const [id, setId] = useState("");
  useEffect(() => {
    async function get() {
      const data = await getUserId();
      setId(data);
    }
    get();
  }, []);
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({logout: true})
    })
    router.push('/login');
  };
  return (
    <nav className="bg-orange-300 p-4 text-amber-950">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-lg font-bold" href='/posts'>Home</Link>
        { id !== "" ? ( 
          <Link className="ml-4" href={`/profile/${id}`}>Profile</Link>
          ) : (
          <Link className="ml-4" href={`/profile/1}`}>Profile</Link>
        )} 
        <button
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >Logout</button>
      </div>
    </nav>
  );
};