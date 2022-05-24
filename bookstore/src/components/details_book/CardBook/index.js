import React from 'react'
import './style.css'
import constants from '../constants'
import RatingStar from "react-rating-stars-component";
import { useParams, useNavigate } from 'react-router-dom'
export default function CardBook(props) {
    let book = props.book;
    const navigate = useNavigate();
    return (
        <div className='col mx-3'>
            <div className='card-book-details-book d-flex' onClick={() => { navigate('/detailsbook/' + book.bookId, { replace: true }) }}>
                <img alt='' src={book.thumbnailsUrl} className='image-book-details-book mb-1 ms-auto me-auto' />
                <div className='card-book-title-details-book'>{book.bookName}</div>
                <div className=" text-price-sale-details-book mx-3">
                    {Number(book.price * book.sale).toLocaleString("es-ES", { minimumFractionDigits: 0 })} đ
                </div>
                <div className=" text-price-original-details-book mx-3">
                    {Number(book.price).toLocaleString("es-ES", { minimumFractionDigits: 0 })} đ
                </div>
                <div className='card-book-old-price-details-book'></div>
                <div className='card-book-star-details-book'>
                    <RatingStar
                        count={constants.MAX_STAR}
                        size={35}
                        value={4}
                        isHalf={true}
                        activeColor="#F9EF00"
                        edit={false}
                    />
                    <div className='card-book-text-star-details-book'>({4})</div>
                </div>
            </div>
        </div>
    )
}