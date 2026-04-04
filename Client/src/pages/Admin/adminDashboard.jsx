// Client/src/pages/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Star, Megaphone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import api from '../../util/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFeedbacks: 0,
    averageRating: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const usersRes = await api.get('/users/all');
      const feedbacksRes = await api.get('/feedbacks');
      
      const avgRating = feedbacksRes.data.length > 0 
        ? (feedbacksRes.data.reduce((acc, curr) => acc + curr.rating, 0) / feedbacksRes.data.length).toFixed(1)
        : 0;
      
      setStats({
        totalUsers: usersRes.data.length,
        totalFeedbacks: feedbacksRes.data.length,
        averageRating: avgRating,
        totalAnnouncements: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Feedbacks', value: stats.totalFeedbacks, icon: MessageSquare, color: 'bg-green-500' },
    { title: 'Average Rating', value: `${stats.averageRating}\u2605`, icon: Star, color: 'bg-yellow-500' },
    { title: 'Announcements', value: stats.totalAnnouncements, icon: Megaphone, color: 'bg-purple-500' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      <h1 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                  <p className={`text-xl sm:text-2xl font-bold mt-1 sm:mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2.5 sm:p-3 rounded-full flex-shrink-0`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
