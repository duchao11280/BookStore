import './order.css'
import { Link } from 'react-router-dom'
import Sidebaradmin from '../../../components/sidebaradmin';
import { getAllOrder } from '../../../services/order.service'
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';



const columns = [
    { id: 'orderId', label: '#', },
    { id: 'fullName', label: 'Tên Người Đặt', },
    {
        id: 'fullName',
        label: 'Số điện thoại',

    },
    {
        id: 'sumPrice',
        label: 'Giá',


    },
    {
        id: 'status',
        label: 'Trạng Thái',


    },
];
function Order() {
    const [page, setPage] = React.useState(0);
    const [orderList, setorderList] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getOrder = () => {
        getAllOrder().then(result => {
            setorderList(result);
            console.log(result);

        })

    }
    const navigate = useNavigate();
    React.useEffect(getOrder, [])


    return (
        <div className="container-admin-order">
            <Sidebaradmin />
            <div className="content-admin-order">
                <div className="title-content-admin-order">
                    <h3>Đơn hàng</h3>
                    <div className="search-admin-order">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="body-content-admin-order">
                    <div className="body-header-admin-order">
                        <h5>QUẢN LÝ ĐƠN HÀNG</h5>
                        {/* <i class="fa-solid fa-circle-plus"></i> */}
                    </div>
                    {/* <table className="table-content-admin-order">
                        <tr>
                            <th>Tên sách</th>
                            <th>Tác giả </th>
                            <th>Nhà xuất bản</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        <tr>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Dế mèn phiêu lưu kí </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Tom Cruise </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">Thế hệ trẻ </Link></td>
                            <td className="link-orderdetail-adminbook"><Link to="/admin/order/orderdetail">200.000 VND </Link></td>
                            <td className="link-orderdetail-adminbook">
                                <button className="btn-cancelled-admin-order">Đã hủy</button>
                            </td>
                        </tr>

                    </table> */}
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderList
                                        .slice(page * 10, page * 10 + 10)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id == "status") {
                                                            return (
                                                                <TableCell>
                                                                    <td className="link-orderdetail-adminbook">
                                                                        <button className="btn-cancelled-admin-order" onClick={() => { navigate("/admin/order/orderdetail/" + row["orderId"]) }}>Đã hủy</button>
                                                                    </td>
                                                                </TableCell>

                                                            )
                                                        }

                                                        return (

                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={orderList.length}
                            rowsPerPage={10}
                            page={page}
                            onPageChange={handleChangePage}

                        />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Order; 