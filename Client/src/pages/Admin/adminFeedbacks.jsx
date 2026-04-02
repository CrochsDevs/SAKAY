// Client/src/pages/Admin/adminFeedbacks.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trash2, ThumbsUp, CheckCircle, Clock } from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';

const AdminFeedbacks = () => {
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      // Get ALL feedbacks from admin endpoint
      const response = await api.get('/feedbacks/admin/all');
      const allFeedbacks = response.data;
      
      // Separate into pending and approved based on isApproved field
      const pending = allFeedbacks.filter(feedback => !feedback.isApproved);
      const approved = allFeedbacks.filter(feedback => feedback.isApproved);
      
      setPendingFeedbacks(pending);
      setApprovedFeedbacks(approved);
      
      console.log('Total feedbacks:', allFeedbacks.length);
      console.log('Pending:', pending.length);
      console.log('Approved:', approved.length);
      
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      Swal.fire('Error', 'Failed to fetch feedbacks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: 'Approve Feedback?',
      text: 'This feedback will be visible to all users.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2E7D32',
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/feedbacks/admin/${id}/approve`);
        Swal.fire('Approved!', 'Feedback has been approved and is now public.', 'success');
        fetchFeedbacks(); // Refresh the lists
      } catch (error) {
        Swal.fire('Error!', 'Failed to approve feedback.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Feedback?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF4B4B',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/feedbacks/${id}`);
        Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
        fetchFeedbacks();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete feedback.', 'error');
      }
    }
  };

  const FeedbackCard = ({ feedback, showApprove = false }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold">
                {feedback.userName?.charAt(0) || '?'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{feedback.userName}</p>
                <p className="text-xs text-gray-500">{feedback.userEmail}</p>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mt-2">{feedback.comment}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-gray-400">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {feedback.likes || 0} likes
              </span>
              <Badge className="bg-gray-100 text-gray-600">
                {feedback.userLocation}
              </Badge>
              {!feedback.isApproved && (
                <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending
                </Badge>
              )}
              {feedback.isApproved && (
                <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Approved
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            {showApprove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleApprove(feedback._id)}
                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(feedback._id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback Management</h1>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Approval ({pendingFeedbacks.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedFeedbacks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingFeedbacks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <p className="text-gray-500">No pending feedbacks!</p>
                <p className="text-sm text-gray-400 mt-1">All feedbacks have been reviewed.</p>
              </CardContent>
            </Card>
          ) : (
            pendingFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} showApprove={true} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved">
          {approvedFeedbacks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No approved feedbacks yet</p>
                <p className="text-sm text-gray-400 mt-1">Approve pending feedbacks to see them here.</p>
              </CardContent>
            </Card>
          ) : (
            approvedFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} showApprove={false} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFeedbacks;