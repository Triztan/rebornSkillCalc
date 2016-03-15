/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TableMenu from './TableMenu.jsx';
import TableContent from './TableContent.jsx';
import GameDatabase from '../stores/info.jsx'
import SkillsDatabase from '../stores/skillList.jsx';
import XtraInfo from './XtraInfo.jsx';
import Modal from 'react-modal';
let gameData = GameDatabase;
let skillsData = SkillsDatabase;
let customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow 			  : 'auto'
  }
};

function dataInitializer (gData, sData) {

	function subClassFiller(subClass, skillsQ){
		let subQ = subClass.length;
		for (let g = 0; g < subQ; g++) {
			subClass[g].skills.map((skill) => {
				for (var h = 0; h < skillsQ; h++) {
					if (skill.id == sData[h].id) {
						skill.arrayId = h;
						break;
					}
				}
			});
		}
	}

	let skillsQ = sData.length;
	for(let i = 0; i < 5; i++)
	{
		gData[i].skills.map((skill) => {
			//Primero a las skills propias de cada clase
			for (let f = 0; f < skillsQ; f++)
			{
				if (skill.id == sData[f].id) {
					skill.arrayId = f;
					break;
				}
			}
		});

		//Segundo a las skills dentro de subClass.
		subClassFiller(gData[i].subClass, skillsQ);

		//Tercero a las skills dentro de subClassTwo.
		subClassFiller(gData[i].subClassTwo, skillsQ);

		//Cuarto a las skills dentro de subClassThree.
		subClassFiller(gData[i].subClassThree, skillsQ);

		//Quinto a las skills dentro de subClassFour.
		subClassFiller(gData[i].subClassFour, skillsQ);

		//Quinto a las skills dentro de subClassFive.
		subClassFiller(gData[i].subClassFive, skillsQ);
	}
}

class RebornSc extends React.Component {
	constructor(props){
		super(props);
		this.state = {activeSkills: [], pasiveSkills: [], firstSelect: 0, spManager: {basic: 0, sub: 0, subTwo: 0, subThree: 0, subFour: 0, subFive: 0}, modalIsOpen: false, toShow: []};
		this.onSelectChangeFirst.bind(this);
		this.onSelectChange.bind(this);
		this.spManagerFunc.bind(this);
		dataInitializer(gameData, skillsData);
		this.openModal.bind(this);
		this.closeModal.bind(this);

	}

	openModal(skillId) {
		let toShow = JSON.parse(JSON.stringify(skillsData[skillId].infoByLvl));
	    this.setState({modalIsOpen: true, toShow: toShow});
	  }
	 
	  closeModal() {
	    this.setState({modalIsOpen: false});
	  }

	onSelectChangeFirst(select){
		let newfirstSelect = select.value;
		let skillsToAdd = Array();
		skillsToAdd = JSON.parse(JSON.stringify(gameData[newfirstSelect].skills));
		let newPasive = Array();
		let newActive = Array();
		//Mapeo para agregar skills
		skillsToAdd.map((skill) => {
			skill.skillGet[0] = "active";
			skill.selectId = 0;
			//Divido en pasive y active.
			if (skillsData[skill.arrayId].infoByLvl[skill.level].objetive == "Pasive") {
				newPasive.push(skill);
			} else {
				newActive.push(skill);
			}
		});
		//Setteo final
		this.setState({firstSelect: newfirstSelect, activeSkills: newActive, pasiveSkills: newPasive});
	}



	onSelectChange(select){
		function selectExe (select, activeSkills, firstSelect, gameData, objetiveType, skillsData) {
			let y = activeSkills.length;
			let selectId = select.id;
			for (var i = 0; i < y; i++) {
				if ( activeSkills[i].skillGet[selectId] == "active" ) {
					let deleteSkill = 0;
					let subToUpdate = -1;
					for(let k = 5; k > -1; k--)
					{
						if (activeSkills[i].skillGet[k] == "active") {
							deleteSkill++; //Si entra aqui 2 veces y el valor final de del skill es 2, no se elimina ya que en otro lugar tambien esta
								if (k < selectId && subToUpdate < k) { //Si el indice actual es distinto al select que se modifico, se guarda el valor del select mayor que tenga esa skill
									subToUpdate = k;
								}
						}
					}
					if (deleteSkill == 1) { //Si entra aqui se elimnina
						activeSkills.splice(i, 1);
						i--;
						y--; //Delete fail posibility with activeSkills[i] before splice.!
					} else { //Si entra aqui se hace update hacia atras unicamente.
						//IFs para ir a la sub correcta.
						if (subToUpdate != -1) {
							let skillsWhereSearch;
							if (subToUpdate == 0) {
								skillsWhereSearch = JSON.parse(JSON.stringify(gameData[firstSelect].skills));
							} else if (subToUpdate == 1) {
								skillsWhereSearch = JSON.parse(JSON.stringify(gameData[firstSelect].subClass[select.value].skills));
							} else if (subToUpdate == 2) {
								skillsWhereSearch = JSON.parse(JSON.stringify(gameData[firstSelect].subClassTwo[select.value].skills));
							} else if (subToUpdate == 3) {
								skillsWhereSearch = JSON.parse(JSON.stringify(gameData[firstSelect].subClassThree[select.value].skills));
							} else if (subToUpdate == 4) {
								skillsWhereSearch = JSON.parse(JSON.stringify(gameData[firstSelect].subClassFour[select.value].skills));
							}
							for (var n = 0; n < skillsWhereSearch.length; n++) {
								if (skillsWhereSearch[n].id == activeSkills[i].id){
									//Debo quitar los SP asignados
									activeSkills[i].level = skillsWhereSearch[n].level;
									activeSkills[i].skillGet[selectId] = "";
									if (activeSkills[i].currentLevel > skillsWhereSearch[n].level) {
										//Aqui quito los SP con algun calculo.
										activeSkills[i].currentLevel = skillsWhereSearch[n].level;
									}
									break;
								}
							}

						}
					}
					
				}
			}
			//Adding skills
			if (objetiveType == "pasive") {
				let q = skillsToAdd.length;
				let w = activeSkills.length;
				for (var i = 0; i < q; i++) {
					let row = skillsToAdd[i].arrayId;
					let colm = skillsToAdd[i].level-1;
					if (skillsData[row].infoByLvl[colm].objetive == "Pasive") {
						let needAdd = true;
						for (var f = 0; f < w; f++) {
							if (skillsToAdd[i].id == activeSkills[f].id) {
								activeSkills[f].skillGet[selectId] = "active";
								activeSkills[f].level = skillsToAdd[i].level;
								needAdd = false;
								//Hago update de atributos. Supongo que sera mas facil que volverlo hacia atras.
							}

						}
						if (needAdd) {
							skillsToAdd[i].skillGet[selectId] = "active";
							skillsToAdd[i].selectId = selectId;
							activeSkills.push(skillsToAdd[i]);
						}
					}
				}
				return activeSkills;
			} else {
				let q = skillsToAdd.length;
				let w = activeSkills.length;
				for (var i = 0; i < q; i++) {
					let row = skillsToAdd[i].arrayId;
					let colm = skillsToAdd[i].level-1;
					console.log(skillsData[row].infoByLvl[skillsToAdd[i].level-1]);
					if (skillsData[row].infoByLvl[colm].objetive != "Pasive") {
						let needAdd = true;
						for (var f = 0; f < w; f++) {
							if (skillsToAdd[i].id == activeSkills[f].id) {
								activeSkills[f].skillGet[selectId] = "active";
								activeSkills[f].level = skillsToAdd[i].level;
								needAdd = false;
								//Hago update de atributos. Supongo que sera mas facil que volverlo hacia atras.
							}

						}
						if (needAdd) {
							skillsToAdd[i].skillGet[selectId] = "active";
							skillsToAdd[i].selectId = selectId;
							activeSkills.push(skillsToAdd[i]);
						}
					}
				}
				return activeSkills;
			}
			
			//Termino!
		}

		//////
		////////////////////
		///////////////////////////////////////////
		let skillsToAdd = Array();
		if (select.id == 1) {
			skillsToAdd = JSON.parse(JSON.stringify(gameData[this.state.firstSelect].subClass[select.value].skills));
		} else if (select.id == 2) {
			skillsToAdd = JSON.parse(JSON.stringify(gameData[this.state.firstSelect].subClassTwo[select.value].skills));
		} else if (select.id == 3) {
			skillsToAdd = JSON.parse(JSON.stringify(gameData[this.state.firstSelect].subClassThree[select.value].skills));
		} else if (select.id == 4) {
			skillsToAdd = JSON.parse(JSON.stringify(gameData[this.state.firstSelect].subClassFour[select.value].skills));
		} else if (select.id == 5) {
			skillsToAdd = JSON.parse(JSON.stringify(gameData[this.state.firstSelect].subClassFive[select.value].skills));
		}
		let activeSkills = this.state.activeSkills;
		let pasiveSkills = this.state.pasiveSkills
		let firstSelect = this.state.firstSelect;
		this.setState({activeSkills: selectExe(select, activeSkills, firstSelect, gameData, "active", skillsData), pasiveSkills: selectExe(select, pasiveSkills, firstSelect, gameData, "pasive", skillsData)});
		
	}

	spManagerFunc(info){
		let spManager = this.state.spManager;
		let lvlReq = skillsData[info.arrayId].infoByLvl[info.currentLevel].LvRequirement;
		let spConsm = skillsData[info.arrayId].infoByLvl[info.currentLevel].spConsumption;
		if (info.operation == "sum") {
			if (lvlReq < 20) {
				spManager.basic = spManager.basic + spConsm;
			} else if (lvlReq < 40) {
				spManager.sub = spManager.sub + spConsm;
			} else if (lvlReq < 75) {
				spManager.subTwo = spManager.subTwo + spConsm;
			} else if (lvlReq < 105) {
				spManager.subThree = spManager.subThree + spConsm;
			} else if (lvlReq < 145) {
				spManager.subFour = spManager.subFour + spConsm;
			} else {
				spManager.subFive = spManager.subFive + spConsm;
			}
		} else {
			if (lvlReq < 20) {
				spManager.basic = spManager.basic - spConsm;
			} else if (lvlReq < 40) {
				spManager.sub = spManager.sub - spConsm;
			} else if (lvlReq < 75) {
				spManager.subTwo = spManager.subTwo - spConsm;
			} else if (lvlReq < 105) {
				spManager.subThree = spManager.subThree - spConsm;
			} else if (lvlReq < 145) {
				spManager.subFour = spManager.subFour - spConsm;
			} else {
				spManager.subFive = spManager.subFive - spConsm;
			}
		}
		
		this.setState({spManager: spManager})
	}



	render(){
		return <div className="RebornSc">
			<TableMenu onSelectChangeFirst={this.onSelectChangeFirst.bind(this)} firstSelect={this.state.firstSelect} onSelectChange={this.onSelectChange.bind(this)} opciones={gameData} />
			<XtraInfo spManager={this.state.spManager} />
			<div className="table">
				<TableContent openModal={this.openModal.bind(this)} skills={this.state.activeSkills} spManagerFunc={this.spManagerFunc.bind(this)} name="active" />
				<TableContent openModal={this.openModal.bind(this)} skills={this.state.pasiveSkills} spManagerFunc={this.spManagerFunc.bind(this)} name="pasive" />
			</div>
			<div>
		        <Modal
		          isOpen={this.state.modalIsOpen}
		          onRequestClose={this.closeModal.bind(this)}
		          style={customStyles} >
		          <div>Descripcion</div>
		          <table className="ulToShow">
		          	<tr>
		          		<th>Lvl </th>
						<th>Nombre </th>
						<th>ConsumoSP </th>
						<th>Power </th>
						<th>Cooldown </th>
						<th>Req lvl </th>
					</tr>
		          {
		          	this.state.toShow.map((skill) => {
		          		return <tr>
							<td>{skill.lvl} </td>
							<td>{skill.name} </td>
							<td>{skill.spConsumption} </td>
							<td>{skill.power} </td>
							<td>{skill.Cooldown} </td>
							<td>{skill.LvRequirement} </td>
						</tr>
		          	})
		          }
		          </table>
		          
		        </Modal>
		      </div>
		</div>
	}

}

export default RebornSc;