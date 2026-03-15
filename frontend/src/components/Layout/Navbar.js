import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CalendarIcon,
  UsersIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAlumni, isStudent } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on authentication and role
  const getNavigation = () => {
    const items = [
      { name: 'Home', href: '/', icon: HomeIcon, public: true }
    ];

    if (isAuthenticated) {
      items.push(
        { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, public: false },
        { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon, public: false },
        { name: 'Events', href: '/events', icon: CalendarIcon, public: false },
        { name: 'Alumni', href: '/alumni', icon: UsersIcon, public: false }
      );
    }

    return items;
  };

  const navigation = getNavigation();

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">AC</span>
              </div>
              <span className={`text-xl font-bold ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-white'
              }`}>
                Alumni<span className="text-blue-400">Connect</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </motion.button>

            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2 ml-2"
              >
                {/* Notifications */}
                <button className={`p-2 rounded-xl relative ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' 
                    : 'text-white hover:bg-white/10'
                }`}>
                  <BellIcon className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* Profile Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/10 transition-all">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=4f46e5&color=fff&bold=true`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-lg"
                    />
                    <span className={`text-sm font-medium hidden lg:block ${
                      isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                    }`}>
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDownIcon className={`w-4 h-4 ${
                      isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                    }`} />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 border border-gray-200 dark:border-gray-700 focus:outline-none">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                          {user?.role === 'alumni' ? '👨‍🎓 Alumni' : '🎓 Student'}
                        </span>
                      </div>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-gray-50 dark:bg-gray-700' : ''
                            } block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 transition-colors`}
                          >
                            <div className="flex items-center space-x-3">
                              <UserCircleIcon className="w-5 h-5" />
                              <span>Your Profile</span>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={`${
                              active ? 'bg-gray-50 dark:bg-gray-700' : ''
                            } block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 transition-colors`}
                          >
                            <div className="flex items-center space-x-3">
                              <HomeIcon className="w-5 h-5" />
                              <span>Dashboard</span>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      
                      {isAlumni && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/create-job"
                              className={`${
                                active ? 'bg-gray-50 dark:bg-gray-700' : ''
                              } block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 transition-colors`}
                            >
                              <div className="flex items-center space-x-3">
                                <BriefcaseIcon className="w-5 h-5" />
                                <span>Post a Job</span>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-red-50 dark:bg-red-900/20' : ''
                              } block w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 transition-colors`}
                            >
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Sign Out</span>
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2 ml-4"
              >
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800' 
                  : 'text-white bg-white/10'
              }`}
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`p-2 rounded-xl ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800' 
                  : 'text-white bg-white/10'
              }`}
            >
              {showMobileMenu ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-2"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-2">
                    <div className="px-4 py-3">
                      <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    
                    {isAlumni && (
                      <Link
                        to="/create-job"
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <BriefcaseIcon className="w-5 h-5" />
                        <span>Post a Job</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
