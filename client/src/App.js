import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { useCookies } from 'react-cookie';
  
const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
        {authToken && <Route path={"/dashboard"} element={<Dashboard/>}></Route>}
        {authToken && <Route path={"/onboarding"} element={<Onboarding/>}></Route>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
