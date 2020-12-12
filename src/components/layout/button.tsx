import React, { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

type NavigationButtonProps = PropsWithChildren<{
	link: string;
	exact?: boolean;
}>;

export function NavigationButton({ children, link, exact = false }: NavigationButtonProps) {
	return (
		<NavLink
			to={link}
			className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
			activeClassName="bg-indigo-700 text-white"
			exact={exact}
		>
			{children}
		</NavLink>
	);
}
