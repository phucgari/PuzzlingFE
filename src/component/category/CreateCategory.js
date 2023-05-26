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
    const initialValues = {
        picture: imgUrl || "../images/plus-category.png",
        name: "",
    }
    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-4 border-0"
                     style={{marginTop: 6 + 'rem', backgroundColor: "#c4f6ff"}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            values.picture = imgUrl;
                            axios
                                .post("http://localhost:8080/puzzling/categories/", values)
                                .then(() => {
                                    alert("Tạo mới thành công!")
                                    navigate("/categories")
                                })
                                .catch((error) => {
                                    alert("TKhông thành công!")
                                })
                        }}
                        enableReinitialize={true}
                    >
                        <Form style={{textAlign: "center"}}>
                            <div>
                                <h1>Thêm danh mục mới</h1>
                                <hr/>
                            </div>
                            <div className="picture-upload" style={{marginTop: 80}}>
                                <label htmlFor={"picture"}>
                                    <img src={initialValues.picture} alt={""}
                                         className="cate-picture shadow mx-auto img-fluid rounded-circle mt-n5 mb-1 animated wow pulse"/>
                                </label>
                                <input type="file" name="picture" id="picture"
                                       className="cate-picture shadow mx-auto img-fluid rounded-circle mt-n5 mb-1 animated wow pulse"
                                       onChange={(event) => uploadFile(event)}
                                />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div
                                        className="form-group input-group w-100 animated wow fadeInDown delay-0-1s">
                                        <div className="input-group-prepend">
                                            <span><img src="/images/left-icon.png" alt={""}/></span>
                                        </div>
                                        <Field type="text" id="name"
                                               name={"name"} placeholder="Tên danh mục..."
                                               className="form-control textfield-rounded shadow-sm mb-4 ml-n3"/>
                                    </div>
                                </div>
                                <center>
                                    <button type={"submit"} className="gradientBtn w-50 animated wow fadeInUp">Lưu
                                    </button>
                                </center>
                            </div>


                        </Form>
                    </Formik>
                </div>
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