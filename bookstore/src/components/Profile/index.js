import React from "react";
import avatar from "../../assets/icons/user.png";
import "./style.css";
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
			<div className="view-content-item  ">
				<div className="row">
					<div className="col-4">Tên đăng nhập:</div>
					<div className="col-8">
						<input type="text" disabled value={user.userName}></input>
					</div>
				</div>
				<div className="row">
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
				<div className="row">
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
				<div className="row">
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
				<div className="row">
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
			</div>
		);
	};
	const userBuy = () => {
		return;
	};
	const userWishList = () => {
		return;
	};
	React.useEffect(() => {});
	return (
		<div className="container-home">
			<div className="container-xl  d-flex flex-column">
				<div className="row mt-3">
					<div className="col-3">
						<div className="row">
							<img src={avatar}></img>
						</div>
						<div className="row ">
							{VIEWS.map((item) => {
								return (
									<div
										key={item.id}
										className={item.class + " view-item"}
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
						<div className="view-main ">
							<h1 className="view-title">{getView(view).title}</h1>
							<div className="view-content">{renderView()}</div>
							<div>
								<button
									onClick={() => {
										console.log(user);
									}}
								>
									show user
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-3 "></div>
			</div>
		</div>
	);
}
