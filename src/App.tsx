import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Game from './Game';

function App() {
    return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
    </Routes>
    );
}

export default App;