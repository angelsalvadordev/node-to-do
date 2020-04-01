const descripcion = {
  alias: 'd',
  demand: true
}

const completado = {
  alias: 'c',
  default: true
}

const todos = {
  alias: 't',
  default: 'todos'
}

const argv = require('yargs')
  .command('crear', 'Crear un elemento por hacer', { descripcion })
  .command('actualizar', 'Actualiza el estado completado de una tarea', {
    descripcion,
    completado
  })
  .command('listar', 'Lista todas las tareas, las completadas o incompletas', { todos })
  .command('borrar', 'Borrar un elemento por hacer', { descripcion })
  .help()
  .argv

module.exports = {
  argv
}