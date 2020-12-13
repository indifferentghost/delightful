import './fast-refresh-fix'
import React, { useContext } from 'react';
import Layout from './components/layout/layout';
import { NavigationButton } from './components/layout/button';
import { useSearchContext } from './useSearchContext';
import { Card } from './components/card';

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
		<Layout navigation={<Navigation />}>
			<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{
				(data?.businesses || []).map((business: Record<string, any>) => {
					return <Card key={business.id} business={business} />
				})
			}</ul>
		</Layout>
	);
}

export default App