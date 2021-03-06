import './addbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import settings from '../../../config/settings';
import { getAllCategory, getAllSubCatByCat } from '../../../services/category.services'
import { insertBook } from '../../../services/book.service'
import { ToastContainer, toast } from 'react-toastify';
function Addbook() {
    const navigate = useNavigate();
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
            setTextError("b???n ch??a ch???n h??nh ???nh")
            toast.error("b???n ch??a ch???n h??nh ???nh ", {
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
            setTextError("b???n ch??a ch???n h??nh ???nh")
            toast.error("b???n ch??a ch???n h??nh ???nh ", {
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
            setTextError("T??n s??ch kh??ng ???????c ????? tr???ng")
            toast.error("T??n s??ch kh??ng ???????c ????? tr???ng ", {
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
            setTextError("Ng??n ng??? kh??ng ???????c ????? tr???ng")
            toast.error("Ng??n ng??? kh??ng ???????c ????? tr???ng ", {
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
            setTextError("Lo???i s??ch ch??a ???????c ch???n")
            toast.error("Lo???i s??ch ch??a ???????c ch???n ", {
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
            setTextError("Ch??a ch???n th??? lo???i")
            toast.error("Ch??a ch???n th??? lo???i ", {
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
            setTextError("T??c gi??? kh??ng ???????c ????? tr???ng")
            toast.error("T??c gi??? kh??ng ???????c ????? tr???ng ", {
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
            setTextError("Nh?? xu???t b???n kh??ng ???????c ????? tr???ng")
            toast.error("Nh?? xu???t b???n kh??ng ???????c ????? tr???ng ", {
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
            setTextError("N??m xu???t b???n kh??ng ???????c ????? tr???ng")
            toast.error("N??m xu???t b???n kh??ng ???????c ????? tr???ng ", {
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
            setTextError("S??? l?????ng kh??ng ???????c ????? tr???ng")
            toast.error("S??? l?????ng kh??ng ???????c ????? tr???ng ", {
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
            setTextError("Gi?? s??ch kh??ng ???????c ????? tr???ng")
            toast.error("Gi?? s??ch kh??ng ???????c ????? tr???ng ", {
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
            toast.error("Khuy???n m??i kh??ng ???????c ????? tr???ng", {
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
            setTextError("M?? t??? kh??ng ???????c ????? tr???ng")
            toast.error("M?? t??? kh??ng ???????c ????? tr???ng ", {
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
                    toast.success("Th??m th??nh c??ng", {
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
                    navigate(-1)
                    setRefresh(!refresh)
                });
        }
        else {
            // toast.error("c?? l???i x???y ra ", {
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
                                <h6>???nh ?????i di???n</h6>
                                <div className="d-flex flex-column">
                                    <img className="img-admin-edit-book-thumbnails"
                                        src={converImageUrl(bookDetails.thumbnails)} alt="???nh s??ch"
                                    />
                                    <input className='custom-file-input-none' type="file" name="images" id='id-image-thumbnails' multiple accept="image/*" onChange={(event) => onImageChange(event, 'thumbnails')} />
                                    <label className='custom-file-input' htmlFor='id-image-thumbnails'>
                                    </label>
                                    {/* {
                                        (bookDetails.thumbnails == null && error === true) ? <small style={{ color: "red" }}>B???n ch???n ???nh s??ch</small> : <text></text>
                                    } */}
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className="d-flex flex-column">
                                    <h6>???nh b??a</h6>
                                    <div className="d-flex flex-column">
                                        <img className="img-admin-edit-book-cover"
                                            src={converImageUrl(bookDetails.cover)} alt="???nh s??ch"
                                        />
                                        <input className='custom-file-input-none' type="file" name="images" id='id-image-cover' multiple accept="image/*" onChange={(event) => onImageChange(event, 'cover')} />
                                        <label className='custom-file-input' htmlFor='id-image-cover'>
                                        </label>
                                        {/* {
                                            (bookDetails.cover == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a ch???n ???nh b??a s??ch</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">T??n s??ch</label>
                                    <div className="col-sm-8">
                                        <TextField label="T??n s??ch" variant="outlined" style={{ width: '100%' }} value={bookDetails.bookName}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "bookName")
                                            }} />
                                        {/* {
                                            (bookDetails.bookName == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a nh???p t??n s??ch</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Ng??n ng???</label>
                                    <div className="col-sm-8">
                                        <TextField label="Ng??n ng???" variant="outlined" style={{ width: '100%' }} value={bookDetails.language}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "language")
                                            }} />
                                        {/* {
                                            (bookDetails.language == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a nh???p ng??n ng???</small> : <text></text>
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
                                    <label className="col-sm-4 col-form-label h6">Th??? lo???i chung</label>
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
                                    <label className="col-sm-4 col-form-label h6">Th??? lo???i chi ti???t</label>
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
                                    <label className="col-sm-4 col-form-label h6">T??c gi???</label>
                                    <div className="col-sm-8">
                                        <TextField label="T??c gi???" variant="outlined" style={{ width: '100%' }} value={bookDetails.auth}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "auth")
                                            }} />
                                        {/* {
                                            (bookDetails.auth == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a nh???p t??c gi??</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Nh?? xu???t b???n</label>
                                    <div className="col-sm-8">
                                        <TextField label="Nh?? xu???t b???n" variant="outlined" style={{ width: '100%' }} value={bookDetails.nxb}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "nxb")
                                            }} />
                                        {/* {
                                            (bookDetails.nxb == null && error === true) ? <small style={{ color: "red" }}>b???n ch??a nh???p nh?? xu???t b???n</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">N??m xu???t b???n</label>
                                    <div className="col-sm-8">
                                        <TextField label="N??m xu???t b???n" variant="outlined" style={{ width: '100%' }} value={bookDetails.year}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "year")
                                            }} />
                                        {/* {
                                            (bookDetails.year == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a nh???p n??m xu???t b???n</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">S??? l?????ng</label>
                                    <div className="col-sm-8">
                                        <TextField label="S??? l?????ng" variant="outlined" style={{ width: '100%' }} value={bookDetails.quantity}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "quantity")
                                            }} />
                                        {/* {
                                            (bookDetails.quantity == null && error === true) ? <small style={{ color: "red" }}>b???n ch??a nh???p s??? l?????ng</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">????n gi??</label>
                                    <div className="col-sm-8">
                                        <TextField label="????n gi??" variant="outlined" style={{ width: '100%' }} value={bookDetails.price}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "price")
                                            }} />
                                        {/* {
                                            (bookDetails.price == null && error === true) ? <small style={{ color: "red" }}>B???n ch??a nh???p gi?? s??ch</small> : <text></text>
                                        } */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">T??? l??? b??n</label>
                                    <div className="col-sm-8">
                                        <TextField label="T??? l??? b??n" variant="outlined" style={{ width: '100%' }} value={bookDetails.sale}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "sale")
                                            }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label h6">M?? t???</label>
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
                            <button className='button-admin-edit-book-add-image-submit' style={{ width: "45%" }} onClick={onSubmit}>Th??m s??ch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Addbook; 