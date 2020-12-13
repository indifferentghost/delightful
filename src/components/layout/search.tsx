import React from 'react';
import { useForm } from 'react-hook-form';
import { useSearchContext } from '../../useSearchContext';

type FormValues = { search: string}

export function Search() {
	const { fetchData } = useSearchContext();
	const { register, handleSubmit, errors } = useForm<FormValues>();
  const onSubmit = handleSubmit(({ search }) => fetchData?.(search));
	return (
		<div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
			<form onSubmit={onSubmit} className="max-w-lg w-full lg:max-w-xs">
				<label htmlFor="search" className="sr-only">Search</label>
				<div className="relative text-gray-400 focus-within:text-gray-600">
					<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
						<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
						</svg>
					</div>
					<input name="search" ref={register} className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm" placeholder="Search" type="search" />
				</div>
			</form>
		</div>
	);
}