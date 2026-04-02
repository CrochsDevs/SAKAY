// Client/src/pages/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Star, Megaphone } from 'lucide-react';
import api from '../../util/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFeedbacks: 0,
    averageRating: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);

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
    { title: 'Average Rating', value: `${stats.averageRating}★`, icon: Star, color: 'bg-yellow-500' },
    { title: 'Announcements', value: stats.totalAnnouncements, icon: Megaphone, color: 'bg-purple-500' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
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