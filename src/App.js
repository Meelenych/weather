import React from 'react';
import Application from './app/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div>
			<ToastContainer />
			<Application />
		</div>
	);
}

export default App;
