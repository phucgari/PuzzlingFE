import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {storage} from "../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {useState} from "react";

export default function CreateCategory() {
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const data = {
        picture: "",
        name: ""
    };
    return (
        <div className={"container"}>
            <div className={"row"}>
                <Formik
                    initialValues={data}
                    onSubmit={(values) => {
                        values.picture = imgUrl;
                        axios
                            .post("http://localhost:8080/puzzling/categories/create", values)
                            .then(() => {
                                navigate("/categories")
                            })
                            .catch((error) => {
                                console.log(error.message)
                            })
                    }
                    }>
                    <Form>
                        <h1>Thêm danh mục mới</h1>
                        <Link to={"/categories"}>Quay lại trang danh sách</Link>
                        <table style={{textAlign: "left"}}>
                            <tbody>
                            <tr>
                                <td>Ảnh:</td>
                                <td>
                                    <input type={"file"} name={"category-image"}
                                           onChange={(event) => uploadFile(event)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Tên:</td>
                                <td>
                                    <Field name={"name"}></Field>
                                    <ErrorMessage name={"name"}></ErrorMessage>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type={"submit"}>Save</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </Formik>
            </div>
        </div>
    )

    function uploadFile(event) {
        const file = event.target.files[0]
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
                console.log(progress)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }
}