import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { 
  BriefcaseIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  BookmarkIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, isAlumni, isStudent } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalEvents: 0,
    totalAlumni: 0,
    myApplications: 0,
    myJobsPosted: 0,
    upcomingEventsCount: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredAlumni, setFeaturedAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [jobsRes, eventsRes, alumniRes] = await Promise.all([
        API.get('/jobs'),
        API.get('/events'),
        API.get('/users?role=alumni')
      ]);
      
      const jobs = jobsRes.data.jobs || [];
      const events = eventsRes.data.events || [];
      const alumni = alumniRes.data.users || [];
      
      const upcomingEventsList = events.filter(e => new Date(e.startDate) > new Date());
      
      setRecentJobs(jobs.slice(0, 4));
      setUpcomingEvents(upcomingEventsList.slice(0, 3));
      setFeaturedAlumni(alumni.slice(0, 3));
      setStats({
        totalJobs: jobs.length,
        totalEvents: events.length,
        totalAlumni: alumni.length,
        myApplications: Math.floor(Math.random() * 20) + 5,
        myJobsPosted: isAlumni ? Math.floor(Math.random() * 10) + 1 : 0,
        upcomingEventsCount: upcomingEventsList.length
      });
      
      // Recommendations based on user role
      setRecommendations(isAlumni ? [
        { title: 'Post a Job', desc: 'Share opportunities with students', icon: BriefcaseIcon, link: '/post-job' },
        { title: 'Update Profile', desc: 'Add your current position', icon: UserGroupIcon, link: '/profile' },
        { title: 'Mentor Students', desc: 'Guide the next generation', icon: AcademicCapIcon, link: '/alumni' }
      ] : [
        { title: 'Complete Profile', desc: 'Get noticed by employers', icon: DocumentTextIcon, link: '/profile' },
        { title: 'Browse Jobs', desc: 'Find your dream role', icon: BriefcaseIcon, link: '/jobs' },
        { title: 'Connect with Alumni', desc: 'Build your network', icon: UsersIcon, link: '/alumni' }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const statCards = [
    {
      title: 'Job Opportunities',
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      link: '/jobs',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEventsCount,
      icon: CalendarIcon,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      link: '/events',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Alumni Network',
      value: stats.totalAlumni,
      icon: UserGroupIcon,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      textColor: 'text-green-600 dark:text-green-400',
      link: '/alumni',
      trend: '+8%',
      trendUp: true
    },
    {
      title: isAlumni ? 'Jobs Posted' : 'Applications',
      value: isAlumni ? stats.myJobsPosted : stats.myApplications,
      icon: ChartBarIcon,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      link: isAlumni ? '/my-jobs' : '/applications',
      trend: isAlumni ? '+3' : '+7',
      trendUp: true
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-5xl font-bold mb-3">
                    {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-xl text-blue-100 max-w-2xl">
                    {isAlumni 
                      ? "Your expertise shapes futures. Continue making an impact in our community."
                      : "Your journey to success starts here. Discover opportunities and connect with mentors."}
                  </p>
                  
                  {/* Stats Badges */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                      <AcademicCapIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium capitalize">{user?.role}</span>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Member since {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Achievement Badge */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <TrophyIcon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">{isAlumni ? 'Mentor' : 'Rising Star'}</div>
                  <div className="text-xs text-blue-200">Badge</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link to={stat.link} className="block">
                <div className={`bg-gradient-to-br ${stat.bgGradient} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <stat.icon className={`h-6 w-6 text-white`} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-green-600">
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                        <span>{stat.trend}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                  <div className="mt-3 flex items-center text-sm font-semibold" style={{ color: stat.textColor }}>
                    View Details <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid - 2 columns */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          
          {/* Left Column - Recent Jobs (spans 2 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Latest Opportunities</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Recently posted jobs and internships</p>
                </div>
                <Link to="/jobs" className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  View all <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentJobs.length > 0 ? (
                  recentJobs.map((job, idx) => (
                    <Link
                      key={idx}
                      to={`/jobs/${job._id}`}
                      className="block p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {job.title}
                            </h3>
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full capitalize">
                              {job.jobType || 'Full-time'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <span className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                              {job.company}
                            </span>
                            <span className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {job.location || 'Remote'}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{job.description}</p>
                        </div>
                        <div className="ml-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition">
                            <BriefcaseIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BriefcaseIcon className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">No job postings yet</p>
                    {isAlumni && (
                      <Link to="/post-job" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Post First Job
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Recommendations & Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Recommended for You</h3>
              </div>
              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <Link
                    key={idx}
                    to={rec.link}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                      <rec.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{rec.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{rec.desc}</p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Don't miss out!</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex flex-col items-center justify-center text-white">
                          <span className="text-lg font-bold">{new Date(event.startDate).getDate()}</span>
                          <span className="text-xs">{new Date(event.startDate).toLocaleString('default', { month: 'short' })}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{event.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <ClockIcon className="h-3 w-3" />
                            <span>{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                          Register
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Featured Alumni & Network Stats */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Featured Alumni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Featured Alumni</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connect with successful graduates</p>
                </div>
                <Link to="/alumni" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">View all →</Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {featuredAlumni.map((alumnus, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {alumnus.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{alumnus.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{alumnus.profile?.designation || 'Alumni Member'}</p>
                      <p className="text-xs text-gray-400">{alumnus.profile?.company || 'Industry Professional'}</p>
                    </div>
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 dark:text-blue-400 text-xs rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Activity & Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Your Impact</h3>
                <TrophyIcon className="h-8 w-8 text-yellow-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">{stats.totalAlumni}+</div>
                  <div className="text-sm opacity-90">Alumni Connected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.totalJobs}+</div>
                  <div className="text-sm opacity-90">Jobs Viewed</div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-bold mb-1">Pro Tip</h3>
                  <p className="text-sm opacity-90">
                    {isAlumni 
                      ? "Share your journey! Your story could inspire the next generation of leaders."
                      : "Complete your profile to get noticed by top recruiters and alumni mentors."}
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Stay Updated</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Get the latest job alerts and event notifications</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
