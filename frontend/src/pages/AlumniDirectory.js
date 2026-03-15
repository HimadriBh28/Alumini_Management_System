import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const AlumniDirectory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState('all');

    const alumni = [
        {
            id: 1,
            name: "Rajesh Kumar",
            batch: "1995",
            branch: "Computer Science",
            company: "Microsoft",
            designation: "Director of Engineering",
            location: "Seattle, USA",
            image: null
        },
        {
            id: 2,
            name: "Priya Singh",
            batch: "2000",
            branch: "Electronics",
            company: "Google",
            designation: "Product Manager",
            location: "Bangalore, India",
            image: null
        },
        {
            id: 3,
            name: "Amit Patel",
            batch: "2005",
            branch: "Mechanical",
            company: "Tesla",
            designation: "Senior Engineer",
            location: "California, USA",
            image: null
        },
        {
            id: 4,
            name: "Neha Gupta",
            batch: "2010",
            branch: "Computer Science",
            company: "Amazon",
            designation: "Software Development Manager",
            location: "Seattle, USA",
            image: null
        },
        {
            id: 5,
            name: "Vikram Sharma",
            batch: "2015",
            branch: "Civil Engineering",
            company: "L&T",
            designation: "Project Lead",
            location: "Mumbai, India",
            image: null
        }
    ];

    const batches = ['all', ...new Set(alumni.map(a => a.batch))];
    const branches = ['all', ...new Set(alumni.map(a => a.branch))];

    const filteredAlumni = alumni.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             a.designation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBatch = selectedBatch === 'all' || a.batch === selectedBatch;
        const matchesBranch = selectedBranch === 'all' || a.branch === selectedBranch;
        return matchesSearch && matchesBatch && matchesBranch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connect with alumni from various batches and branches
                </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, company, or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* Batch Filter */}
                    <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        {batches.map(batch => (
                            <option key={batch} value={batch}>
                                {batch === 'all' ? 'All Batches' : `Batch ${batch}`}
                            </option>
                        ))}
                    </select>

                    {/* Branch Filter */}
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        {branches.map(branch => (
                            <option key={branch} value={branch}>
                                {branch === 'all' ? 'All Branches' : branch}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-4">Found {filteredAlumni.length} alumni</p>

            {/* Alumni Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alumnus) => (
                    <Link
                        key={alumnus.id}
                        to={`/profile/${alumnus.id}`}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02]"
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {alumnus.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-gray-900">{alumnus.name}</h3>
                                    <p className="text-gray-600">{alumnus.designation}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-gray-600">
                                <p>🏢 {alumnus.company}</p>
                                <p>🎓 {alumnus.branch} ({alumnus.batch})</p>
                                <p>📍 {alumnus.location}</p>
                            </div>

                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition-all">
                                View Profile
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredAlumni.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No alumni found matching your criteria</p>
                </div>
            )}
        </div>
    );
};

export default AlumniDirectory;
