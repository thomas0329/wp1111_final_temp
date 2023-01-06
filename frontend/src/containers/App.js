import '../App.css';
import Login from './Login';
import MainPage from './MainPage';
import { BrowserRouter as Router, Route, Routes }
         from 'react-router-dom';
import Welcome from './Welcome';
import { useComic } from './hooks/useComic';
import Block from './Block';
import Edit from './Edit';
import Work from './Work';
import Gallery from './Gallery';

import Transform from './Transform';

const App = () => {
  const { user, currentTemplate } = useComic();
  
  return (
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/welcome" element={<Welcome name={user.name}/>} />
            {/* <Route path="/block" element={<Block template={currentTemplate}/>} /> */}
            <Route path="/edit" element={<Edit/>} />
            {/* <Route path="/transform" element={<Transform/>} /> */}
            {/* <Route path="/work" element={<Work/>} /> */}
            <Route path='/gallery' element={<Gallery/>} />
          </Routes>
    </Router>
  );
};

export default App;
