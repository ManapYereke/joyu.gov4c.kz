import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Authorization/Auth';
import Main from './Main/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
