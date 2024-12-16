<template>
  <div class="chat-container d-flex flex-column justify-content-between h-100 ">
    <div class="chat-header bg-success text-white py-2 px-3 d-flex justify-content-between align-items-center">
      <h5 class="mb-0">
        Chat con {{ paciente?.nombre || "Mtra. Sara Marín - NUTREC" }}
      </h5>
    </div>

    <div class="chat-body flex-grow-1 p-3 overflow-auto bg-light vh-100">
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
            {{ new Date(message.timestamp || Date.now()).toLocaleTimeString() }}
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
import { ref, onMounted, onUnmounted } from "vue";
import api from "../axios.js";
import { useToast } from "vue-toastification";

export default {
  name: "ChatView",
  setup() {
    const authStore = useAuthStore();
    const idStore = useIdStore();
    const toast = useToast();
    let user = ref([]);
    console.log(user);
    const socket = io("https://express-nutrec.onrender.com");
    const messages = ref([]);
    const newMessage = ref("");
    const paciente = ref({});
    user = {
      id: authStore.id,
      username: authStore.username,
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
        sender: user.id,
        senderName: user.username,
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
      newMessage.value = "";
    };

    // Escuchar nuevos mensajes del servidor
    onMounted(async () => {
      try {
        await fetchPaciente();
        await fetchMessages();

        // Limpia cualquier oyente previo del evento
        socket.off("receiveMessage");

        // Registra un único oyente global
        socket.on("receiveMessage", (data) => {
          console.log("Mensaje recibido:", data);

          const activeRoom = getRoom(); // Obtiene la sala activa
          if (data.room === activeRoom) {
            // Si el mensaje pertenece a la sala activa, lo mostramos
            messages.value.push(data);
          } else {
            // Notificación para mensajes de otras salas
            if (data.sender !== user.id) {
              toast(`Mensaje de ${data.senderName || "Usuario"}: ${data.message}`, {
                timeout: 3000,
                position: "bottom-right",
                icon: "📩",
              });
            }
          }
        });

        // Unirse a las salas según el rol del usuario
        if (user.role === "nutriologa") {
          const response = await api.get(`/messages/rooms/${user.role}`);
          const rooms = response.data.rooms;

          // Únete a todas las salas necesarias
          rooms.forEach((room) => {
            console.log(`Uniéndose a la sala: ${room}`);
            socket.emit("joinRoom", room);
          });
        } else {
          const room = getRoom();
          console.log(`Paciente uniéndose a la sala: ${room}`);
          socket.emit("joinRoom", room);
        }
      } catch (error) {
        console.error("Error al unirse a las salas activas:", error);
      }
    });


    onUnmounted(() => {
      socket.off("receiveMessage");
    });

    return { messages, newMessage, sendMessage, paciente, user, toast };
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