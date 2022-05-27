import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/imgs/notfound.png'

const r = 10 / 6;
const screenWidth = window.screen.width;

const NotFound = () => (
    <div className="not-found mt-5 d-flex justify-content-center">
        <img
            className='not-found-img'
            src={notfound}
            alt="not-found"
            style={{ width: screenWidth }}
        />
    </div>
);

export default NotFound;