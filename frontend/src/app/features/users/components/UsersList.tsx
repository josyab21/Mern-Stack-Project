import { useGetUsersQuery } from "../slice/usersApiSlice";
import { Link } from "react-router-dom";
import { User } from "../../../../types/user";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content: JSX.Element | null = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess && users) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {users.map((user: User, i: number) => (
            <li key={i}>{user.email}</li>
          ))}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default UsersList;
