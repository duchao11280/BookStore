import React from 'react'
import loading from '../../assets/loading.gif'

const Loading = () => {
    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ width: '100%', height: '100vh', backgroundColor: "white", opacity: "0.8", position: "fixed", zIndex: "10" }}>
            <img src={loading} alt="Đang tải..." style={{ width: '100px', height: '100px' }} />
            <div>Đang tải...</div>
        </div>
    )
}

export default Loading
