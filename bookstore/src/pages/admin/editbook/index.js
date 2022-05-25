import './editbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom'

function Addbook() {
    const { id } = useParams();
    return (<>
        <div className="container-admin-editbook">
            <Sidebaradmin />
            <div className="content-admin-editbook">
                <div className="title-content-admin-editbook">
                    <h3>Book</h3>
                    <div className="search-admin-editbook">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="body-content-admin-editbook">
                    <div className="body-header-admin-editbook">
                        <Link to="/admin/book">
                            <a><i class="fa-solid fa-angle-left"></i></a>
                        </Link>
                    </div>
                    <div className="main-content-admin-editbook">
                        <div className="main-content-left-admin-book">
                            <img src="/logo3.png" alt="ảnh sách" />
                            <button>Đăng ảnh</button>
                        </div>
                        <div className="main-content-right-admin-book">
                            <ul className="list-info-book-admin-book">
                                <li className="item-info-book-admin-book">
                                    <h5>Tên sách</h5>
                                    <input type="text" placeholder="Tên sách" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Thể loại</h5>
                                    <input type="text" placeholder="Thể loại" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Tác giả</h5>
                                    <input type="text" placeholder="Tác gỉa" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Nhà xuất bản</h5>
                                    <input type="text" placeholder="Nhà xuất bản" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Năm xuất bản</h5>
                                    <input type="text" placeholder="Năm xuất bản" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Mô tả</h5>
                                    <textarea placeholder="Mô tả" />
                                </li>
                                <li className="item-info-book-admin-book">
                                    <h5>Số lượng</h5>
                                    <input type="text" placeholder="Số lượng" />
                                </li>
                            </ul>
                            <button className="btn-addbook-admin-editbook">Sửa sách</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Addbook; 