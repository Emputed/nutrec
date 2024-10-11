<template>
    <div v-if="paciente">
      <h1>Editar Paciente</h1>
      <form>
        <div class="input-group mb-3">
                <label for="nombre" class="form-label">Nombre/s</label>
                <input type="text" class="form-control" id="nombre" v-model="paciente.nombre">
            </div>
            <div class="input-group mb-3">
                <label for="apellido" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="apellido" v-model="paciente.apellido">
            </div>
            <div class="input-group mb-3">
                <label for="edad" class="form-label">Fecha de nacimiento</label>
                <input type="text" class="form-control" aria-describedby="basic-addon2" id="edad"
                    v-model="paciente.f_nacimiento">
            </div>
            <div class="row g-2">
                <div class="col-sm">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input id="usuario" type="text" class="form-control" aria-label="Cintura"
                        v-model="paciente.usuario">
                </div>
                <div class="col-sm">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control" aria-label="Cadera"
                        v-model="paciente.password">
                </div>
            </div>
        <!-- Otros campos del paciente -->
        <button class="btn btn-success" @click="guardarCambios">Guardar Cambios</button>
      </form>
    </div>
    <div v-else>
      <p>Cargando datos del paciente...</p>
    </div>
  </template>
  
  <script>
  import { usePacienteStore } from '@/stores/pacienteStore';
  
  export default {
    setup(){
      const pacienteStore = usePacienteStore();
      return { paciente : pacienteStore.paciente };
    }
  };
  </script>
  