import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemberDetails() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [message, setMessage] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
        if (!token) {
          setMessage({ type: 'error', text: 'User is not authenticated. Please log in again.' });
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/user_manage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching member details:', error);
        setMessage({ type: 'error', text: 'Failed to fetch member details. Please check your authentication.' });
      }
    };
    fetchData();

    // Set view mode based on screen size
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'card' : 'table');
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEdit = (member) => {
    setEditingMember(member.id);
    setEditedData({ ...member });
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        setMessage({ type: 'error', text: 'User is not authenticated.' });
        return;
      }
  
      await axios.put(`http://127.0.0.1:8000/api/user_manage/${id}`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMembers(members.map((member) => (member.id === id ? editedData : member)));
      setEditingMember(null);
      setMessage({ type: 'success', text: 'Member details updated successfully.' });
    } catch (error) {
      console.error('Error saving member details:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save member details. Please check your authentication.',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        setMessage({ type: 'error', text: 'User is not authenticated.' });
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/user_manage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(members.filter((member) => member.id !== id));
      setMessage({ type: 'success', text: 'Member deleted successfully.' });
    } catch (error) {
      console.error('Error deleting member:', error);
      setMessage({ type: 'error', text: 'Failed to delete member. Please check your authentication.' });
    }
  };

  const handleChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.district?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle view mode manually
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold">Member Details</h1>
        <button
          onClick={toggleViewMode}
          className="mt-2 md:mt-0 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
        >
          {viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
        </button>
      </div>

      {message && (
        <div 
          className={`p-2 mb-4 rounded ${
            message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        placeholder="Filter members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table View for larger screens */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-100 border border-gray-300">
            <thead>
              <tr className="bg-green-300">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">District</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-green-200">
                  <td className="p-2 border">{member.id}</td>
                  <td className="p-2 border">
                    {editingMember === member.id ? (
                      <input 
                        type="text" 
                        value={editedData.fullname || ''} 
                        onChange={(e) => handleChange(e, 'fullname')}
                        className="w-full p-1 border rounded" 
                      />
                    ) : member.fullname}
                  </td>
                  <td className="p-2 border">{member.email}</td>
                  <td className="p-2 border">{member.username}</td>
                  <td className="p-2 border">{member.phone}</td>
                  <td className="p-2 border">{member.district}</td>
                  <td className="p-2 border">
                    {editingMember === member.id ? (
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => handleSave(member.id)}>Save</button>
                        <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600" onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(member)}>Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(member.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View for mobile and smaller screens */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-green-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">
                    {editingMember === member.id ? (
                      <input 
                        type="text" 
                        value={editedData.fullname || ''} 
                        onChange={(e) => handleChange(e, 'fullname')} 
                        className="w-full p-1 border rounded"
                      />
                    ) : member.fullname}
                  </h3>
                  <p className="text-sm text-gray-600">ID: {member.id}</p>
                </div>
                <div className="flex space-x-1">
                  {editingMember === member.id ? (
                    <>
                      <button className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600" onClick={() => handleSave(member.id)}>Save</button>
                      <button className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600" onClick={() => handleEdit(member)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600" onClick={() => handleDelete(member.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="flex">
                  <span className="font-semibold w-24">Email:</span>
                  <span className="break-all">{member.email}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Username:</span>
                  <span>{member.username}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Phone:</span>
                  <span>{member.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">District:</span>
                  <span>{member.district}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMembers.length === 0 && (
        <div className="text-center py-4 bg-gray-100 rounded-lg">
          <p>No members found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default MemberDetails;