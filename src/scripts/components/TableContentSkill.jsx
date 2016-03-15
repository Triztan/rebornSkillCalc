/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Skill from './Skill.jsx';

class TableContentSkill extends React.Component {

	render() {
		return <div className="content" id={ "skill-" + this.props.name }>
			{
				//console.log(this.props.skills),
				this.props.skills.map((skill) => {
					return <Skill openModal={this.props.openModal} spManagerFunction={this.props.spManagerFunction} arrayId={skill.arrayId} key={skill.id} skill={skill} />
				})
			}
		</div>
	}
}

export default TableContentSkill;