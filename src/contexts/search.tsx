import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from 'react';

export interface ISearchContext {
	query: string;
	setQuery: (query: string) => void;
	category: string;
	setCategory: (category: string) => void;
	maxPrice: number;
	setMaxPrice: (maxPrice: number) => void;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export const useSearch = () => {
	return useContext(SearchContext) as ISearchContext;
};

const SearchProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [search, setSearch] = useState({
		query: '',
		category: 'all',
		maxPrice: 10000,
	});

	const setQuery: ISearchContext['setQuery'] = useCallback((query) => {
		setSearch((current) => ({...current, query}));
	}, []);
	const setCategory: ISearchContext['setCategory'] = useCallback((category) => {
		setSearch((current) => ({...current, category}));
	}, []);
	const setMaxPrice: ISearchContext['setMaxPrice'] = useCallback((maxPrice) => {
		setSearch((current) => ({...current, maxPrice}));
	}, []);

	return (
		<>
			<SearchContext.Provider
				value={{...search, setQuery, setCategory, setMaxPrice}}
			>
				{children}
			</SearchContext.Provider>
		</>
	);
};

export default React.memo(SearchProvider);
