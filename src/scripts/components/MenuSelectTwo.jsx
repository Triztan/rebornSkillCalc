/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';


class MenuSelectTwo extends React.Component {
	constructor(props){
		super(props);
	}

	onChange(ev){
		let select = {id: this.props.value, value: parseInt(ev.target.value)};
		this.props.onSelectChange.call(null, select);
	}

	render() {
		return <select onChange={this.onChange.bind(this)}>
				{
					this.props.opciones.map((item) => {
						return <option key={item.id} value={item.id}>{ item.clase }</option>;
					})
				}
		</select>
	}
}

export default MenuSelectTwo;