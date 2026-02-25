import React, { useState, useEffect, useMemo } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import RoleBadge from '../../components/RoleBadge';
import { motion } from 'framer-motion';
import './Dashboard.css';

const AdminDashboard = () => {
    // Add logic for simulating counting up numbers for stats
    const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
    const targetStats = useMemo(() => [2450, 8432, 12450, 482], []);

    useEffect(() => {
        let currentValues = [0, 0, 0, 0];
        const intervals = targetStats.map((target, index) => {
            const step = Math.ceil(target / 50); // complete in 50 ticks
            return setInterval(() => {
                currentValues[index] += step;
                if (currentValues[index] >= target) {
                    currentValues[index] = target;
                    clearInterval(intervals[index]);
                }
                setAnimatedStats([...currentValues]);
            }, 30);
        });

        return () => intervals.forEach(clearInterval);
    }, [targetStats]);

    const statsConfig = [
        { title: 'Total Resources', value: animatedStats[0].toLocaleString(), icon: '📚', delta: '+12% this week', positive: true },
        { title: 'Total Users', value: animatedStats[1].toLocaleString(), icon: '👥', delta: '+5% this week', positive: true },
        { title: 'Total Downloads', value: animatedStats[2].toLocaleString(), icon: '⬇️', delta: '+28% this week', positive: true },
        { title: 'Total Feedback', value: animatedStats[3].toLocaleString(), icon: '💬', delta: '-2% this week', positive: false },
    ];

    const recentUploads = [
        { id: '#1204', title: 'Calculus Notes', subject: 'Math', uploader: 'John D.', date: 'Today' },
        { id: '#1203', title: 'React Guide', subject: 'CS', uploader: 'Jane S.', date: 'Yesterday' },
        { id: '#1202', title: 'Physics Lab', subject: 'Physics', uploader: 'Mike R.', date: '2 days ago' },
        { id: '#1201', title: 'History Essay', subject: 'History', uploader: 'Sarah M.', date: '3 days ago' },
    ];

    const uploadsColumns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Subject', accessor: 'subject' },
        { Header: 'Uploader', accessor: 'uploader' },
        { Header: 'Date', accessor: 'date' },
    ];

    const recentUsers = [
        { name: 'Alice Smith', email: 'alice@student.edu', role: <RoleBadge role="Student" />, joined: 'Today' },
        { name: 'Bob Jones', email: 'bob@faculty.edu', role: <RoleBadge role="Faculty" />, joined: 'Yesterday' },
        { name: 'Charlie Brown', email: 'charlie@student.edu', role: <RoleBadge role="Student" />, joined: '2 days ago' },
        { name: 'Diana Prince', email: 'diana@student.edu', role: <RoleBadge role="Admin" />, joined: '3 days ago' },
    ];

    const usersColumns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Joined', accessor: 'joined' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header-row">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="dashboard-title"
                >
                    Dashboard Overview
                </motion.h1>
                <div className="dashboard-date">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="stats-grid">
                {statsConfig.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                    >
                        <Card className="stat-card glass">
                            <div className="stat-card-inner">
                                <div className="stat-info">
                                    <p className="stat-title">{s.title}</p>
                                    <h3 className="stat-value">{s.value}</h3>
                                    <p className={`stat-delta ${s.positive ? 'positive' : 'negative'}`}>
                                        {s.delta}
                                    </p>
                                </div>
                                <div className="stat-icon-wrapper">{s.icon}</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="dashboard-tables-grid">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="glass dashboard-table-card">
                        <div className="table-card-header">
                            <h3>Recent Uploads</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <Table columns={uploadsColumns} data={recentUploads} />
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="glass dashboard-table-card">
                        <div className="table-card-header">
                            <h3>New Registrations</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <Table columns={usersColumns} data={recentUsers} />
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
