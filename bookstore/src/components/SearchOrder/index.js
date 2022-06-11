import React from "react";
import "./style.css";
function Order(props) {
	console.log(props);
	const { order } = props;
	return (
		<div className="col-12 mb-3">
			<div className="card-book-home d-flex">
				<div className="order-title ">{order.bookName}</div>
				<div className=" order-price ">{order.price}</div>
				<div className=" order-status">{"Trạng thái: " + order.status}</div>
			</div>
		</div>
	);
}
export default function SearchOrder() {
	const [searchResult, setSearchResult] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");

	const TITLE = "Tìm kiếm đơn hàng";
	const TRACKING_IMG = "https://viettelpost.vn/viettelpost-iframe/assets/images/tracking-img.svg";
	const INPUT_SEARCH = "Nhập số điện thoại của bạn";
	var DummyData = [
		{
			orderID: "1",
			bookId: 1,
			bookName: "Bến Xe (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 76000,
			quantity: 80,
			sale: 0.8,
			status: "Đang giao",
			phone: "0",
		},
		{
			orderID: "2",
			bookId: 1,
			bookName: "Bến Đò",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 76000,
			quantity: 80,
			sale: 0.8,
			status: "Đang giao",
			phone: "1",
		},
		{
			orderID: "3",
			bookId: 1,
			bookName: "Bến cầu",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 76000,
			quantity: 80,
			sale: 0.8,
			status: "Đã nhận hàng",
			phone: "2",
		},
		{
			orderID: "4",
			bookId: 1,
			bookName: "Bến Xe (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 76000,
			quantity: 80,
			sale: 0.8,
			status: "Giao thất bại",
			phone: "3",
		},
	];

	const filerByKeyWord = function (data, key, keyWord) {
		return data.filter((item) => item[key] == keyWord);
	};
	const Search = function (keyWord) {
		setSearchResult(filerByKeyWord(DummyData, "phone", keyWord));
	};
	const onSearchValueChange = function (e) {
		setSearchValue(e.target.value);
	};
	return (
		<div className="container-home">
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
					<h2>Kết quả</h2>
					{searchResult.map(function (item) {
						return <Order order={item} />;
					})}
				</div>
			</div>
		</div>
	);
}
