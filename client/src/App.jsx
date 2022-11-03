import Edit from "./routes/edit.componenet";
import { Routes, Route, Outlet } from "react-router-dom";
import './app.css'
import Show from "./routes/show";
import Home from "./routes/home";
import NavBar from "./components/navigation/navbar.component";
import New from "./routes/new";
import Search from "./routes/search/search.route";
import Tester from "./routes/show/tester";
const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< NavBar />} >
          <Route index element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/tester' element={<Tester />} />
          <Route path='/search' element={<Search />} />
          <Route path="movies/:id/" element={<Show />} />
          <Route path="movies/:id/edit" element={<Edit />} />

        </Route>
      </Routes>
    </div >
  );
}

export default App;
