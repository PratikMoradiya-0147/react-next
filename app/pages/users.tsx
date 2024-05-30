import { GetServerSideProps } from 'next';
import axiosInstance from '@/utils/axios';
import { User } from '@/types/User';

interface UsersPageProps {
  users: User[];
}

const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
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
          {users.map((user, index) => (
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('getServerSideProps is running'); // This should appear in your server logs
  try {
    const response = await axiosInstance.get('/users');
    const users: User[] = response.data;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        users: [],
      },
    };
  }
};

export default UsersPage;
