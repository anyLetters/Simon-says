import React, { Component } from 'react';
import MenuContainer from './containers/Menu.js';
import SimonContainer from './containers/Simon.js';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SimonContainer />
				<MenuContainer />
			</div>
		);
	}
}

export default App;
