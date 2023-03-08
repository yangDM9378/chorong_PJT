import { Outlet } from 'react-router-dom';
import DevDropDown from './components/navbar/DevDropDown';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <DevDropDown />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
