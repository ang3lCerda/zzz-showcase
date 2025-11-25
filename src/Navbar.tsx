import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#100233] text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
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
            <Link to="/w-engines" className="hover:text-blue-400 transition-colors">
              W-Engines
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
