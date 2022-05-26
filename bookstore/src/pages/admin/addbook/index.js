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
                            <img className="img-top-left-admin-addbook" 
                                src="/cover2.png" alt="ảnh sách" 
                            />
                            <button>Đăng ảnh</button>
                            <img className="img-bottom-left-admin-addbook" 
                                src="/thieunhi-thumb.jpg" alt="ảnh sách" 
                            />
                            <button>Đăng ảnh</button>
                        </div> 
                        <div className="main-content-right-admin-addbook">
                            <ul className="list-info-book-admin-addbook">
                                <li className="item-info-book-admin-addbook">
                                    <h5>Tên sách</h5>
                                    <input type="text" placeholder="Tên sách" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Thể loại lớn</h5>
                                    {/* <input type="text" placeholder="Thể loại" /> */}
                                    <select className="combobox-book-admin-addbook">
                                        <option value="">Trinh thám</option>
                                        <option value="">Lãng mạn</option>
                                        <option value="">Hài hước</option>
                                    </select>
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Thể loại nhỏ</h5>
                                    {/* <input type="text" placeholder="Thể loại" /> */}
                                    <select className="combobox-book-admin-addbook">
                                        <option value="">Trinh thám</option>
                                        <option value="">Lãng mạn</option>
                                        <option value="">Hài hước</option>
                                    </select>
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Tác giả</h5>
                                    <input type="text" placeholder="Tác gỉa" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Ngôn ngữ</h5>
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
                                    <input type="number" placeholder="Số lượng" />
                                </li>
                                <li className="item-info-book-admin-addbook">
                                    <h5>Khuyến mãi</h5>
                                    <input type="text" placeholder="Khuyến mãi" />
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