import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import AuditPage from './pages/AuditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/news" element={<NewsPage />} />
        <Route path="/audit" element={<AuditPage />} />
        {/* Другие маршруты */}
      </Routes>
    </Router>
  );
}

export default App;
