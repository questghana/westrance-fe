import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { Router } from "./router";
import { useEffect } from "react";
import { useAuthStore } from "./store/userInfo.store";

const client = new QueryClient();
//
const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <QueryClientProvider client={client}>
      <Router />
      <Toaster richColors={true}/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
