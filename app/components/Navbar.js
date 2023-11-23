import Link from 'next/link';
import cookieCutter from "cookie-cutter";
import { useRouter } from 'next/navigation';

const BASE_USER_URL = "/api/users";

const Navbar = () => {
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

  async function getCookie() {
    console.log(cookieCutter.get("userID"));
    return (cookieCutter.get("userID"));
  }

  return (
    <nav className="bg-orange-300 p-4 text-amber-950">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-lg font-bold" href='/posts'>Home</a>
        <a className="ml-4" href={`/profile/${getCookie}`}>Profile</a>
        <button
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;