import './fast-refresh-fix'
import React from 'react';
import Layout from './components/layout/layout';
import { NavigationButton } from './components/layout/button';
import { useSearchContext } from './hooks/useSearchContext';
import { Card } from './components/card';
import { Notification } from './components/notification';
import { Route, Switch } from 'react-router-dom';
import Refer from './refer';

const Navigation = () => {
	return (
		<>
			<NavigationButton link="/" exact>Refer</NavigationButton>
			<NavigationButton link="/check-in">Check In</NavigationButton>
		</>
	)
};

function App() {
	const { data } = useSearchContext();

	console.log('app', data.businesses)
	return (
		<>
			<Notification />
			<Layout navigation={<Navigation />}>
				<Switch>
					<Route path="/refer">
						<Refer />
					</Route>
					<Route path="*">
						{data?.businesses ? null : (<h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Get Searching</h2>)}
						<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{
							(data?.businesses || []).map((business: Record<string, any>) => {
								return <Card key={business.id} business={business} />
							})
						}</ul>

					</Route>
				</Switch>
			</Layout>
		</>
	);
}

export default App