import { defineStore } from "pinia";

export const usePacienteStore = defineStore("pacienteStore", {
  state: () => ({
    id_paciente: localStorage.getItem('id_paciente') || null,
    nombre: localStorage.getItem('nombre') || null,
    apellido: localStorage.getItem('apellido') || null,
    f_nacimiento: localStorage.getItem('f_nacimiento') || null,
    usuario: localStorage.getItem('usuario') || null,
    password: localStorage.getItem('password') || null,
  }),
  actions: {
    setId_paciente(id_paciente){
        this.id_paciente = id_paciente;
        localStorage.setItem('id_paciente', id_paciente);
    },
    setNombre(nombre){
        this.nombre = nombre;
        localStorage.setItem('nombre', nombre);
    },
    setApellido(apellido){
        this.apellido = apellido;
        localStorage.setItem('apellido', apellido);
    },
    setNacimiento(f_nacimiento){
        this.f_nacimiento = f_nacimiento;
        localStorage.setItem('f_nacimiento', f_nacimiento);
    },
    setUsuario(usuario){
        this.usuario = usuario;
        localStorage.setItem('usuario', usuario);
    },
    setPassword(password){
        this.password = password;
        localStorage.setItem('password', password);
    }
  },    
});
