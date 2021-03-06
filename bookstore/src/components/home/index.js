import React from 'react';
import RatingStar from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom'
import './style.css';
import logo from '../../assets/imgs/logo.png';
import logo2 from '../../assets/imgs/logo2.png';
import cover from '../../assets/imgs/cover1.jpg';
import cover2 from '../../assets/imgs/cover2.png';
import cover3 from '../../assets/imgs/cover3.jpg';
import constants from './constants';
import { getHotCategory } from '../../services/category.services';
import Loading from '../loading'
import {
    getHotBook,
    getBestSellerBook,
    getNewBook,
    getSaleBook
} from '../../services/book.service'
import {
    formatVND,
    roundMoney
} from '../../utls/number'
import settings from '../../config/settings';

let start = false;
let indexNotState = 1;

export default function Home() {
    const [slideIndex, setSlideIndex] = React.useState(constants.MIN_SLIDE);
    const [listHotCategory, setListHotCategory] = React.useState([]);
    const [listHotBooks, setListHotBook] = React.useState([]);
    const [listBestSellerBooks, setListBestSellerBook] = React.useState([]);
    const [listSaleBooks, setListSaleBook] = React.useState([]);
    const [listNewBooks, setListNewBook] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        if (!start) {
            start = true;
            return;
        }
        setInterval(() => {
            indexNotState = indexNotState + 1;
            if (indexNotState > constants.MAX_SLIDE) {
                indexNotState = constants.MIN_SLIDE;
            } else if (indexNotState < constants.MIN_SLIDE) {
                indexNotState = constants.MAX_SLIDE
            }
            setSlideIndex(indexNotState);
        }, constants.TIME_CHANGE_SLIDE);
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        getHotCategory().then(result => setListHotCategory(result)).catch(err => console.log(err));
        getHotBook().then(result => setListHotBook(result)).catch(err => console.log(err));
        getBestSellerBook().then(result => setListBestSellerBook(result)).catch(err => console.log(err));
        getSaleBook().then(result => setListSaleBook(result)).catch(err => console.log(err));
        getNewBook().then(result => setListNewBook(result)).catch(err => console.log(err));
    }, [])

    // Next/previous controls
    const plusSlides = (n) => {
        let index = slideIndex + n;
        console.log("state = " + slideIndex)
        if (index > constants.MAX_SLIDE) {
            index = constants.MIN_SLIDE;
        } else if (index < constants.MIN_SLIDE) {
            index = constants.MAX_SLIDE
        }
        setSlideIndex(index);
    }

    return (
        <div className='container-home'>
            {isLoading && <Loading />}
            <div className='container-xl d-flex flex-column'>
                <div className='row mt-5'>
                    <div className='col-lg-9 container-carousel-home'>
                        <div className="slideshow-container">
                            {
                                listHotBooks.map((book, key) => {
                                    return (
                                        <div key={key} title="S??ch n???i b???t"
                                            onClick={() => { window.location.assign(`/detailsbook/${book.bookId}`) }}
                                            className={slideIndex === key + 1 ? "item-slider-home-show" : "item-slider-home-hide fade"}>
                                            <img alt="" src={settings.urlImageKey + book.coverImg} className='image-carousel-home' />
                                        </div>
                                    )
                                })
                            }
                            <div className="item-prev-slider-home" onClick={() => plusSlides(-1)}>&#10094;</div>
                            <div className="item-next-slider-home" onClick={() => plusSlides(1)}>&#10095;</div>
                        </div>
                    </div>
                    <div className='col-lg'>
                        <div className='row'>
                            <div className='col-12 container-image-button-home pb-3'
                                onClick={() => { window.location.assign(`/search`) }}
                            >
                                <img alt="" className='image-button-home' src={cover2} />
                            </div>
                            <div className='col-12 container-image-button-home pt-3'
                                onClick={() => { window.location.assign(`/search`) }}
                            >
                                <img alt="" className='image-button-home' src={cover3} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_HOT_CATEGORY}</div>
                <div className='row mt-3'>
                    {
                        listHotCategory.map((cat, key) => {
                            return (
                                <CardCategory item={cat} key={key} />
                            )
                        })
                    }
                </div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_NEW}</div>
                <div className='row mt-3'>
                    {
                        listNewBooks.map((book, key) => {
                            return (
                                <CardBook item={book} key={key} />
                            )
                        })
                    }
                </div>
                <div className='button-home-secondary me-auto ms-auto' onClick={() => { window.location.assign(`/search`) }}>{constants.BUTTON_MORE}</div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_BEST_SALER}</div>
                <div className='row mt-3'>
                    {
                        listBestSellerBooks.map((book, key) => {
                            return (
                                <CardBook item={book} key={key} />
                            )
                        })
                    }
                </div>
                <div className='button-home-secondary me-auto ms-auto mb-5' onClick={() => { window.location.assign(`/search`) }}>{constants.BUTTON_MORE}</div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_SALE_BOOK}</div>
                <div className='row mt-3'>
                    {
                        listSaleBooks.map((book, key) => {
                            return (
                                <CardBook item={book} key={key} />
                            )
                        })
                    }
                </div>
                <div className='button-home-secondary me-auto ms-auto mb-5' onClick={() => { window.location.assign(`/search`) }}>{constants.BUTTON_MORE}</div>
            </div>
        </div>
    )
}

function CardCategory(props) {
    const category = props.item || {};
    return (
        <div className='col-2 d-flex flex-column align-items-center card-category-home'
            onClick={() => { window.location.assign(`/search?category=${category.catId}`) }}
        >
            <img alt={category.catName} src={settings.urlImageKey + category.thumbnails} className='image-category-home mb-2' />
            <p>{category.catName}</p>
        </div>
    )
}

function CardBook(props) {
    const navigate = useNavigate();
    const book = props.item;
    const {
        bookId,
        bookName,
        sale,
        price,
        thumbnails,
        rate
    } = book;
    const isSale = book.sale < 1 ? true : false;
    return (
        <div className='col-3 mb-3' onClick={() => window.location.assign('/detailsbook/' + bookId)}>
            <div className='card-book-home d-flex'>
                <img alt='' src={settings.urlImageKey + thumbnails} className='image-book-home mb-1 ms-auto me-auto' />
                <div className='card-book-title-home'>{bookName}</div>
                <div className='card-book-price-home'>{formatVND(roundMoney(price * sale))}</div>
                <div className='card-book-old-price-home'>{isSale ? formatVND(roundMoney(price)) : ""}</div>
                <div className='card-book-star-home'>
                    <RatingStar
                        count={constants.MAX_STAR}
                        size={35}
                        value={rate}
                        isHalf={true}
                        activeColor="#F9EF00"
                        edit={false}
                    />
                    <div className='card-book-text-star-home'>({rate || 0})</div>
                </div>
            </div>
        </div>
    )
}