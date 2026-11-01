import { Routes, Route } from "react-router-dom";

import AuthPage from  "./Pages/AuthPage"
import DashboardPage from "./Pages/DashboardPage"
import ReviewCVPage from "./Pages/ReviewCvPage";



function App() {

  return (
    <Routes>
      <Route path="/" element={<DashboardPage/>}/>
      <Route path="/Auth" element={<AuthPage/>}/>
      <Route path="/ReviewCV" element={<ReviewCVPage/>}/>
      
    </Routes>

  )
}

export default App
