import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from './store';
// import DevDropDown from './components/navbar/DevDropDown';

function App() {
  const queryClient = new QueryClient();
  const store = useStore();
  return (
    <div className="font-GmarketSansMedium">
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          {/* <DevDropDown /> */}
          <Outlet />
        </ReduxProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
