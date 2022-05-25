import './adminbook.css'
import { Link } from 'react-router-dom'
import Sidebaradmin from '../../../components/sidebaradmin';
import { getAllBook } from '../../../services/book.service'
import editIcon from '../../../assets/icons/editing.png'
import deleteIcon from '../../../assets/icons/delete.png'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';







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


// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }

const rows = [
    {
        "bookId": 1,
        "bookName": "Sống Mòn",
        "auth": "Nam Cao",
        "tinyDescription": "Một bản thảo được nhà văn Nam Cao hoàn thành từ trước Cách mạng nhưng phải đợi tới sau ngày hòa bình lập lại ở miền Bắc cuốn tiểu thuyết mới được ra mắt.",
        "description": "Mặc dù bản thảo Sống mòn đã được nhà văn Nam Cao hoàn thành từ trước Cách Mạng nhưng phải đợi tới sau ngày hòa bình lập lại ở miền Bắc cuốn tiểu thuyết mới lần đầu ra mắt độc giả.\r\n\r\nCó lẽ là vì thế, vì được xuất bản khi thời đại đã chuyển nên Sống mòn như bị lỡ mất nhịp, không làm thành một sự kiện lớn trong dư luận văn học hồi bấy giờ. Rồi liên tiếp sau đó là những biến động lớn lao và không ngừng cho tới tận năm 1975 của đất nước khiến cuốn tiểu thuyết có chiều nội tâm quá sâu và quá nặng ưu tư ấy vốn đã không thể có đông người đọc càng ít người đọc hơn, vốn đã quá kín đáo và kín tiếng lại càng bị chìm tiếng đi giữa một thời đại văn học bừng bừng hào khí và đầy những tiếng động vang dội.\r\n\r\nNgày nay, Sống mòn đã được nhắc tới nhiều hơn, nhưng vẫn có vẻ là được nhắc tới một cách lớt phớt. Dường như chính tầm cỡ những truyện ngắn của Nam Cao đã tạo nên một định kiến rằng Nam Cao là tác gia truyện ngắn, sự nghiệp để đời bằng truyện ngắn, chỉ truyện ngắn.",
        "language": "Tiếng Việt",
        "year": 2016,
        "nxb": "NXB Văn Học",
        "price": 69000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.78,
        "coverImg": null,
        "thumbnails": "songmon_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T03:31:35.000Z",
        "updateAt": "2022-05-25T11:27:30.000Z"
    },
    {
        "bookId": 2,
        "bookName": "Mắt Biếc (Tái Bản 2019)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Mắt Biếc (Tái Bản 2019)",
        "description": "Mắt biếc là một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn Nguyễn Nhật Ánh. Tác phẩm này cũng đã được dịch giả Kato Sakae dịch sang tiếng Nhật để giới thiệu với độc giả Nhật Bản.\r\n\r\n“Tôi gửi tình yêu cho mùa hè, nhưng mùa hè không giữ nổi. Mùa hè chỉ biết ra hoa, phượng đỏ sân trường và tiếng ve nỉ non trong lá. Mùa hè ngây ngô, giống như tôi vậy. Nó chẳng làm được những điều tôi ký thác. Nó để Hà Lan đốt tôi, đốt rụi. Trái tim tôi cháy thành tro, rơi vãi trên đường về.”\r\n\r\n… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc buồn, rất buồn khi xuyên suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn… ",
        "language": "Tiếng Việt",
        "year": 2019,
        "nxb": "NXB Trẻ",
        "price": 110000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.85,
        "coverImg": null,
        "thumbnails": "matbiet_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:27:55.000Z",
        "updateAt": "2022-05-24T18:27:55.000Z"
    },
    {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    },
    {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    }, {
        "bookId": 3,
        "bookName": "Hạ Đỏ (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái",
        "description": "Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 60000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.82,
        "coverImg": null,
        "thumbnails": "hado_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:32:20.000Z",
        "updateAt": "2022-05-25T03:41:00.000Z"
    },
    {
        "bookId": 4,
        "bookName": "Ngày Xưa Có Một Chuyện Tình (Tái Bản 2019)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH là tác phẩm mới tinh thứ 2 trong năm 2016 của nhà văn Nguyễn Nhật Ánh",
        "description": "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH là tác phẩm mới tinh thứ 2 trong năm 2016 của nhà văn Nguyễn Nhật Ánh dài hơn 300 trang, được coi là tập tiếp theo của tập truyện Mắt biếc. Có một tình yêu dữ dội, với em,  của một người yêu em hơn chính bản thân mình - là anh.\r\n\r\nNgày xưa có một chuyện tình có phải là một câu chuyện cảm động  khi người ta yêu nhau, nỗi khát khao một hạnh phúc êm đềm ấm áp đến thế; hay đơn giản chỉ là chuyện ba người - anh, em, và người ấy…?\r\n\r\nBạn hãy mở sách ra, để chứng kiến làn gió tình yêu chảy qua như rải nắng trên khuôn mặt mùa đông của cô gái; nụ hôn đầu tiên ngọt mật, cái ôm đầu tiên, những giọt nước mắt và cái ôm xiết cuối cùng… rồi sẽ tìm thấy câu trả lời, cho riêng mình.",
        "language": "Tiếng Việt",
        "year": 2019,
        "nxb": "NXB Trẻ",
        "price": 125000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.85,
        "coverImg": null,
        "thumbnails": "ngayxuacomotchuyentinh_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:35:42.000Z",
        "updateAt": "2022-05-24T18:35:42.000Z"
    },
    {
        "bookId": 5,
        "bookName": "Chuyện Cổ Tích Dành Cho Người Lớn (Tái Bản 2018)",
        "auth": "Nguyễn Nhật Ánh",
        "tinyDescription": "Một bộ sưu tập truyện cười",
        "description": "\r\n“Chuyện cổ tích dành cho người lớn” của tác giả Nguyễn Nhật Ánh là một đầu sách nổi bật giữa các đầu sách nổi tiếng của ông, không viết về trẻ thơ, về tình yêu của các cô cậu học trò, hay các anh chị đôi mươi mới lớn, mà viết về những phút giây đời thường của những con người “lớn” khi đã kết hôn, …. Là những tập truyện ngắn hài hước, nhưng sâu trong đó cũng có nhỏ nhẹ những triết lí đạo làm vợ chồng, … Từng mẩu chuyện nhỏ, đọc nó lên ta cảm nhận được hơi ấm tình người, những trò đùa vặt, giận dỗi hờn ghen trong đó làm cho con người ta thích thú. Các tình huống được dựng lên một cách rất đời thường, dưới ngòi bút tài ba, kì cựu của tác giả Nguyễn Nhật Ánh, mọi thứ dù yêu hay ghét đều hiện lên rất chân thực.  ",
        "language": "Tiếng Việt",
        "year": 2018,
        "nxb": "NXB Trẻ",
        "price": 52000,
        "quantity": 300,
        "subCatId": 1,
        "sale": 0.84,
        "coverImg": null,
        "thumbnails": "chuyencotichchonguoilon_thumb1.jpg",
        "isDisable": 0,
        "createAt": "2022-05-24T18:39:06.000Z",
        "updateAt": "2022-05-24T18:39:06.000Z"
    }
]
















function Book() {
    const [page, setPage] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };







    const navigate = useNavigate();
    const getBook = () => {
        getAllBook().then(result => {
            console.log(result);
        })

    }
    React.useEffect(getBook, [])



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
                                    {rows
                                        .slice(page * 10, page * 10 + 10)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id == "button") {
                                                            return (
                                                                <TableCell>
                                                                    <img alt="" className="icon-admin-book " src={editIcon} onClick={() => { navigate("/admin/book/editbook/" + row["bookId"]) }} />
                                                                    <img alt="" className="icon-admin-book" src={deleteIcon} />
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
                            count={rows.length}
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