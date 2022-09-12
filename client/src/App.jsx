import Edit from "./routes/edit.componenet";
import { Routes, Route, Outlet } from "react-router-dom";
import './app.css'
import Show from "./routes/show";
import Home from "./routes/home";
import NavBar from "./components/navigation/navbar.component";
import New from "./routes/new";
const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< NavBar />} >
          <Route index element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path="movies/:id/" element={<Show />} />
          <Route path="movies/:id/edit" element={<Edit />} />

        </Route>
      </Routes>
    </div >
  );
}

export default App;
