/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TableMenu from './TableMenu.jsx';
import TableContent from './TableContent.jsx';
import GameDatabase from '../stores/info.jsx'
let gameData = GameDatabase;

class RebornSc extends React.Component {
	constructor(props){
		super(props);
		this.state = {activeSkills: [], pasiveSkills: [], firstSelect: 0};
		this.onSelectChangeFirst.bind(this);
		this.onSelectChange.bind(this);
	}

	onSelectChangeFirst(select){
		let newfirstSelect = select.value;
		let skillsToAdd = gameData[newfirstSelect].skills;
		let newSkills = Array();
		//Mapeo para agregar skills
		skillsToAdd.map((skill) => {
			skill.skillGet[0] = "active";
			skill.selectId = 0;
			newSkills.push(skill);
		});
		//Setteo final
		this.setState({firstSelect: newfirstSelect, activeSkills: newSkills});
	}

	onSelectChange(select){
		let skillsToAdd = Array();
		if (select.id == 1) {
			skillsToAdd = gameData[this.state.firstSelect].subClass[select.value].skills;
			let activeSkills = this.state.activeSkills;
			console.log('Primer skillToAdd ', skillsToAdd);
			console.log('Primer activeSkills ', activeSkills);
			console.log('-------No coinciden ninguno de los dos-----------');
			//Primer mapeo para eliminar los que no deben estar dentro
			let y = activeSkills.length;
			console.log('activeSkills.length: ' + activeSkills.length);
			for (var i = 0; i < y; i++) {
				if ( activeSkills[i].selectId == 1) {
					activeSkills.splice(i, 1);
					i--;
					y--; //Elimina la posibilidad de entrar a un activeSkills[i] invalido a causa de que hice un splice.
					console.log('Haciendo el ' + i + ' splice()')
				} else if (activeSkills[i].skillGet[1] == "active") {
					console.log('Quitando active');
					activeSkills[i].skillGet[1] = "";
					//Debo ademas volverlo hacia atras. Queda pensar como hacer esto.
				}
			}
			console.log(activeSkills);
			//Agregando
			let q = skillsToAdd.length;
			let w = activeSkills.length;
			for (var i = 0; i < q; i++) {
				let needAdd = true;
				for (var f = 0; f < w; f++) {
					if (skillsToAdd[i].id == activeSkills[f].id) {
						activeSkills[f].skillGet[1] = "active";
						needAdd = false;
						//Hago update de atributos. Supongo que sera mas facil que volverlo hacia atras.
					}

				}
				if (needAdd) {
					skillsToAdd[i].skillGet[1] = "active";
					skillsToAdd[i].selectId = 1;
					activeSkills.push(skillsToAdd[i]);
				}
			}
			//Termino!
			this.setState({activeSkills: activeSkills});
		}
		//Aqui va para el resto de select.id
	}

	render(){
		return <div className="RebornSc" id="container">
			<TableMenu onSelectChangeFirst={this.onSelectChangeFirst.bind(this)} firstSelect={this.state.firstSelect} onSelectChange={this.onSelectChange.bind(this)} opciones={gameData} />
			<div className="table">
				<TableContent skills={this.state.activeSkills} name="active" />
				<TableContent skills={this.state.pasiveSkills} name="pasive" />
			</div>
		</div>
	}

}

export default RebornSc;