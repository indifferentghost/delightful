import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useUser } from './hooks/useUserId';
import { useHistory } from "react-router-dom";

const useSearchLocation = () => {
	const { search } = useLocation();
	const params = useMemo(() => new URLSearchParams(search), [search]);
	return params;
};

const useSignUp = () => {
	const params = useSearchLocation();
	const userId = useUser();
	const history = useHistory();

	const postAccept = async (email: string) => {
		try {
			console.log({
				referralId: params.get('referralId'),
					userId,
					email
			})
			const requestOptions: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					referralId: params.get('referralId'),
					userId,
					email
				})
			};

			await fetch(`/api/accept`, requestOptions)
				.then(response => response.json())
				.catch(e => console.log(e))

			history.push('/');
		} catch (e) {
			console.error(e)
		}
	}
	return [postAccept] as const;
}

export default function Refer() {
	const params = useSearchLocation();
	const [postAccept] = useSignUp();
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = handleSubmit(({ email }) => postAccept(email))

	return (
		<div className="bg-white overflow-hidden shadow sm:rounded-lg">
			<main className="px-4 py-5 sm:p-6">
				<div className="xl:flex-1">
					<h2 className="w-full text-2xl font-extrabold tracking-tight text-gray-500 sm:text-3xl">
						You've been referred to {(params.get('business') || '').replaceAll('_', ' ')}
					</h2>
				</div>
				<div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
					<form onSubmit={onSubmit} className="sm:flex">
						<label htmlFor="emailAddress" className="sr-only">Email address</label>
						<input ref={register({ required: true })} id="emailAddress" name="email" type="email" autoComplete="email" required className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md" placeholder="Enter your email" />
						<button type="submit" className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0">
							Sign Up
          	</button>
					</form>
				</div>
			</main>
		</div >
	);
}