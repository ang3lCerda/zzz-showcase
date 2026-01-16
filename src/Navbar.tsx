import { Link } from "react-router-dom";

export default function Navbar() {
  const user = null;

  return (
    <nav className="bg-[#100233] text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center gap-10">
        <div className="text-xl font-bold tracking-wide">ZZZdb</div>

        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/characters" className="hover:text-blue-400 transition-colors">
              Characters
            </Link>
          </li>
          <li>
            <Link to="/weapons" className="hover:text-blue-400 transition-colors">
              W-Engines
            </Link>
          </li>
          <li>
            <Link to="/disc" className="hover:text-blue-400 transition-colors">
              Drive Discs
            </Link>
          </li>
        </ul>

        {/* Auth section */}
        <div className="ml-auto">
          {user ? (
            <span className="font-semibold text-indigo-300">
             
            </span>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-400 transition-colors font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
