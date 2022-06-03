import React from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import RatingStar from "react-rating-stars-component";
import useCollapse from 'react-collapsed'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarRatings from 'react-star-ratings';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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

const rateOption = {
	0: null,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5
}

const searchOption = {
	1: 'Đánh giá cao nhất',
	2: 'Mới nhất',
	3: 'Giá tăng dần',
	4: 'Giá giảm dần'
}

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function checkExistCategory(array = [], element) {
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

function checkExistSubcat(subcategory, book) {
	if (!subcategory) {
		return true;
	}
	if (subcategory == book) {
		return true;
	}
	else return false;
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

function checkRate(rate, checkValue) {
	if (rate == null) {
		return true;
	}
	if (checkValue >= rateOption[rate]) {
		return true;
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
					<StarRatings
						starDimension="30px"
						starSpacing="1px"
						rating={book.rate || 0}
						starRatedColor="#F9EF00"
						numberOfStars={5}
					/>
					<div className='card-book-text-star-home'>({rate || 0})</div>
				</div>
			</div>
		</div>
	)
}

function StartOptionFilter(props) {
	const { option } = props;
	return (
		<div>
			<StarRatings
				starDimension="20px"
				starSpacing="1px"
				rating={Number(option) || 0}
				starRatedColor="#ffae00"
				numberOfStars={5}
			/>
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

	const [isExpandedRate, setIsExpandRate] = React.useState(false);
	const { getCollapseProps: getCollapseRate, getToggleProps: getToggleRate } = useCollapse({ isExpanded: isExpandedRate });

	const navigate = useNavigate();
	let query = useQuery();
	let category = query.getAll('category');
	let subcategory = query.get('subcategory');
	let keyword = query.get('keyword');
	let price = query.getAll('price');
	let rate = query.get('rate');


	const [searchResult, setSearchResult] = React.useState([]);
	const [listAllBooks, setListAllBooks] = React.useState([]);
	const [checkedRate, setCheckedRate] = React.useState(null)
	const [pageNumber, setPageNumber] = React.useState(1);
	const [objCheckedCategory, setObjCheckedCategory] = React.useState({});
	const [objlistCategory, setObjlistCategory] = React.useState([]);
	const [objCheckedPrice, setObjCheckedPrice] = React.useState({
		1: false, // Dưới 50k
		2: false, // 50k - 100k
		3: false, // 100k - 200k
		4: false  // Trên 200k
	})

	const onSort = (key) => {
		const result = searchResult.sort((a, b) => {
			if (key === 1) {
				return a.rate > b.rate ? 1 : -1;
			} else if (key === 2) {
				return a.createAt > b.createAt ? 1 : -1;
			} else if (key === 3) {
				return a.price * a.sale > b.price * b.sale ? 1 : -1;
			} else if (key === 4) {
				return a.price * a.sale < b.price * b.sale ? 1 : -1;
			}
		});
		setSearchResult(result);
	}

	React.useEffect(() => {
		// set checked default for filter
		// category
		const newObjCheckedCategory = {};
		category.forEach(key => {
			newObjCheckedCategory[key] = true;
		})
		setObjCheckedCategory(newObjCheckedCategory);
		// price
		const newObjCheckedPrice = {
			1: false, // Dưới 50k
			2: false, // 50k - 100k
			3: false, // 100k - 200k
			4: false  // Trên 200k
		};
		price.forEach(key => {
			newObjCheckedPrice[key] = true;
		})
		setObjCheckedPrice(newObjCheckedPrice);
		// rate
		if (rate) {
			setCheckedRate(rate);
		}

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
		if (!category.length && (subcategory == null || subcategory == "") && (keyword == null || keyword == "") && !price.length && (rate == null || rate == "")) {
			setSearchResult(listAllBooks);
			return;
		}
		const listResult = listAllBooks.filter(book => {
			return checkExistCategory(category, book.catId)
				&& checkKeyword(book.bookName, keyword)
				&& checkExistPrice(price, (book.price * book.sale))
				&& checkRate(rate, book.rate || 0)
				&& checkExistSubcat(subcategory, book.subCatId)
		})

		setSearchResult(listResult);
	}, [useLocation().search, listAllBooks])

	const onCheckCategory = (checked, key) => {
		objCheckedCategory[key] = checked;
		setObjCheckedCategory(objCheckedCategory);
	}

	const onCheckPrice = (checked, key) => {
		objCheckedPrice[key] = checked;
		setObjCheckedPrice(objCheckedPrice);
	}

	const handleCheckRate = (event) => {
		setCheckedRate(event.target.value);
	};

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

		const query = `${encodeQueryData(listQueryCategory, 'category')}&${encodeQueryData(listQueryPrice, 'price')}${keyword !== null ? '&keyword=' + keyword : ""}${checkedRate !== null ? '&rate=' + checkedRate : ""}${subcategory !== null ? '&subcategory=' + subcategory : ""}`;
		navigate(`/search?${query}`);
	}

	const [sort, setSort] = React.useState(1);

	const handleChange = (event) => {
		setSort(event.target.value);
		onSort(event.target.value);
	};

	return (
		<div className="container-search">
			<div className="container">
				<div className="row">
					<div className="col-3 pt-5 sidebar">
						<div className="row mb-3 d-flex align-items-center">
							<div className="col-4">
								<button className="filter-button" onClick={onFillter}>Lọc</button>
							</div>
							<div className="col">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={sort}
										label="Sắp xếp theo"
										onChange={handleChange}
									>
										<MenuItem value={1}>{searchOption[1]}</MenuItem>
										<MenuItem value={2}>{searchOption[2]}</MenuItem>
										<MenuItem value={3}>{searchOption[3]}</MenuItem>
										<MenuItem value={4}>{searchOption[4]}</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<div className="row">
							<button className="sidebar-btn" {...getToggleCategory()} onClick={() => setIsExpandCategory(!isExpandedCategory)}>
								Thể loại
								{isExpandedCategory ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
							</button>
							<section {...getCollapseCategory()}>
								<FormGroup className="select-item">
									{
										Object.keys(objlistCategory).map((value, key) => {
											return (
												<FormControlLabel key={key} control={<Checkbox defaultChecked={objCheckedCategory[value]} onChange={(event) => onCheckCategory(event.target.checked, value)} />} label={objlistCategory[value]} />
											)
										})
									}
								</FormGroup>
							</section>
						</div>
						<div className="row">
							<button className="sidebar-btn" {...getTogglePrice()} onClick={() => setIsExpandPrice(!isExpandedPrice)}>
								Mức giá
								{isExpandedPrice ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
							</button>
							<section {...getCollapsePrice()}>
								<FormGroup className="select-item">
									<FormControlLabel control={<Checkbox defaultChecked={objCheckedPrice[1]} onChange={(event) => onCheckPrice(event.target.checked, 1)} />} label={"Dưới 50.000 đ"} />
									<FormControlLabel control={<Checkbox defaultChecked={objCheckedPrice[2]} onChange={(event) => onCheckPrice(event.target.checked, 2)} />} label={"50.000 đ - 100.000 đ"} />
									<FormControlLabel control={<Checkbox defaultChecked={objCheckedPrice[3]} onChange={(event) => onCheckPrice(event.target.checked, 3)} />} label={"100.000 đ - 200.000 đ"} />
									<FormControlLabel control={<Checkbox defaultChecked={objCheckedPrice[4]} onChange={(event) => onCheckPrice(event.target.checked, 4)} />} label={"Trên 200.000 đ"} />
								</FormGroup>
							</section>
						</div>
						<div className="row">
							<button className="sidebar-btn" {...getToggleRate()} onClick={() => setIsExpandRate(!isExpandedRate)}>
								Đánh giá
								{isExpandedRate ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
							</button>
							<section {...getCollapseRate()}>
								<FormGroup className="select-item">
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue={rate}
										name="radio-buttons-group"
										onChange={handleCheckRate}
									>
										<FormControlLabel value="5" control={<Radio />} label={<StartOptionFilter option={5} />} />
										<FormControlLabel value="4" control={<Radio />} label={<StartOptionFilter option={4} />} />
										<FormControlLabel value="3" control={<Radio />} label={<StartOptionFilter option={3} />} />
										<FormControlLabel value="2" control={<Radio />} label={<StartOptionFilter option={2} />} />
										<FormControlLabel value="1" control={<Radio />} label={<StartOptionFilter option={1} />} />
										<FormControlLabel value="0" control={<Radio />} label={<StartOptionFilter option={0} />} />
									</RadioGroup>
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
