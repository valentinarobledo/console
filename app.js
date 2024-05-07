require('colors');
const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const { 
	inquirerMenu, 
	pausa, 
	leerInput,
	borrarTareaListado,
	confirmar,
	completarTareasList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main = async() =>{
	console.clear();
	
	let opt = '';
	const tareas = new Tareas();

	const tareasDB = leerDb();

	if(tareasDB){
		tareas.cargarTareas(tareasDB);
	}

	do{
		opt = await inquirerMenu();

		switch(opt){
			case '1':
				const desc = await leerInput('Descripción: ');
				tareas.crearTarea(desc);

				break;
			case '2':
				const listado = tareas.listarTareas();
				console.log(listado);
			break;

			case '3':
				const completas = tareas.estadoTareas(true);
				console.log(completas);
			break;

			case '4':
				const pendientes = tareas.estadoTareas(false);
				console.log(pendientes);
			break;

			case '5':
					const ids = await completarTareasList(tareas.listadoArr);
					tareas.toggleCompletadas(ids);

				break;

			case '6':
				const id = await borrarTareaListado(tareas.listadoArr);
				if(id !== '0'){
				const ok = confirmar('¿Estás seguro?');
				if(ok){
					tareas.borrarTarea(id);
					console.log('Tarea eliminada');
				}
			}
			break;
		}

		guardarDb(tareas.listadoArr);
	
		await pausa();

	}while(opt !== '0');

	
}

main();