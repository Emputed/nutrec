<template>
  <div>
    <!-- Botón para subir el archivo -->
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput" @change="validateFile" />
      <button type="submit" :disabled="!isFileValid">Subir Plan</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../axios.js";
import { useIdStore } from "@/stores/idStore";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "SubirPlan",
  setup() {
    const idStore = useIdStore();
    const fileInput = ref(null); 
    const isFileValid = ref(false); 
    const router = useRouter();

    
    const validateFile = () => {
      const file = fileInput.value.files[0];
      if (!file) {
        isFileValid.value = false;
        Swal.fire("Error", "No se seleccionó ningún archivo.", "error");
        return;
      }

      
      if (file.type !== "application/pdf") {
        isFileValid.value = false;
        Swal.fire("Error", "El archivo debe estar en formato PDF.", "error");
        return;
      }

      isFileValid.value = true;
    };

    const uploadFile = async () => {
      const file = fileInput.value.files[0];
      if (!file) {
        console.error("No se seleccionó ningún archivo");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post(
          `/plan/upload/${idStore.idPaciente}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Archivo subido con éxito:", response.data);
        Swal.fire("¡Listo!", "El archivo se subió con éxito.", "success");
        router.push({ name: "crud" });
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        Swal.fire("Error", "Hubo un problema al subir el archivo.", "error");
      }
    };

    return {
      fileInput,
      isFileValid,
      validateFile,
      uploadFile,
    };
  },
};
</script>
