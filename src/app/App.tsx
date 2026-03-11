import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../widgets/layout'
import { ChangeStagesPage } from '../pages/change-stages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/change-stages" replace />} />
        <Route path="change-stages" element={<ChangeStagesPage />} />
      </Route>
    </Routes>
  )
}

export default App
