
import Link from 'next/link';

const Header = () => {
  return (
    <header className= "bg-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link href="/">
            <p className="text-gray-800 text-2xl">EnduranceEngine</p>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/signin">
              <p className="text-gray-800 hover:text-gray-600">Sign In</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;