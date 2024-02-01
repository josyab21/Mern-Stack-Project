import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectCurrenUserToken } from "../slice/authSlice";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrenUserToken);

  const welcome = user ? `Welcome ${user.fullName}!` : "Welcome!";
  const tokenAbbr = `${token!.slice(0, 9)}...`;

  const content = (
    <section className="login min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1>{welcome}</h1>
        <p>Token: {tokenAbbr}</p>
        <p>
          <Link to="/userslist">Go to the Users List</Link>
        </p>
      </div>
    </section>
  );

  return content;
};
export default Welcome;
