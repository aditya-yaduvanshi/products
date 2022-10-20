import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {Search} from '@mui/icons-material';
import React, {useRef} from 'react';
//import {useSearch} from '../contexts/search';

type SearchFieldProps = {
	onSearch: (query: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({onSearch}) => {
	const searchRef = useRef() as React.RefObject<HTMLInputElement>;
	//const {setQuery} = useSearch();

	const handleSearch = () => {
		onSearch(searchRef.current?.value ?? '');
	};

	return (
		<>
			<TextField
				id='search'
				label='Search by product name and category.'
				type='search'
				size='small'
				variant='filled'
				fullWidth
				sx={{bgcolor: 'white'}}
        inputRef={searchRef}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleSearch}>
								<Search />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</>
	);
};

export default React.memo(SearchField);
