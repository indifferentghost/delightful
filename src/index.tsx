import './fast-refresh-fix'
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import './styles.css';

render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
	document.querySelector('#root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}