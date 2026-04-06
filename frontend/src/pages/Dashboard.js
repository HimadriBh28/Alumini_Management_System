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
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, isAlumni, isStudent } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalEvents: 0,
    totalAlumni: 0,
    myJobsPosted: 0,
    myRegistrations: 0,
    myEventsCreated: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
      // Filter real data
      const upcomingEventsList = events.filter(e => new Date(e.startDate) > new Date());
      
      setRecentJobs(jobs.slice(0, 3));
      setUpcomingEvents(upcomingEventsList.slice(0, 3));
      
      // User-specific stats
      if (isAlumni) {
        const myJobsList = jobs.filter(job => job.postedBy?._id === user?.id);
        setMyJobs(myJobsList.slice(0, 3));
        setStats({
          totalJobs: jobs.length,
          totalEvents: events.length,
          totalAlumni: alumni.length,
          myJobsPosted: myJobsList.length,
          myRegistrations: 0,
          myEventsCreated: 0
        });
      } else if (isStudent) {
        const myEventsList = events.filter(event => event.createdBy?._id === user?.id);
        setMyEvents(myEventsList.slice(0, 3));
        
        // Get user's event registrations
        let userRegistrations = 0;
        events.forEach(event => {
          if (event.registrations?.some(reg => reg.user?._id === user?.id)) {
            userRegistrations++;
          }
        });
        
        setStats({
          totalJobs: jobs.length,
          totalEvents: events.length,
          totalAlumni: alumni.length,
          myJobsPosted: 0,
          myRegistrations: userRegistrations,
          myEventsCreated: myEventsList.length
        });
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">
              {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              {isAlumni 
                ? `You've posted ${stats.myJobsPosted} job${stats.myJobsPosted !== 1 ? 's' : ''} and connected with ${stats.totalAlumni} alumni`
                : `You've created ${stats.myEventsCreated} event${stats.myEventsCreated !== 1 ? 's' : ''} and registered for ${stats.myRegistrations} event${stats.myRegistrations !== 1 ? 's' : ''}`}
            </p>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 rounded-full">
              <AcademicCapIcon className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium capitalize">{user?.role}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BriefcaseIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalJobs}</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400">Total Jobs</h3>
            <Link to="/jobs" className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
              View all <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalEvents}</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400">Total Events</h3>
            <Link to="/events" className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center">
              View all <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <UserGroupIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalAlumni}</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400">Alumni Network</h3>
            <Link to="/alumni" className="mt-2 text-sm text-green-600 dark:text-green-400 hover:underline inline-flex items-center">
              Connect <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">
                {isAlumni ? stats.myJobsPosted : stats.myRegistrations}
              </span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400">
              {isAlumni ? 'Jobs Posted' : 'Events Registered'}
            </h3>
            {isAlumni && stats.myJobsPosted === 0 && (
              <Link to="/post-job" className="mt-2 text-sm text-blue-600 hover:underline inline-flex items-center">
                Post your first job →
              </Link>
            )}
            {isStudent && stats.myRegistrations === 0 && (
              <Link to="/events" className="mt-2 text-sm text-blue-600 hover:underline inline-flex items-center">
                Register for events →
              </Link>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Recent Jobs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Job Opportunities</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <Link key={job._id} to={`/jobs/${job._id}`} className="block p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <BuildingOfficeIcon className="h-4 w-4" />
                          <span>{job.company}</span>
                          <MapPinIcon className="h-4 w-4 ml-2" />
                          <span>{job.location || 'Remote'}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full capitalize">
                        {job.jobType}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400">No jobs posted yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Alumni/Student Specific */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isAlumni ? 'Your Posted Jobs' : 'Your Created Events'}
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {isAlumni ? (
                myJobs.length > 0 ? (
                  myJobs.map((job) => (
                    <div key={job._id} className="p-5">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No jobs posted yet</p>
                    <Link to="/post-job" className="text-blue-600 hover:underline">Post your first job →</Link>
                  </div>
                )
              ) : (
                myEvents.length > 0 ? (
                  myEvents.map((event) => (
                    <div key={event._id} className="p-5">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        <UserGroupIcon className="h-4 w-4 ml-2" />
                        <span>{event.registrations?.length || 0} registered</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No events created yet</p>
                    <Link to="/events" className="text-blue-600 hover:underline">Create your first event →</Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="p-5">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{event.location || 'Virtual'}</span>
                  </div>
                  <Link to="/events" className="mt-3 inline-block text-blue-600 text-sm hover:underline">View Details →</Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
