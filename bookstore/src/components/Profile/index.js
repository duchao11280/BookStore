import React from "react";
import avatar from "../../assets/icons/user.png";
import "./style.css";
import RatingStar from "react-rating-stars-component";
function CardBook(props) {
	const { book } = props;
	return (
		<div className="col-md-4 mb-3">
			<div className="card-book-home d-flex">
				<img alt="" src={book.thumbnails} className="image-book-home mb-1 ms-auto me-auto" />
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
export default function Profile() {
	const [view, setView] = React.useState(1);
	var [user, setUser] = React.useState({
		name: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		address: "",
		phone: "",
		avatar: "",
	});
	const DUMMY_BOOKS = [
		{
			id: 0,
			bookName: "Bến Xe (Tái Bản 2020)",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			rate: 4.8,
			thumbnails: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786048861278_7.jpg",
			price: 76000,
		},
		{
			id: 1,
			bookName: "Bến Dừa",
			nxb: "NXB Văn hiến",
			auth: "Trần Thị Thủy",
			year: 2020,
			rate: 3.8,
			thumbnails: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786048861278_7.jpg",
			price: 76000,
		},
		{
			id: 2,
			bookName: "Bến xe",
			nxb: "NXB Tao	",
			auth: "Quan Vũ",
			year: 2020,
			rate: 4.8,
			thumbnails: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786048861278_7.jpg",
			price: 76000,
		},
		{
			id: 3,
			bookName: "Bến xe",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			rate: 4.8,
			thumbnails: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786048861278_7.jpg",
			price: 76000,
		},
		{
			id: 4,
			bookName: "Bến xe",
			nxb: "NXB Văn học",
			auth: "Thương Thái Vy",
			year: 2020,
			rate: 4.8,
			thumbnails: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786048861278_7.jpg",
			price: 76000,
		},
	];
	const DUMMY_ORDER = [
		{
			orderID: "0",
			status: 0,
			price: 10000,
			bookId: 0,
		},
		{
			orderID: "1",
			status: 1,
			price: 20000,
			bookId: 1,
		},
		{
			orderID: "2",
			status: 2,
			price: 30000,
			bookId: 2,
		},
		{
			orderID: "3",
			status: 3,
			price: 40000,
			bookId: 3,
		},
		{
			orderID: "4",
			status: 4,
			price: 50000,
			bookId: 4,
		},
	];
	var [orders, setOrders] = React.useState([...DUMMY_ORDER]);
	var [orderFilter, setOrderFilter] = React.useState(-1);
	var [books, setBooks] = React.useState([...DUMMY_BOOKS]);
	var [wishlist, setWishlist] = React.useState([...DUMMY_BOOKS]);
	const onViewChange = (index) => {
		setView(index);
	};
	const VIEWS = [
		{
			id: 1,
			title: "Tài Khoản",
			icon: "fa-solid fa-user",
			class: "account",
		},
		{
			id: 2,
			title: "Đơn mua",
			class: "buy",
			icon: "fa-solid fa-shopping-cart",
		},
		{
			id: 3,
			title: "WishList",
			class: "wishlist",
			icon: "fa-solid fa-heart",
		},
	];
	const ORDER_STATUS = [
		{
			status: -1,
			name: "Tất cả",
		},
		{
			status: 0,
			name: "Đang chờ xử lý",
		},
		{
			status: 1,
			name: "Đang giao hàng",
		},
		{
			status: 2,
			name: "Đã hủy",
		},
		{
			status: 3,
			name: "Giao thất bại",
		},
		{
			status: 4,
			name: "Đã giao thành công",
		},
	];
	const ORDER_BUTTON = [
		{
			name: "Hủy đơn hàng",
			callback: () => {
				alert("Hủy đơn hàng thành công");
			},
			orderStatus: [0, 1],
			className: "cancel-order-button-item ",
		},
		{
			name: "Đã Nhận được hàng",
			callback: () => {
				alert("Đã Nhận được hàng");
			},
			orderStatus: [1],
			className: "confirm-order-button-item",
		},
		{
			name: "Mua lại",
			callback: () => {
				alert("Mua lại");
			},
			orderStatus: [2, 3],
			className: "rebuy-order-button-item ",
		},
		{
			name: "Đánh giá",
			callback: () => {
				alert("Đánh giá");
			},
			orderStatus: [4],
			className: "rate-order-button-item ",
		},
	];
	const getView = (index) => {
		return VIEWS.find((_view) => _view.id === index);
	};
	const onUserChange = (e, props) => {
		setUser({
			...user,
			[props]: e.target.value,
		});
	};
	const renderView = () => {
		if (view == 1) {
			return userProfile();
		} else if (view == 2) {
			return userBuy();
		} else if (view == 3) {
			return userWishList();
		}
	};
	const userProfile = () => {
		return (
			<div className="view-content-item profile ">
				<div className="row mb-2 ">
					<div className="col-4">Tên đăng nhập:</div>
					<div className="col-8">
						<input type="text" disabled value={user.userName}></input>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-4">Tên</div>
					<div className="col-8">
						<input
							type="text"
							value={user.name}
							onChange={(e) => {
								onUserChange(e, "name");
							}}
						></input>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-4">Email</div>
					<div className="col-8">
						<input
							type="text"
							value={user.email}
							onChange={(e) => {
								onUserChange(e, "email");
							}}
						></input>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-4">Số điện thoại</div>
					<div className="col-8">
						<input
							type="text"
							value={user.phone}
							onChange={(e) => {
								onUserChange(e, "phone");
							}}
						></input>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-4">Địa chỉ</div>
					<div className="col-8">
						<input
							type="text"
							value={user.address}
							onChange={(e) => {
								onUserChange(e, "address");
							}}
						></input>
					</div>
				</div>
				<div className="row mb-2">
					<div className="col-8 d-flex justify-content-end">
						<button
							className="btn btn-sm btn-outline-secondary save-info-btn"
							onClick={() => {
								alert("save");
							}}
						>
							Lưu
						</button>
					</div>
				</div>
			</div>
		);
	};
	const userBuy = () => {
		return (
			<div className="view-content-item ">
				<div className=" user-buy-title d-flex justify-content-between align-items-center ">{renderOrderStatusFilter()}</div>
				<div className="    ">{RenderFilterOrder()}</div>
			</div>
		);
	};
	const userWishList = () => {
		return (
			<div className="container">
				<div className="row">
					{wishlist.map(function (item) {
						return <CardBook book={item} />;
					})}
				</div>
			</div>
		);
	};
	const renderOrderStatusFilter = () => {
		return ORDER_STATUS.map((_status, index) => {
			var className = orderFilter == index - 1 ? "orderFilter-active" : "";
			return (
				<div className={"order-status-item " + className} onClick={() => filterOrder(index - 1)}>
					{_status.name}
				</div>
			);
		});
	};
	const RenderFilterOrder = () => {
		return orders.map((_order, index) => {
			let book = books.find((_book) => _book.id === _order.bookId);
			return (
				<div className="order-item d-flex justify-content-between align-items-lg-end">
					<div className="order-details d-flex">
						<img className="book-thumbnails" src={book.thumbnails}></img>
						<div className="book-info">
							<div className="book-name">{book.bookName}</div>
							<div className="book-auth">{book.auth}</div>
							<div className="order-price">{_order.price + "đ"}</div>
						</div>
					</div>
					<div className="order-status-profile ">
						<div className="order-details-status">{ORDER_STATUS.find((o) => o.status == _order.status).name}</div>
						<div className="mx-3  d-flex justify-content-end">
							{ORDER_BUTTON.map((_button, index) => {
								if (!_button.orderStatus.includes(_order.status)) {
									return;
								}
								return (
									<button
										onClick={() => {
											_button.callback();
										}}
										className={"btn btn-sm btn-outline-secondary  " + _button.className}
									>
										{_button.name}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			);
		});
	};
	const filterOrder = (status) => {
		setOrderFilter(status);
		if (status == -1) {
			return setOrders(DUMMY_ORDER);
		}
		return setOrders(
			DUMMY_ORDER.filter((order) => {
				return order.status === status;
			})
		);
	};
	const getBook = (id) => {
		return books.find((book) => book.id === id);
	};
	return (
		<div className="container-home">
			<div className="container-xl  d-flex flex-column">
				<div className="row mt-3">
					<div className="col-3">
						<div className="row mt-5">
							<img src={avatar}></img>
						</div>
						<div className="row d-flex ju">
							{VIEWS.map((item) => {
								return (
									<div
										key={item.id}
										className={" view-item"}
										onClick={() => {
											onViewChange(item.id);
										}}
									>
										<i class={item.icon}></i>
										{item.title}
									</div>
								);
							})}
						</div>
					</div>
					<div className="col-9">
						<div className={"view-main " + getView(view).class}>
							<h1 className="view-title">{getView(view).title}</h1>
							<div className="view-content">{renderView()}</div>
							<div></div>
						</div>
					</div>
				</div>
				<div className="row mt-3 "></div>
			</div>
		</div>
	);
}
