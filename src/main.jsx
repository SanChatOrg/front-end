import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/globalStyles.css"; // 전역 CSS 파일 추가

createRoot(document.getElementById('root')).render(

    <App />
,
)
