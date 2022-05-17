import React from 'react'
import './style.css'
import logo from '../../assets/imgs/logo.png'

export default function Header() {
    return (
        <div className="container-footer">
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img alt='' src={logo} className='icon-footer-logo'/>
                    <p>01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. Hồ Chí Minh. Trường ĐH Sư Phạm Kỹ Thuật TP. HCM</p>
                    <p>ABC.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.</p>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            Dich vu
                        </div>
                        <div className="col">
                            Dich vu
                        </div>
                        <div className="col">
                            Dich vu
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}