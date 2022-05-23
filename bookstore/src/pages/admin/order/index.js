import './order.css'
import { Link } from 'react-router-dom'
import Sidebaradmin from '../../../components/sidebaradmin';

function Order() {
    return (<>
        <div className="container-admin-order">
            <Sidebaradmin />
            <div className="content-admin-order">
                <div className="title-content-admin-order">
                    <h3>Đơn hàng</h3>
                    <div className="search-admin-order">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="body-content-admin-order">
                    <div className="body-header-admin-order">
                        <h5>Trang 2</h5>
                        {/* <i class="fa-solid fa-circle-plus"></i> */}
                    </div>
                    <table className="table-content-admin-order">
                        <tr>
                            <th>Tên sách</th>
                            <th>Tác giả </th>
                            <th>Nhà xuất bản</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

export default Order; 