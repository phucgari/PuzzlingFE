import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useState} from "react";
import Swal from "sweetalert2";

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
                     style={{marginTop: 6 + 'rem', backgroundColor: "#bef6fd"}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            values.picture = imgUrl;
                            axios
                                .post("http://localhost:8080/puzzling/categories/", values)
                                .then(() => {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Tạo mới thành công!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(r => r.isConfirmed)
                                    navigate("/categories")
                                })
                                .catch(() => {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'Không thành công!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(r => r.isConfirmed)
                                })
                        }}
                        enableReinitialize={true}
                    >
                        <Form>
                            <div style={{textAlign: "center"}}>
                                <h1>Thêm danh mục mới</h1>
                                <hr/>
                            </div>
                            <h5>Thêm ảnh: </h5>
                            <div className="picture-upload" style={{marginTop: 80, marginLeft: 40}}>
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
                                    <h5>Tên danh mục:</h5>
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