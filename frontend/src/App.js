import './App.css';
import CompanyPage from './pages/CompanyPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import AddReview from './pages/AddReview';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* <Route path="/:name" element={<CompanyPage />} /> */}
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage  />} />
        <Route path="/:name" element={<CompanyPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/add" element={<AddReview />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
