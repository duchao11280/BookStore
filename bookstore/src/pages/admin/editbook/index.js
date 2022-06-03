import './editbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom';
import { getDetailBookById } from '../../../services/book.service'
import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import settings from '../../../config/settings';
import { getAllCategory, getAllSubCatByCat } from '../../../services/category.services'
import { updateBook } from '../../../services/book.service'
import { ToastContainer, toast } from 'react-toastify';
function Editbook() {
    if (window.sessionStorage.getItem(settings.loginKey.role) !== '0') {
        window.location.replace('/notfound')
    }
    const { id } = useParams();
    const [bookDetails, setBookDetails] = React.useState({
        auth: null,
        bookId: id,
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
        year: null,
    });
    const [refresh, setRefresh] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [listCategory, setListCategory] = React.useState([]);
    const [listSubCat, setListSubCat] = React.useState([]);
    React.useEffect(() => {
        getDetailBookById(id).then(result => { setBookDetails(result.data); });
        getAllCategory().then(result => setListCategory(result));
    }, [])

    React.useEffect(() => {
        getAllSubCatByCat(category).then(result => setListSubCat(result));
    }, [category])

    const onChangeTextBook = (event, key) => {
        const { target: { name, value } } = event;
        const newBookDetails = { ...bookDetails };
        newBookDetails[key] = value;
        setBookDetails(newBookDetails);
    }

    const converImageUrl = (image) => {


        if (typeof image === 'string' || image == null) {
            return image
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

    const onSubmit = () => {


        updateBook(bookDetails.bookId, bookDetails.bookName, bookDetails.auth,
            bookDetails.description, bookDetails.language, bookDetails.year,
            bookDetails.nxb, bookDetails.price, bookDetails.quantity, bookDetails.subCatId,
            bookDetails.sale, bookDetails.coverImg, bookDetails.thumbnails, bookDetails.coverUrl, bookDetails.thumbnailsUrl).then(() => {
                toast.success("cập nhật thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
                setRefresh(!refresh)
            });
    }

    return (<>
        <div className="container-admin-editbook">
            <Sidebaradmin />
            <div className="content-admin-editbook">
                <h3>Cập nhật sách</h3>
                <div className="body-content-admin-editbook">
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
                                        src={converImageUrl(bookDetails.thumbnailsUrl)} alt="ảnh sách"
                                    />
                                    <input className='custom-file-input-none' type="file" name="images" id='id-image-thumbnails' multiple accept="image/*" onChange={(event) => onImageChange(event, 'thumbnailsUrl')} />
                                    <label className='custom-file-input' htmlFor='id-image-thumbnails'>
                                    </label>
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className="d-flex flex-column">
                                    <h6>Ảnh bìa</h6>
                                    <div className="d-flex flex-column">
                                        <img className="img-admin-edit-book-cover"
                                            src={converImageUrl(bookDetails.coverUrl)} alt="ảnh sách"
                                        />
                                        <input className='custom-file-input-none' type="file" name="images" id='id-image-cover' multiple accept="image/*" onChange={(event) => onImageChange(event, 'coverUrl')} />
                                        <label className='custom-file-input' htmlFor='id-image-cover'>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Tên sách</label>
                                    <div className="col-sm-8">
                                        <TextField label="Tên sách" variant="outlined" style={{ width: '100%' }} defaultValue="Tên sách" value={bookDetails.bookName}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "bookName")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Ngôn ngữ</label>
                                    <div className="col-sm-8">
                                        <TextField label="Ngôn ngữ" variant="outlined" style={{ width: '100%' }} value={bookDetails.language} defaultValue="Ngôn ngữ"
                                            onChange={(event) => {
                                                onChangeTextBook(event, "language")
                                            }} />
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
                                        <TextField label="Tác giả" variant="outlined" style={{ width: '100%' }} defaultValue="Tác giả" value={bookDetails.auth}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "auth")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Nhà xuất bản</label>
                                    <div className="col-sm-8">
                                        <TextField label="Nhà xuất bản" variant="outlined" style={{ width: '100%' }} defaultValue="Nhà xuất bản" value={bookDetails.nxb}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "nxb")
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Năm xuất bản</label>
                                    <div className="col-sm-8">
                                        <TextField label="Năm xuất bản" variant="outlined" style={{ width: '100%' }} defaultValue="Năm xuất bản" value={bookDetails.year}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "year")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Số lượng</label>
                                    <div className="col-sm-8">
                                        <TextField label="Số lượng" variant="outlined" style={{ width: '100%' }} defaultValue="Số lượng" value={bookDetails.quantity}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "quantity")
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Đơn giá</label>
                                    <div className="col-sm-8">
                                        <TextField label="Đơn giá" variant="outlined" style={{ width: '100%' }} defaultValue="Đơn giá" value={bookDetails.price}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "price")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Tỷ lệ bán</label>
                                    <div className="col-sm-8">
                                        <TextField label="Tỷ lệ bán" variant="outlined" style={{ width: '100%' }} defaultValue="Giảm giá" value={bookDetails.sale}
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
                                        defaultValue={bookDetails.description}
                                        onChange={(event) => {
                                            onChangeTextBook(event, "description")
                                        }}
                                    />
                                </div>
                                <div className='col' />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <button className='button-admin-edit-book-add-image-submit' onClick={onSubmit}>Chỉnh sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Editbook; 