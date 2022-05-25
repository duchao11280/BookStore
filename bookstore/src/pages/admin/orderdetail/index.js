import './orderdetail.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link } from 'react-router-dom'

function Orderdetail() {
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
                            <li className="item-title-admin-orderdetail">Tên sách:</li>
                            <li className="item-title-admin-orderdetail">Người mua:</li>
                            <li className="item-title-admin-orderdetail">Số điện thoại:</li>
                            <li className="item-title-admin-orderdetail">Địa chỉ:</li>
                            <li className="item-title-admin-orderdetail">Số lượng:</li>
                            <li className="item-title-admin-orderdetail">Giá:</li>
                            <li className="item-title-admin-orderdetail">Trạng thái</li>
                        </ul>
                        <ul className="list-category-admin-orderdetail">
                            <li className="item-category-admin-orderdetail">Bến xe</li>
                            <li className="item-category-admin-orderdetail">Nguyen Le</li>
                            <li className="item-category-admin-orderdetail">9999999999</li>
                            <li className="item-category-admin-orderdetail">01 Lê Hồng Phong</li>
                            <li className="item-category-admin-orderdetail">2</li>
                            <li className="item-category-admin-orderdetail">40000 vnđ</li>
                            <li className="item-category-admin-orderdetail">
                                <button>Chờ duyệt</button>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-admin-orderdetail">
                        <button className="submit-admin-orderdetail" style={{ backgroundColor: '#13e813' }}>
                            Duyệt
                        </button>
                        <button className="submit-admin-orderdetail" style={{ backgroundColor: '#ff4242' }}>
                            Từ chối
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Orderdetail; 