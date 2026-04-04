// Client/src/pages/Admin/Announcements.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone, Trash2, Edit, Plus } from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const Announcements = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', priority: 'normal' });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      Swal.fire('Error', 'Please fill all fields', 'error');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/announcements/${editingId}`, formData);
        Swal.fire('Success', 'Announcement updated!', 'success');
      } else {
        await api.post('/announcements', formData);
        Swal.fire('Success', 'Announcement created!', 'success');
      }
      setFormData({ title: '', content: '', priority: 'normal' });
      setShowForm(false);
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      Swal.fire('Error', 'Failed to save announcement', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Announcement?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF4B4B',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/announcements/${id}`);
        Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
        fetchAnnouncements();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete announcement.', 'error');
      }
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  return (
    <div className="px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Announcements</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-grab-green hover:bg-grab-dark self-start">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {showForm && (
        <Card className={`mb-4 sm:mb-6 border-0 shadow-lg ${isDark ? 'bg-gray-800' : ''}`}>
          <CardHeader>
            <CardTitle className={`text-lg sm:text-xl ${isDark ? 'text-white' : ''}`}>{editingId ? 'Edit Announcement' : 'Create New Announcement'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`border-gray-200 ${isDark ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400' : ''}`}
              />
              <Textarea
                placeholder="Content"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className={`border-gray-200 ${isDark ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400' : ''}`}
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
              >
                <option value="normal" className={isDark ? 'bg-gray-700' : ''}>Normal</option>
                <option value="high" className={isDark ? 'bg-gray-700' : ''}>High</option>
                <option value="urgent" className={isDark ? 'bg-gray-700' : ''}>Urgent</option>
              </select>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="bg-grab-green hover:bg-grab-dark">
                  {editingId ? 'Update' : 'Publish'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ title: '', content: '', priority: 'normal' });
                    setEditingId(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
            <CardContent className="p-12 text-center">
              <Megaphone className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No announcements yet</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Create your first announcement to get started.</p>
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement._id} className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${isDark ? 'bg-gray-800' : ''}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Megaphone className="w-5 h-5 text-grab-green flex-shrink-0" />
                      <h3 className={`font-bold text-base sm:text-lg break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>{announcement.title}</h3>
                      {announcement.priority === 'urgent' && (
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}`}>Urgent</span>
                      )}
                      {announcement.priority === 'high' && (
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${isDark ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-600'}`}>High</span>
                      )}
                    </div>
                    <p className={`mt-2 break-words ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{announcement.content}</p>
                    <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Posted on {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 self-end sm:self-start flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(announcement)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(announcement._id)} className={`text-red-500 ${isDark ? 'hover:text-red-400 dark:hover:bg-gray-700' : 'hover:text-red-700 hover:bg-red-50'}`}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
