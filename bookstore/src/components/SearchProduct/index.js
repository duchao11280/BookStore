import React from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import RatingStar from "react-rating-stars-component";
import useCollapse from 'react-collapsed'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getAllBookSearch } from '../../services/book.service';
import settings from '../../config/settings';
import {
	formatVND,
	roundMoney
} from '../../utls/number';

const priceArray = {
	1: {
		startPrice: 0,
		endPrice: 50000
	},
	2: {
		startPrice: 50000,
		endPrice: 100000
	},
	3: {
		startPrice: 100000,
		endPrice: 200000
	},
	4: {
		startPrice: 200000,
		endPrice: 100000000000000000
	}
}

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function checkExist(array = [], element) {
	if (array.length == 0) {
		return true;
	}
	if (array.includes(element)) {
		return true;
	}
	if (array.includes(element.toString())) {
		return true;
	}
	return false;
}

function checkKeyword(string = "", key = "") {
	if (key == null || key == "") {
		return true;
	}
	if (!string) {
		return false;
	}
	string = string.toString().toLowerCase();
	key = (key + "").toString().toLowerCase();
	if (string.includes(key)) {
		return true;
	}
	return false;
}

function checkExistPrice(array = [], price) {
	if (!array.length) {
		return true;
	}
	for (let i of array) {
		const periodPrice = priceArray[i];
		if (price >= periodPrice.startPrice && price <= periodPrice.endPrice) {
			return true;
		}
	}
	return false;
}

function CardBook(props) {
	const navigate = useNavigate();
	const book = props.item;
	const {
		bookId,
		bookName,
		sale,
		price,
		thumbnails,
		rate
	} = book;
	const isSale = book.sale < 1 ? true : false;
	return (
		<div className='col-4 mb-3' onClick={() => navigate('/detailsbook/' + bookId)}>
			<div className='card-book-home d-flex'>
				<img alt='' src={settings.urlImageKey + thumbnails} className='image-book-home mb-1 ms-auto me-auto' />
				<div className='card-book-title-home'>{bookName}</div>
				<div className='card-book-price-home'>{formatVND(roundMoney(price * sale))}</div>
				<div className='card-book-old-price-home'>{isSale ? formatVND(roundMoney(price)) : ""}</div>
				<div className='card-book-star-home'>
					<RatingStar
						count={5}
						size={35}
						value={rate}
						isHalf={true}
						activeColor="#F9EF00"
						edit={false}
					/>
					<div className='card-book-text-star-home'>({rate || 0})</div>
				</div>
			</div>
		</div>
	)
}

function encodeQueryData(array, key) {
	const ret = [];
	for (let element of array) {
		ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(element))
	}
	return ret.join('&');
}

export default function SearchProduct() {
	const [isExpandedCategory, setIsExpandCategory] = React.useState(false);
	const { getCollapseProps: getCollapseCategory, getToggleProps: getToggleCategory } = useCollapse({ isExpanded: isExpandedCategory });

	const [isExpandedPrice, setIsExpandPrice] = React.useState(false);
	const { getCollapseProps: getCollapsePrice, getToggleProps: getTogglePrice } = useCollapse({ isExpanded: isExpandedPrice });

	const navigate = useNavigate();
	let query = useQuery();
	let category = query.getAll('category');
	let subcategory = query.getAll('subcategory');
	let keyword = query.get('keyword');
	let price = query.getAll('price');


	const [searchResult, setSearchResult] = React.useState([]);
	const [listAllBooks, setListAllBooks] = React.useState([]);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [objCheckedCategory, setObjCheckedCategory] = React.useState({});
	const [objlistCategory, setObjlistCategory] = React.useState([]);
	const [objCheckedPrice, setObjCHeckedPrice] = React.useState({
		1: false, // Dưới 50k
		2: false, // 50k - 100k
		3: false, // 100k - 200k
		4: false  // Trên 200k
	})
	const [showMore, setShowMore] = React.useState(false);

	const btnShowMore = () => {
		setShowMore(!showMore);
		if (showMore == true) {
			return <>
				<i className="fa-solid fa-angle-up"></i>
			</>
		}
	}

	React.useEffect(() => {
		const objCat = {};
		getAllBookSearch().then(result => {
			for (let book of result) {
				if (objCat[book.catId] == null) {
					objCat[book.catId] = book.catName;
				}
			}
			setObjlistCategory(objCat);
			setListAllBooks(result);
		})
	}, [])

	React.useEffect(() => {
		const listBooks = [];
		if (!category.length && !subcategory.length && (keyword == null || keyword == "") && !price.length) {
			setSearchResult(listAllBooks);
			return;
		}
		const listResult = listAllBooks.filter(book => {
			return checkExist(category, book.catId)
				&& checkKeyword(book.bookName, keyword)
				&& checkExistPrice(price, (book.price * book.sale))
		})


		// for (let book of listAllBooks) {
		// 	if (checkExist(category, book.catId)) {
		// 		listBooks.push(book);
		// 		continue;
		// 	}
		// 	if (checkExist(subcategory, book.subCatId)) {
		// 		listBooks.push(book);
		// 		continue;
		// 	}
		// 	if (checkKeyword(book.bookName, keyword)) {
		// 		listBooks.push(book);
		// 		continue;
		// 	}
		// 	if (checkExistPrice(price, (book.price * book.sale))) {
		// 		listBooks.push(book);
		// 		continue;
		// 	}

		// }
		setSearchResult(listResult);
	}, [useLocation().search, listAllBooks])

	const onSearch = () => {
		navigate('/search?category=1&category=5');
	}

	const onCheckCategory = (checked, key) => {
		objCheckedCategory[key] = checked;
		setObjCheckedCategory(objCheckedCategory);
	}

	const onCheckPrice = (checked, key) => {
		objCheckedPrice[key] = checked;
		setObjCHeckedPrice(objCheckedPrice);
	}

	const onFillter = () => {
		const listQueryCategory = [];
		Object.keys(objCheckedCategory).forEach(value => {
			if (objCheckedCategory[value]) {
				listQueryCategory.push(value);
			}
		})

		const listQueryPrice = [];
		Object.keys(objCheckedPrice).forEach(key => {
			if (objCheckedPrice[key]) {
				listQueryPrice.push(key);
			}
		})

		const query = `${encodeQueryData(listQueryCategory, 'category')}&${encodeQueryData(listQueryPrice, 'price')}`
		navigate(`/search?${query}`);
	}

	// 	var changeIcon = {() => {

	// 	}
	// }
	return (
		<div className="container-search">
			<div className="container">
				<div className="row">
					<div className="col-3 pt-5 sidebar">
						<button className="sidebar-btn" onClick={onFillter}>Tìm</button>
						<div>
							<button className="sidebar-btn" {...getToggleCategory()} onClick={() => setIsExpandCategory(!isExpandedCategory)}>
								{isExpandedCategory ? 'Thể loại - đóng' : 'Thể loại - mở'}
								{isExpandedCategory ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}


							</button>
							<section {...getCollapseCategory()}>
								<FormGroup className="select-item">
									{
										Object.keys(objlistCategory).map((value, key) => {
											return (
												<FormControlLabel key={key} control={<Checkbox onChange={(event) => onCheckCategory(event.target.checked, value)} />} label={objlistCategory[value]} />
											)
										})
									}
								</FormGroup>
							</section>
						</div>
						<div>
							<button className="sidebar-btn" {...getTogglePrice()} onClick={() => setIsExpandPrice(!isExpandedPrice)}>
								{isExpandedPrice ? 'Mức giá - đóng' : 'Mức giá - mở'}
								{isExpandedPrice ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}

							</button>
							<section {...getCollapsePrice()}>
								<FormGroup className="select-item">
									<FormControlLabel control={<Checkbox onChange={(event) => onCheckPrice(event.target.checked, 1)} />} label={"Dưới 50.000 đ"} />
									<FormControlLabel control={<Checkbox onChange={(event) => onCheckPrice(event.target.checked, 2)} />} label={"50.000 đ - 100.000 đ"} />
									<FormControlLabel control={<Checkbox onChange={(event) => onCheckPrice(event.target.checked, 3)} />} label={"100.000 đ - 200.000 đ"} />
									<FormControlLabel control={<Checkbox onChange={(event) => onCheckPrice(event.target.checked, 4)} />} label={"Trên 200.000 đ"} />
								</FormGroup>
							</section>
						</div>
					</div>
					<div className="col">
						<div className="container d-flex flex-column">
							<div className="row mt-3">
								{searchResult.map(function (book, key) {
									return <CardBook item={book} key={key} />;
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
