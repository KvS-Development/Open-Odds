import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScenarioPage from './pages/ScenarioPage'
import ProfilePage from './pages/ProfilePage'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenario/:id?" element={<ScenarioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div className="text-center py-12">404 - Page not found</div>} />
      </Routes>
    </Layout>
  )
}

export default App