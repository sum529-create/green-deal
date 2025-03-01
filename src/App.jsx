import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/Router';
import { useEffect } from 'react';
import { handleAuthStateChange } from './store/userStore';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    handleAuthStateChange();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
