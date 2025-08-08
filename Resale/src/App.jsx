import { RouterProvider } from "react-router-dom";
import router from "@/Pages/router";
import ToastContainer from "@/components/ToastContainer";
import { useAppStore } from "@/Store";
import { useEffect } from "react";

const App = () => {
  const { initializeAuth, isInitializing } = useAppStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
