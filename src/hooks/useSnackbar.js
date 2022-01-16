import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';

const MessageContext = createContext();

export function MessageProvider({ children, debug = false }) {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const setSnackbar = (type, msg) => {
    setType(type);
    setMessage(msg);
  };

  const value = useMemo(() => {
    return { type, message, setSnackbar };
  }, [type, message]);

  useEffect(() => {
    if (debug) {
      console.debug('Message Context: ', { type, message });
    }
  }, [type, message, debug]);

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export default function useSnackbar() {
  return useContext(MessageContext);
}
