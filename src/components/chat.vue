<template>
    <div class="container my-4">
      <h3 class="text-center mb-4">CHAT</h3>
      <div class="chat-container d-flex flex-column">
        <div class="messages flex-grow-1 overflow-auto border rounded p-3 mb-2 bg-light">
          <div v-for="(message, index) in messages" :key="index" class="message mb-2">
            <strong>{{ message.user }}:</strong> {{ message.text }}
          </div>
        </div>
        <div class="input-container d-flex">
          <input 
            v-model="newMessage" 
            placeholder="Escribe un mensaje..." 
            @keyup.enter="sendMessage" 
            class="form-control me-2" 
          />
          <button 
            @click="sendMessage" 
            class="btn btn-primary">
            Enviar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onBeforeUnmount } from 'vue';
  import { io } from 'socket.io-client';
  import { useAuthStore } from '@/stores/auth';
  
  export default {
    name: 'chat',
    setup() {
      const socket = io('http://localhost:4000'); 
      const messages = ref([]);
      const newMessage = ref('');
      const AuthStore = useAuthStore();
  
      const sendMessage = () => {
        if (newMessage.value.trim() !== '') {
          socket.emit('mensaje', { user: AuthStore.username || 'Usuario desconocido', text: newMessage.value }); // Envía el mensaje al servidor
          newMessage.value = ''; 
        }
      };
  

      socket.on('mensaje', (msg) => {
        messages.value.push(msg);
      });
  

      onBeforeUnmount(() => {
        socket.disconnect();
      });
  
      return {
        messages,
        newMessage,
        sendMessage,
        AuthStore
      };
    },
  };
  </script>
  
  <style>
  .chat-container {
    width: 100%; /* Asegura que el contenedor ocupe el 100% del ancho */
    max-width: 600px; /* Establece un ancho máximo */
    height: 500px; /* Altura fija para el chat */
  }
  
  .messages {
    max-height: 400px; /* Altura máxima para la zona de mensajes */
  }
  
  .message {
    padding: 5px;
    border-radius: 5px;
    background-color: #f8f9fa; /* Color de fondo claro para los mensajes */
  }
  
  .input-container {
    margin-top: 10px;
  }
  </style>
  