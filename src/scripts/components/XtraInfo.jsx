/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';

class XtraInfo extends React.Component {
	
	render(){
		return <div className="xtraInfo">
			<ul>
				<li>{this.props.spManager.basic}/390</li>
				<li>{this.props.spManager.sub}/450</li>
				<li>{this.props.spManager.subTwo}/885</li>
				<li>{this.props.spManager.subThree}/855</li>
				<li>{this.props.spManager.subFour}/460</li>
				<li>0/?</li>
			</ul>

		</div>
	}

}

export default XtraInfo;