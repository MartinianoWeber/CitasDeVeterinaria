import Citas from './classes/Citas.js';
import UI from './classes/Ui.js';

import{mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario}from './selectores.js'
const ui = new UI();
const administrarCitas = new Citas();
let editando
// Objeto de info
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}
export function datosCita(e){
    citaObj[e.target.name] = e.target.value

}
// Valida y agrega una nueva citaObj
export function nuevaCita(e){
    e.preventDefault()
    // 
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    // validar
    if(mascota ==='' || propietario ==='' || telefono === '' || fecha === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorio', 'error')
        return

    }

    if(editando){
        ui.imprimirAlerta('Se edito correctamente')
        administrarCitas.editarCita({...citaObj})
        formulario.querySelector('button[type="submit"]').textContent = "Crear cita"
        editando = false
        
    }else{
        // Creando cita 

    citaObj.id = Date.now();
    administrarCitas.agregarCita({...citaObj})
    ui.imprimirAlerta('Se agrego correctamente')
    }


    reiniciarObj()

    formulario.reset()

    ui.imprimirCitas(administrarCitas)
}

export function reiniciarObj(){
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}

export function eliminarCita(id){
    administrarCitas.eliminarCita(id)
    ui.imprimirAlerta('La cita se elimino')
    ui.imprimirCitas(administrarCitas)
}

export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    
    // Llenar objeto edit
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios"

    editando = true
}