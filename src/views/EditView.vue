<template>
    <div v-if="paciente">
      <h1>Editar Paciente</h1>
      <form>
        <div>
          <label>Nombre</label>
          <input v-model="paciente.nombre" type="text" />
        </div>
        <div>
          <label>Apellido</label>
          <input v-model="paciente.apellido" type="text" />
        </div>
        <div>
          <label>Edad</label>
          <input v-model="paciente.edad" type="number" />
        </div>
        <!-- Otros campos del paciente -->
        <button @click="guardarCambios">Guardar Cambios</button>
      </form>
    </div>
    <div v-else>
      <p>Cargando datos del paciente...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id_paciente'], // Recibimos el ID como prop
    data() {
      return {
        paciente: {
                id: '',
                nombre: '',
                apellido: '',
                f_nacimiento: '',
                usuario: '',
                password: '',
                state: '',
            } // Aquí guardamos los detalles del paciente
      };
    },
    created() {
      this.obtenerPaciente();
    },
    methods: {
      async obtenerPaciente() {
        try {
            console.log(this.id_paciente);
            const response = await axios.get(`http://localhost:4000/api/v1/paciente/${this.id_paciente}`);
            this.paciente = response.data;
        } catch (error) {
          console.error('Error al obtener los detalles del paciente:', error);
        }
      },
      async guardarCambios() {
        try {
          await axios.put(`http://localhost:4000/api/v1/paciente/update`, this.paciente);
          alert('Cambios guardados');
          this.$router.push('/crud'); // Redirigir a la lista de pacientes después de guardar
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
        }
      },
    },
  };
  </script>
  