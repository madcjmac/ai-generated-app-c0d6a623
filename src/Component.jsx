// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CRMProvider } from './contexts/CRMContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Pipeline from './pages/Pipeline';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CRMProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Toaster position="top-right" />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                  <ProtectedRoute>
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-1 flex flex-col">
                        <Header />
                        <main className="flex-1 overflow-auto">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/leads" element={<Leads />} />
                            <Route path="/pipeline" element={<Pipeline />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/settings" element={<Settings />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </CRMProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
