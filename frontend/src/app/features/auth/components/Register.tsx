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
import { useRegisterMutation } from "../slice/authApiSlice";
import { setCredentials } from "../slice/authSlice";

const Register: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [passowrd, setPassowrd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, passowrd]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: ApiResponse<AuthResponse> = await register({
        email: email,
        fullName: fullName,
        password: passowrd,
      });

      if (response.data) {
        console.log("Response Data", response.data);
        const userData = response.data.data;
        dispatch(
          setCredentials({ user: userData.user, token: userData.token })
        );
        setEmail("");
        setPassowrd("");
        navigate("/welcome");
      } else {
        handleLoginError(response.error);
      }
    } catch (err) {
      handleLoginError(err);
    }
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleFullNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setFullName(e.target.value);

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPassowrd(e.target.value);

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
              onChange={handleEmailInput}
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
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              onChange={handleFullNameInput}
              value={fullName}
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
              onChange={handlePasswordInput}
              value={passowrd}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );

  return content;
};

export default Register;
