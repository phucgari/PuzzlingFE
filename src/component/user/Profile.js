import {Link, useNavigate, useParams} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import * as Yup from "yup";

export default function Profile() {
    const id = JSON.parse(localStorage.getItem("account")).user['id'];
    const [user, setUser] = useState({})
    const [imgUrl, setImgUrl] = useState(null);
    const navigate = useNavigate();
    const [progressPercent, setProgressPercent] = useState(0);
    const initialValues = {
        avatar: user.avatar || "/images/user.png",
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Không được để trống!"),
        email:Yup.string().required("Không được để trống!"),
        phone:Yup.string().required("Không được để trống!")
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/puzzling/users/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);

    return (
        <div className="container">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content rounded-modal shadow p-3 border-0" style={{marginTop: 6 + 'rem'}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            values.avatar = imgUrl;
                            axios.put(`http://localhost:8080/puzzling/users/${JSON.parse(localStorage.getItem("account")).user['id']}`, values)
                                .then(() => {
                                    alert("Sửa thông tin thành công!")
                                })
                                .catch(() => {
                                    alert("Không thành công")
                                })
                        }}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div className={"imageUpload"} style={{textAlign:"center"}}>
                                <label htmlFor={"avatar"}>
                                    <img src={initialValues.avatar} id="profileImage" alt={""}
                                         className="user-profile shadow mx-auto img-fluid rounded-circle mt-n5 mb-1 animated wow pulse"/>
                                </label>
                                <input type="file" id="avatar" name="avatar"
                                       className="user-profile shadow mx-auto img-fluid rounded-circle mt-n5 mb-1 animated wow pulse"
                                       onChange={(event) => uploadAvatar(event)}/>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group input-group w-100 animated wow fadeInDown delay-0-1s">
                                            <div className="input-group-prepend">
                                                <span><img src="/images/left-icon.png" alt={""}/></span>
                                            </div>
                                            <Field type="text" id="recipient-user"
                                                   name={"name"}  placeholder="Họ tên..." value={initialValues.name}
                                                   className="form-control textfield-rounded shadow-sm mb-4 ml-n3" />
                                            <ErrorMessage name={"name"} style={{color:"red"}}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group input-group w-100 animated wow fadeInDown delay-0-2s">
                                            <div className="input-group-prepend">
                                                <span><img src="/images/right-icon.png" className="rotate-180" alt={""}/></span>
                                            </div>
                                            <Field type="text" id="recipient-mobile"
                                                   name={"email"} placeholder="Email..."  value={initialValues.email}
                                                   className="form-control textfield-rounded shadow-sm p-3 mb-4 ml-n3"/>
                                            <ErrorMessage name={"email"} style={{color:"red"}}/>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group input-group w-100 animated wow fadeInDown delay-0-3s">
                                            <div className="input-group-prepend">
                                                <span><img src="/images/right-icon.png" className="rotate-180" alt={""}/></span>
                                            </div>
                                            <Field type="text" id="recipient-adress"
                                                   name={"phone"} placeholder="Số điện thoại..." value={initialValues.phone}
                                                   className="form-control textfield-rounded shadow-sm p-3 mb-4 ml-n3"/>
                                            <ErrorMessage name={"phone"} style={{color:"red"}}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group input-group w-100 animated wow fadeInDown delay-0-4s">
                                            <div className="input-group-prepend">
                                                <span><img src="/images/left-icon.png" alt={""}/></span>
                                            </div>
                                            <select as="select" name={"gender"}
                                                    className="form-control textfield-rounded gender-value shadow-sm mb-4 ml-n3">
                                                <option value={"MALE"}> Nam </option>
                                                <option value={"FEMALE"}>Nữ</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <center>
                                    <button type="button" className="gradientBtn w-50 animated wow fadeInUp">Lưu thông tin</button>
                                </center>
                            </div>
                            <div className="modal-footer border-0 mt-n4">
                                <center>
                                    <p className="text-center mt-3 animated wow fadeInUp">
                                        <Link to={""} data-toggle="modal" data-target="#passModal"
                                              data-whatever="" className="color-blue">
                                            Đổi mật khẩu
                                        </Link>
                                    </p>
                                </center>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {/*</div>*/}
            {/*Change Password Modal*/}
            <ChangePassword/>
        </div>
    )

    function uploadAvatar(event) {
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