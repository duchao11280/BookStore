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
        getAllCategory().then(result => setListCategory(result));
        getDetailBookById(id).then(result => { setBookDetails(result.data); setCategory(result.data.catId) });

    }, [])

    React.useEffect(() => {
        getAllSubCatByCat(category).then(result => {
            setListSubCat(result);
            let index = checkExistSubCatId(result, bookDetails.subCatId);
            if (index >= 0) {
                setBookDetails({ ...bookDetails, subCatId: result[index].subCatId })
            } else
                setBookDetails({ ...bookDetails, subCatId: result[0].subCatId })

        });
    }, [category])
    const checkExistSubCatId = (arr, subCatId) => {
        if (arr == null) {
            return -1;
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].subCatId === subCatId) {
                return i;
            }
        }
        return -1;
    }
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
        newBookDetails['subCatId'] = value;
        setBookDetails(newBookDetails);
    };

    const onSubmit = () => {

        updateBook(bookDetails.bookId, bookDetails.bookName, bookDetails.auth,
            bookDetails.description, bookDetails.language, bookDetails.year,
            bookDetails.nxb, bookDetails.price, bookDetails.quantity, bookDetails.subCatId,
            bookDetails.sale, bookDetails.coverImg, bookDetails.thumbnails, bookDetails.coverUrl, bookDetails.thumbnailsUrl).then(() => {
                toast.success("c???p nh???t th??nh c??ng", {
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
                <h3>C???p nh???t s??ch</h3>
                <div className="body-content-admin-editbook">
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
                                        src={converImageUrl(bookDetails.thumbnailsUrl)} alt="???nh s??ch"
                                    />
                                    <input className='custom-file-input-none' type="file" name="images" id='id-image-thumbnails' multiple accept="image/*" onChange={(event) => onImageChange(event, 'thumbnailsUrl')} />
                                    <label className='custom-file-input' htmlFor='id-image-thumbnails'>
                                    </label>
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className="d-flex flex-column">
                                    <h6>???nh b??a</h6>
                                    <div className="d-flex flex-column">
                                        <img className="img-admin-edit-book-cover"
                                            src={converImageUrl(bookDetails.coverUrl)} alt="???nh s??ch"
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
                                    <label className="col-sm-4 col-form-label h6">T??n s??ch</label>
                                    <div className="col-sm-8">
                                        <TextField label="T??n s??ch" variant="outlined" style={{ width: '100%' }} defaultValue="T??n s??ch" value={bookDetails.bookName}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "bookName")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Ng??n ng???</label>
                                    <div className="col-sm-8">
                                        <TextField label="Ng??n ng???" variant="outlined" style={{ width: '100%' }} value={bookDetails.language} defaultValue="Ng??n ng???"
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
                                        <select className="combobox-book-admin-editbook" value={bookDetails.subCatId}
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
                                        <TextField label="T??c gi???" variant="outlined" style={{ width: '100%' }} defaultValue="T??c gi???" value={bookDetails.auth}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "auth")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">Nh?? xu???t b???n</label>
                                    <div className="col-sm-8">
                                        <TextField label="Nh?? xu???t b???n" variant="outlined" style={{ width: '100%' }} defaultValue="Nh?? xu???t b???n" value={bookDetails.nxb}
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
                                    <label className="col-sm-4 col-form-label h6">N??m xu???t b???n</label>
                                    <div className="col-sm-8">
                                        <TextField label="N??m xu???t b???n" variant="outlined" style={{ width: '100%' }} defaultValue="N??m xu???t b???n" value={bookDetails.year}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "year")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">S??? l?????ng</label>
                                    <div className="col-sm-8">
                                        <TextField label="S??? l?????ng" variant="outlined" style={{ width: '100%' }} defaultValue="S??? l?????ng" value={bookDetails.quantity}
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
                                    <label className="col-sm-4 col-form-label h6">????n gi??</label>
                                    <div className="col-sm-8">
                                        <TextField label="????n gi??" variant="outlined" style={{ width: '100%' }} defaultValue="????n gi??" value={bookDetails.price}
                                            onChange={(event) => {
                                                onChangeTextBook(event, "price")
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-1' />
                            <div className='col-sm-5'>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label h6">T??? l??? b??n</label>
                                    <div className="col-sm-8">
                                        <TextField label="T??? l??? b??n" variant="outlined" style={{ width: '100%' }} defaultValue="Gi???m gi??" value={bookDetails.sale}
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
                            <button className='button-admin-edit-book-add-image-submit' style={{ width: '45%' }} onClick={onSubmit}>Ch???nh s???a</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Editbook; 