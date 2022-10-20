import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type {Theme, SxProps} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {Star} from '@mui/icons-material';
import React from 'react';
import {Link} from 'react-router-dom';

export interface IProduct {
	id: string;
	title: string;
	price: number;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
	description: string;
}

type ProductCardProps = {
	product: IProduct;
	hideBuyButton?: boolean;
	showAllDetails?: boolean;
	sx?: SxProps<Theme>;
};

const ProductCard: React.FC<ProductCardProps> = ({product, hideBuyButton, showAllDetails, sx}) => {
	return (
		<>
			<Card sx={{p: '5px', ...sx}} variant='outlined'>
				<CardMedia
					component='img'
					image={product.image}
					alt='product'
					height='220px'
					style={{
						objectFit: 'contain',
					}}
				/>
				<CardContent>
					<Typography variant='h6' component='h6'>
						{product.title.length > 25
							? product.title.slice(0, 25) + '...'
							: product.title}
					</Typography>
					<Typography color='text.secondary'>{product.category}</Typography>
					<Typography color='text.primary'>
						Rs. {Math.round(product.price * 10)}
					</Typography>
					<Typography
						color='text.secondary'
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						{product.rating.rate} <Star color='success' />
					</Typography>
					{showAllDetails && <Typography color='text.secondary'>{product.description}</Typography>}
					{!hideBuyButton && (
						<Button
							variant='contained'
							fullWidth
							to={`/new-order?product=${product.id}`}
							component={Link}
							sx={{mt: '10px'}}
						>
							Buy Now
						</Button>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default React.memo(ProductCard);
