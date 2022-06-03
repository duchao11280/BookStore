import './style.css'
import { Link } from 'react-router-dom'

function Sidebaradmin() {
  return (<>
    <div className="sidebar-admin pt-5">
      <ul className="navlist-admin">
        <Link to="/admin/book">
          <li className="itemlist-admin">
            <i className="fa-solid fa-book"></i>Sách
                </li>
        </Link>
        <Link to="/admin/order">
          <li className="itemlist-admin">
            <i className="fa-solid fa-cart-shopping"></i>Đơn hàng
                </li>
        </Link>
        <Link to="/admin/categories">
          <li className="itemlist-admin">
            <i className="fa-solid fa fa-bars"></i>Danh mục
                </li>
        </Link>
      </ul>
    </div>
  </>);
}

export default Sidebaradmin; 