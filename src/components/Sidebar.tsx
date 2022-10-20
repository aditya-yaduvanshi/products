import Divider from '@mui/material/Divider';
import Drawer, {DrawerProps} from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, {useLayoutEffect, useState} from 'react';
import useIsSmallDevice from '../hooks/useIsSmallDevice';
//import {useSearch} from '../contexts/search';

export const DRAWER_WIDTH = '240px';

type SiderbarProps = {
	onCategoryChange: (category: string) => void;
	onMaxPriceChange: (maxPrice: number) => void;
	open: boolean;
	onClose: () => void;
};

const Sidebar: React.FC<SiderbarProps> = ({
	onCategoryChange,
	onMaxPriceChange,
	open,
	onClose,
}) => {
	//const {setMaxPrice, setCategory} = useSearch();
	const [categories, setCategories] = useState<string[]>([]);
	const isMobile = useIsSmallDevice();

	function valuetext(value: number) {
		return `Rs. ${value}`;
	}

	useLayoutEffect(() => {
		fetch('https://fakestoreapi.com/products/categories')
			.then((res) => res.json())
			.then((result) => {
				setCategories(result);
			})
			.catch((err) => {});
	}, []);

	return (
		<>
			<Drawer
				sx={{
					width: DRAWER_WIDTH,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: DRAWER_WIDTH,
						boxSizing: 'border-box',
					},
				}}
				open={isMobile ? open : true}
				onClose={onClose}
				variant={isMobile ? 'temporary' : 'permanent'}
				anchor='left'
				ModalProps={{keepMounted: true}}
			>
				<Toolbar/>
				<Divider />
				<Typography component='h6' variant='h6' sx={{textAlign: 'center', mt: '20px'}}>
					Filter
				</Typography>
				<List>
					<ListItem sx={{display: 'flex', flexDirection: 'column'}}>
						<ListItemText>Price in Rs.</ListItemText>
						<Slider
							aria-label='Price in Rs.'
							defaultValue={10000}
							getAriaValueText={valuetext}
							valueLabelDisplay='auto'
							step={20}
							marks
							min={100}
							max={10000}
							onChange={(_e, value) =>
								onMaxPriceChange(typeof value === 'number' ? value : value[0])
							}
						/>
					</ListItem>
					<ListItem
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
						}}
					>
						<ListItemText>Category</ListItemText>
						<RadioGroup
							defaultValue='all'
							onChange={({target: {value}}) => onCategoryChange(value)}
						>
							<FormControlLabel
								key={'all'}
								value={'all'}
								control={<Radio />}
								label={'all'}
							/>
							{categories.map((category) => (
								<FormControlLabel
									key={category}
									value={category}
									control={<Radio />}
									label={category}
								/>
							))}
						</RadioGroup>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};

export default React.memo(Sidebar);
