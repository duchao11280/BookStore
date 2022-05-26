import React, { useEffect, useState } from 'react'
import './style.css'
import favoriteIcon from '../../assets/icons/favorite.png';
import isFavoritedIcon from '../../assets/icons/isFavorited.png'
import nextIcon from '../../assets/icons/next.png'
import previousIcon from '../../assets/icons/previous.png'
import settings from '../../config/settings';
import RatingStar from "react-rating-stars-component";
import constants from './constants'
import CardBook from './CardBook/index'
import Slider from "react-slick";
import cardplusIcon from '../../assets/icons/cart-plus.png'
import testData from './testData'
import { getDetailBookById, getRelatedBooks } from '../../services/book.service'
import { getRatingByBookId, insertRating, updateRating } from '../../services/rating.service'
import { useParams, useNavigate } from 'react-router-dom'
import { formatDateWithString } from '../../utls/datetime'
import { checkFavorited, deleteFavorite, insertFavorite } from '../../services/favoritelist.service'
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from 'react-use-cart'
export default function DetailsBook() {
    let { id } = useParams()
    const { addItem } = useCart()
    const [book, setBook] = useState({
        bookId: null,
        bookName: "",
        nxb: "",
        auth: "",
        year: null,
        price: null,
        quantity: null,
        sale: null,
        description: "",
        thumbnails: "",
        thumbnailsUrl: "",
        numberOfRating: 0,
        avgRating: 5
    })
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true)
    const [listRating, setListRating] = useState([]);
    const [myRating, setMyRating] = useState({ rate: 0, content: "" });
    const [hasRating, setHasRating] = useState(true)
    const [quantityOrder, setQuantityOrder] = useState(1);
    const [isFavorited, setIsFavorited] = useState(false)
    const [listBookRelated, setListBookRelated] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const bookById = await getDetailBookById(id)
            if (bookById.status) {
                setBook({ ...book, ...bookById.data })
            }
            const allRatingByBookId = await getRatingByBookId(id);
            if (allRatingByBookId.status) {
                setListRating(allRatingByBookId.data)
                setBook({
                    ...bookById.data,
                    numberOfRating: allRatingByBookId.data.length,
                    avgRating: allRatingByBookId.avgRating
                })
            } else {
                setListRating([])
            }
            const bookRelated = await getRelatedBooks(id, bookById.data?.subCatId)
            if (bookRelated.status) {
                setListBookRelated(bookRelated.data)
            }
            if (window.sessionStorage.getItem(settings.loginKey.isLogin) === 'true') {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
            setIsLoading(false)
        })();
    }, [refresh])

    useEffect(() => {
        (async () => {
            if (isLogin === true) {
                let userid = window.sessionStorage.getItem(settings.loginKey.userId)
                let getMyRating = listRating.filter((rating) => { return rating.userId == userid })
                if (getMyRating.length != 0) {
                    setHasRating(true)
                    setMyRating(getMyRating[0]);
                } else {
                    setHasRating(false);
                }
                let checkWish = await checkFavorited(id, userid)
                if (checkWish.status) {

                    setIsFavorited(checkWish.isFavorited)
                }
            }
        })()
    }, [isLogin, listRating])
    const onIncreasingQuantityOrder = () => {
        if (quantityOrder >= 0 && quantityOrder <= book.quantity)
            setQuantityOrder(quantityOrder + 1)
    }
    const onDecreasingQuantityOrder = () => {
        if (quantityOrder >= 0 && quantityOrder <= book.quantity)
            setQuantityOrder(quantityOrder - 1)
    }
    const onClickToLogin = () => {
        document.getElementById("login-header").click();
    }

    const onFavorite = () => {
        insertFavorite(window.sessionStorage.getItem(settings.loginKey.userId), id)
            .then((response) => {
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRefresh(!refresh)
            })
            .catch((error) => {
                toast.warn('Hệ thống xảy ra lỗi! Vui lòng thử lại sau', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
    const onDeleteFavorite = () => {
        deleteFavorite(window.sessionStorage.getItem(settings.loginKey.userId), id)
            .then((response) => {
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRefresh(!refresh)
            })
            .catch((error) => {
                toast.warn('Hệ thống xảy ra lỗi! Vui lòng thử lại sau', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
    const addItemToCart = () => {
        addItem({ id: book.bookId, price: book.price }, quantityOrder)
    }
    const handleChangeRating = (newRating) => {
        setMyRating({ ...myRating, rate: newRating })
    }
    const handleChangeContentRating = (e) => {
        setMyRating({ ...myRating, content: e.target.value })
    }
    const settingsCarousel = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: listBookRelated.length < 4 ? listBookRelated.length : 4,
        nextArrow: <NextSlider />,
        prevArrow: <PreviousSlider />,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const onInsertRating = () => {
        if (myRating.content.length === 0) {
            toast.warn(
                "Bạn cần nhập nội dung nhận xét!",
                {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
            return;
        } else {
            let uid = window.sessionStorage.getItem(settings.loginKey.userId);
            insertRating(uid, id, myRating.rate, myRating.content)
                .then((response) => {
                    toast.success(response.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRefresh(!refresh)
                })
                .catch((error) => {
                    toast.warn('Hệ thống xảy ra lỗi! Vui lòng thử lại sau', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }
    const onUpdatetRating = () => {
        if (myRating.content.length === 0) {
            toast.warn(
                "Bạn cần nhập nội dung nhận xét!",
                {
                    position: "bottom-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
            return;
        } else {
            let uid = window.sessionStorage.getItem(settings.loginKey.userId);
            updateRating(uid, id, myRating.rate, myRating.content)
                .then((response) => {
                    toast.success(response.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setRefresh(!refresh)
                })
                .catch((error) => {
                    toast.warn('Hệ thống xảy ra lỗi! Vui lòng thử lại sau', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }
    return (
        <div className="container-details-book">
            {!isLoading ? <div className="container-xl d-flex flex-column">
                <ToastContainer />
                <div className="row my-5 mx-2 container-info-details-book">
                    <div className="col-4 py-3 container-image-details-book">
                        <img alt="" className="image-details-book" src={book.thumbnailsUrl} onClick={() => console.log(book)} />
                    </div>
                    <div className="col-2"></div>
                    <div className="col-6 py-3 info-details-book">
                        <div>
                            <div className="row">
                                <div className="col-10">
                                    <p className="name-book-details-book">{book.bookName}</p>
                                </div>
                                {
                                    isLogin ?
                                        <div className="col-2 " title="Yêu thích">
                                            <img
                                                alt=""
                                                className="icon-favorite-details-book"
                                                src={isFavorited ? isFavoritedIcon : favoriteIcon}
                                                onClick={() => { if (isFavorited) { onDeleteFavorite() } else { onFavorite() } }}
                                            />
                                        </div>
                                        : <div></div>
                                }
                            </div>
                            <div className="row row-cols-2">
                                <div className="col-4 title-info-book-details-book">{constants.TITLE_AUTHOR}</div>
                                <div className="col-8 value-info-book-details-book">{book.auth}</div>
                                <div className="col-4 title-info-book-details-book">{constants.TITLE_PUBLISHER}</div>
                                <div className="col-8 value-info-book-details-book">{book.nxb}</div>
                                <div className="col-4 title-info-book-details-book">{constants.TITLE_YEAR_OF_PUBLISH}</div>
                                <div className="col-8 value-info-book-details-book">{book.year}</div>
                            </div>
                        </div>

                        <div className="card-book-star-details-book py-3">

                            <StarRatings
                                starDimension="30px"
                                starSpacing="1px"
                                rating={book.avgRating}
                                starRatedColor="#F9EF00"
                                numberOfStars={constants.MAX_STAR}
                                name='rating'
                            />
                            <div className="card-book-text-star-details-book">({book.numberOfRating + " " + constants.TEXT_RATING})</div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className=" text-price-sale-details-book">
                                {Number(book.price * book.sale).toLocaleString("es-ES", { minimumFractionDigits: 0 })} đ
                            </div>
                            <div className=" text-price-original-details-book mx-4">
                                {Number(book.price).toLocaleString("es-ES", { minimumFractionDigits: 0 })} đ
                            </div>
                            <div className="text-price-sale-percent-details-book mr-3">
                                -{((1 - book.sale).toFixed(2) * 100)} %
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="title-quantity-details-book">
                                {constants.TEXT_QUANTITY}
                            </div>
                            <div className="mx-4 d-flex flex-row contain-ins-desc-quantity-details-book">
                                <div className="ins-desc-quantity-details-book" onClick={() => onDecreasingQuantityOrder()}>-</div>
                                <div className="text-quantity-details-book">{quantityOrder}</div>
                                <div className="ins-desc-quantity-details-book" onClick={() => onIncreasingQuantityOrder()}>+</div>
                            </div>
                            <div className="title-quantity-details-book">{book.quantity} quyển có sẵn</div>
                        </div>
                        <div className="d-flex flex-row">
                            <button className="px-4 contain-btn-order-details-book">
                                <div className="d-flex flex-row">
                                    <img alt="" src={cardplusIcon} className="icon-cart-plus-details-book" />
                                    <div className="text-btn-order-details-book" onClick={() => { addItemToCart() }}>&nbsp;{constants.TEXT_ADD_TO_CART}</div>
                                </div>
                            </button>
                            <button className="mx-4 px-4 contain-btn-order-details-book">

                                <div className="text-btn-order-details-book" onClick={() => { addItemToCart(); navigate('/cart') }}>{constants.TEXT_ORDER}</div>

                            </button>
                        </div>
                    </div>
                </div>
                <div className="my-5 card-description-details-book">
                    <div className="title-description-details-book">
                        {constants.TITLE_DESCRIPTION}
                    </div>
                    <p className="text-content-description-details-book">
                        {book.description}
                    </p>
                </div>
                <div className="my-5">
                    <div>
                        {
                            listBookRelated.length > 0 ?
                                <div className="title-related-book-details-book">
                                    {constants.TITLE_RELATED_BOOK}
                                </div>
                                : ""
                        }
                        <Slider {...settingsCarousel}>
                            {listBookRelated.map((bookItem, i) => {
                                return (<CardBook book={bookItem} key={i} />)
                            })}
                        </Slider>
                    </div>
                </div>

                <div className="my-5 ">
                    <div className="col title-rating-details-book ">
                        {constants.TITLE_LIST_RATING}
                    </div>
                    <div className="card-rating-details-book">
                        <div className="text-content-description-details-book">
                            {
                                listRating.length !== 0 ?
                                    listRating.map((rating, i) => {
                                        return (
                                            <CardRating rating={rating} key={i} />
                                        )
                                    })
                                    : <div className="d-flex justify-content-center fw-bold fs-3">{constants.TITLE_DONT_HAVE_RATING}</div>
                            }
                        </div>
                    </div>

                </div>
                <div className="my-5">
                    <div>
                        <div className="title-related-book-details-book">
                            {constants.TITLE_RATING}
                        </div>
                        <div className="card-rating-details-book">
                            {isLogin ? <div>
                                <div className="d-flex flex-row">
                                    <div className="text-title-rating-details-book">
                                        {constants.TITLE_FIRST_RATING}
                                    </div>
                                    <div className="star-rating-details-book">
                                        <StarRatings
                                            starDimension="30px"
                                            starSpacing="1px"
                                            rating={myRating.rate}
                                            starRatedColor="#F9EF00"
                                            changeRating={handleChangeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />

                                    </div>
                                </div>
                                <div className="col-11">
                                    <div className="text-title-rating-details-book">
                                        {constants.TITLE_SECOND_RATING}
                                    </div>
                                    <textarea
                                        className="form-control "
                                        rows="5"
                                        value={myRating.content}
                                        onChange={handleChangeContentRating}
                                        placeholder="Nhận xét của bạn về sản phẩm này"
                                    />
                                </div>
                                <div className="mr-2 contain-btn-rating-details-book">
                                    {
                                        !hasRating ?
                                            <button
                                                className="btn-rating-details-book"
                                                onClick={() => { onInsertRating() }}
                                            >{constants.TEXT_BUTTON_RATING}</button>
                                            :
                                            <button
                                                className="btn-rating-details-book"
                                                onClick={() => { onUpdatetRating() }}
                                            >{constants.TEXT_BUTTON_UPDATE_RATING}</button>
                                    }

                                </div>
                            </div>
                                : <div className="d-flex justify-content-center fw-bold fs-3">
                                    <span className="text-btn-click-to-login-details-book" onClick={() => { onClickToLogin() }}>Đăng nhập</span> &nbsp;để gửi nhận xét của bạn
                                    </div>}
                        </div>
                    </div>
                </div>
            </div> : <div></div>}
        </div>
    )
}
function NextSlider(props) {
    const { onClick } = props;
    return (

        <div
            className="container-icon-slider-details-book slick-next"
            style={{ position: 'absolute', right: "-4%" }}
            onClick={onClick}
        >
            <img src={nextIcon} alt="" className="icon-slider-details-book" />
        </div>


    )
}
function PreviousSlider(props) {
    const { onClick } = props;
    return (

        <div
            className="container-icon-slider-details-book slick-prev"
            style={{ position: 'absolute', left: "-5%" }}
            onClick={onClick}
        >
            <img src={previousIcon} alt="" className="icon-slider-details-book" />
        </div>

    )
}
function CardRating(props) {
    let rating = props.rating
    return (
        <div className="row mb-4">
            <div className="col-3">
                <div className="text-username-rating-details-book">
                    {rating.fullName}
                </div>
                <div>
                    {formatDateWithString(rating.updateAt)}
                </div>
            </div>
            <div className="col-9">
                <div>
                    <RatingStar
                        count={constants.MAX_STAR}
                        size={23}
                        value={rating.rate}
                        isHalf={true}
                        activeColor="#F9EF00"
                        edit={false}
                    />
                </div>
                <div>
                    {rating.content}
                </div>
            </div>
        </div>
    )
}