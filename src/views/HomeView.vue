<template>
  <div class="container-fluid h-100">
    <div class="row align-items-stretch h-100">
      <h1>BIENVENIDO</h1>
        <nav>
          <router-link to="/plan_paciente">Planes de alimentacion</router-link> | 
          <router-link to="/chat">Mensajes</router-link> |
        </nav>
        
      <div class="col-md-6 position-relative">
        <img :src="randomImage.url" alt="Healthy Food" v-if="randomImage" class="img-fluid full-image" />
        <p v-else>No se ha cargado ninguna imagen aún.</p>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
        
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
      randomPhrase: null,
      images: [
        { url: "./platillo1.png"},
        { url: "./platillo2.png"},
        { url: "./platillo3.png"},
        { url: "./platillo4.png"},
        { url: "./platillo5.png"},
        { url: "./platillo6.png"},
        { url: "./platillo7.png"},
      ],
      randomImage: null,
    }
  },
  methods: {
    generateRandomPhrase() {
      const randomIndex = Math.floor(Math.random() * this.frases.length);
      this.randomPhrase = this.frases[randomIndex];
    },

    generateRandomImage() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.randomImage = this.images[randomIndex];
    }
  },
  mounted() {
    this.generateRandomImage();
    this.generateRandomPhrase();
  }
}
</script>
