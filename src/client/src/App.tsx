import { Home } from './pages/home';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Home />
    </>
  );
}
