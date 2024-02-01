import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthResponse } from "../../../../types/authresponse";
import { useLoginMutation } from "../slice/authApiSlice";
import { setCredentials } from "../slice/authSlice";

const Login: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState<string>("");
  const [passowrnd, setpPassowrnd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, passowrnd]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: ApiResponse<AuthResponse> = await login({
        email: email,
        password: passowrnd,
      });

      if (response.data) {
        console.log("Response Data", response.data);
        const userData = response.data;
        dispatch(setCredentials({ email: email, token: userData.accessToken }));
        setEmail("");
        setpPassowrnd("");
        navigate("/welcome");
      } else {
        handleLoginError(response.error);
      }
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setpPassowrnd(e.target.value);

  const handleLoginError = (err: any) => {
    if (!err?.originalStatus) {
      setErrMsg(`No Server Response ${err.message}`);
    } else if (err.originalStatus === 400) {
      setErrMsg("Missing Username or Password");
    } else if (err.originalStatus === 401) {
      setErrMsg("Unauthorized");
    } else {
      setErrMsg("Login Failed");
    }

    if (errRef.current) {
      errRef.current.focus();
    }
  };

  const content = isLoading ? (
    <section className="login min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1>Loading...</h1>
      </div>
    </section>
  ) : (
    <section className="login min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <p
          ref={errRef}
          className={errMsg ? "errmsg text-red-500 mb-4" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1 className="text-2xl font-semibold mb-4">Employee Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={passowrnd}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );

  return content;
};

export default Login;
