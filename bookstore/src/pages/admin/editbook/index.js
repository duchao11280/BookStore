import './editbook.css'
import Sidebaradmin from '../../../components/sidebaradmin';
import { Link, useParams } from 'react-router-dom'

function Editbook() {
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
                        <div className="main-content-left-admin-editbook">
                            <img className="img-top-left-admin-editbook"
                                src="/cover2.png" alt="ảnh sách"
                            />
                            <button>Đăng ảnh</button>
                            <img className="img-bottom-left-admin-editbook"
                                src="/thieunhi-thumb.jpg" alt="ảnh sách"
                            />
                            <button>Đăng ảnh</button>
                        </div>
                        <div className="main-content-right-admin-editbook">
                            <ul className="list-info-book-admin-editbook">
                                <li className="item-info-book-admin-editbook">
                                    <h5>Tên sách</h5>
                                    <input type="text" placeholder="Tên sách" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Thể loại lớn</h5>
                                    {/* <input type="text" placeholder="Thể loại" /> */}
                                    <select className="combobox-book-admin-editbook">
                                        <option value="">Trinh thám</option>
                                        <option value="">Lãng mạn</option>
                                        <option value="">Hài hước</option>
                                    </select>
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Thể loại nhỏ</h5>
                                    {/* <input type="text" placeholder="Thể loại" /> */}
                                    <select className="combobox-book-admin-editbook">
                                        <option value="">Trinh thám</option>
                                        <option value="">Lãng mạn</option>
                                        <option value="">Hài hước</option>
                                    </select>
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Tác giả</h5>
                                    <input type="text" placeholder="Tác gỉa" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Ngôn ngữ</h5>
                                    <input type="text" placeholder="Tác gỉa" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Nhà xuất bản</h5>
                                    <input type="text" placeholder="Nhà xuất bản" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Năm xuất bản</h5>
                                    <input type="text" placeholder="Năm xuất bản" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Mô tả</h5>
                                    <textarea placeholder="Mô tả" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Số lượng</h5>
                                    <input type="number" placeholder="Số lượng" />
                                </li>
                                <li className="item-info-book-admin-editbook">
                                    <h5>Khuyến mãi</h5>
                                    <input type="text" placeholder="Khuyến mãi" />
                                </li>
                            </ul>
                            <button className="btn-editbook-admin-editbook">Sửa sách</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Editbook; 