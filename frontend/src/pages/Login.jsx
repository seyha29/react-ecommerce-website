import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // State to manage form view (Login / Register)
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle forgot password form
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in

  const handleForgotPassword = () => {
    setShowForgotPassword(true); // Show the forgot password form
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert('Password reset link sent!');
    setShowForgotPassword(false); // Hide forgot password form after submission
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // Simulate login success
  };

  const handleSignOut = () => {
    setIsLoggedIn(false); // Log out the user
    setCurrentState('Login'); // Reset to Login view
  };

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-center'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>
      <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      {isLoggedIn ? (
        // Display logged-in view
        <div>
          <p className='text-xl mb-4'>Welcome, User!</p>
          <button
            onClick={handleSignOut}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
          >
            Sign Out
          </button>
        </div>
      ) : (
        // Display login or register forms based on currentState
        <>
          {currentState === 'Login' ? (
            <>
              <input
                type="email"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Email'
              />
              <input
                type="password"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Password'
              />

              {/* Forgot Password link aligned to the left */}
              <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer' onClick={handleForgotPassword}>
                  Forgot your password?
                </p>
                <p className='cursor-pointer' onClick={() => setCurrentState('Register')}>
                  Create account
                </p>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Full Name'
              />
              <input
                type="email"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Email'
              />
              <input
                type="password"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Password'
              />
            </>
          )}

          {/* Only show the Login link when Register form is displayed */}
          {currentState === 'Register' && (
            <div className='w-full flex justify-end text-sm mt-[-8px]'>
              <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>
                Already have an account? Login
              </p>
            </div>
          )}

          {/* Show Forgot Password Form */}
          {showForgotPassword && (
            <div className='w-full mt-4'>
              <input
                type="email"
                className='w-full px-3 py-2 border border-gray-800 mb-4'
                placeholder='Enter your email to reset password'
              />
              <button
                onClick={handlePasswordReset}
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
              >
                Reset Password
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="mt-2 text-blue-600 cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Submit Button */}
          {!showForgotPassword && !isLoggedIn && (
            <button
              type="submit"
              onClick={handleSignIn} // Simulate login on form submit
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
            >
              {currentState === 'Login' ? 'Login' : 'Register'}
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default Login;
