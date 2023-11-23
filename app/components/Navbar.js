import Link from 'next/link';
import cookieCutter from "cookie-cutter";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Clear all cookies
    cookieCutter.set('userID', '', { expires: new Date(0) });
    console.log(cookieCutter.get('userID'));
    router.push('/login');
  };
  return (
    <nav className="bg-orange-300 p-4 text-amber-950">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-lg font-bold" href='/posts'>Home</a>
        <a className="ml-4" href={`/profile/${cookieCutter.get('userID')}`}>Profile</a>
        <button
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;