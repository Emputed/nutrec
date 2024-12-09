<template>
    <div class="vh-100">
      <h1>Editar Paciente</h1>
      <form>
        <div class="input-group mb-3">
          <label for="nombre" class="form-label">Nombre/s</label>
          <input type="text" class="form-control" id="nombre" v-model="pacienteStore.nombre">
        </div>
        <div class="input-group mb-3">
          <label for="apellido" class="form-label">Apellidos</label>
          <input type="text" class="form-control" id="apellido" v-model="pacienteStore.apellido">
        </div>
        <div class="input-group mb-3">
          <label for="edad" class="form-label">Fecha de nacimiento</label>
          <input type="text" class="form-control" aria-describedby="basic-addon2" id="edad"
            v-model="pacienteStore.f_nacimiento">
        </div>
        <div class="row g-2">
          <div class="col-sm">
            <label for="usuario" class="form-label">Usuario</label>
            <input id="usuario" type="text" class="form-control" aria-label="Cintura" v-model="pacienteStore.usuario">
          </div>
          <div class="col-sm">
            <label for="password" class="form-label">Contraseña</label>
            <input id="password" type="password" class="form-control" aria-label="Cadera"
              v-model="pacienteStore.password">
          </div>
        </div>
        <!-- Otros campos del paciente -->
        <button class="btn btn-success" @click="guardarCambios">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import { usePacienteStore } from '@/stores/pacienteStore';
  import api from '../axios.js';
  import { useRouter } from 'vue-router';
  
  export default {
    name:'EditViewComponent',
    setup() {
      const pacienteStore = usePacienteStore();
      const router = useRouter();
      const guardarCambios = async () => {
        try {
          const payload = {
            id_paciente: pacienteStore.id_paciente,
            nombre: pacienteStore.nombre,
            apellido: pacienteStore.apellido,
            f_nacimiento: pacienteStore.f_nacimiento,
            usuario: pacienteStore.usuario,
            password: pacienteStore.password,
          };
          console.log("PAYLOAD: ", payload);
          const response = await api.put('/paciente/update', payload);
          console.log('Actualización exitosa:', response.data);
          router.push('/crud');
        } catch (error) {
          console.log("Error en update ", error);
        }
      };
  
      return {
        pacienteStore,
        guardarCambios,
      };
    }
  };
  </script>