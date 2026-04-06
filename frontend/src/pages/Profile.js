import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { 
  EnvelopeIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  MapPinIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  LinkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const userId = id || currentUser?.id;
  const isOwnProfile = !id || id === currentUser?.id;

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/users/${userId}`);
      setProfile(response.data.user);
      setFormData(response.data.user.profile || {});
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put('/users/profile', formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 pt-20">
        <UserCircleIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500">User not found</p>
        <p className="text-sm text-gray-400 mt-2">The profile you're looking for doesn't exist</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white dark:border-gray-800 mb-4 md:mb-0 md:mr-6">
                {profile.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.role === 'alumni' ? '🎓 Alumni Member' : '📚 Student Member'}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  <span>{profile.email}</span>
                </div>
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Info</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <UserCircleIcon className="h-5 w-5 text-blue-600 mr-3" />
                  <span>{profile.role === 'alumni' ? 'Alumni' : 'Student'}</span>
                </div>
                {profile.profile?.branch && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{profile.profile.branch}</span>
                  </div>
                )}
                {profile.profile?.graduationYear && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CalendarIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Class of {profile.profile.graduationYear}</span>
                  </div>
                )}
                {profile.profile?.location && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPinIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{profile.profile.location}</span>
                  </div>
                )}
                {profile.profile?.phoneNumber && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <PhoneIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{profile.profile.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Professional Info */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Professional Information</h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Current Company"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    value={formData.designation || ''}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <textarea
                    placeholder="Bio"
                    rows="4"
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.profile?.company && (
                    <div className="flex items-start">
                      <BuildingOfficeIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Current Company</p>
                        <p className="text-gray-600 dark:text-gray-400">{profile.profile.company}</p>
                      </div>
                    </div>
                  )}
                  {profile.profile?.designation && (
                    <div className="flex items-start">
                      <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Designation</p>
                        <p className="text-gray-600 dark:text-gray-400">{profile.profile.designation}</p>
                      </div>
                    </div>
                  )}
                  {profile.profile?.bio && (
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-1">About</p>
                      <p className="text-gray-600 dark:text-gray-400">{profile.profile.bio}</p>
                    </div>
                  )}
                  {profile.profile?.linkedinUrl && (
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-blue-600 mr-3" />
                      <a href={profile.profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {!profile.profile?.company && !profile.profile?.bio && (
                    <p className="text-gray-500 text-center py-4">No professional information added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
