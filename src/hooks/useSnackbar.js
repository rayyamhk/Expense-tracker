import {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const setSnackbar = useCallback((type, msg) => {
    setType(type);
    setMessage(msg);
  }, []);

  return (
    <MessageContext.Provider value={[setSnackbar, type, message]}>{children}</MessageContext.Provider>
  );
}

export default function useSnackbar() {
  return useContext(MessageContext);
}
