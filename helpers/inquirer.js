const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que desea hacer',
		choices: [
			{
				value: '1',
				name: `${'1.'.blue} Crear tarea`
			},
			{
				value: '2',
				name: `${'2.'.blue} Listar tareas`
			},
			{
				value: '3',
				name: `${'3.'.blue} Tareas completadas`
			},
			{
				value: '4',
				name: `${'4.'.blue} Tareas pendientes`
			},
			{
				value: '5',
				name: `${'5.'.blue} Completar tarea(s)`
			},
			{
				value: '6',
				name: `${'6.'.blue} Borrar tarea`
			},
			{
				value: '0',
				name: `${'0.'.blue} Salir`
			}
		]
	}
]


const inquirerMenu = async() => {
	console.clear();
	console.log('========================'.green);
	console.log('Seleccione una opcion'.green);
	console.log('========================\n'.green);

	const { opcion } = await inquirer.prompt(preguntas);
	return opcion;

}

const pausa = async() => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `\nPresione ${'ENTER'.green} para continuar\n`
		}
	]
	await inquirer.prompt(question);
}

const leerInput = async(message) => {

	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value){
				if(value.length === 0){
					return 'Ingrese un valor';
				}
				return true;
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
}

const borrarTareaListado = async(tareas) => {
	const choices = tareas.map((tarea, index)=>{

		const idx = `${index + 1}.`.green;

		return{
			value: tarea.id,
			name: `${idx} ${tarea.desc}`
		}
	})

	choices.unshift({
		value: '0',
		name: '0'.green + 'Cancelar'
	});

	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar,',
			choices
		}
	]
	const { id } = await inquirer.prompt(preguntas);
	return id;

}


const confirmar = async(msg) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message: msg
		}
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
}

const completarTareasList = async(tareas) => {
	const choices = tareas.map((tarea, index)=>{

		const idx = `${index + 1}.`.green;

		return{
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: (tarea.completadoEn) ? true : false
		}
	})


	const preguntas = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices
		}
	]
	const { ids } = await inquirer.prompt(preguntas);
	return ids;

}

module.exports = {
    inquirerMenu,
		pausa,
		leerInput,
		borrarTareaListado,
		confirmar,
		completarTareasList
}
