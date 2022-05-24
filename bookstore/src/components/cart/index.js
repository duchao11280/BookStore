import React, { useEffect, useState } from 'react'
import constants from './constants'
import './style.css'
import { formatNumberToMoney } from '../../utls/number'
import { useCart } from 'react-use-cart'
export default function CartPage() {
    const { items, emptyCart } = useCart()
    let arrayIdBook = [];
    items.forEach((item) => {
        arrayIdBook.push(item.id);
    })
    console.log(arrayIdBook)
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
    let quantityOrder = 1;
    return (
        <div className="col container-cart d-flex justify-content-center">

            <div className="mt-4 d-flex flex-column">
                <div className="container contain-text-ontop-order-cart">
                    <a href="/home" className="col a-back-to-home-cart">{constants.TEXT_BUY_MORE}</a>
                    <div className="col text-mycart-cart">{constants.TEXT_MY_CART}</div>
                </div>
                <div className="container d-flex justify-content-center">
                    <div className="container mb-5 card-cart">
                        <CardItemBookOrder book={book} quantityOrder={quantityOrder} />
                        <hr />
                        <CardItemBookOrder book={book} quantityOrder={quantityOrder} />
                        <hr />
                        <div className=" d-flex mx-5 justify-content-between">
                            <div>{constants.TEXT_TOTAL}</div>
                            <div>121.600 đ</div>
                        </div>
                        <hr />
                        <div className=" col mx-3">
                            <div className="mx-4">{constants.TITITLE_INFO_CLIENT}</div>
                            <div className="mx-4 my-4 d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <input
                                        className="form-control input-text-name-cart"
                                        placeholder="Họ và tên"

                                    />
                                </div>
                                <div className="col-4">

                                    <input className=" form-control input-text-phone-cart" placeholder="Số điện thoại" />
                                </div>

                            </div>
                            <div className="m-4">
                                <input className="form-control input-text-address-cart" placeholder="Địa chỉ" />
                            </div>
                            <div className="d-flex justify-content-center mb-4">

                                <button className="contain-btn-order-cart d-flex justify-content-center">
                                    <div className="text-btn-order-cart">{constants.TEXT_BTN_ORDER}</div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
function CardItemBookOrder(props) {
    const book = props.book;
    const quantityOrder = props.quantityOrder
    return (
        <div className=" col container-xl d-flex flex-row justify-content-center">
            <div className=" container-btn-remove-item-cart">
                <button className="btn-remove-item-order-cart">
                    X
                </button>
            </div>
            <div className="">
                <img alt="" className="image-book-cart" src={book.imageURL} />
            </div>
            <div className="mx-4">
                <div className="name-book-cart">{book.bookName}</div>
                <div className="row row-cols-2">
                    <div className="col-4 title-info-book-order-cart">{constants.TITLE_AUTHOR}</div>
                    <div className="col-8 value-info-book-order-cart">{book.auth}</div>
                    <div className="col-4 title-info-book-order-cart">{constants.TITLE_PUBLISHER}</div>
                    <div className="col-8 value-info-book-order-cart">{book.nxb}</div>
                    <div className="col-4 title-info-book-order-cart">{constants.TITLE_YEAR_OF_PUBLISH}</div>
                    <div className="col-8 value-info-book-order-cart">{book.year}</div>
                </div>
            </div>
            <div className="">
                <div className="mx-4">
                    <div className=" text-price-sale-cart">
                        {formatNumberToMoney(book.price * book.sale)} đ
                </div>
                    <div className=" text-price-original-cart">
                        {formatNumberToMoney(book.price)} đ
                </div>
                </div>

                <div className="mx-4 d-flex flex-row contain-ins-desc-quantity-cart">
                    <div className="ins-desc-quantity-cart">-</div>
                    <div className="text-quantity-cart">{quantityOrder}</div>
                    <div className="ins-desc-quantity-cart">+</div>
                </div>
            </div>
        </div>
    )
}
