import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { 
  MagnifyingGlassIcon, 
  EnvelopeIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await API.get('/users?role=alumni');
      setAlumni(response.data.users || []);
    } catch (error) {
      toast.error('Failed to load alumni directory');
    } finally {
      setLoading(false);
    }
  };

  const branches = ['all', ...new Set(alumni.map(a => a.profile?.branch).filter(Boolean))];
  const years = ['all', ...new Set(alumni.map(a => a.profile?.graduationYear).filter(Boolean))];

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alumnus.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alumnus.profile?.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || alumnus.profile?.branch === selectedBranch;
    const matchesYear = selectedYear === 'all' || alumnus.profile?.graduationYear === selectedYear;
    return matchesSearch && matchesBranch && matchesYear;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Alumni Directory</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with {alumni.length}+ registered alumni from your institution</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>
                  {branch === 'all' ? 'All Branches' : branch}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : `Class of ${year}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 dark:text-gray-400 mb-4">Found {filteredAlumni.length} alumni</p>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumnus, index) => (
            <motion.div
              key={alumnus._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/profile/${alumnus._id}`} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24"></div>
                  <div className="px-6 pb-6 relative">
                    <div className="flex justify-center -mt-12 mb-4">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white dark:border-gray-800">
                        {alumnus.name?.charAt(0) || 'A'}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
                      {alumnus.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                      {alumnus.profile?.designation || 'Alumni Member'}
                    </p>
                    
                    <div className="space-y-2">
                      {alumnus.profile?.company && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                          <BriefcaseIcon className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{alumnus.profile.company}</span>
                        </div>
                      )}
                      {alumnus.profile?.branch && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                          <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{alumnus.profile.branch}</span>
                        </div>
                      )}
                      {alumnus.profile?.graduationYear && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2 text-blue-600" />
                          <span>Class of {alumnus.profile.graduationYear}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          <span className="truncate">{alumnus.email}</span>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          {alumnus.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No alumni found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
