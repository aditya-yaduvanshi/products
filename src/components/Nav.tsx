import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import React from 'react';
import {NavLink} from 'react-router-dom';
//import SearchProvider from '../contexts/search';
import SearchField from '../components/SearchField';

type NavProps = {
	onMenuToggle: () => void;
	onSearchQuery: (query: string) => void;
};

const Nav: React.FC<NavProps> = ({onMenuToggle, onSearchQuery}) => {
	return (
		<>
			<AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{mr: 2, display: {md: 'none'}}}
						onClick={onMenuToggle}
					>
						<Menu />
					</IconButton>
					<Typography
						variant='h6'
						component={NavLink}
						sx={{pr: '20px', mr: '20px'}}
						to='/'
					>
						Products
					</Typography>
					<Box sx={{ml: 'auto', width: {xs: '200px', sm: '240px', md: '480px', lg: '720px'}}}>
						{/* <SearchProvider> */}
							<SearchField onSearch={onSearchQuery} />
						{/* </SearchProvider> */}
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default React.memo(Nav);
