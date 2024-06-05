
import './App.css';
import Create from './components/Create';
import Read from './components/Read';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Update from './components/Update';

function App() {
  return (
    <div className='main'>
    
     <Router>
     <Routes>
      <Route exact path='/' element={<Create/>}/>
      <Route exact path='/read' element={<Read/>}/>
      <Route exact path='/update' element={<Update/>}/>

     </Routes>
     </Router>
  
    </div>
  )
}

export default App;