import React from 'react'
import './style.css'
import logo from '../../assets/imgs/logo.png'

export default function Header() {
    return (
        <div className="container-footer">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img alt='' src={logo} className='icon-footer-logo' />
                        <p>01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. Hồ Chí Minh. Trường ĐH Sư Phạm Kỹ Thuật TP. HCM</p>
                        <p>ibookstore.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Ibook Store trên toàn quốc.</p>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-4 mt-5">
                                <div className='text-title-footer'>Dịch vụ</div>
                                <div className='text-subtitle-footer'>Điều khoản sử dụng</div>
                                <div className='text-subtitle-footer'>Chính sách bảo mật</div>
                                <div className='text-subtitle-footer'>Giới thiệu</div>
                            </div>
                            <div className="col-sm mt-5">
                                <div className='text-title-footer'>Hỗ trợ</div>
                                <div className='text-subtitle-footer'>Chính sách đổi trả - hoàn tiền</div>
                                <div className='text-subtitle-footer'>Phương thức vận chuyển</div>
                                <div className='text-subtitle-footer'>Phương thức thanh toán</div>
                            </div>
                            <div className="col-sm-4 mt-5">
                                <div className='text-title-footer'>Tài khoản của tôi</div>
                                <div className='text-subtitle-footer'>Thông tin cá nhân</div>
                                <div className='text-subtitle-footer'>Danh sách quan tâm</div>
                                <div className='text-subtitle-footer'>Lịch sử mua hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}