import './adminbook.css'
import { Link } from 'react-router-dom'
import Sidebaradmin from '../../../components/sidebaradmin';
import { getAllBook, deleteBook } from '../../../services/book.service'
import editIcon from '../../../assets/icons/editing.png'
import deleteIcon from '../../../assets/icons/delete.png'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import settings from '../../../config/settings';

const columns = [
    { id: 'bookId', label: '#', },
    { id: 'bookName', label: 'Tên Sách', },
    {
        id: 'auth',
        label: 'Tác giả',

    },
    {
        id: 'price',
        label: 'Giá',


    },
    {
        id: 'button',
        label: 'Thao tác',


    },
];

function Book() {
    if (window.sessionStorage.getItem(settings.loginKey.role) != '0') {
        window.location.replace('/notfound')
    }
    const [page, setPage] = React.useState(0);
    const [bookList, setbookList] = useState([]);
    const [bookDetail, setbookDetail] = useState();
    const [refresh, setRefresh] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const navigate = useNavigate(bookDetail);
    const getBook = () => {
        getAllBook().then(result => {
            setbookList(result)
        })

    }
    React.useEffect(getBook, [refresh])

    const handleDeleteBook = (id) => {
        deleteBook(id).then(() => {
            toast.success(" xóa thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });

            setRefresh(!refresh)
        })

    }



    return (
        <div className="container-admin-book">
            <Sidebaradmin />
            <div className="content-admin-book">
                <div className="title-content-admin-book">
                    <h3>Sách</h3>
                    {/* <div className="search-admin-book">
                        <input type="text" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div> */}
                </div>
                <div className="body-content-admin-book">
                    <div className="body-header-admin-book">
                        <h5>QUẢN LÝ SÁCH</h5>
                        <Link to="/admin/book/addbook"><i className="fa-solid fa-circle-plus"></i></Link>
                    </div>
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
                                    {bookList
                                        .slice(page * 10, page * 10 + 10)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id == "button") {
                                                            return (
                                                                <TableCell>
                                                                    <img alt="Chỉnh sửa" title="Chỉnh sửa" className="icon-admin-book " src={editIcon} onClick={() => {
                                                                        navigate("/admin/book/editbook/" + row["bookId"])
                                                                    }}
                                                                    />
                                                                    <img alt="Xóa" title="Xóa" className="icon-admin-book" src={deleteIcon} onClick={() => {
                                                                        handleDeleteBook(row["bookId"]);
                                                                    }} />
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
                            count={bookList.length}
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

export default Book; 