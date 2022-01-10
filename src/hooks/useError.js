import { createContext, useState, useEffect, useContext, useMemo } from 'react';

const ErrorContext = createContext();

export function ErrorProvider({ children, debug = false }) {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const setError = (type, msg) => {
    setType(type);
    setMessage(msg);
  };

  const value = useMemo(() => {
    return { type, message, setError };
  }, [type, message]);

  useEffect(() => {
    if (debug) {
      console.log('Error Context: ', { type, message });
    }
  }, [type, message, debug]);

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
