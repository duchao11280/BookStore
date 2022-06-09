import './addbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import settings from '../../../config/settings';
import { getAllCategory, getAllSubCatByCat } from '../../../services/category.services'
import { insertBook } from '../../../services/book.service'
import { ToastContainer, toast } from 'react-toastify';
function Addbook() {
    if (window.sessionStorage.getItem(settings.loginKey.role) !== '0') {
        window.location.replace('/notfound')
    }
    const [bookDetails, setBookDetails] = React.useState({
        auth: null,
        bookId: null,
        bookName: null,
        coverImg: null,
        description: null,
        language: null,
        nxb: null,
        price: null,
        quantity: null,
        sale: null,
        subCatId: null,
        thumbnails: null,
        thumbnailsUrl: null,
        tinyDescription: null,
        year: null
    });
    const [error, setError] = React.useState(false)
    const [textError, setTextError] = React.useState("")
    const [refresh, setRefresh] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [listCategory, setListCategory] = React.useState([]);
    const [listSubCat, setListSubCat] = React.useState([]);
    React.useEffect(() => {
        getAllCategory().then(result => { setListCategory(result); setCategory(result[0].catId) });
    }, [refresh]);

    React.useEffect(() => {
        getAllSubCatByCat(category).then(result => {
            setListSubCat(result);
            if (result.length) {
                setBookDetails({ ...bookDetails, subCatId: result[0].subCatId })
            }
        });
    }, [category])

    const onChangeTextBook = (event, key) => {
        const { target: { name, value } } = event;
        const newBookDetails = { ...bookDetails };
        newBookDetails[key] = value;
        setBookDetails(newBookDetails);
    }

    const converImageUrl = (image) => {
        if (typeof image === 'string' || image == null) {
            return settings.urlImageKey + image
        } else {
            return URL.createObjectURL(image);
        }
    }

    const onImageChange = (event, key) => {
        if (event.target.files && event.target.files[0]) {
            const newBookDetails = { ...bookDetails };
            let img = event.target.files[0];
            newBookDetails[key] = img;
            setBookDetails(newBookDetails);
            // URL.createObjectURL(img)
        }
    }

    const onChangeCat = (e) => {
        const { name, value } = e.target;
        setCategory(value);
    };

    const onChangeSubCat = (e) => {
        const { name, value } = e.target;
        const newBookDetails = { ...bookDetails };
        newBookDetails['catId'] = value;
        setBookDetails(newBookDetails);
    };

    const validate = () => {
        if (bookDetails.cover === null) {
            setTextError("bạn chưa chọn hình ảnh")
            toast.error("bạn chưa chọn hình ảnh ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;;
        }
        else if (bookDetails.thumbnails === null) {
            setTextError("bạn chưa chọn hình ảnh")
            toast.error("bạn chưa chọn hình ảnh ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.bookName === null) {
            setTextError("Tên sách không được để trống")
            toast.error("Tên sách không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.language === null) {
            setTextError("Ngôn ngữ không được để trống")
            toast.error("Ngôn ngữ không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.bookType === null) {
            setTextError("Loại sách chưa được chọn")
            toast.error("Loại sách chưa được chọn ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);

            return true;
        }
        else if (bookDetails.subCatId == null) {
            setTextError("Chưa chọn thể loại")
            toast.error("Chưa chọn thể loại ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.auth === null) {
            setTextError("Tác giả không được để trống")
            toast.error("Tác giả không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.nxb === null) {
            setTextError("Nhà xuất bản không được để trống")
            toast.error("Nhà xuất bản không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.year === null) {
            setTextError("Năm xuất bản không được để trống")
            toast.error("Năm xuất bản không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.quantity === null) {
            setTextError("Số lượng không được để trống")
            toast.error("Số lượng không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.price === null) {
            setTextError("Giá sách không được để trống")
            toast.error("Giá sách không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }

        else if (bookDetails.sale === null) {
            setBookDetails(bookDetails.sale = 0)
            toast.error("Khuyến mãi không được để trống", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else if (bookDetails.description === null) {
            setTextError("Mô tả không được để trống")
            toast.error("Mô tả không được để trống ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            setError(true);
            return true;
        }
        else {
            setTextError("")
            setError(false)
            return false;
        }

    }
    const onSubmit = () => {

        const checkValidated = validate();
        console.log(checkValidated)
        // console.log(bookDetails);
        if (checkValidated === false) {
            insertBook(bookDetails.bookName, bookDetails.auth,
                bookDetails.description, bookDetails.language, bookDetails.year,
                bookDetails.nxb, bookDetails.price, bookDetails.quantity, bookDetails.subCatId,
                bookDetails.sale, bookDetails.cover, bookDetails.thumbnails).then(() => {
                    toast.success(" thêm thành công", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });
                    setBookDetails({
                        auth: null,
                        bookId: null,
                        bookName: null,
                        coverImg: null,
                        description: null,
                        language: null,
                        nxb: null,
                        price: null,
                        quantity: null,
                        sale: null,
                        subCatId: null,
                        thumbnails: null,
                        thumbnailsUrl: null,
                        tinyDescription: null,
                        year: null
                    })
                    setRefresh(!refresh)
                });
        }
        else {
            // toast.error("có lỗi xảy ra ", {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,

            // });
        }

    }

    return (<>
        <div className="container-admin-editbook">
            <Sidebaradmin />
            <div className="content-admin-editbook">
                <div className="body-content-admin-editbook mt-5">
                    <div className="body-header-admin-editbook">
                        <Link to="/admin/book">
                            <i className="fa-solid fa-angle-left"></i>
                        </Link>
                    </div>
                    <div className="main-content-admin-editbook">
                        <div className='row'>
                            <div className='col-4'>
                                <h6>Ảnh đại diện</h6>
                                <div className="d-flex flex-column">
                                    <img className="img-admin-edit-book-thumbnails"
                                        src={converImageUrl(bookDetails.thumbnails)} alt="ảnh sách"
                                    />
                                    <input className='custom-file-input-none' type="file" name="images" id='id-image-thumbnails' multiple accept="image/*" onChange={(event) => onImageChange(event, 'thumbnails')} />
                                    <label className='custom-file-input' htmlFor='id-image-thumbnails'>
                                    </label>
                                    {/* {
                                        (bookDetails.thumbnails == null && error === true) ? <small style={{ color: "red" }}>Bạn chọn ảnh sách</small> : <text></text>
                                    } */}
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className="d-flex flex-column">
                                    <h6>Ảnh bìa</h6>
                                    <div className="d-flex flex-column">
                                        <img className="img-admin-edit-book-cover"
                                            src={converImageUrl(bookDetails.cover)} alt="ảnh sách"
                                        />
                                        <input className='custom-file-input-none' type="file" name="images" id='id-image-cover' multiple accept="image/*" onChange={(event) => onImageChange(event, 'cover')} />
                                        <label className='custom-file-input' htmlFor='id-image-cover'>
                                        </label>
                                        {/* {
                                            (bookDetails.cover == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa chọn ảnh bìa sách</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Tên sách</label>
                                    <div className="col-sm-8">
                                        <TextField label="Tên sách" variant="outlined" style={{ width: '100%' }} value={bookDetails.bookName}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "bookName")
                                            }} />
                                        {/* {
                                            (bookDetails.bookName == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa nhập tên sách</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Ngôn ngữ</label>
                                    <div className="col-sm-8">
                                        <TextField label="Ngôn ngữ" variant="outlined" style={{ width: '100%' }} value={bookDetails.language}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "language")
                                            }} />
                                        {/* {
                                            (bookDetails.language == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa nhập ngôn ngữ</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>

                        </div>
                        <div className='row mt-2'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Thể loại chung</label>
                                    <div className="col-sm-8">
                                        <select className="combobox-book-admin-editbook" value={category}
                                            onChange={onChangeCat}>
                                            {
                                                listCategory.map((category, key) => {
                                                    return (
                                                        <option value={category.catId} key={category.catId}>{category.catName}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Thể loại chi tiết</label>
                                    <div className="col-sm-8">
                                        <select className="combobox-book-admin-editbook" value={bookDetails.catId}
                                            onChange={onChangeSubCat}>
                                            {listSubCat.map((value, key) => {
                                                return (
                                                    <option value={value.subCatId} key={value.subCatId}>{value.subCatName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Tác giả</label>
                                    <div className="col-sm-8">
                                        <TextField label="Tác giả" variant="outlined" style={{ width: '100%' }} value={bookDetails.auth}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "auth")
                                            }} />
                                        {/* {
                                            (bookDetails.auth == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa nhập tác giá</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Nhà xuất bản</label>
                                    <div className="col-sm-8">
                                        <TextField label="Nhà xuất bản" variant="outlined" style={{ width: '100%' }} value={bookDetails.nxb}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "nxb")
                                            }} />
                                        {/* {
                                            (bookDetails.nxb == null && error === true) ? <small style={{ color: "red" }}>bạn chưa nhập nhà xuất bản</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Năm xuất bản</label>
                                    <div className="col-sm-8">
                                        <TextField label="Năm xuất bản" variant="outlined" style={{ width: '100%' }} value={bookDetails.year}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "year")
                                            }} />
                                        {/* {
                                            (bookDetails.year == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa nhập năm xuất bản</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Số lượng</label>
                                    <div className="col-sm-8">
                                        <TextField label="Số lượng" variant="outlined" style={{ width: '100%' }} value={bookDetails.quantity}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "quantity")
                                            }} />
                                        {/* {
                                            (bookDetails.quantity == null && error === true) ? <small style={{ color: "red" }}>bạn chưa nhập số lượng</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Đơn giá</label>
                                    <div className="col-sm-8">
                                        <TextField label="Đơn giá" variant="outlined" style={{ width: '100%' }} value={bookDetails.price}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "price")
                                            }} />
                                        {/* {
                                            (bookDetails.price == null && error === true) ? <small style={{ color: "red" }}>Bạn chưa nhập giá sách</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Tỷ lệ bán</label>
                                    <div className="col-sm-8">
                                        <TextField label="Tỷ lệ bán" variant="outlined" style={{ width: '100%' }} value={bookDetails.sale}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "sale")
                                            }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label h6">Mô tả</label>
                                <div className="col-sm-8">
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={5}
                                        placeholder="Minimum 3 rows"
                                        style={{ width: '100%' }}
                                        value={bookDetails.description}

                                        onChange={(event) => {
                                            onChangeTextBook(event, "description")
                                        }}
                                    />
                                    {/* {
                                        (bookDetails.description == null && error === true) ? <small style={{ color: "red" }}>{textError}</small> : <text></text>
                                    } */}
                                </div>
                                <div className='col' />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <button className='button-admin-edit-book-add-image-submit' style={{ width: "45%" }} onClick={onSubmit}>Thêm sách</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Addbook; 