import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#355070' }} className="w-full z-50 text-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.jpeg"
              alt="SpectrumCare"
              className="h-14 w-auto rounded-xl bg-white px-2 py-1"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="hover:text-[#88BDDE] transition-colors">About Us</a>
            <a href="#features" className="hover:text-[#88BDDE] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#88BDDE] transition-colors">How It Works</a>
            <a href="#games" className="hover:text-[#88BDDE] transition-colors">Learning</a>
            <a href="#community" className="hover:text-[#88BDDE] transition-colors">Community</a>
            <a href="#contact" className="hover:text-[#88BDDE] transition-colors">Contact</a>
          </div>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button
                className="hidden sm:inline-flex items-center h-10 px-6 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#88BDDE', color: '#fff' }}
              >
                Sign In
              </button>
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <HiOutlineBars3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 flex flex-col gap-3 text-sm font-medium border-t border-white/20 pt-4">
            <a href="#about" className="hover:text-[#88BDDE] transition-colors py-1">About Us</a>
            <a href="#features" className="hover:text-[#88BDDE] transition-colors py-1">Features</a>
            <a href="#how-it-works" className="hover:text-[#88BDDE] transition-colors py-1">How It Works</a>
            <a href="#games" className="hover:text-[#88BDDE] transition-colors py-1">Learning</a>
            <a href="#community" className="hover:text-[#88BDDE] transition-colors py-1">Community</a>
            <a href="#contact" className="hover:text-[#88BDDE] transition-colors py-1">Contact</a>
            <Link to="/login" className="mt-2">
              <button className="w-full h-10 rounded-full font-semibold text-sm" style={{ backgroundColor: '#88BDDE', color: '#fff' }}>
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
