import './orderdetail.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom'
import { getDetailOrderById, getDetailSumOfPriceById, updateOrderStatusbyId } from '../../../services/order.service'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import settings from '../../../config/settings';

function Orderdetail() {
    if (window.sessionStorage.getItem(settings.loginKey.role) !== '0') {
        window.location.replace('/notfound')
    }
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = React.useState({});
    const [orderSumPrice, setOrderSumPrice] = React.useState({});
    const [refresh, setRefresh] = React.useState(false);


    React.useEffect(() => {
        getDetailOrderById(id).then(result => setOrderDetails(result.data));
        getDetailSumOfPriceById(id).then(result => setOrderSumPrice(result.data));
    }, [refresh])

    const onUpdateOrder = (status, id) => {

        updateOrderStatusbyId(status, id).then(() => {
            toast.success("Cập nhật đơn hàng thành công", {
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
    }


    return (<>
        <div className="container-admin-orderdetail">
            <ToastContainer />
            <Sidebaradmin />
            <div className="content-admin-orderdetail">
                <div className="title-content-admin-orderdetail">
                    <h3>Chi tiết đơn hàng</h3>
                    {/* <div className="search-admin-orderdetail">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div> */}
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
                        <ul className="list-title-admin-orderdetail">
                            <li className="item-title-admin-orderdetail">{orderDetails.orderId}</li>
                            <li className="item-title-admin-orderdetail">{orderDetails.fullName}</li>
                            <li className="item-title-admin-orderdetail">{orderDetails.phone}</li>
                            <li className="item-title-admin-orderdetail">{orderDetails.address}</li>
                            <li className="item-title-admin-orderdetail">{orderSumPrice.sumPrice}</li>
                            {/* <li className="item-category-admin-orderdetail">{orderDetails.status}</li> */}
                            {/* <li className="item-category-admin-orderdetail">
                                <button>Chờ duyệt</button>
                            </li> */}
                            {
                                orderDetails.status === 0 ? <div className="item-category-admin-orderdetail-waiting">
                                    <div>Chờ duyệt</div>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 1 ? <div className="item-category-admin-orderdetail-shipper">
                                    <div>Đang Giao</div>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 2 ? <div className="item-category-admin-orderdetail-cancelled">
                                    <div>Đã Hủy</div>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 3 ? <div className="item-category-admin-orderdetail-cancelled">
                                    <div> Giao thất bại</div>
                                </div> :
                                    <div></div>
                            }
                            {
                                orderDetails.status === 4 ? <div className="item-category-admin-orderdetail-complete">
                                    <div>Giao Thành công</div>
                                </div> :
                                    <div></div>
                            }

                        </ul>
                    </div>
                    {
                        orderDetails.status === 0 ?
                            <div className="btn-admin-orderdetail">
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#13e813' }} onClick={() => { onUpdateOrder(1, id) }}>
                                    Duyệt
                                </button>
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#ff4242' }} onClick={() => { onUpdateOrder(2, id) }}>
                                    Từ chối
                                </button>
                            </div>
                            :
                            <div></div>
                    }

                    {
                        orderDetails.status === 1 ?
                            <div className="btn-admin-orderdetail">
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#13e813' }} onClick={() => { onUpdateOrder(4, id) }}>
                                    Giao thành công
                                </button>
                                <button className="submit-admin-orderdetail" style={{ backgroundColor: '#ff4242' }} onClick={() => { onUpdateOrder(3, id) }}>
                                    Giao thất bại
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