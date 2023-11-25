'use client';
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import cookieCutter from 'cookie-cutter';


const BASE_POST_URL = "/api/posts";
const BASE_USER_URL = "/api/users";

function getRole() {
  return cookieCutter.get('role');
}

export default function Profile(props) {
  const path = usePathname();
  const userId = path.slice(path.lastIndexOf('/') + 1);
  const router = useRouter();
  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState();

  const handleClick = () => {
    router.push('/posts/new');
  }

  const handleDeleteUser = async () => {
    if (userId !== 1) {   
      try {
        // Assuming you have an API endpoint to handle user deletion
        const response = await fetch(`/api/users`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId })
        });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      console.error("cannot delete admin user");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${BASE_USER_URL}/${userId}`);
        const userData = await userResponse.json();
        setUser(userData.username);
      } catch (error) {
        setUser(null);
      }
      try {
        const postResponse = await fetch(`${BASE_POST_URL}/user/${userId}`);
        const postData = await postResponse.json();
        setUserPosts(postData);
      } catch (error) {
        console.error('Error fetching information: ', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <Layout>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
        <main className="flex min-h-screen flex-col items-center">
          {user && typeof user !== 'undefined' ? (
            <>
              <div className="relative flex place-items-center" style={{height : '35vh'}}>
                <p style={{fontSize : '4rem'}}> {user} </p>
              </div>
              <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div id="posts">
                    {userPosts && userPosts.length > 0 && userPosts.map(post => (
                      <div key={post.id} className="mb-5">
                        <a href={`/posts/${post.id}`} target="_blank">
                          <p>{post.title}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {getRole() === 'admin' && userId != 1 && (
                <button
                  className="right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </button>
              )}
              <button
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClick}
              >
                New Post
              </button>
            </>
          ) : (
            <div>User not found</div>
          )}
        </main>
      </Layout>
    </>
  )
}