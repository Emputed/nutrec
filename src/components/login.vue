<template>
  <section class="d-flex flex-column justify-content-center align-items-center min-vh-100">
    <div class="container py-5">
      <div class="row d-flex justify-content-center align-items-center">
        <!-- Imagen -->
        <div class="col-md-9 col-lg-6 col-xl-5 text-center mb-4">
          <img src="../../public/PlanifyWell_logo.svg" class="img-fluid" alt="Logo">
        </div>

        <!-- Formulario -->
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card shadow-lg p-4">
            <form @submit.prevent="login">
              <h2 class="text-center mb-4">Iniciar Sesión</h2>

              <!-- Input Usuario -->
              <div class="form-outline mb-4">
                <input type="text" id="form3Example3" v-model="credentials.usuario" class="form-control form-control-lg" required />
                <label class="form-label" for="form3Example3">Usuario</label>
              </div>

              <!-- Input Contraseña -->
              <div class="form-outline mb-4">
                <input type="password" id="form3Example4" v-model="credentials.password" class="form-control form-control-lg" required />
                <label class="form-label" for="form3Example4">Contraseña</label>
              </div>

              <!-- Botón Ingresar -->
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success btn-lg px-5">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';
export default {
  setup() {
    const authStore = useAuthStore();

    // credentials es reactivo
    const credentials = reactive({
      usuario: '',
      password: ''
    });

    const login = async () => {
      try {
        const data = await authStore.login(credentials); // credentials ya está disponible aquí
        if(data.paciente.status === 0){
          router.push({name:'home'});
        }
        else{
          router.push({name:'crud'});
        }
        console.log(data.paciente.username);
      } catch (error) {
        console.error("Error en login", error);
      }
    };

    return { credentials, login };
  }
};
</script>