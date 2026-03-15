import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  BriefcaseIcon, 
  CalendarIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      name: 'Alumni Directory',
      description: 'Connect with alumni from various batches and branches worldwide',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-blue-600',
      stats: '2,500+ Alumni'
    },
    {
      name: 'Job Opportunities',
      description: 'Explore job and internship postings shared by experienced alumni',
      icon: BriefcaseIcon,
      color: 'from-green-500 to-green-600',
      stats: '850+ Jobs'
    },
    {
      name: 'Events & Networking',
      description: 'Participate in alumni meets, webinars, and networking sessions',
      icon: CalendarIcon,
      color: 'from-purple-500 to-purple-600',
      stats: '120+ Events'
    },
    {
      name: 'Mentorship',
      description: 'Get guidance from experienced alumni in your field of interest',
      icon: AcademicCapIcon,
      color: 'from-orange-500 to-orange-600',
      stats: '500+ Mentors'
    }
  ];

  const stats = [
    { label: 'Active Alumni', value: '2,500+', icon: UserGroupIcon },
    { label: 'Job Postings', value: '850+', icon: BriefcaseIcon },
    { label: 'Events Hosted', value: '120+', icon: CalendarIcon },
    { label: 'Countries', value: '25+', icon: GlobeAltIcon }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.1
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Alumni Management
              <span className="block text-yellow-300">System</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
              Connect, Engage, and Grow with Your Institutional Network
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-yellow-400 text-indigo-900 hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
                  >
                    Get Started
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border-2 border-white/30"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-yellow-400 text-indigo-900 hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
                >
                  Go to Dashboard
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Platform Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to stay connected with your alumni network
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="p-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {feature.stats} →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Your Alumni Network?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with thousands of alumni, discover opportunities, and grow your career
            </p>
            {!isAuthenticated ? (
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-yellow-400 text-indigo-900 hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
              >
                Create Your Account
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/alumni"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-yellow-400 text-indigo-900 hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
              >
                Browse Alumni Directory
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
