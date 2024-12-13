import { defineStore } from "pinia";

export const usePacienteStore = defineStore("pacienteStore", {
  state: () => ({
    id_paciente: localStorage.getItem("id_paciente") || null,
    nombre: localStorage.getItem("nombre") || null,
    apellido: localStorage.getItem("apellido") || null,
    f_nacimiento: localStorage.getItem("f_nacimiento") || null,
    genero: localStorage.getItem("genero") || null,
    edad: localStorage.getItem("edad") || null,
    usuario: localStorage.getItem("usuario") || null,
    password: localStorage.getItem("password") || null,
  }),
  actions: {
    setId_paciente(id_paciente) {
      this.id_paciente = id_paciente;
      localStorage.setItem("id_paciente", id_paciente);
    },
    setNombre(nombre) {
      this.nombre = nombre;
      localStorage.setItem("nombre", nombre);
    },
    setApellido(apellido) {
      this.apellido = apellido;
      localStorage.setItem("apellido", apellido);
    },
    setNacimiento(f_nacimiento) {
      this.f_nacimiento = f_nacimiento;
      localStorage.setItem("f_nacimiento", f_nacimiento);
    },
    setGenero(genero) {
      this.genero = genero;
      localStorage.setItem("genero", genero);
    },
    setEdad(edad) {
      this.edad = edad;
      localStorage.setItem("edad", edad);
    },
    setUsuario(usuario) {
      this.usuario = usuario;
      localStorage.setItem("usuario", usuario);
    },
    setPassword(password) {
      this.password = password;
      localStorage.setItem("password", password);
    },
    clearPaciente() {
      this.id_paciente  = null;
      this.nombre       = null;
      this.apellido     = null;
      this.f_nacimiento = null;
      this.genero       = null;
      this.edad         = null;
      this.usuario      = null;
      this.password     = null;
      localStorage.removeItem('id_paciente');
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('f_nacimiento');
      localStorage.removeItem('genero');
      localStorage.removeItem('edad');
      localStorage.removeItem('usuario');
      localStorage.removeItem('password'); 
    },
  },
});
