import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
  
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
        <Route path={"/dashboard"} element={<Dashboard/>}></Route>
        <Route path={"/onboarding"} element={<Onboarding/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
