import './adminbook.css'
import { Link } from 'react-router-dom'
import Sidebaradmin from '../../../components/sidebaradmin';

function Book() {
    return (
        <div className="container-admin-book">
            <Sidebaradmin />
            <div className="content-admin-book">
                <div className="title-content-admin-book">
                    <h3>Sách</h3>
                    <div className="search-admin-book">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="body-content-admin-book">
                    <div className="body-header-admin-book">
                        <h5>Trang 2</h5>
                        <Link to="/admin/book/addbook"><i className="fa-solid fa-circle-plus"></i></Link>
                    </div>
                    <table className="table-content-admin-book">
                        <tr>
                            <th>Tên sách</th>
                            <th>Tác giả </th>
                            <th>Nhà xuất bản</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                        {/* <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td> 
                        </tr> */}
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/admin/book/addbook">Dế mèn phiêu lưu kí</Link></td>
                            <td><Link to="/admin/book/addbook">Tom Cruise</Link></td>
                            <td><Link to="/admin/book/addbook">Thế hệ trẻ</Link></td>
                            <td><Link to="/admin/book/addbook">200.000 VND</Link></td>
                            <td><Link to="/admin/book/addbook">525</Link></td>
                            <td>
                                <button className="btn-edit-editbook">
                                    <Link to="/admin/book/editbook"><i className="fa-solid fa-pen-to-square"></i></Link>
                                </button>
                                <button className="btn-delete-editbook">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Book; 