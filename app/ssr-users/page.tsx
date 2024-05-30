// 'use server'
// import { GetServerSideProps } from 'next';
// import axiosInstance from '@/utils/axios';
// import { User } from '@/types/User';

// interface UsersPageProps {
//   users: User[];
// }

// const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Users</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <th scope="row">{index + 1}</th>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log('getServerSideProps is running'); // This should appear in your server logs
//   try {
//     const response = await axiosInstance.get('/users');
//     const users: User[] = response.data.users;

//     return {
//       props: {
//         users,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       props: {
//         users: [],
//       },
//     };
//   }
// };

// export default UsersPage;
// ------------------------------------------------------------------------

// 'use client'

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
// }

// const UsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response: any = await axios.get('http://localhost:3000/api/users');
//         console.log('response :>> ', response);
//         setUsers(response.data.users);
//       } catch (err) {
//         setError('Failed to fetch users');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!users || users.length === 0) {
//     return <div>No users found.</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Users</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <th scope="row">{index + 1}</th>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersPage;
// ------------------------------------------------------------------

// import React from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
// }


// const fetchUsers = async (): Promise<User[]> => {
//   try {

//     const response = await axios.get('http://localhost:3000/api/users');
//     return response.data.users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// };

// const UsersPage = async () => {
//   const users = await fetchUsers();

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Users</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <th scope="row">{index + 1}</th>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersPage;

// ------------------------------------------------------

import React from 'react';
// import { fetchUsers } from '../../lib/api'; // API function to fetch users
import UserList from './UserList'; // User list component
import { User } from '@/types/User';
import axios from 'axios';

export const revalidate = 0; // Disable revalidation (fetch data on every request)

export async function fetchUsers(): Promise<User[]> {
    const res = await axios.get('http://localhost:3000/api/users'); // Replace with your API endpoint
    if (!res.data) {
      throw new Error('Failed to fetch users');
    }
    return res.data.users;
  }

export default async function UsersPage() {
  const users = await fetchUsers(); // Fetch users data from the API

  return (
    <div>
      <h1 className='m-3 p-2'>Users</h1>
      <UserList users={users} />
    </div>
  );
}