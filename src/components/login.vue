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
                <input type="text" id="form3Example3" v-model="credentials.usuario" class="form-control form-control-lg"
                  required />
                <label class="form-label" for="form3Example3">Usuario</label>
              </div>

              <!-- Input Contraseña -->
              <div class="form-outline mb-4">
                <input type="password" id="form3Example4" v-model="credentials.password"
                  class="form-control form-control-lg" required />
                <label class="form-label" for="form3Example4">Contraseña</label>
              </div>

              <!-- Botón Ingresar -->
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success btn-lg px-5">Ingresar</button>
              </div>
            </form>

            <!-- Términos y Condiciones -->
            <div class="text-center mt-3">
              <p class="small text-muted">
                Al iniciar sesión, aceptas nuestros
                <a href="https://www.termsfeed.com/live/d5ed5368-797d-43d2-bc04-6e367d4dfbe1" target="_blank"
                  class="text-success fw-bold text-decoration-none">
                  Términos y Condiciones
                </a>
                y nuestra
                <a href="https://www.termsfeed.com/live/64400f23-744b-47cf-8a96-1b127ccea95f" target="_blank"
                  class="text-success fw-bold text-decoration-none">
                  Política de Privacidad
                </a>.
              </p>
              <p class="text-muted" style="font-size: 0.85rem;">
                Generado por
                <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" class="text-success text-decoration-none">
                  TermsFeed.
                </a>
              </p>
            </div>

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
import Swal from 'sweetalert2';

export default {
  setup() {
    const authStore = useAuthStore();

    // Datos de inicio de sesión
    const credentials = reactive({
      usuario: '',
      password: ''
    });

    const login = async () => {
      try {
        const data = await authStore.login(credentials); // Login exitoso

        // Mostrar la alerta de términos y condiciones si no han sido aceptados
        if (!authStore.acceptedTerms) {
          Swal.fire({
            title: 'Términos y Condiciones',
            text: 'Debes aceptar los términos y condiciones para continuar.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              authStore.setAcceptedTerms(true); // Guardar la aceptación de los términos
              redirectUser(data.paciente.status);
            } else {
              // Opcional: manejar el caso en que no aceptan los términos
              console.log('El usuario no aceptó los términos.');
            }
          });
        } else {
          // Si ya aceptó los términos, redirigir al usuario
          redirectUser(data.paciente.status);
        }
      } catch (error) {
        console.error('Error en login', error);
      }
    };

    // Redirección basada en el estado del usuario
    const redirectUser = (status) => {
      if (status === 0) {
        router.push({ name: 'home' });
      } else {
        router.push({ name: 'crud' });
      }
    };

    return { credentials, login };
  }
};
</script>
