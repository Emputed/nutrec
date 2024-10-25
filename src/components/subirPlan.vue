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
import axios from 'axios';
import { useIdStore } from '@/stores/idStore'

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
        const response = await axios.post(`http://localhost:4000/api/v1/plan/upload/${idStore.idPaciente}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Archivo subido con éxito:', response.data);
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    };

    return {
      fileInput,
      uploadFile,
    };
  },
};
</script>