/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';


let i;
let src;
let icon;
class Skill extends React.Component {
	constructor(props){
		super(props);
		this.state=({currentLevel: 0, styles: {width: "0%"}});
	}


	handleClickSum(ev){
		let currentLevel = this.state.currentLevel;
		let max = this.props.skill.level;
		if (currentLevel < max) {
			currentLevel++;
			let percent = 100/this.props.skill.level * currentLevel;
			let info = {arrayId: this.props.arrayId, currentLevel: currentLevel, operation: "sum"};
			this.props.spManagerFunction.call(null, info)
			this.setState({currentLevel: currentLevel, styles: {width: percent+"%"}});
		} else {
			console.log('Ya no se puede aumentar mas el valor de la skill actual ' + this.props.skill.name + '.');
		}
		
	}

	handleClickSub(ev){
		let currentLevel = this.state.currentLevel;
		if (currentLevel > 0) {
			currentLevel--;
			let percent = 100/this.props.skill.level * currentLevel;
			let info = {arrayId: this.props.arrayId, currentLevel: currentLevel+1, operation: "sub"};
			this.props.spManagerFunction.call(null, info)
			this.setState({currentLevel: currentLevel, styles: {width: percent+"%"}});
		} else {
			console.log('Ya no se puede bajar mas el valor de la skill actual ' + this.props.skill.name + '.');
		}
		
	}

	handleClickImg(ev){
		let skillId = this.props.skill.arrayId;
		this.props.openModal.call(null, skillId);
	}

	render(){
		icon = this.props.skill.icon;
		src = `img/iconImages/${icon}.png`;
		return <div className="skill">
			<div className="skill-info">
				<div className="skill-content">
					<div className="text">{this.state.currentLevel}/{this.props.skill.level}</div>
					<img onClick={this.handleClickImg.bind(this)} src={src} className="skill-image" />
					<div className="calls">
						<div onClick={this.handleClickSum.bind(this)} className="skill-btn-sum">+</div>
						<div onClick={this.handleClickSub.bind(this)} className="skill-btn-sub">-</div>
					</div>
					<div className="progress">
						<div style={this.state.styles}></div>
					</div>
				</div>
				<div className="skill-get">
					{
						i = -1,
						this.props.skill.skillGet.map((skill) => {
							i++;
							return <div className={skill} key={i}></div>
						})
					}
				</div>
			</div>
			<div className="skill-name">{this.props.skill.name}</div>
		</div>
	}
}

Skill.defaultProps = {skillGet: ["", "", "", "", "", ""]};

export default Skill;