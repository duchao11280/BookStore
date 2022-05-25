import './addbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import {Link} from 'react-router-dom'


function Addbook() {
    return ( <>
        <div className="container-admin-addbook">
            <Sidebaradmin />
            <div className="content-admin-addbook">
                <div className="title-content-admin-addbook">
                    <h3>Book</h3>
                    <div className="search-admin-addbook">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>            
                </div>
                <div className="body-content-admin-addbook">
                    <div className="body-header-admin-addbook">
                        <Link to="/admin/book">
                            <a><i class="fa-solid fa-angle-left"></i></a>
                        </Link>
                    </div>
                    <div className="main-content-admin-addbook">
                        <div className="main-content-left-admin-addbook">
                            <img src="/logo3.png" alt="ảnh sách" />
                            <button>Đăng ảnh</button>
                        </div> 
                        <div className="main-content-right-admin-addbook">
                            <ul className="list-info-book-admin-addbook">
                                <li className="item-info-book-admin-addbook">
                                    <h5>Tên sách</h5>
                                    <input type="text" placeholder="Tên sách" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Thể loại</h5>
                                    <input type="text" placeholder="Thể loại" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Tác giả</h5>
                                    <input type="text" placeholder="Tác gỉa" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Nhà xuất bản</h5>
                                    <input type="text" placeholder="Nhà xuất bản" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Năm xuất bản</h5>
                                    <input type="text" placeholder="Năm xuất bản" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Mô tả</h5>
                                    <textarea placeholder="Mô tả" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Số lượng</h5>
                                    <input type="text" placeholder="Số lượng" />
                                </li>
                            </ul>
                            <button className="btn-addbook-admin-addbook">Thêm sách</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default Addbook; 