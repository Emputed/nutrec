<template>
  <div class="container-fluid h-100">
    <div class="row align-items-stretch h-100">
      <h1>BIENVENIDO</h1>
      <div class="col-md-6 position-relative">
        <h4 class="text-center">Imagen aleatoria de comida saludable</h4>
        <img :src="imageURL" alt="Healthy Food" v-if="imageURL" class="img-fluid full-image" />
        <p v-else>No se ha cargado ninguna imagen aún.</p>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <h2 class="text-center">Frase motivadora del día</h2>
        <p v-if="randomPhrase">"{{ randomPhrase.text }}"</p>
        <small v-if="randomPhrase">— {{ randomPhrase.author }}</small>
        <p v-else>No se ha generado ninguna frase aún.</p>
      </div>
    </div>
<br>
    <div>
      <h2>PREGUNTAS FRECUENTES</h2>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, quisquam nostrum commodi magni eum laboriosam. Quasi maiores nesciunt earum numquam harum quos, odio est architecto expedita, aperiam aliquam hic sit!
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    navbar
  },
  data() {
    return {
      imageURL: null,
      frases: [
        { text: "Que tu medicina sea tu alimento, y el alimento tu medicina.", author: "Hipócrates" },
        { text: "El cuerpo logra lo que la mente cree.", author: "Napoleon Hill" },
        { text: "La buena nutrición crea un cuerpo fuerte, una mente tranquila y un espíritu equilibrado.", author: "B.K.S. Iyengar" },
        { text: "Cuida de tu cuerpo, es el único lugar que tienes para vivir.", author: "Jim Rohn" },
        { text: "Lo que comes puede ser la forma más poderosa de medicina o la forma más lenta de veneno.", author: "Ann Wigmore" },
        { text: "Cada vez que comes o bebes, estás alimentando una enfermedad o luchando contra ella.", author: "Heather Morgan" },
        { text: "La comida no es solo combustible, es información. Informa a tu cuerpo qué hacer, no solo en términos de calorías, sino de cada aspecto de la función.", author: "Dr. Mark Hyman" },
        { text: "El bienestar emocional está íntimamente relacionado con una nutrición equilibrada. Cuando cuidamos de nuestro cuerpo, nuestras emociones también florecen.", author: "Desconocido" },
        { text: "La primera riqueza es la salud.", author: "Ralph Waldo Emerson" },
        { text: "Comer bien es una forma de respeto hacia ti mismo.", author: "Desconocido" }
      ],
      randomPhrase: null
    }
  },
  methods: {
    async randomImage() {
      const apiKey = 'Il16Ei0dQHxh1uPeSnG2G9vBlS4ptamtc93QkZWk-0U';
      const query = 'healthy-food';

      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
          params: {
            query: query,
            client_id: apiKey,
          }
        });
        this.imageURL = response.data.urls.regular;  // Asignar directamente a 'imageURL'
        console.log("Imagen cargada:", this.imageURL);
      } catch (error) {
        console.error('Error en el fetch: ' + error);
      }
    }
    ,

    generateRandomPhrase() {
      const randomIndex = Math.floor(Math.random() * this.frases.length);
      this.randomPhrase = this.frases[randomIndex];
      console.log(this.randomPhrase);
    }
  },
  mounted() {
    this.randomImage();
    this.generateRandomPhrase();
  }
}
</script>
