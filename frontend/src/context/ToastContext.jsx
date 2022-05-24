import { useToast } from "@chakra-ui/react";
import { useContext, createContext } from "react";
const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  // const [toasts, setToasts] = useState([]);
  const toast = useToast();

  const addToast = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}
