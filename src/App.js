import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";
import Categories from "./component/Categories";

function App() {

  return (
    <div>
        <SideNavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="categories" element={<Categories/>}/>
        </Routes>
    </div>
  );
}

export default App;
