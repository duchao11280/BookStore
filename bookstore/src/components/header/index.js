import React from 'react'
import './style.css'
import logo from '../../assets/imgs/logo2.png'
import menu from '../../assets/icons/menu.png'
import bell from '../../assets/icons/bell.png'
import cart from '../../assets/icons/shopping-cart.png'
import user from '../../assets/icons/user.png'
import search from '../../assets/icons/search.png'

export default function Header() {
    return (
        <div className="container-header">
            <div className="container d-flex justify-content-between align-items-center">
                <img className="icon-header-logo" src={logo} />
                <div className="container-header-item">
                    <img src={menu} className="icon-header" />
                </div>
                <div className="item-header-text">Su kien</div>
                <div className="container-header-search">
                    <img src={search} className="icon-header" />
                    <input className="input-header-search" placeholder="Tìm kiếm sản phẩm" />
                </div>
                <div className="container-header-item">
                    <img src={cart} className="icon-header" />
                </div>
                <div className="container-header-item">
                    <img src={bell} className="icon-header" />
                </div>
                <div className="container-header-item">
                    <img src={user} className="icon-header" />
                </div>
            </div>
        </div>
    )

}