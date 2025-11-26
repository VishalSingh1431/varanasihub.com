import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuthStatus();

    // Listen for storage changes (when login/logout happens from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    // Listen for custom auth event (for same-tab updates)
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    // Dispatch event to update navbar in other components
    window.dispatchEvent(new Event('authChange'));
  };

  const categories = [
    'Shops',
    'Clinics',
    'Libraries',
    'Hotels',
    'Restaurants',
    'Services'
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleMobileCategories = () => {
    setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 tracking-tight">
              VaranasiHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2 flex-1 justify-center">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/businesses"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Businesses
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              About
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCategories}
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-1"
              >
                Categories
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCategoriesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCategoriesOpen && (
                <div
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/10 py-2 z-50"
                >
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`#${category.toLowerCase()}`}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-lg mx-2"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Side - Auth Buttons / User Menu */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name || user?.email || 'User'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                >
                  Logout
                </button>
                <Link
                  to="/create-website"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl"
                >
                  Create Website
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Sign Up
                </Link>
                <Link
                  to="/create-website"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl"
                >
                  Create Website
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-black hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black py-4">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/businesses"
                className="px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Businesses
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Categories Dropdown */}
              <div>
                <button
                  onClick={toggleMobileCategories}
                  className="w-full px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 flex items-center justify-between"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isMobileCategoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mobile Dropdown Items */}
                {isMobileCategoriesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {categories.map((category) => (
                      <a
                        key={category}
                        href={`#${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileCategoriesOpen(false);
                        }}
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/pricing"
                className="px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Buttons */}
              {isLoggedIn ? (
                <>
                  <div className="pt-2 border-t-2 border-black mt-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">{user?.name || user?.email || 'User'}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full mt-2 px-4 py-2 text-sm font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/create-website"
                      className="block w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Website
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="pt-2 border-t-2 border-black mt-2 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-xl transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/create-website"
                      className="block w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Website
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
