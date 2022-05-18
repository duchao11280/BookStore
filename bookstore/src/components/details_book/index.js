import React from 'react'
import './style.css'
import favoriteIcon from '../../assets/icons/favorite.png';
import isFavoritedIcon from '../../assets/icons/isFavorited.png'
import nextIcon from '../../assets/icons/next.png'
import previousIcon from '../../assets/icons/previous.png'
import RatingStar from "react-rating-stars-component";
import constants from './constants'
import CardBook from './CardBook/index'
import Slider from "react-slick";
import cardplusIcon from '../../assets/icons/cart-plus.png'
import testData from './testData'
export default function DetailsBook() {
    let book = {
        bookId: 1,
        bookName: "Bến Xe (Tái Bản 2020)",
        nxb: "NXB Văn học",
        auth: "Thương Thái Vy",
        year: 2020,
        price: 76000,
        quantity: 80,
        sale: 0.8,
        description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
        imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
        rate: 3.5,
    }
    let listBook = testData;
    let isFavorited = false;
    let quantityOrder = 0;
    let listRating = [
        {
            userId: 1,
            userName: "Haro",
            rate: 4,
            content: "Sách này thật bổ ích",
            date: "09/05/2020",
        },
        {
            userId: 2,
            userName: "Miao",
            rate: 3,
            content: "Sách này thật bổ ích",
            date: "09/05/2020",
        }
    ]
    let myRating = {
        rate: null,
        content: ""
    }
    const handleChangeRating = (newRating) => {
        myRating.rate = newRating;
    }
    const handleChangeContentRating = (e) => {
        myRating.content = e.target.value
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: listBook.length < 4 ? listBook.length : 4,
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
    return (
        <div className="container-details-book">
            <div className="container-xl d-flex flex-column">
                <div className="row my-5 mx-2 container-info-details-book">
                    <div className="col-4 py-3 container-image-details-book">
                        <img alt="" className="image-details-book" src={book.imageURL} />
                    </div>
                    <div className="col-2"></div>
                    <div className="col-6 py-3 info-details-book">
                        <div>
                            <div className="row">
                                <div className="col-10">
                                    <p className="name-book-details-book">{book.bookName}</p>
                                </div>
                                <div className="col-2 ">
                                    <img alt="" className="icon-favorite-details-book" src={isFavorited ? isFavoritedIcon : favoriteIcon} />
                                </div>
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

                        <div className="card-book-star-details-book">
                            <RatingStar
                                count={constants.MAX_STAR}
                                size={35}
                                value={book.rate}
                                isHalf={true}
                                activeColor="#F9EF00"
                                edit={false}
                            />
                            <div className="card-book-text-star-details-book">({book.rate})</div>
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
                                <div className="ins-desc-quantity-details-book">-</div>
                                <div className="text-quantity-details-book">{quantityOrder}</div>
                                <div className="ins-desc-quantity-details-book">+</div>
                            </div>
                            <div className="title-quantity-details-book">{book.quantity} quyển có sẵn</div>
                        </div>
                        <div className="d-flex flex-row">
                            <button className="px-4 contain-btn-order-details-book">
                                <div className="d-flex flex-row">
                                    <img alt="" src={cardplusIcon} className="icon-cart-plus-details-book" />
                                    <div className="text-btn-order-details-book">&nbsp;{constants.TEXT_ADD_TO_CART}</div>
                                </div>
                            </button>
                            <button className="mx-4 px-4 contain-btn-order-details-book">

                                <div className="text-btn-order-details-book">{constants.TEXT_ORDER}</div>

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
                            listBook.length > 0 ?
                                <div className="title-related-book-details-book">
                                    {constants.TITLE_RELATED_BOOK}
                                </div>
                                : ""
                        }
                        <Slider {...settings}>
                            {listBook.map((bookItem, i) => {
                                return (<CardBook book={bookItem} key={i} />)
                            })}
                        </Slider>
                    </div>
                </div>

                <div className="my-5 ">
                    <div className="col title-rating-details-book ">
                        {listRating.length > 0 ? constants.TITLE_LIST_RATING : ""}
                    </div>
                    <div className="card-rating-details-book">
                        <div className="text-content-description-details-book">
                            {listRating.map((rating, i) => {
                                return (
                                    <CardRating rating={rating} key={i} />
                                )
                            })}
                        </div>
                    </div>

                </div>
                <div className="my-5">
                    <div>
                        <div className="title-related-book-details-book">
                            {constants.TITLE_RATING}
                        </div>
                        <div className="card-rating-details-book">
                            <div className="d-flex flex-row">
                                <div className="text-title-rating-details-book">
                                    {constants.TITLE_FIRST_RATING}
                                </div>
                                <div className="star-rating-details-book">
                                    <RatingStar
                                        count={constants.MAX_STAR}
                                        size={24}
                                        value={myRating.rate}
                                        isHalf={true}
                                        activeColor="#F9EF00"
                                        edit={true}
                                        onChange={handleChangeRating}
                                    />
                                </div>
                            </div>
                            <div className="col-11">
                                <div className="text-title-rating-details-book">
                                    {constants.TITLE_SECOND_RATING}
                                </div>
                                <textarea
                                    class="form-control "
                                    rows="5"
                                    onChange={handleChangeContentRating}
                                    placeholder="Nhận xét của bạn về sản phẩm này"
                                />
                            </div>
                            <div className="mr-2 contain-btn-rating-details-book">

                                <button
                                    className="btn-rating-details-book"
                                    onClick={() => { console.log(myRating) }}
                                >{constants.TEXT_BUTTON_RATING}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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
        <div className="row">
            <div className="col-2">
                <div className="text-username-rating-details-book">
                    {rating.userName}
                </div>
                <div>
                    {rating.date}
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