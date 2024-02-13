import {createElement} from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import App from './views/app';

import './css/index.css';

class TailwindCheatSheet extends HTMLElement {
	connectedCallback () {
		console.log('connected')
		render(createElement(App), this)
	}

	disconnectedCallback () {
		unmountComponentAtNode(this)
	}
}

customElements.define('tw-cheatsheet', TailwindCheatSheet)

export default TailwindCheatSheet

