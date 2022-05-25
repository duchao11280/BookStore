import React from 'react';
import RatingStar from "react-rating-stars-component";
import './style.css';
import logo from '../../assets/imgs/logo.png';
import logo2 from '../../assets/imgs/logo2.png';
import cover from '../../assets/imgs/cover1.jpg';
import cover2 from '../../assets/imgs/cover2.png';
import cover3 from '../../assets/imgs/cover3.jpg';
import thieunhiThumb from '../../assets/imgs/thieunhi-thumb.jpg';
import constants from './constants';
import Header from '../../components/header'
import Footer from '../../components/footer'

let start = false;
let indexNotState = 1;

export default function Home() {
    const [slideIndex, setSlideIndex] = React.useState(constants.MIN_SLIDE);
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
        }, constants.TIME_CHANGE_SLIDE)
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
        <>
        <Header />
        <div className='container-home'>
            <div className='container-xl d-flex flex-column'>
                <div className='row mt-5'>
                    <div className='col-lg-9 container-carousel-home'>
                        <div className="slideshow-container">
                            <div className={slideIndex === 1 ? "item-slider-home-show" : "item-slider-home-hide fade"}>
                                <img alt = "" src={cover} className='image-carousel-home' />
                            </div>
                            <div className={slideIndex === 2 ? "item-slider-home-show" : "item-slider-home-hide fade"}>
                                <img alt = "" src={logo2} className='image-carousel-home' />
                            </div>
                            <div className={slideIndex === 3 ? "item-slider-home-show" : "item-slider-home-hide fade"}>
                                <img alt = "" src={logo} className='image-carousel-home' />
                            </div>
                            <div className="item-prev-slider-home" onClick={() => plusSlides(-1)}>&#10094;</div>
                            <div className="item-next-slider-home" onClick={() => plusSlides(1)}>&#10095;</div>
                        </div>
                    </div>
                    <div className='col-lg'>
                        <div className='row'>
                            <div className='col-12 container-image-button-home pb-3'>
                                <img alt = "" className='image-button-home' src={cover2} />
                            </div>
                            <div className='col-12 container-image-button-home pt-3'>
                                <img alt = "" className='image-button-home' src={cover3} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_HOT_CATEGORY}</div>
                <div className='row mt-3'>
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                </div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_NEW}</div>
                <div className='row mt-3'>
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                </div>
                <div className='button-home-secondary me-auto ms-auto'>{constants.BUTTON_MORE}</div>
                <div className='row mt-5 text-title-home'>{constants.TITLE_BEST_SALER}</div>
                <div className='row mt-3'>
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                    <CardBook />
                </div>
                <div className='button-home-secondary me-auto ms-auto mb-5'>{constants.BUTTON_MORE}</div>
            </div>
        </div>
        <Footer />
        </>
    )
}

function CardCategory(props) {
    return (
        <div className='col-2 d-flex flex-column align-items-center card-category-home'>
            <img alt = "" src={thieunhiThumb} className='image-category-home mb-2' />
            <p>Thiếu nhi</p>
        </div>
    )
}

function CardBook(props) {
    return (
        <div className='col-3 mb-3'>
            <div className='card-book-home d-flex'>
                <img alt='' src={thieunhiThumb} className='image-book-home mb-1 ms-auto me-auto' />
                <div className='card-book-title-home'>Sống mòn</div>
                <div className='card-book-price-home'>170.000 đ</div>
                <div className='card-book-old-price-home'></div>
                <div className='card-book-star-home'>
                    <RatingStar
                        count={constants.MAX_STAR}
                        size={35}
                        value={4.5}
                        isHalf={true}
                        activeColor="#F9EF00"
                        edit={false}
                    />
                    <div className='card-book-text-star-home'>(0.3)</div>
                </div>
            </div>
        </div>
    )
}