import './orderdetail.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom'
import { getDetailOrderById, getDetailSumOfPriceById } from '../../../services/order.service'
import React from 'react';
function Orderdetail() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = React.useState({});
    const [orderSumPrice, setOrderSumPrice] = React.useState({});

    React.useEffect(() => {
        getDetailOrderById(id).then(result => setOrderDetails(result.data));
        getDetailSumOfPriceById(id).then(result => setOrderSumPrice(result.data));
    }, [])
    return (<>
        <div className="container-admin-orderdetail">
            <Sidebaradmin />
            <div className="content-admin-orderdetail">
                <div className="title-content-admin-orderdetail">
                    <h3>Chi tiết đơn hàng</h3>
                    <div className="search-admin-orderdetail">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="body-content-admin-orderdetail">
                    <div className="body-header-admin-orderdetail">
                        <Link to="/admin/order">
                            <a><i class="fa-solid fa-angle-left"></i></a>
                        </Link>
                    </div>
                    <div className="main-content-admin-orderdetail">
                        <img className="img-book-admin-orderdetail"
                            src="/logo3.png"
                            alt="ảnh sách"
                        />
                        <ul className="list-title-admin-orderdetail">
                            <li className="item-title-admin-orderdetail">Mã đơn hàng:</li>
                            <li className="item-title-admin-orderdetail">Người mua:</li>
                            <li className="item-title-admin-orderdetail">Số điện thoại:</li>
                            <li className="item-title-admin-orderdetail">Địa chỉ:</li>
                            <li className="item-title-admin-orderdetail">Tổng tiền:</li>
                            <li className="item-title-admin-orderdetail">Trạng thái</li>
                        </ul>
                        <ul className="list-category-admin-orderdetail">
                            <li className="item-category-admin-orderdetail">{orderDetails.orderId}</li>
                            <li className="item-category-admin-orderdetail">{orderDetails.fullName}</li>
                            <li className="item-category-admin-orderdetail">{orderDetails.phone}</li>
                            <li className="item-category-admin-orderdetail">{orderDetails.address}</li>
                            <li className="item-category-admin-orderdetail">{orderSumPrice.sumPrice}</li>
                            {/* <li className="item-category-admin-orderdetail">{orderDetails.status}</li> */}
                            {/* <li className="item-category-admin-orderdetail">
                                <button>Chờ duyệt</button>
                            </li> */}
                            {
                                orderDetails.status === 0 ? <div className="item-category-admin-orderdetail-waiting">
                                    <button>Chờ duyệt</button>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 1 ? <div className="item-category-admin-orderdetail-shipper">
                                    <button>Đang Giao</button>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 2 ? <div className="item-category-admin-orderdetail-cancelled">
                                    <button>Đã Hủy</button>
                                </div> :
                                    <div></div>
                            }

                        </ul>
                    </div>
                    {
                        orderDetails.status === 0 ?
                            <div className="btn-admin-orderdetail">
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#13e813' }}>
                                    Duyệt
                                </button>
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#ff4242' }}>
                                    Từ chối
                                </button>
                            </div>
                            :
                            <div></div>
                    }

                </div>
            </div>
        </div>
    </>);
}

export default Orderdetail; 