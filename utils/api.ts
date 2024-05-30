import { useRouter } from "next/navigation";

export const fetchWithAuth = async(url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', body? :any) => {
    const token = localStorage.getItem('token');
    const API_URL = 'http://localhost:3000';
    
    // const router = useRouter();

    if(!token){
        throw new Error('No token found');
    }

    const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const options: RequestInit = {
        method,
        headers
    }
    
    if(body){
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_URL}${url}`, options);


    if(!response.ok){
        if(response.status === 401){
            console.error('unauthorized');
            throw new Error('Unauthorized');
        }

        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong')

    }

    return response.json();
}


import axiosInstance from './axios';

export const apiRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  token?: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  switch (method) {
    case 'GET':
      return axiosInstance.get(url, config);
    case 'POST':
      return axiosInstance.post(url, data, config);
    case 'PUT':
      return axiosInstance.put(url, data, config);
    case 'DELETE':
      return axiosInstance.delete(url, config);
    default:
      throw new Error('Invalid method');
  }
};
