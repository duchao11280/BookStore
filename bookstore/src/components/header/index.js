import React from 'react';
import { useNavigate } from 'react-router-dom'
import './style.css';
import constant from './constants';
import logo from '../../assets/imgs/logo2.png';
import menu from '../../assets/icons/menu.png';
import bell from '../../assets/icons/bell.png';
import cart from '../../assets/icons/shopping-cart.png';
import cartColor from '../../assets/icons/shopping-cart-color.png';
import user from '../../assets/icons/user.png';
import search from '../../assets/icons/search.png';
import close from '../../assets/icons/close.png';
import rightArrow from '../../assets/icons/right-arrow.png';
import policy from '../../assets/icons/policy.png';
import shop from '../../assets/icons/shop.png';
import truck from '../../assets/icons/truck.png';
import list from '../../assets/icons/list.png';
import account from '../../assets/icons/account.png';
import logout from '../../assets/icons/logout.png';

export default function Header() {
    const defaultModalState = {
        currentState: constant.MODAL_DEFAULT_STATE,
        previousState: constant.MODAL_DEFAULT_STATE
    }
    const [isLogin, setIsLogin] = React.useState(false);
    const [modalState, setModalState] = React.useState(defaultModalState);
    const [isOpenModalAccount, setIsOpenModalAccount] = React.useState(false);
    const [isOpenCategory, setIsOpenCategory] = React.useState(false);
    const navigate = useNavigate();

    const toggleModalAccount = () => {
        setIsOpenModalAccount(!isOpenModalAccount);
        if (isOpenCategory) {
            setIsOpenCategory(false);
        }

    }

    const redirect = (url) => {
        navigate(url, { replace: true });
        window.scrollTo(0, 0)
    }

    const closeModalAccount = () => {
        setIsOpenModalAccount(false);
        setModalState(defaultModalState);
    }

    const toggleModalCategory = () => {
        setIsOpenCategory(!isOpenCategory);
        if (isOpenModalAccount) {
            setIsOpenModalAccount(false);
        }
    }

    const closeModalCategory = () => {
        setIsOpenCategory(false);
    }

    const changeModal = (state) => {
        setModalState({
            currentState: state,
            previousState: modalState.currentState,
        });
    }

    return (
        <div className="container-header">
            <div className="container">
                <div className='d-flex justify-content-between align-items-center'>
                    <img alt='' className="icon-header-logo" src={logo} onClick={() => redirect('/home')} />
                    <div className={!isOpenCategory ? "container-header-item" : "container-header-item-focus"} onClick={toggleModalCategory}>
                        <img alt='' src={menu} className="icon-header" />
                    </div>
                    <div className="item-header-text">{constant.TITLE_EVENT}</div>
                    <div className="container-header-search">
                        <img alt='' src={search} className="icon-header" />
                        <input className="input-header-search" placeholder={constant.INPUT_SEARCH} />
                    </div>
                    <div className="container-header-item">
                        <img alt='' src={cart} className="icon-header" />
                    </div>
                    <div className="container-header-item" onClick={() => redirect('/test')}>
                        <img alt='' src={bell} className="icon-header" />
                    </div>
                    <div className={!isOpenModalAccount ? "container-header-item" : "container-header-item-focus"} onClick={toggleModalAccount}>
                        <img alt='' src={user} className="icon-header" />
                    </div>
                </div>

                {/* MODAL CATEGORY */}

                {!isOpenCategory || <div className='d-flex justify-content-end align-items-center container-header-item-relative'>
                    <div className='container-header-category-modal'>
                        <div className='row'>
                            <div className="d-flex justify-content-end" >
                                <img alt='' src={close} className="button-icon-header" onClick={closeModalCategory} />
                            </div>
                        </div>
                        <div className='row' style={{ width: '100%' }}>
                            <div className='col-sm-3 mb-3'>
                                <p className='text-category-header-modal'>
                                    Văn học
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 1
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 2
                                </p>
                            </div>
                            <div className='col-sm-3 mb-3'>
                                <p className='text-category-header-modal'>
                                    Văn học
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 1
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 2
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 3
                                </p>
                            </div>
                            <div className='col-sm-3 mb-3'>
                                <p className='text-category-header-modal'>
                                    Văn học
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 1
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 2
                                </p>
                            </div>
                            <div className='col-sm-3 mb-3'>
                                <p className='text-category-header-modal'>
                                    Văn học
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 1
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 2
                                </p>
                            </div>
                            <div className='col-sm-3 mb-3'>
                                <p className='text-category-header-modal'>
                                    Văn học
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 1
                                </p>
                                <p className='text-subcategory-header-modal'>
                                    Văn học 2
                                </p>
                            </div>
                        </div>
                    </div>
                </div>}

                {/* MODAL ACCOUNT */}

                {!isOpenModalAccount || <div className='d-flex justify-content-end align-items-center container-header-item-relative'>

                    {/* MODAL CHO BAN ĐẦU CHO USER */}

                    {modalState.currentState === constant.MODAL_DEFAULT_STATE ?
                        <div className='container-header-account' >
                            <div className="ms-auto mb-2" >
                                <img alt='' src={close} className="button-icon-header" onClick={closeModalAccount} />
                            </div>
                            {!isLogin ? <div className='text-header-account-modal'>
                                {constant.TITLE_LOGIN_INFO_1}
                            </div> : null}
                            {!isLogin ? <div className='button-header-account-modal-primary mt-3' onClick={() => { changeModal(constant.MODAL_LOGIN_STATE) }}>{constant.BUTTON_LOGIN}</div> : null}
                            {!isLogin ? <div className='text-button-header-account-modal-signup'>{constant.TITLE_NOT_ACC}<span onClick={() => { changeModal(constant.MODAL_SIGNUP_STATE) }}>{constant.BUTTON_SIGNUP_NOW}</span></div> : null}
                            {isLogin ? <div className='item-header-account-modal mt-3'>
                                <img alt='' src={account} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_INFO_ACC}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div> : null}
                            {isLogin ? <div className='item-header-account-modal mt-3'>
                                <img alt='' src={list} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_LIST_FAVORITE}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div> : null}
                            <div className='line-header-horizontal' />
                            <div className='item-header-account-modal'>
                                <img alt='' src={cartColor} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_CART}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div>
                            <div className='line-header-horizontal' />
                            <div className='item-header-account-modal'>
                                <img alt='' src={policy} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_POLICY}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div>
                            <div className='item-header-account-modal mt-3'>
                                <img alt='' src={shop} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_SHOP}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div>
                            <div className='item-header-account-modal mt-3'>
                                <img alt='' src={truck} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_DELIVERY}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div>
                            {isLogin ? <div className='line-header-horizontal' /> : null}
                            {isLogin ? <div className='item-header-account-modal'>
                                <img alt='' src={logout} className='icon-header' />
                                <div className='item-text-header-account-modal'>{constant.TITLE_LOGOUT}</div>
                                <img alt='' src={rightArrow} className='item-icon-header-account-modal ms-auto' />
                            </div> : null}
                        </div>
                        : null}

                    {/* MODAL ĐĂNG NHẬP */}

                    {modalState.currentState === constant.MODAL_LOGIN_STATE ?
                        <div className='container-header-account' >
                            <div className="d-flex justify-content-between" style={{ width: '100%' }} >
                                <img alt='' src={rightArrow} className="button-icon-header item-rotate-180" onClick={() => { changeModal(constant.MODAL_DEFAULT_STATE) }} />
                                <img alt='' src={close} className="button-icon-header" onClick={closeModalAccount} />
                            </div>
                            <div className='text-header-account-modal-login mt-5 mb-3'>
                                {constant.TITLE_LOGIN_INFO_2}
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_PHONE} />
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_PASS} />
                            </div>
                            <div className="button-header-account-modal-primary mt-3">{constant.BUTTON_LOGIN}</div>
                            <div className="text-button-header-account-modal-signup mt-3">{constant.TITLE_NOT_ACC}<span onClick={() => { changeModal(constant.MODAL_SIGNUP_STATE) }}>{constant.BUTTON_SIGNUP_NOW}</span></div>
                        </div>
                        : null}

                    {/* MODAL ĐĂNG KÝ */}

                    {modalState.currentState === constant.MODAL_SIGNUP_STATE ?
                        <div className='container-header-account' >
                            <div className="d-flex justify-content-between" style={{ width: '100%' }} >
                                <img alt='' src={rightArrow} className="button-icon-header item-rotate-180" onClick={() => { changeModal(modalState.previousState) }} />
                                <img alt='' src={close} className="button-icon-header" onClick={closeModalAccount} />
                            </div>
                            <div className='text-header-account-modal-login mt-5 mb-3'>
                                {constant.TITLE_SIGNUP_INFO}
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_PHONE} />
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_PASS} />
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_PASS} />
                            </div>
                            <div className="container-input-header-account-modal mt-3 mb-3">
                                <input className="input-header-account-modal" placeholder={constant.INPUT_ADDRESS} />
                            </div>
                            <div className="button-header-account-modal-secondary mt-3">{constant.BUTTON_SIGNUP}</div>
                        </div>
                        : null}
                </div>}
            </div>
        </div>
    )
}