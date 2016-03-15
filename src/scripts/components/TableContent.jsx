/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TableContentSkill from './TableContentSkill.jsx';

class TableContent extends React.Component {

	render(){

		let styleClass;
		let titleText;

		if (this.props.name == 'active') {
			styleClass = 'table-skill';
			titleText = 'Active';
		} else {
			styleClass = 'table-skill-pasive';
			titleText = 'Pasive';
		}
		
		return <div className={ styleClass }>

			<div className="title">{ titleText }</div>
			<TableContentSkill openModal={this.props.openModal} spManagerFunction={this.props.spManagerFunc} skills={this.props.skills} name={titleText} />

		</div>
		
		
	}
}

export default TableContent;