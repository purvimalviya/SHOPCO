import { useState } from 'react';
import { signup, login, logout } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from '../../store/auth-slice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
  const dispatch = useDispatch();
  const [isNewUser, setIsNewUser] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null); // For auth errors
  const auth_email = useSelector((state: any) => state.auth.user?.email || null);

  // Yup validation schemas
  const signupValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^[a-zA-Z0-9!@#$%^&*]{6,}$/,
        'Password can only contain letters, numbers, and !@#$%^&*'
      )
      .required('Password is required'),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignup = async (values: { email: string; password: string }) => {
    setAuthError(null); // Reset error before attempting signup
    try {
      const userCredential = await signup(values.email, values.password);
      const { uid, email } = userCredential.user;
      dispatch(setUser({ uid, email }));
    } catch (err: any) {
      // Display the error message
      setAuthError(err.message);
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    setAuthError(null); // Reset error before attempting login
    try {
      const userCredential = await login(values.email, values.password);
      const { uid, email } = userCredential.user;
      dispatch(setUser({ uid, email }));
    } catch (err: any) {
      // Display the error message
      setAuthError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeUser());
    } catch (err) {
      console.error('Error : ', err);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center px-4 my-5">
      {isNewUser && !auth_email && (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}
        >
          {() => (
            <Form className="flex flex-col gap-4 bg-custom-gray p-10 w-1/2 md:w-3/4 lg:w-[90%] lg:p-5">
              <div>
                <p className="font-semibold">Shop Endless</p>
                <h2 className="text-2xl font-bold mb-3">Welcome to Shopco, </h2>
              </div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-full bg-white w-full py-2 px-4"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-full bg-white w-full py-2 px-4"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
              {authError && (
                <p className="text-red-500 text-sm mt-2">{authError}</p>
              )}
              <button
                type="submit"
                className="bg-black text-white mt-5 p-2 cursor-pointer"
              >
                Sign Up
              </button>
              <p
                onClick={() => setIsNewUser(false)}
                className="text-blue-700 font-medium cursor-pointer"
              >
                Already have account?
              </p>
            </Form>
          )}
        </Formik>
      )}

      {!isNewUser && !auth_email && (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="flex flex-col gap-4 bg-custom-gray p-10 w-1/2 md:w-3/4 lg:w-[90%] lg:p-5">
              <div>
                <p className="font-semibold">Shop Endless</p>
                <h2 className="text-2xl font-bold mb-3">Welcome to Shopco, </h2>
              </div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="rounded-full bg-white w-full py-2 px-4"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-full bg-white w-full py-2 px-4"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
              {authError && (
                <p className="text-red-500 text-sm mt-2">{authError}</p>
              )}
              <button
                type="submit"
                className="bg-black text-white mt-5 p-2 cursor-pointer"
              >
                Log In
              </button>
              <p
                onClick={() => setIsNewUser(true)}
                className="text-blue-700 font-medium cursor-pointer"
              >
                <span className="text-gray-600">New user?</span> Register now
              </p>
            </Form>
          )}
        </Formik>
      )}

      {auth_email && (
        <div className="flex flex-col w-3/4 gap-5">
          <h2 className="font-bold text-3xl">Hello User,</h2>
          <div>
            <p className="font-semibold text-gray-600 text-sm">Registered Email Address</p>
            <p className="text-gray-500 text-xl">{auth_email} </p>
          </div>
          <button
            className="w-fit px-5 py-2 bg-black text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
