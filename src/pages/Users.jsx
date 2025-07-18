import React from 'react';
import { useStreamContext } from '../context/StreamContext';

const Users = () => {
  const { stream } = useStreamContext();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Registered Users</h1>

      {stream.length === 0 ? (
        <p className="text-gray-500">No users registered yet.</p>
      ) : (
        stream.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> 🔒🔒🔒 (secured)</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;