<template>
  <div class="h-80">
    <div class="row align-items-stretch h-80">
      <h3>BIENVENIDO</h3>
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
<div class="container my-5">
  <h2 class="text-center mb-4">Preguntas Frecuentes</h2>

  <div class="accordion" id="faqAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          ¿Cuántas comidas al día debo hacer?
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          La cantidad de comidas al día puede variar según las necesidades individuales, pero generalmente se recomienda hacer de 3 a 5 comidas al día. Esto puede incluir tres comidas principales (desayuno, comida y cena) y dos colaciones saludables entre comidas.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          ¿Qué debo comer para mantener una dieta balanceada?
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Una dieta balanceada incluye una variedad de alimentos de todos los grupos: frutas, verduras, proteínas magras, granos integrales y lácteos bajos en grasa. Es importante comer porciones adecuadas y limitar el consumo de alimentos procesados, azúcares añadidos y grasas saturadas.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          ¿Qué alimentos son buenos para aumentar mi energía?
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Los alimentos ricos en carbohidratos complejos, como granos integrales, frutas y verduras, son excelentes para aumentar la energía.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          ¿Si bajo de peso solo bajo grasa?
        </button>
      </h2>
      <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Cuando se baja de peso, depende mucho de la dieta o los factores por los que sea provocada esa perdida de peso, porque se puede perder grasa pero al mismo tiempo masa muscular cuando el proceso no se lleva con una dieta balanceada.
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
