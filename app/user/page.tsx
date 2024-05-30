'use client'
import { fetchWithAuth } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';  


interface User {
  _id: string;
  name: string;
  email: string;
}

export default function User() {
  const [data, setData] = useState<User[]>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token){
          router.push('/login');
          return;
        }

        // const response = await fetchWithAuth('/api/users', 'GET');
        const response: any = await axios.get('http://localhost:3000/api/users');
        console.log('Fetched Data', response);
        
        if (!response) {
          throw new Error("Network response is not ok");
        }
        setData(response.data.users);
      } catch (error) {
        if(error.response && error.response.status === 401){
          router.push('/login');
        }
        else{
          setError(error.message);
        }
      }
    };
    fetchUser();
  }, [router]);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: any, index: number) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// name: string;
// email: string;
// password: string;
// createdAt: Date;
// updatedAt: Date;
