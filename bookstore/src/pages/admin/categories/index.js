import React, { useState, useEffect } from 'react'
import './style.css'
import constants from './constants';
import Sidebaradmin from '../../../components/sidebaradmin';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ContextAwareToggle from "./component/ContextAwareToggle"
import { groupArrayByKey } from '../../../utls/utilities';
import { getAllCatAndSubCat, insertCategory, updateCategory } from '../../../services/category.services'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify';
const CategoriesManagement = () => {
    const [listCategories, setListCategories] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [currCat, setCurrCat] = useState({ catId: null, catName: '' })
    const [showModalInputCategory, setShowModalInputCategory] = useState(false);
    const [isEditCat, setIsEditCat] = useState(false);
    useEffect(() => {
        getAllCatAndSubCat()
            .then(result => setListCategories(groupArrayByKey(result, 'catName')))
            .catch(() => { setListCategories([]) })
    }, [refresh])
    const onEditSubCat = (id) => {
        toast.success("response?.message", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const handleOnAddCategory = () => {
        setShowModalInputCategory(true)
    }
    const handleOnEditCategory = (item) => {
        setIsEditCat(true);

        setCurrCat({
            catId: item.catId,
            catName: item.catName

        });
        setShowModalInputCategory(true);
    }
    const handleCloseModalInputCategory = () => {
        setCurrCat({ catId: null, catName: '' })
        setIsEditCat(false);
        setShowModalInputCategory(false);
    }

    const ModelInputCategory = () => {
        const [valueInput, setValueInput] = useState(isEditCat ? currCat : { catName: '' })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setValueInput({
                ...valueInput,
                [name]: value,
            });
        };

        const handleSubmit = (event) => {
            if (isEditCat) {

                event.preventDefault();
                updateCategory(valueInput.catId, valueInput.catName)
                    .then((response) => {
                        setRefresh(!refresh)

                    })
                    .catch(() => {
                        alert("Xảy ra lỗi, vui lòng thử lại sau")
                    })
                    .finally(() => {
                        handleCloseModalInputCategory()
                    })
            } else {

                event.preventDefault();
                insertCategory(valueInput.catName)
                    .then((response) => {
                        setRefresh(!refresh)
                    })
                    .catch(() => {
                        alert("Xảy ra lỗi, vui lòng thử lại sau")
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
                        <Modal.Title>{isEditCat ? "Edit" : "Thêm thể loại"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="m-2">

                        <Form.Group className="mb-3" controlId="input_content">
                            <Form.Label><div className="label-modal-cat">{constants.TITLE_NAME_CATEGORY}</div></Form.Label>
                            <Form.Control
                                required
                                name="catName"
                                placeholder="Nhập tên thể loại"
                                rows={5}
                                value={valueInput.catName}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên thể loại
                        </Form.Control.Feedback>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" type="submit" >Đồng ý</Button>
                            <Button variant="secondary" onClick={() => handleCloseModalInputCategory()} style={{ marginLeft: "10px" }}>
                                Hủy bỏ
                        </Button>

                        </div>

                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

    return (
        <div>
            <ToastContainer />
            <div className="d-flex flex-row container-categories">

                <Sidebaradmin />
                <div className="container-manage-categories">
                    <div className="d-flex flex-row mt-lg-3 mb-lg-5">

                        <div className="d-flex align-items-center text-title-CatManagement">{constants.TITLE_CATEGORY} </div>
                        <button className="btn d-flex align-items-center" onClick={() => handleOnAddCategory()}><div className="btn-add-cat"> +</div></button>
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
                                                    <button className="btn d-flex align-items-center"><div className="btn-add-cat"> +</div></button>
                                                    <button className="btn" onClick={() => { handleOnEditCategory(listCategories[category][0]) }} style={{ color: "#3179bc" }}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="btn" onClick={() => { }} style={{ color: "#ff0000" }}><i className="fa fa-ban" aria-hidden="true"></i></button>

                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i}>
                                            <Card.Body>
                                                {listCategories[category].map((subcategory, key) => {
                                                    if (subcategory.subCatId !== null) {
                                                        return (
                                                            <div key={key}>
                                                                <ItemSubCat subCat={subcategory} onEditSubCat={onEditSubCat} />
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
            <div className="col-1 d-flex flex-row">
                <button className="btn col-6 p-1" onClick={() => { props.onEditSubCat(subCat.subCatId) }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className=" btn col-6 mr-3 p-1" onClick={() => { }}>
                    <i className="fa fa-ban" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}
export default CategoriesManagement
