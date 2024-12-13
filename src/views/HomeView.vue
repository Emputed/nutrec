<template>
  <div class="overflow-hidden">
    <div class="container">
      <div class="row align-items-stretch h-80">
        <h3 class="text-center mb-4">BIENVENIDO</h3>
        <nav class="text-center mb-4">
          <router-link to="/plan_paciente" class="btn btn-link">Planes de alimentación</router-link>
          |
          <router-link to="/chat" class="btn btn-link">Mensajes</router-link>
          |
          <router-link to="#preguntasFrecuentes" class="btn btn-link">Preguntas Frecuentes</router-link>
          |
          <router-link to="#videos" class="btn btn-link">Videos de apoyo</router-link>
        </nav>

        <div class="col-md-6 position-relative">
          <img :src="randomImage.url" alt="Healthy Food" v-if="randomImage" class="img-fluid w-100" />
          <p v-else class="text-center">No se ha cargado ninguna imagen aún.</p>
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <p v-if="randomPhrase" class="text-center">"{{ randomPhrase.text }}"</p>
          <small v-if="randomPhrase" class="text-muted text-center">— {{ randomPhrase.author }}</small>
          <p v-else class="text-center">No se ha generado ninguna frase aún.</p>
        </div>
      </div>

      <br />

      <div id="preguntasFrecuentes" class="container mt-3 vh-100">
        <h2 class="text-center mb-4">Preguntas Frecuentes</h2>
        <div class="row row-cols-1 row-cols-md-2 g-4 mb-3">
          <!-- Pregunta 1 -->
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">¿Cuántas comidas al día debo hacer?</h5>
                <p class="card-text">
                  La cantidad de comidas al día puede variar según las necesidades individuales, pero generalmente se
                  recomienda hacer de 3 a 5 comidas al día. Esto puede incluir tres comidas principales (desayuno,
                  comida
                  y cena) y dos colaciones saludables entre comidas.
                </p>
              </div>
            </div>
          </div>

          <!-- Pregunta 2 -->
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">¿Qué debo comer para mantener una dieta balanceada?</h5>
                <p class="card-text">
                  Una dieta balanceada incluye una variedad de alimentos de todos los grupos: frutas, verduras,
                  proteínas
                  magras, granos integrales y lácteos bajos en grasa. Es importante comer porciones adecuadas y limitar
                  el
                  consumo de alimentos procesados, azúcares añadidos y grasas saturadas.
                </p>
              </div>
            </div>
          </div>

          <!-- Pregunta 3 -->
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">¿Qué alimentos son buenos para aumentar mi energía?</h5>
                <p class="card-text">
                  Los alimentos ricos en carbohidratos complejos, como granos integrales, frutas y verduras, son
                  excelentes para aumentar la energía.
                </p>
              </div>
            </div>
          </div>

          <!-- Pregunta 4 -->
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">¿Si bajo de peso solo bajo grasa?</h5>
                <p class="card-text">
                  Cuando se baja de peso, depende mucho de la dieta o los factores por los que sea provocada esa pérdida
                  de peso, porque se puede perder grasa pero al mismo tiempo masa muscular cuando el proceso no se lleva
                  con una dieta balanceada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="videos" class="container mt-3 mb-3 vh-100">
      <h2 class="text-center mb-4">Videos de apoyo</h2>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <!-- Itera sobre los videos para mostrarlos -->
        <div class="col" v-for="video in videos" :key="video.id">
          <div class="card h-100">
            <!-- Video de YouTube -->
            <div class="ratio ratio-16x9">
              <iframe :src="'https://www.youtube.com/embed/' + video.youtubeId" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
            <!-- Créditos del autor -->
            <div class="card-body">
              <h5 class="card-title">{{ video.title }}</h5>
              <p class="card-text">
                Video de: <a :href="video.authorUrl" target="_blank">{{ video.author }}</a>
              </p>
            </div>
          </div>
        </div>
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
        { url: "./platillo1.png" },
        { url: "./platillo2.png" },
        { url: "./platillo3.png" },
        { url: "./platillo4.png" },
        { url: "./platillo5.png" },
        { url: "./platillo6.png" },
        { url: "./platillo7.png" },
      ],
      randomImage: null,
      videos: [
        {
          id: 1,
          youtubeId: "vs2U6BvZ4U4",
          title: "Alimentación sana - cerebro sano",
          author: "INCMNSZ - Educación para la Salud",
          authorUrl: "https://www.youtube.com/@EpsnutricionMx",
        },
        {
          id: 2,
          youtubeId: "z9Hh7KxyUlg", 
          title: "¿Cómo iniciar cambios en su alimentación?",
          author: "INCMNSZ - Educación para la Salud",
          authorUrl: "https://www.youtube.com/@EpsnutricionMx",
        },
      ],
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

<style>
.overflow-hidden {
  overflow-x: hidden;
}
</style>