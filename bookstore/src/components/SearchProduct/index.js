import React from "react";
import "./style.css";
import { createSearchParams, useSearchParams } from "react-router-dom";
import RatingStar from "react-rating-stars-component";
function CardBook(props) {
	const { book } = props;
	return (
		<div className="col-3 mb-3">
			<div className="card-book-home d-flex">
				<img alt="" src={book.imageURL} className="image-book-home mb-1 ms-auto me-auto" />
				<div className="card-book-title-home">{book.bookName}</div>
				<div className="card-book-price-home">{book.price} đ</div>
				<div className="card-book-old-price-home">{book.oldPrice} </div>
				<div className="card-book-star-home">
					<RatingStar count={book.rate} size={35} value={4.5} isHalf={true} activeColor="#F9EF00" edit={false} />
					<div className="card-book-text-star-home">{book.rate}</div>
				</div>
			</div>
		</div>
	);
}
export default function SearchProduct() {
	const [searchResult, setSearchResult] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [option, setOption] = React.useState("bookName");
	const [order, setOrder] = React.useState("");
	const TITLE = "Tìm kiếm sản phẩm";
	const SEARCH_TITLE = "Sắp xếp theo";
	const DummyData = [
		{
			bookId: 1,
			bookName: "Bến Xe (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 10000,
			quantity: 80,
			sale: 0.8,
			description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
			imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
			rate: 1.5,
		},
		{
			bookId: 2,
			bookName: "Bến Xe 2 (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 20000,
			quantity: 80,
			sale: 0.8,
			description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
			imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
			rate: 2.5,
		},
		{
			bookId: 3,
			bookName: "Bến Xe 3 (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 30000,
			quantity: 80,
			sale: 0.8,
			description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
			imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
			rate: 3.5,
		},
		{
			bookId: 4,
			bookName: "Bến Xe 4 (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 40000,
			quantity: 80,
			sale: 0.8,
			description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
			imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
			rate: 4,
		},
		{
			bookId: 5,
			bookName: "Bến Xe 5 (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			price: 50000,
			quantity: 80,
			sale: 0.8,
			description: "Đây là quyển sạch tuyệt vời với những nội dung tuyệt vời",
			imageURL: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208.jpg",
			rate: 5,
		},
	];
	const filterOptions = { bookName: "Tên sách", auth: "Tác giả", nxb: "Nhà xuất bản", price: "Giá", rate: "Đánh giá" };
	const filterOrder = {
		alphabet: { a2z: "Từ A-Z", z2a: "Từ Z-A" },
		price: { inc: "Giá tăng dần", dec: "Giá giảm dần" },
	};
	const filterByPrice = ["price", "rate"];
	const filterByAlphabet = ["bookName", "auth", "nxb"];
	const sortResult = function (data) {
		return data.sort((a, b) => {
			if (order === "a2z") {
				return a[option] > b[option] ? 1 : -1;
			} else if (order === "z2a") {
				return a[option] < b[option] ? 1 : -1;
			} else if (order === "inc") {
				return a[option] - b[option];
			} else if (order === "dec") {
				return b[option] - a[option];
			}
		});
	};
	const Search = function () {
		var resultAfterSort = sortResult(DummyData);
		setSearchResult(resultAfterSort);
	};
	const onChangeOptions = function (e) {
		console.log(e.target.value);
		setOption(e.target.value);
	};
	const onChangeOrder = function (e) {
		console.log(e.target.value);
		setOrder(e.target.value);
	};
	React.useEffect(() => {
		Search(searchValue);
	}, [option, order]);

	return (
		<div className="container-home">
			<div className="container-xl d-flex flex-column">
				<div className="row mt-3">
					<h1>{TITLE} </h1>
				</div>
				<div className="row mt-3 ">
					<div className="col-7 pl-2">
						<div>
							<div className="col-4">{SEARCH_TITLE}</div>
							<div className="col-4">
								<select onChange={onChangeOptions}>
									{Object.keys(filterOptions).map((item, index) => {
										return (
											<option key={index} value={item}>
												{filterOptions[item]}
											</option>
										);
									})}
								</select>
								{filterByAlphabet.indexOf(option) !== -1 ? (
									<select onChange={onChangeOrder}>
										{Object.keys(filterOrder.alphabet).map((item, index) => {
											return (
												<option key={index} value={item}>
													{filterOrder.alphabet[item]}
												</option>
											);
										})}
									</select>
								) : (
									<select onChange={onChangeOrder}>
										{Object.keys(filterOrder.price).map((item, index) => {
											return (
												<option key={index} value={item}>
													{filterOrder.price[item]}
												</option>
											);
										})}
									</select>
								)}
							</div>
							<div className="col-4"></div>
						</div>
					</div>
					<div className="col-5"></div>
				</div>
				<div className="row mt-3">
					<h2>Kết quả</h2>
					{searchResult.map(function (item) {
						return <CardBook book={item} />;
					})}
				</div>
			</div>
		</div>
	);
}
