import React from 'react';
import { useLocation } from 'react-router-dom';
import useNavigator from '../hooks/useNavigator';

export const NotFound = () => {
  const navigate = useNavigator();
  const location = useLocation();

  const path = location.pathname;
  // strip / from path
  const pathWithoutSlash = path.replace(/^\/+|\/+$/g, '');

  const authPaths = ['login'];

  // if the path is in the authPaths array, redirect to the home page
  if (authPaths.includes(pathWithoutSlash)) {
    window.location.href = '/';
    return null;
  } else {
    return (
      <>
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Opps! link is broken</h1>
            <button className="primary" onClick={() => navigate('/')}>
              Go to homepage
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default NotFound;
