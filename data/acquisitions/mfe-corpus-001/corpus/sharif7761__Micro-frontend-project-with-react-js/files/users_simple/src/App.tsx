import React, { useEffect, useState } from 'react';
// @ts-ignore
import Button from 'common_simple/Button';
// @ts-ignore
import Card from 'common_simple/Card';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>
      <p>This micro frontend uses components from common_simple</p>
      
      <Button onClick={fetchUsers}>
        Refresh Users
      </Button>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {users.map((user) => (
            <Card key={user.id} title={user.name}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
