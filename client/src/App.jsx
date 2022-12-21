import Edit from "./routes/edit/edit.componenet";
import { Routes, Route, Outlet } from "react-router-dom";
import './app.css'
import Admin from "./routes/admin/admin.route";
import Show from "./routes/show/show";
import Home from "./routes/home/home";
import NavBar from "./components/navigation/navbar.component";
import New from "./routes/new/new";
import Search from './routes/search/search.route'
import Add from "./routes/add/add.route";
import SeriesPage from "./routes/series/series.route";
import Accounts from "./routes/accounts/accounts.route";
import AccountEdit from "./routes/accountEdit/accountedit.route";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< NavBar />} >
          <Route index element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/search' element={<Search />} />
          <Route path='/series' element={< SeriesPage />} />
          <Route path='/series/:id' element={< Show />} />
          <Route path='/movies' element={< Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/add' element={<Add />} />
          <Route path='/admin/accounts' element={<Accounts />} />
          <Route path='/admin/accounts/edit' element={<AccountEdit />} />
          <Route path="movies/:id/" element={<Show />} />
          <Route path="movies/:id/edit" element={<Edit />} />

        </Route>
      </Routes>
    </div >
  );
}

export default App;
