import React from "react";
import "./style.css";
import useCollapse from 'react-collapsed';
import { getListOrdersByPhone } from "../../services/order.service";
import Loading from "../loading";
import { groupArrayByKey } from "../../utls/utilities";
import { formatVND } from "../../utls/number";

function Order(props) {
	const { books } = props;
	console.log(books);
	let order = {
		orderId: null,
		createAt: null,
		status: null,
		address: null,
	}
	let totalPrice = 0;
	if (books && books.length) {
		order = books[0];
		books.forEach(element => {
			totalPrice += Number(element.price);
		});
	}


	const getStatusString = (status) => {
		switch (Number(status)) {
			case 0:
				return "Đang đợi xác nhận";
			case 1:
				return "Đang giao";
			case 2:
				return "Đã hủy đơn hàng";
			case 3:
				return "Giao hàng thất bại";
			case 4:
				return "Đã giao hàng thành công";
			default:
				return "Không xác định";
		}
	}

	const getStatusStyle = (status) => {
		const stt = Number(status);
		if (stt === 4) {
			return "order-card-info-status-done"
		} else if (stt === 2) {
			return "order-card-info-status-fail"
		} else {
			return "order-card-info-status-process"
		}
	}

	const getDateString = (date) => {
		const newDate = new Date(date);
		if (isNaN(newDate)) {
			return "";
		}
		return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
	}

	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

	return (
		<>
			<tr className="col-12 container-order-card">
				<td className="container-order-card-row"><span className="order-card-title">Mã đơn:</span> <span className="order-card-info ">{order.orderId}</span></td>
				<td className="container-order-card-row"><span className="order-card-title">Ngày đặt hàng:</span> <span className="order-card-info ">{getDateString(order.createAt)}</span></td>
				<td className="container-order-card-row"><span className="order-card-title">Tổng tiền:</span> <span className="order-card-info ">{formatVND(totalPrice)}</span></td>
				<td className="container-order-card-row"><span className="order-card-title">Trạng thái:</span> <span className={"order-card-info " + getStatusStyle(order.status)}>{getStatusString(order.status)}</span></td>
				<td className="button-order-card-row-expand">
					<button {...getToggleProps()} className="button-order-card-row-expand">
						{isExpanded ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
					</button>
				</td>
			</tr>
			<tr className="col-12 container-order-card">
				<td colSpan="5" className={isExpanded ? "container-card-order-details" : "order-line"} >
					<div {...getCollapseProps()} >
					<table className="col-12">
						<tbody>
							{books.map(function (book, index) {
								return <tr>
									<td className="card-order-details-bookname" title={book.bookName}>{book.bookName}</td>
									<td className="card-order-details-number">Số lượng: {book.number}</td>
									<td className="card-order-details-price">Đơn giá: {formatVND(book.price)}</td>
								</tr>
							})}
						</tbody>
					</table>
					</div>
				</td>
			</tr>
		</>
	);
}
export default function SearchOrder() {
	const [searchResult, setSearchResult] = React.useState(null);
	const [searchValue, setSearchValue] = React.useState("");
	const [isLoading, setIsLoading] = React.useState("");

	const TITLE = "Tìm kiếm đơn hàng";
	const TRACKING_IMG = "https://viettelpost.vn/viettelpost-iframe/assets/images/tracking-img.svg";
	const INPUT_SEARCH = "Nhập số điện thoại của bạn";
	const [listOrders, setListOrders] = React.useState([]);

	const filerByKeyWord = function (data, key, keyWord) {
		return data.filter((item) => item[key] == keyWord);
	};
	const Search = function (keyWord) {
		setIsLoading(true);
		getListOrdersByPhone(keyWord).then(result => {
			if (result.data.length) {
				setSearchResult(groupArrayByKey(result.data, "orderId"));
			} else {
				setSearchResult(null);
			}
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}).catch(err => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
			setSearchResult(null)
		})
	};
	const onSearchValueChange = function (e) {
		setSearchValue(e.target.value);
	};
	return (
		<div className="container-home">
			{isLoading && <Loading />}
			<div className="container-xl d-flex flex-column">
				<div className="row mt-3">
					<h1>{TITLE} </h1>
				</div>
				<div className="row mt-3 ">
					<div className="col-7 pl-2">
						<div id="tracking-input" className="container-header-search">
							<input className="input-header-search " placeholder={INPUT_SEARCH} value={searchValue} onChange={onSearchValueChange} />
						</div>
						<button
							id="btnTracking"
							onClick={() => {
								Search(searchValue);
							}}
						>
							Tìm kiếm
						</button>
					</div>
					<div className="col-5">
						<img src={TRACKING_IMG} />
					</div>
				</div>
				<div className="row mt-3">
					<h2>{searchResult ? "Kết quả" : "Không tìm thấy đơn hàng"}</h2>
					{
						searchResult && <table className="container-order-table">
						<tbody>
							{Object.keys(searchResult).map(function (key, index) {
								return <Order books={searchResult[key]} key={index} />;
							})}
						</tbody>
					</table>
					}
				</div>
			</div>
		</div>
	);
}
