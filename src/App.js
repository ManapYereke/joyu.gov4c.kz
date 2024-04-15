import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Authorization/Auth';
import Main from './Main/Main';
import Admin from './Admin/Admin';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
