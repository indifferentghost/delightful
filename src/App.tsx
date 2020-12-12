import './fast-refresh-fix'
import React from 'react';
import Layout from './components/layout/layout';
import { NavigationButton } from './components/layout/button';

const Navigation = () => {
	return (
		<>
			<NavigationButton link="/refer" exact>Refer</NavigationButton>
			<NavigationButton link="/check-in">Check In</NavigationButton>
		</>
	)
};

function App () {
	return <Layout navigation={<Navigation />}>test</Layout>;
}

export default App