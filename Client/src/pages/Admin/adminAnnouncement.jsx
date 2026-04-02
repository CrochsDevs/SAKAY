// Client/src/pages/Admin/Announcements.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone, Trash2, Edit, Plus } from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';

const Announcements = () => {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-grab-green hover:bg-grab-dark">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Announcement' : 'Create New Announcement'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-gray-200"
              />
              <Textarea
                placeholder="Content"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="border-gray-200"
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <div className="flex gap-3">
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
        {announcements.map((announcement) => (
          <Card key={announcement._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="w-5 h-5 text-grab-green" />
                    <h3 className="font-bold text-lg text-gray-900">{announcement.title}</h3>
                    {announcement.priority === 'urgent' && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Urgent</span>
                    )}
                    {announcement.priority === 'high' && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">High</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{announcement.content}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    Posted on {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(announcement)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(announcement._id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;