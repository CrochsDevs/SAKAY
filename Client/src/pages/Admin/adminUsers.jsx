// Client/src/pages/Admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users as UsersIcon, Shield, User, Mail, Phone } from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (userId, currentRole) => {
    const newRole = currentRole === 'super-admin' ? 'commuter' : 'super-admin';
    
    const result = await Swal.fire({
      title: currentRole === 'super-admin' ? 'Remove Admin?' : 'Make Admin?',
      text: `Are you sure you want to ${currentRole === 'super-admin' ? 'remove admin privileges from' : 'make'} this user?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2E7D32',
      confirmButtonText: currentRole === 'super-admin' ? 'Remove' : 'Make Admin'
    });

    if (result.isConfirmed) {
      try {
        await api.put('/users/role', { userId, role: newRole });
        Swal.fire('Success!', 'User role has been updated.', 'success');
        fetchUsers();
      } catch (error) {
        Swal.fire('Error!', 'Failed to update user role.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.fullName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user.fullName}</p>
                    <Badge className={user.role === 'super-admin' ? 'bg-grab-green text-white' : 'bg-gray-200 text-gray-700'}>
                      {user.role === 'super-admin' ? (
                        <><Shield className="w-3 h-3 mr-1" /> Admin</>
                      ) : (
                        <><User className="w-3 h-3 mr-1" /> Commuter</>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone || 'No phone number'}</span>
                </div>
              </div>
              
              {user.role !== 'super-admin' && (
                <Button
                  onClick={() => handleMakeAdmin(user._id, user.role)}
                  className="w-full mt-4 bg-grab-green hover:bg-grab-dark"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Make Admin
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;