<template>
    <div>
      <!-- Botón para subir el archivo -->
      <form @submit.prevent="uploadFile">
        <input type="file" ref="fileInput" />
        <button type="submit">Subir Plan</button>
      </form>
    </div>
  </template>

<script>
import { ref } from 'vue';
import api from '../axios.js';
import { useIdStore } from '@/stores/idStore'
import Swal from 'sweetalert2';

export default {
  name: 'SubirPlan',
  setup() {
    const idStore = useIdStore(); 
    const fileInput = ref(null);  // Referencia para el input de archivo

    const uploadFile = async () => {
      const file = fileInput.value.files[0];
      if (!file) {
        console.error('No se seleccionó ningún archivo');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await api.post(`/plan/upload/${idStore.idPaciente}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Archivo subido con éxito:', response.data);
        Swal.fire('¡Registrado!', 'El archivo se subió con éxito.', 'success');
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        Swal.fire('Error', 'Hubo un problema al subir el archivo.', 'error');
      }
    };

    return {
      fileInput,
      uploadFile,
    };
  },
};
</script>