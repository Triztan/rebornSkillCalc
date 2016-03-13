/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MenuSelect from './MenuSelect.jsx';
import MenuSelectTwo from './MenuSelectTwo.jsx';

let id;

class TableMenu extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}
	
	render() {
		
		return <div className="tableMenu">
					<MenuSelect onSelectChange={this.props.onSelectChangeFirst} opciones={this.props.opciones} />
					<MenuSelectTwo value={1} onSelectChange={this.props.onSelectChange} opciones={this.props.opciones[this.props.firstSelect].subClass} />
					<MenuSelectTwo value={2} onSelectChange={this.props.onSelectChange} opciones={this.props.opciones[this.props.firstSelect].subClassTwo} />
					<MenuSelectTwo value={3} onSelectChange={this.props.onSelectChange} opciones={this.props.opciones[this.props.firstSelect].subClassThree} />
					<MenuSelectTwo value={4} onSelectChange={this.props.onSelectChange} opciones={this.props.opciones[this.props.firstSelect].subClassFour} />
					<MenuSelectTwo value={5} onSelectChange={this.props.onSelectChange} opciones={this.props.opciones[this.props.firstSelect].subClassFive} />
			{
				/*
				this.state.gameClass.map((select) => {
					return <MenuSelect onSelectChange={this.props.onSelectChange} gameClass={select} />
				})
				*/
				/*
				id = -1,
				this.props.gameClass.map((item) => {
					id++;
					return <MenuSelect onSelectChange={this.props.onSelectChange} value={id} key={id} gameClass={item} />
				})
				*/
			}
		</div>
	}

}

export default TableMenu;