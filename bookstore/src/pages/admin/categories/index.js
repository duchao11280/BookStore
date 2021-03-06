import React, { useState, useEffect } from 'react'
import './style.css'
import constants from './constants';
import Sidebaradmin from '../../../components/sidebaradmin';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ContextAwareToggle from "./component/ContextAwareToggle"
import { groupArrayByKey } from '../../../utls/utilities';
import { getAllCatAndSubCat, insertCategory, updateCategory, insertSubCategory, updateSubCategory, disableCat, disableSubCat } from '../../../services/category.services'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify';
import settings from '../../../config/settings';

const CategoriesManagement = () => {
    if (window.sessionStorage.getItem(settings.loginKey.role) != '0') {
        window.location.replace('/notfound')
    }
    const [listCategories, setListCategories] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [currCat, setCurrCat] = useState({ catId: null, catName: '' })
    const [showModalInputCategory, setShowModalInputCategory] = useState(false);
    const [isEditCat, setIsEditCat] = useState(false);
    const [isEditSubCat, setIsEditSubCat] = useState(false);
    const [currSubCat, setCurrSubCat] = useState({ subCatId: null, subCatName: '' })
    const [showModalInputSubCategory, setShowModalInputSubCategory] = useState(false);
    const [currCatId, setCurrCatId] = useState(null)
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [isDeleteCat, setIsDeleteCat] = useState(false);
    const [currCatToDelete, setCurrCatToDelete] = useState(null)
    const [currSubCatToDelete, setCurrSubCatToDelete] = useState(null)

    useEffect(() => {
        getAllCatAndSubCat()
            .then(result => setListCategories(groupArrayByKey(result, 'catName')))
            .catch(() => { setListCategories([]) })
    }, [refresh])


    const handleOnAddCategory = () => {
        setShowModalInputCategory(true)
    }

    const handleOnEditCategory = (item) => {
        setIsEditCat(true);
        setCurrCat({
            catId: item.catId,
            catName: item.catName,
            thumbnails: item.thumbnails,
        });
        setShowModalInputCategory(true);
    }
    const handleCloseModalInputCategory = () => {
        setCurrCat({ catId: null, catName: '' })
        setIsEditCat(false);
        setShowModalInputCategory(false);
    }

    // Sub cat
    const handleOnAddSubCategory = (id) => {
        setCurrCatId(id);
        setShowModalInputSubCategory(true)
    }
    const handleOnEditSubCategory = (item) => {
        setIsEditSubCat(true);

        setCurrSubCat({
            subCatId: item.subCatId,
            subCatName: item.subCatName

        });
        setShowModalInputSubCategory(true);
    }
    const handleCloseModalInputSubCategory = () => {
        setCurrSubCat({ subCatId: null, subCatName: '' })
        setIsEditSubCat(false);
        setCurrCatId(null)
        setShowModalInputSubCategory(false);
    }
    const handleShowAlertDeleteCat = (id) => {
        setCurrCatToDelete(id);
        setIsDeleteCat(true)
        setShowModalAlert(true)
    }
    const handleShowAlertDeleteSubCat = (id) => {
        setCurrSubCatToDelete(id);
        setIsDeleteCat(false)
        setShowModalAlert(true)
    }
    const handleCloseAlert = () => {
        setCurrCatToDelete(null)
        setCurrSubCatToDelete(null)
        setShowModalAlert(false);
    }
    const ModelInputCategory = () => {
        const [valueInput, setValueInput] = useState(isEditCat ? currCat : { catName: '', thumbnails: null })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setValueInput({
                ...valueInput,
                [name]: value,
            });
        };
        const converImageUrl = (image) => {
            if (typeof image === 'string' || image == null) {
                return settings.urlImageKey + image
            } else {
                return URL.createObjectURL(image);
            }
        }
        const onImageChange = (event, key) => {
            if (event.target.files && event.target.files[0]) {
                const newCategory = { ...valueInput };
                let img = event.target.files[0];
                newCategory.thumbnails = img;
                setValueInput(newCategory);
                // URL.createObjectURL(img)
            }
        }
        const handleSubmit = (event) => {
            if (isEditCat) {

                event.preventDefault();
                updateCategory(valueInput.catId, valueInput.catName, valueInput.thumbnails)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseModalInputCategory()
                    })
            } else {

                event.preventDefault();
                insertCategory(valueInput.catName, valueInput.thumbnails)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseModalInputCategory()
                    })
                handleCloseModalInputCategory()
            }
        };
        return (
            <Modal
                show={showModalInputCategory}
                onHide={handleCloseModalInputCategory}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={handleSubmit} >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditCat ? "Ch???nh s???a th??? lo???i" : "Th??m th??? lo???i"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="m-2">

                        <Form.Group className="mb-3" controlId="input_content">
                            <Form.Label><div className="label-modal-cat">{constants.TITLE_NAME_CATEGORY}</div></Form.Label>
                            <Form.Control
                                required
                                name="catName"
                                placeholder="Nh???p t??n th??? lo???i"
                                rows={5}
                                value={valueInput.catName}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p t??n th??? lo???i
                        </Form.Control.Feedback>
                        </Form.Group>
                        <div className='col-4'>
                            <h6>???nh ?????i di???n</h6>
                            <div className="d-flex flex-column">
                                <img className="img-admin-edit-book-thumbnails"
                                    src={converImageUrl(valueInput.thumbnails)} alt="???nh th??? lo???i"
                                />
                                <input type="file"
                                    required={valueInput.thumbnails !== null ? false : true}
                                    name="thumbnails"
                                    id='id-image-thumbnails'
                                    accept="image/*"
                                    onChange={(event) => onImageChange(event, 'thumbnails')} />


                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" type="submit" >?????ng ??</Button>
                            <Button variant="secondary" onClick={() => handleCloseModalInputCategory()} style={{ marginLeft: "10px" }}>
                                H???y b???
                        </Button>

                        </div>

                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    const ModelInputSubCategory = () => {
        const [valueInput, setValueInput] = useState(isEditSubCat ? currSubCat : { subCatName: '' })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setValueInput({
                ...valueInput,
                [name]: value,
            });
        };

        const handleSubmitSub = (event) => {
            if (isEditSubCat) {

                event.preventDefault();
                updateSubCategory(valueInput.subCatId, valueInput.subCatName)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseModalInputSubCategory()
                    })
            } else {

                event.preventDefault();
                insertSubCategory(currCatId, valueInput.subCatName)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseModalInputSubCategory()
                    })
                handleCloseModalInputSubCategory()
            }
        };
        return (
            <Modal
                show={showModalInputSubCategory}
                onHide={handleCloseModalInputSubCategory}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={handleSubmitSub} >
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditSubCat ? "Ch???nh s???a th??? lo???i con" : "Th??m th??? lo???i con"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="m-2">

                        <Form.Group className="mb-3" controlId="input_content">
                            <Form.Label><div className="label-modal-cat">{constants.TITLE_NAME_SUBCATEGORY}</div></Form.Label>
                            <Form.Control
                                required
                                name="subCatName"
                                placeholder="Nh???p t??n th??? lo???i con"
                                rows={5}
                                value={valueInput.subCatName}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui l??ng nh???p t??n th??? lo???i con
                        </Form.Control.Feedback>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" type="submit" >?????ng ??</Button>
                            <Button variant="secondary" onClick={() => handleCloseModalInputSubCategory()} style={{ marginLeft: "10px" }}>
                                H???y b???
                        </Button>

                        </div>

                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    const ModelAlert = () => {
        const handleDelete = () => {
            if (isDeleteCat) {
                disableCat(currCatToDelete)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseAlert()
                    })
            } else {
                disableSubCat(currSubCatToDelete)
                    .then((response) => {
                        setRefresh(!refresh)
                        toast.success(response?.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch(() => {
                        toast.warn('H??? th???ng x???y ra l???i! Vui l??ng th??? l???i sau', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .finally(() => {
                        handleCloseAlert()
                    })
            }
        }
        return (
            <Modal
                show={showModalAlert}
                onHide={handleCloseAlert}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>C???nh b??o!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="box_image_inmodal">
                        L??u ??: Khi x??a {isDeleteCat ? "th??? lo???i" : "th??? lo???i con"} th?? s??? x??a c??c s??ch li??n quan. B???n v???n mu???n X??a?
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleDelete() }}>?????ng ??</Button>
                    <Button variant="secondary" onClick={() => handleCloseAlert()}>
                        H???y b???
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <div>
            <ToastContainer />
            <div className="d-flex flex-row container-categories pb-5">

                <Sidebaradmin />
                <div className="container-manage-categories">
                    <div className="d-flex flex-row mt-lg-3 mb-lg-5">

                        <div className="d-flex align-items-center text-title-CatManagement">{constants.TITLE_CATEGORY} </div>
                        <button className="btn d-flex align-items-center" title="Th??m th??? lo???i" onClick={() => handleOnAddCategory()}><div className="btn-add-cat"> +</div></button>
                    </div>
                    <Accordion>
                        {
                            Object.keys(listCategories).map((category, i) => {
                                return (
                                    <Card key={i} className="mt-3">
                                        <Card.Header>
                                            <div className="d-flex justify-content-between flex-row">
                                                <div className="col-9">

                                                    {category}
                                                </div>
                                                <div className="col-3 d-flex flex-row justify-content-end">
                                                    <ContextAwareToggle eventKey={i}>_</ContextAwareToggle>
                                                    <button className="btn d-flex align-items-center" title="Th??m th??? lo???i con" onClick={() => handleOnAddSubCategory(listCategories[category][0].catId)}><div className="btn-add-cat"> +</div></button>
                                                    <button className="btn" title="S???a t??n th??? lo???i" onClick={() => { handleOnEditCategory(listCategories[category][0]) }} style={{ color: "#3179bc" }}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="btn" title="X??a th??? lo???i" onClick={() => { handleShowAlertDeleteCat(listCategories[category][0].catId) }} style={{ color: "#ff0000" }}><i className="fa-solid fa-trash-can"></i></button>

                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i}>
                                            <Card.Body>
                                                {listCategories[category].map((subcategory, key) => {
                                                    if (subcategory.subCatId !== null) {
                                                        return (
                                                            <div key={key}>
                                                                <ItemSubCat
                                                                    subCat={subcategory}
                                                                    onEditSubCat={handleOnEditSubCategory}
                                                                    handleShowAlertDeleteSubCat={handleShowAlertDeleteSubCat}
                                                                />
                                                            </div>
                                                        )
                                                    }

                                                })}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })
                        }

                    </Accordion>
                    <ModelInputCategory />
                    <ModelInputSubCategory />
                    <ModelAlert />
                </div>
            </div>
        </div>
    )
}
const ItemSubCat = (props) => {
    let subCat = props.subCat;

    return (
        <div className="container-item-subcat-category d-flex flex-row p-3">
            <div className="col-11">
                {subCat.subCatName}
            </div>
            <div className="col-1 d-flex flex-row" >
                <button className="btn col-6 p-1" title="S???a t??n th??? lo???i con" style={{ color: "#3179bc" }} onClick={() => { props.onEditSubCat(subCat); }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className=" btn col-6 mr-3 p-1" title="X??a th??? lo???i con" style={{ color: "#ff0000" }} onClick={() => { props.handleShowAlertDeleteSubCat(subCat.subCatId) }}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    )
}
export default CategoriesManagement
