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
					return <Skill skill={skill} />
				})
			}
		</div>
	}
}

export default TableContentSkill;