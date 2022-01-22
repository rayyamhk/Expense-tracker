import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';

type variant = 'success' | 'error' | 'warning';

type ContextType = [
  (type: variant, msg: string) => void,
  variant,
  string,
];

type ProviderProps = {
  children: React.ReactNode,
};

const MessageContext = createContext<ContextType>([() => {}, null, null]);

export function MessageProvider({ children }: ProviderProps) {
  const [type, setType] = useState<variant>(null);
  const [message, setMessage] = useState<string>(null);
  const setSnackbar = useCallback((type: variant, msg: string) => {
    setType(type);
    setMessage(msg);
  }, []);

  return (
    <MessageContext.Provider value={[setSnackbar, type, message]}>
      {children}
    </MessageContext.Provider>
  );
};

export default function useSnackbar() {
  return useContext(MessageContext);
};
