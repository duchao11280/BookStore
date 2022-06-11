import React, { useEffect, useState } from 'react'
import constants from './constants'
import './style.css'
import { formatNumberToMoney } from '../../utls/number'
import { useCart } from 'react-use-cart'
import { getListBookForOrder } from '../../services/book.service'
import { insertOrder } from '../../services/order.service'
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../loading'
export default function CartPage() {
    const { items, emptyCart, updateItemQuantity, removeItem } = useCart()
    const [listBookOrder, setListBookOrder] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [info, setInfo] = useState({ fullName: '', phone: '', address: '', })
    let arrayIdBook = [];
    const [totalPrice, setTotalPrice] = useState(0)
    items.forEach((item) => {
        arrayIdBook.push(item.id);
    })
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const stringArrId = await arrayIdBook.join("-");
            if (stringArrId.length) {
                let result = await getListBookForOrder(stringArrId)
                if (result.status) {
                    await result.data.forEach((book) => {
                        items.forEach((bookLocal) => {
                            if (bookLocal.id === book.bookId) {
                                book.quantityOrder = bookLocal.quantity
                            }
                        })
                    })
                    setListBookOrder(result.data)
                } else {
                    setListBookOrder([])
                }
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);

        })();

    }, [])
    const onDecreasingQuantityOrder = (id) => {
        let copiedListBoook = [...listBookOrder]
        copiedListBoook.forEach((item) => {
            if (item.bookId === id && item.quantityOrder > 1) {
                item.quantityOrder--;
                updateItemQuantity(id, item.quantityOrder);
            }
        })
        setListBookOrder(copiedListBoook)
    }
    const onIncreasingQuantityOrder = (id) => {
        let copiedListBoook = [...listBookOrder]
        copiedListBoook.forEach((item) => {
            if (item.bookId === id && item.quantityOrder < item.quantity) {
                item.quantityOrder++;
                updateItemQuantity(id, item.quantityOrder);
            }
        })
        setListBookOrder(copiedListBoook)
    }
    const onRemoveItemOrder = (id) => {
        let copiedListBoook = [...listBookOrder]

        copiedListBoook = copiedListBoook.filter((copiedBook) => { return copiedBook.bookId != id })
        removeItem(id);

        setListBookOrder(copiedListBoook)
    }

    useEffect(() => {
        let price = 0
        listBookOrder.forEach((item) => {
            price = price + (item.price * item.sale) * item.quantityOrder
        })
        setTotalPrice(price)
    }, [listBookOrder])
    const handleChangeInfo = (e) => {
        let { name, value } = e.target
        setInfo({
            ...info,
            [name]: value
        })
    }
    const handleOrder = (e) => {
        e.preventDefault()
        insertOrder(info.phone, info.fullName, info.address, listBookOrder)
            .then((response) => {
                setListBookOrder([])
                emptyCart();
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
            .catch((error) => {
                toast.warn("Đặt hàng thất bại!", {
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
    return (
        <div className="col container-cart d-flex justify-content-center">
            <ToastContainer />
            {!isLoading ?
                <div className="mt-4 d-flex flex-column">
                    {listBookOrder.length > 0 ? <div>
                        <div className="container contain-text-ontop-order-cart">
                            <a href="/home" className="col a-back-to-home-cart">{constants.TEXT_BUY_MORE}</a>
                            <div className="col text-mycart-cart">{constants.TEXT_MY_CART}</div>
                        </div>

                        <div className="container d-flex justify-content-center">
                            <div className="container mb-5 card-cart">
                                {listBookOrder.map((book, i) => {

                                    return (
                                        <div key={i}>
                                            <CardItemBookOrder
                                                book={book}
                                                quantityOrder={book.quantityOrder}
                                                onRemoveItemOrder={onRemoveItemOrder}
                                                onDecreasingQuantityOrder={onDecreasingQuantityOrder}
                                                onIncreasingQuantityOrder={onIncreasingQuantityOrder}
                                            />
                                            <hr />
                                        </div>
                                    )
                                })}
                                <div className=" d-flex mx-5 justify-content-between">
                                    <div>{constants.TEXT_TOTAL}</div>
                                    <div>{formatNumberToMoney(totalPrice)} đ</div>
                                </div>
                                <hr />
                                <div className=" col mx-3">
                                    <div className="mx-4">{constants.TITITLE_INFO_CLIENT}</div>
                                    <form onSubmit={handleOrder}>
                                        <div className="mx-4 my-4 d-flex flex-row justify-content-between">

                                            <div className="col-6">
                                                <input
                                                    className="form-control input-text-name-cart"
                                                    placeholder="Họ và tên"
                                                    required
                                                    name="fullName"
                                                    value={info.fullName}
                                                    onChange={handleChangeInfo}
                                                />
                                            </div>
                                            <div className="col-4">

                                                <input
                                                    className=" form-control input-text-phone-cart"
                                                    placeholder="Số điện thoại"
                                                    required
                                                    name="phone"
                                                    value={info.phone}
                                                    onChange={handleChangeInfo}
                                                />
                                            </div>

                                        </div>
                                        <div className="m-4">
                                            <input
                                                className="form-control input-text-address-cart"
                                                placeholder="Địa chỉ"
                                                required
                                                name="address"
                                                value={info.address}
                                                onChange={handleChangeInfo}
                                            />
                                        </div>

                                        <div className="d-flex justify-content-center mb-4">

                                            <button
                                                className="contain-btn-order-cart d-flex justify-content-center"
                                                type="submit"
                                            >
                                                <div className="text-btn-order-cart" >{constants.TEXT_BTN_ORDER}</div>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                        : <div className="d-flex flex-column justify-content-center align-items-lg-center notify-empty-cart">
                            <i class="fa fa-cart-plus cart-plus-cart" aria-hidden="true"></i>
                            <div className="mt-5 text-empty-cart">Không có sách nào trong giỏ hàng</div>
                            <div className="mt-2 px-5 py-2 go-home-from-cart" onClick={() => window.location.assign("/home")}>Về lại trang chủ</div>
                        </div>
                    }
                </div>
                : <Loading />
            }
        </div>
    )
}
function CardItemBookOrder(props) {
    const book = props.book;
    const quantityOrder = props.quantityOrder
    return (
        <div className=" col container-xl d-flex flex-row justify-content-center">
            <div className=" container-btn-remove-item-cart">
                <button className="btn-remove-item-order-cart"
                    onClick={() => { props.onRemoveItemOrder(book.bookId) }}
                >
                    X
                </button>
            </div>
            <div className="">
                <img alt="" className="image-book-cart" src={book.thumbnailsUrl} />
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
                    <div className="ins-desc-quantity-cart" onClick={() => { props.onDecreasingQuantityOrder(book.bookId) }}>-</div>
                    <div className="text-quantity-cart">{quantityOrder}</div>
                    <div className="ins-desc-quantity-cart" onClick={() => { props.onIncreasingQuantityOrder(book.bookId) }}>+</div>
                </div>
            </div>
        </div>
    )
}
