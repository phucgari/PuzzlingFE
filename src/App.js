import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";
import Categories from "./component/Categories";
import EditExamQuestionForm from "./component/EditExamQuestionForm";

function App() {

  return (
    <div>
        <SideNavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/exam/edit" element={<EditExamQuestionForm/>}/>
        </Routes>
    </div>
  );
}

export default App;
