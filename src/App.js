import SideNavBar from "./component/SideNavBar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./component/HomePage";
import Categories from "./component/category/Categories";
import EditExamQuestionForm from "./component/EditExamQuestion/EditExamQuestionForm";
import CreateExamForm from "./component/CreateExam/CreateExamForm";
import CreateCategory from "./component/category/CreateCategory";
import Exam from "./component/CreateExam/Exam";
import Profile from "./component/user/Profile";
import DoExamForm from "./component/doExamForm/DoExamForm";

function App() {

    return (
        <div>
            <SideNavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/createCategory" element={<CreateCategory/>}/>
                <Route path="/exam/edit/:id/*" element={<EditExamQuestionForm/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/exam/all" element={<Exam/>}/>
                <Route path="/exam/create" element={<CreateExamForm/>}/>
                <Route path="/exam/do/:examId" element={<DoExamForm/>}/>
                <Route path="/record/:id" element={<CreateExamForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
