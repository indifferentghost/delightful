import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

const UserContext = createContext<string>('');

export const useUser = () => useContext(UserContext);

type PostReferralProps = {
	place: string;
	referralId: string;
	email?: string;
};

export function usePostReferral() {
	const userId = useUser();
	const postReferral = async ({ place, referralId, email = ''}: PostReferralProps) => {
		try {
			const requestOptions: RequestInit = {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					referral_id: referralId,
					user: userId,
					email,
					place
				}),
			};

			fetch(`/api/refer`, requestOptions)
				.then(response => response.json())
				.catch(e => console.log(e))
		} catch (e) {
			console.error(e)
		}
	}

	return [postReferral] as const;
}

export const USER_ID = 'userid';

type UserProviderProps = {
	children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
	const userId = useMemo(() => {
		let id = localStorage.getItem(USER_ID);
		if (!id) {
			id = uuid();
			localStorage.setItem(USER_ID, id);
		}
		return id;
	}, []);

	return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
}
