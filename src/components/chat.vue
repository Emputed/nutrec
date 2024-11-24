<template>
  <div class="chat-container d-flex flex-column justify-content-between h-100">
    <div class="chat-header bg-primary text-white py-2 px-3">
      <h5 class="mb-0">
        Chat con {{ paciente?.nombre || "Mtra. Sara Marín - NUTREC" }}
      </h5>
    </div>


    <div class="chat-body flex-grow-1 p-3 overflow-auto bg-light">
      <div v-for="(message, index) in messages" :key="index" class="mb-3">
        <div :class="{
          'text-end': message.sender === user.id,
          'text-start': message.sender !== user.id
        }">
          <div :class="[
            'p-2 rounded',
            message.sender === user.id ? 'bg-primary text-white' : 'bg-secondary text-white',
          ]" style="display: inline-block; max-width: 80%; word-wrap: break-word;">
            {{ message.message }}
          </div>
          <small class="d-block text-muted mt-1">
            {{ new Date(message.timestamp).toLocaleTimeString() }}
          </small>
        </div>
      </div>
    </div>


    <div class="chat-footer bg-white p-3">
      <div class="input-group">
        <input v-model="newMessage" type="text" class="form-control" placeholder="Escribe tu mensaje..."
          @keyup.enter="sendMessage" />
        <button class="btn btn-primary" @click="sendMessage">
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js"; // Asegúrate de usar el nombre correcto
import { useIdStore } from "@/stores/idStore.js";
import { io } from "socket.io-client";
import { ref, onMounted } from "vue";
import api from "../axios.js";

export default {
  name: "ChatView",
  setup() {
    const authStore = useAuthStore();
    const idStore = useIdStore();
    let user = ref([]);
    console.log(user);
    const socket = io("http://localhost:4000/");
    const messages = ref([]);
    const newMessage = ref("");
    const paciente = ref({});
    user = {
      id: authStore.id,
      role: authStore.role,
      status: authStore.status,
    };

    // Obtener los datos del paciente
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/crud/paciente/${idStore.idPaciente}`);
        paciente.value = response.data;
      } catch (error) {
        console.error("Error al obtener paciente:", error);
      }
    };

    // Obtener el historial de mensajes
    const fetchMessages = async () => {
      try {
        const room = getRoom();
        const response = await api.get(`/messages/${room}`);
        messages.value = response.data.messages;
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };

    const getRoom = () => {
      return user.role === "nutriologa"
        ? `nutriologa-${idStore.idPaciente}`
        : `nutriologa-${user.id}`;
    };

    const getReceiver = () => {
      return user.role === "nutriologa" ? idStore.idPaciente : "nutriologa";
    };
    // Enviar un mensaje
    const sendMessage = () => {
      if (!newMessage.value) return;

      const messageData = {
        sender: user.id, // ID del usuario autenticado
        receiver: getReceiver(),
        role: user.role,
        message: newMessage.value,
        room: getRoom(),
      };

      // Emitir el mensaje al servidor
      socket.emit("sendMessage", messageData);

      // Guardar el mensaje en el backend
      api.post("/messages/save", messageData).catch((err) => {
        console.error("Error al guardar el mensaje:", err);
      });

      // Añadir el mensaje localmente
      messages.value.push({
        ...messageData,
        timestamp: new Date().toISOString(),
      });

      newMessage.value = "";
    };

    // Escuchar nuevos mensajes del servidor
    socket.on("receiveMessage", (data) => {
      const room = getRoom();
      if (data.room === room) {
        messages.value.push(data);
      }
    });

    onMounted(() => {
      fetchPaciente();
      fetchMessages();

      const room = getRoom();
      socket.emit("joinRoom", room);
    });

    return { messages, newMessage, sendMessage, paciente, user };
  },
};
</script>
<style scoped>
.chat-container {
  height: 100vh;
  /* Ajusta esto si necesitas un tamaño diferente */
  border: 1px solid #ddd;
  border-radius: 5px;
}

.chat-header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.chat-body {
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  /* Ajusta según el header y footer */
}

.chat-footer {
  border-top: 1px solid #ccc;
}
</style>