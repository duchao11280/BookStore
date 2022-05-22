import React from 'react'
import './style.css'
import constants from '../constants'
import RatingStar from "react-rating-stars-component";

export default function CardBook(props) {
    let book = props.book;
    return (
        <div className='col mx-3'>
            <div className='card-book-details-book d-flex'>
                <img alt='' src={book.imageURL} className='image-book-details-book mb-1 ms-auto me-auto' />
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
                        value={book.rate}
                        isHalf={true}
                        activeColor="#F9EF00"
                        edit={false}
                    />
                    <div className='card-book-text-star-details-book'>({book.rate})</div>
                </div>
            </div>
        </div>
    )
}