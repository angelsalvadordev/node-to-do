const fs = require('fs')

let listadoPorHacer = []

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer)
  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('No se pudo grabar')

  })
}

const cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json')
  } catch (error) {
    listadoPorHacer = []
  }
}


const crear = (descripcion) => {
  cargarDB()
  let porHacer = {
    descripcion,
    completado: false
  }

  listadoPorHacer.push(porHacer)
  guardarDB()
  return porHacer
}

const filtrarListado = (boolean, string) => {
  let nuevaLista = listadoPorHacer.filter(tarea => tarea.completado === boolean || tarea.completado === string)

  if (nuevaLista.length <= 0) {
    console.log('No hay tareas realizadas')
    nuevaLista = []
  }

  return nuevaLista
}

const getListado = (todos) => {

  cargarDB()

  switch (todos) {
    case 'completados':
      return filtrarListado(true, "true")
    case 'incompletos':
      return filtrarListado(false, "false")
    case 'todos':
      return listadoPorHacer
    default:
      console.log('Comando incorrecto. Vuelva a intentarlo con true o false')
      return []
  }
}

const actualizar = (descripcion, completado = true) => {
  cargarDB()
  let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
  if (index >= 0) {
    listadoPorHacer[index].completado = completado
    guardarDB()
    return true
  } else {
    return false
  }
}

const borrar = (descripcion) => {
  cargarDB()
  let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
  if (listadoPorHacer.length === nuevoListado.length) {
    return false
  }
  else {
    listadoPorHacer = nuevoListado
    guardarDB()
    return true
  }
}


module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}