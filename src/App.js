import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";

function App() {

  return (
    <div className="home-bg" >
        <SideNavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
        </Routes>
    </div>
  );
}

export default App;
