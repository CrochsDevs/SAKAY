// Client/src/pages/Admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users as UsersIcon, Shield, User, Mail, Phone } from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const Users = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
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
      <div className="flex items-center justify-center h-48 sm:h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      <h1 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {users.map((user) => (
          <Card key={user._id} className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${isDark ? 'bg-gray-800' : ''}`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {user.fullName?.charAt(0) || '?'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.fullName}</p>
                    <Badge className={user.role === 'super-admin' ? 'bg-grab-green text-white mt-1' : (isDark ? 'bg-gray-700 text-gray-300 mt-1' : 'bg-gray-200 text-gray-700 mt-1')}>
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
                <div className={`flex items-center gap-2 text-sm min-w-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm min-w-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{user.phone || 'No phone number'}</span>
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
        {users.length === 0 && (
          <Card className={`col-span-full ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardContent className="p-12 text-center">
              <UsersIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No users found</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>User accounts will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Users;
