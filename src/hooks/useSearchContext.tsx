import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type SearchContextProps = {
	// TODO: write a search blob for yelp
	data: any;
	fetchData?: (searchTerm: string) => Promise<void>,
}
export const SearchContext = createContext<SearchContextProps>({ data: {} });

type SearchProviderProps = PropsWithChildren<{}>;

export const useSearchContext = () => useContext(SearchContext);

const useSearchData = () => {
	const [data, setData] = useState({});

	useEffect(() => {
		console.log({ data })
	}, [data]);

	const fetchData = async (searchTerm: string) => {
		try {
			const requestOptions: RequestInit = {
				method: 'GET',
			};

			fetch(`/api/proxy?term=${searchTerm}`, requestOptions)
				.then(response => response.json())
				.then(r => setData(r))
				.catch(e => console.log(e))
		} catch (e) {
			console.error(e)
		}
	}

	return [data, fetchData] as const;
}

export default function SearchProvider({ children }: SearchProviderProps) {
	const [data, fetchData] = useSearchData();

	return (
		<SearchContext.Provider value={{ data, fetchData }}>
			{children}
		</SearchContext.Provider>
	);
}