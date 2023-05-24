import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";
import Categories from "./component/category/Categories";
import EditExamQuestionForm from "./component/EditExamQuestion/EditExamQuestionForm";
import CreateExamForm from "./component/CreateExam/CreateExamForm";
import CreateCategory from "./component/category/CreateCategory";
import Exam from "./component/CreateExam/Exam";

function App() {

    return (
        <div>
            <SideNavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/createCategory" element={<CreateCategory/>}/>
                <Route path="/exam/all" element={<Exam/>}/>
                <Route path="/exam/edit" element={<EditExamQuestionForm/>}/>
                <Route path="/exam/create" element={<CreateExamForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
