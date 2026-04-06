import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  PlusIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Events = () => {
  const { user, isStudent, isAlumni } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'workshop',
    startDate: '',
    endDate: '',
    location: '',
    isVirtual: false,
    meetingLink: '',
    maxAttendees: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/events');
      setEvents(response.data.events || []);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await API.post(`/events/${eventId}/register`);
      toast.success('Successfully registered for event!');
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    }
  };

  const handleCancelRegistration = async (eventId) => {
    try {
      await API.delete(`/events/${eventId}/cancel`);
      toast.success('Registration cancelled');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to cancel registration');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', formData);
      toast.success('Event created successfully!');
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        eventType: 'workshop',
        startDate: '',
        endDate: '',
        location: '',
        isVirtual: false,
        meetingLink: '',
        maxAttendees: '',
        imageUrl: ''
      });
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const isRegistered = (event) => {
    return event.registrations?.some(reg => reg.user?._id === user?.id);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      seminar: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      networking: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      webinar: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      meetup: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      conference: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const filteredEvents = events.filter(event => {
    if (selectedType === 'all') return true;
    return event.eventType === selectedType;
  });

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: CalendarIcon },
    { value: 'workshop', label: 'Workshops', icon: BuildingOfficeIcon },
    { value: 'seminar', label: 'Seminars', icon: UserGroupIcon },
    { value: 'networking', label: 'Networking', icon: UserGroupIcon },
    { value: 'webinar', label: 'Webinars', icon: VideoCameraIcon },
    { value: 'meetup', label: 'Meetups', icon: MapPinIcon },
    { value: 'conference', label: 'Conferences', icon: CalendarIcon }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 pt-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Events & Networking</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isStudent ? 'Create events and connect with alumni' : 'Discover and join exciting events hosted by students'}
            </p>
          </div>
          {isStudent && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="h-5 w-5" />
              Create Event
            </button>
          )}
        </div>

        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {eventTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <type.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Event Image / Header */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CalendarIcon className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{event.title}</h3>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{new Date(event.startDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      {event.isVirtual ? (
                        <>
                          <VideoCameraIcon className="h-4 w-4 mr-2" />
                          <span>Virtual Event</span>
                        </>
                      ) : (
                        <>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <UserGroupIcon className="h-4 w-4 mr-2" />
                      <span>{event.registrations?.length || 0} / {event.maxAttendees || 'Unlimited'} attendees</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                      <span>Hosted by {event.createdBy?.name || 'Student'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {isAlumni && (
                      isRegistered(event) ? (
                        <button
                          onClick={() => handleCancelRegistration(event._id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Cancel Registration
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegister(event._id)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Register Now
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <CalendarIcon className="h-20 w-20 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No events found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {isStudent ? 'Create your first event to connect with alumni!' : 'Check back later for upcoming events'}
            </p>
            {isStudent && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Event
              </button>
            )}
          </div>
        )}

        {/* Create Event Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Event</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Annual Alumni Meet 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Type *</label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="networking">Networking</option>
                      <option value="webinar">Webinar</option>
                      <option value="meetup">Meetup</option>
                      <option value="conference">Conference</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date & Time</label>
                      <input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <input
                        type="checkbox"
                        checked={formData.isVirtual}
                        onChange={(e) => setFormData({ ...formData, isVirtual: e.target.checked })}
                        className="mr-2"
                      />
                      Virtual Event
                    </label>
                  </div>

                  {formData.isVirtual ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Link</label>
                      <input
                        type="url"
                        value={formData.meetingLink}
                        onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://zoom.us/..."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                      <input
                        type="text"
                        required={!formData.isVirtual}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Venue address"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Describe what this event is about, agenda, speakers, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximum Attendees (Optional)</label>
                    <input
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Create Event
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="p-2 bg-black/20 rounded-full hover:bg-black/30 transition"
                    >
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.eventType)}`}>
                      {selectedEvent.eventType}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedEvent.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedEvent.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <CalendarIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>{new Date(selectedEvent.startDate).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      {selectedEvent.isVirtual ? (
                        <>
                          <VideoCameraIcon className="h-5 w-5 mr-3 text-blue-600" />
                          <span>Virtual Event {selectedEvent.meetingLink && `- ${selectedEvent.meetingLink}`}</span>
                        </>
                      ) : (
                        <>
                          <MapPinIcon className="h-5 w-5 mr-3 text-blue-600" />
                          <span>{selectedEvent.location}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <UserGroupIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>{selectedEvent.registrations?.length || 0} attendees registered</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <BuildingOfficeIcon className="h-5 w-5 mr-3 text-blue-600" />
                      <span>Hosted by {selectedEvent.createdBy?.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isAlumni && (
                      isRegistered(selectedEvent) ? (
                        <button
                          onClick={() => {
                            handleCancelRegistration(selectedEvent._id);
                            setSelectedEvent(null);
                          }}
                          className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
                        >
                          Cancel Registration
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleRegister(selectedEvent._id);
                            setSelectedEvent(null);
                          }}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                          Register for Event
                        </button>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
