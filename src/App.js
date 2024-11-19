import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Movie, MovieDetail } from './pages';

function App() {
  return (
    <Router>

      <div>
        <Link to={'/'}>Home page</Link>
      </div>
      
      <Routes>
        <Route path='/' element={<Movie />}/>
        <Route path='/detail/:id' element={<MovieDetail />}/>
      </Routes>
    </Router>
  );
}

export default App;
