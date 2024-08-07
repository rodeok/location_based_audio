import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaMapMarkedAlt, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth'; // Assuming you have this hook

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useAuth(); // Implement this hook to manage authentication state

  const NavLink = ({ href, children }) => {
    const isActive = router.pathname === href;
    return (
      <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium  ${
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`} >
          {children}
      </Link>
    );
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
          
                <FaMapMarkedAlt className="h-8 w-8 text-white" />
      
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/nearby-audios">Nearby Audios</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <>
                  <NavLink href="/profile">
                    <FaUser className="mr-2" />
                    Profile
                  </NavLink>
                  <button
                    onClick={logout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink href="/login">
                  <FaSignInAlt className="mr-2" />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;