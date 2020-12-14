import './fast-refresh-fix'
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import SearchProvider from './hooks/useSearchContext';

import './styles.css';
import { UserProvider } from './hooks/useUserId';
import { NotificationProvider } from './components/notification';

/**
 * @todo: setup user accounts
 * 
 * @todo: track referrals
 * 
 * @todo: check-in
 * 
 * @todo: interface with the GeoLocationAPI for user location data
 * @url: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
 * 
 * @todo: store user location data in cookie
 * 
 * @todo: interact with clipboard when sharing isn't available (usually non-mobile devices)
 * @url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard
*/

render(
	<StrictMode>
		<Router>
			<UserProvider>
				<SearchProvider>
					<NotificationProvider>
						<App />
					</NotificationProvider>
				</SearchProvider>
			</UserProvider>
		</Router>
	</StrictMode>,
	document.querySelector('#root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept();
}