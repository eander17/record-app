// withNavigationContext.js
import React from 'react';
import NavigationContext from './navigationContext';
import { useNavigate } from 'react-router-dom';

const withNavigationContext = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    return (
      <NavigationContext.Provider value={navigate}>
        <WrappedComponent {...props} />
      </NavigationContext.Provider>
    );
  };
};

export default withNavigationContext;
