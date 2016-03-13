/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';

let styles = {
	width: "70%"
};
let i;

class Skill extends React.Component {

	render(){
		return <div className="skill">
			<div className="skill-info">
				<div className="skill-content">
					<div className="text">7/10</div>
					<img src="img/accuracy_aura.jpg" className="skill-image" />
					<div className="calls">
						<a href="#" className="skill-btn-sum">+</a>
						<a href="#" className="skill-btn-sub">-</a>
					</div>
					<div className="progress">
						<div style={styles}></div>
					</div>
				</div>
				<div className="skill-get">
					{
						i = -1,
						this.props.skill.skillGet.map((skill) => {
							i++;
							return <div className={skill}></div>
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