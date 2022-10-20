import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, {useState, useEffect} from 'react';
import ProductCard, {IProduct} from '../components/ProductCard';
import Sidebar, {DRAWER_WIDTH} from '../components/Sidebar';
import useIsSmallDevice from '../hooks/useIsSmallDevice';
//import SearchProvider, {useSearch} from '../contexts/search';

type ProductsProps = {
	query: string;
	open: boolean;
	onClose: () => void;
}

const Products: React.FC<ProductsProps> = ({query, open, onClose}) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(false);
	//const {query, category, maxPrice} = useSearch();
	const [category, setCategory] = useState('all');
	const [maxPrice, setMaxPrice] = useState(10000);
	const isMobile = useIsSmallDevice();

	let filteredProducts = products.filter((product) =>
		!query
			? true
			: product.title.toLowerCase().includes(query.toLowerCase()) ||
			  product.category.includes(query.toLowerCase())
	);

  filteredProducts = filteredProducts.filter((product) => category === 'all' ? true : product.category === category);

  filteredProducts = filteredProducts.filter((product) => maxPrice >= Math.round(product.price * 10));

	useEffect(() => {
		setLoading(true);
		fetch('https://fakestoreapi.com/products?limit=25')
			.then((res) => res.json())
			.then((result) => {
				setProducts(result);
			})
			.catch((err) => {})
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			{/* <SearchProvider> */}
				<Sidebar onCategoryChange={setCategory} onMaxPriceChange={setMaxPrice} open={open} onClose={onClose} />
			{/* </SearchProvider> */}
			<Box p='20px' sx={{ml: isMobile ? 0 : DRAWER_WIDTH}}>
				<Grid container spacing={1}>
					{filteredProducts.length ? filteredProducts.map((product) => (
						<Grid item xs={6} lg={4} key={product.id}>
							<ProductCard product={product} />
						</Grid>
					)) : !loading && <Typography component='h3' variant='h3'>No Products Found!</Typography>}
				</Grid>
				{loading && (
					<Typography component='h3' variant='h3'>
						Loading...
					</Typography>
				)}
			</Box>
		</>
	);
};

export default React.memo(Products);
