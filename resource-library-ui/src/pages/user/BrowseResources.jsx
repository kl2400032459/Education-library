import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../components/Card';
import { MOCK_RESOURCES } from '../../data/mockData';
import './BrowseResources.css';

const FILTER_SUBJECTS = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'History', 'Web Dev'];
const FILTER_DEPARTMENTS = ['All', 'Engineering', 'Science', 'Arts'];
const FILTER_TYPES = ['All', 'Textbook', 'Notes', 'Video'];

const BrowseResources = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    const initialSubject = queryParams.get('subject') || 'All';

    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [sortBy, setSortBy] = useState('popular');

    const [filters, setFilters] = useState({
        subject: FILTER_SUBJECTS.includes(initialSubject) ? initialSubject : 'All',
        department: 'All',
        type: 'All'
    });


    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleResetFilters = () => {
        setFilters({ subject: 'All', department: 'All', type: 'All' });
        setSearchTerm('');
    };

    // Filter Logic
    const filteredResources = MOCK_RESOURCES.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filters.subject === 'All' || res.subject === filters.subject;
        const matchesDept = filters.department === 'All' || res.department === filters.department;
        const matchesType = filters.type === 'All' || res.type === filters.type;

        return matchesSearch && matchesSubject && matchesDept && matchesType;
    }).sort((a, b) => {
        if (sortBy === 'highest_rated') return b.rating - a.rating;
        if (sortBy === 'lowest_rated') return a.rating - b.rating;
        if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
        // Default popular logic (mocked by rating for now)
        return b.rating - a.rating;
    });

    return (
        <div className="browse-page">
            <header className="browse-header">
                <h2>Browse Resources</h2>
                <div className="top-bar glass">
                    <div className="top-bar-left">
                        <span className="results-count">{filteredResources.length} Results Found</span>
                    </div>
                    <div className="top-bar-right">
                        <select
                            className="sort-dropdown"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="highest_rated">Highest Rated</option>
                            <option value="lowest_rated">Lowest Rated</option>
                            <option value="alphabetical">A-Z</option>
                        </select>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                ⊞ Grid
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                ☰ List
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="browse-content">
                <aside className="filter-panel glass">
                    <div className="filter-section">
                        <h3>Search</h3>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-section">
                        <h3>Subject</h3>
                        <select value={filters.subject} onChange={(e) => handleFilterChange('subject', e.target.value)}>
                            {FILTER_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="filter-section">
                        <h3>Department</h3>
                        <select value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)}>
                            {FILTER_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div className="filter-section">
                        <h3>Resource Type</h3>
                        <div className="radio-group">
                            {FILTER_TYPES.map(t => (
                                <label key={t} className="radio-label">
                                    <input
                                        type="radio"
                                        name="resType"
                                        value={t}
                                        checked={filters.type === t}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                    />
                                    {t}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="reset-filter-btn" onClick={handleResetFilters}>
                        Reset Filters
                    </button>
                </aside>

                <main className={`resource-container ${viewMode}-view`}>
                    <AnimatePresence>
                        {filteredResources.map((res) => (
                            <motion.div
                                key={res.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className={`resource-item glass ${viewMode}`}>
                                    <div className="res-thumbnail-container">
                                        <span className="res-icon">{res.thumb}</span>
                                    </div>
                                    <div className="res-info">
                                        <h3 className="res-title">{res.title}</h3>
                                        <div className="res-metadata">
                                            <span className="meta-tag">{res.type}</span>
                                            <span className="meta-tag rating">⭐ {res.rating}</span>
                                        </div>
                                        <p className="res-desc">{res.description}</p>
                                        <div className="res-tags">
                                            {res.tags.map(tag => (
                                                <span key={tag} className="tag">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="res-actions">
                                        <Link to={`/resource/${res.id}`} className="view-details-btn">View Details</Link>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredResources.length === 0 && (
                        <div className="no-results">
                            <h3>No resources found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BrowseResources;
