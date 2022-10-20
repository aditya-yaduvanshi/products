import Box from '@mui/material/Box';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from '../components/Nav';
import NewOrder from '../pages/new-order';
import Products from '../pages/products';
//import SearchProvider from '../contexts/search';

const App: React.FC = () => {
	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);
	return (
		<>
			<BrowserRouter>
				<Nav onMenuToggle={() => setOpen(current => !current)} onSearchQuery={setQuery} />
				<Box position='absolute' top='64px' bottom='64px' width='100%'>
					<Routes>
						<Route
							path='/'
							index
							element={
								// <SearchProvider>
									<Products query={query} open={open} onClose={() => setOpen(false)} />
								// </SearchProvider>
							}
						/>
						<Route path='/new-order' element={<NewOrder />} />
						<Route element={<>404 NOT FOUND</>} />
					</Routes>
				</Box>
			</BrowserRouter>
		</>
	);
};

export default React.memo(App);
 