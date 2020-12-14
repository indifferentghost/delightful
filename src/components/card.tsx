import React, { useMemo } from 'react';
import { useSearchContext } from '../hooks/useSearchContext';
import haversine from 'haversine-distance'
import { usePostReferral } from '../hooks/useUserId';
import { v4 as uuid } from 'uuid';
import copy from 'copy-to-clipboard';
import { useNotificationContext } from './notification';

const Star = () => {
	return (
		<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
		</svg>
	);
}

export function Card({ business }: { business: Record<string, any> }) {
	const { setMessage } = useNotificationContext();
	const { data } = useSearchContext();
	const distance = useMemo(() => {
		if (!data?.coordinates) return null;
		return haversine(data?.coordinates, business.coordinates);
	}, [data?.coordinates, business])

	const [postReferral] = usePostReferral()

	const buttonClick = async () => {
		const referralId = uuid();
		postReferral({ place: business.alias, referralId: referralId });
		const url = `https://delightful-referals.herokuapp.com/referral?referralId=${referralId}`
		if (navigator.share) {
			try {
				await navigator.share({ url });
			} catch (error) {
				console.error(error.message)
			}
		} else {
			copy(url);
			setMessage!('Copied to Clipboard');
		}
	}

	return (
		<li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
			<div className="w-full flex items-center justify-between p-6 space-x-6">
				<img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={business.image_url} alt="" />
				<div className="flex-1 truncate">
					<div className="flex justify-between space-x-3">
						<h3 className="text-gray-900 text-sm font-medium truncate">{business.name}</h3>
						<div className="flex flex-col justify-end flex-shrink-0 px-2 py-0.5 text-xs font-medium">
							<span className="flex justify-end text-yellow-500">
								{Array.from({ length: business.rating }, (_, i) => <Star key={i}/>)}
							</span>
							<span className="inline-block w-full text-right text-xs font-medium">
								{business.review_count} ratings
							</span>
						</div>
					</div>
					<div className="flex justify-between">
						<div>
					{distance ? <p className="mt-1 text-gray-500 text-sm truncate">{(distance / 1609).toFixed(1)} miles</p> : null}
					{business.price ? <p className="text-gray-500 text-sm truncate">{business.price}</p> : null}
					</div>
					<button onClick={buttonClick} className="inline-flex m-1 items-center px-5 py-1.5 text-xs font-medium rounded-full shadow-sm text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">refer</button>
					</div>
				</div>
			</div>
		</li>
	);
}