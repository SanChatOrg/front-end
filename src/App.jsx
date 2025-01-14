import {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './routes/AppRouter'
import {AppProvider} from "./contexts/AppProvider.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <AppProvider>
            <Router>
                <AppRouter/>
            </Router>
        </AppProvider>
    )
}

export default App
