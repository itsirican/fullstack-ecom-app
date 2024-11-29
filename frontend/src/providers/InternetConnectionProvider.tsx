import { ToastId, useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsOnlineAction } from "../app/features/networkSlice";

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const [, setIsOnline] = useState(true);
  const toastIdRef = useRef<ToastId | null>(null);
  const toast = useToast();

  function addToast() {
    toastIdRef.current = toast({
      title: `You are offline`,
      description: "Please make sure you have internet connectivity.",
      status: "warning",
      duration: null,
    });
  }

  function closeAll() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  const onOnline = () => {
    setIsOnline(true);
    dispatch(setIsOnlineAction(true));
    closeAll();
  };
  const onOffline = () => {
    setIsOnline(false);
    dispatch(setIsOnlineAction(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);
  return <div>{children}</div>;
};

export default InternetConnectionProvider;
