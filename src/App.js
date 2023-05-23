import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";
import Categories from "./component/Categories";
import EditExamQuestionForm from "./component/EditExamQuestion/EditExamQuestionForm";
import CreateExamForm from "./component/CreateExam/CreateExamForm";

function App() {

    return (
        <div>
            <SideNavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/exam/edit" element={<EditExamQuestionForm/>}/>
                <Route path="/exam/create" element={<CreateExamForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
