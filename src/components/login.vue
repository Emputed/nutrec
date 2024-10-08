<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../../public/PlanifyWell_logo.svg" class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="login">
                        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p class="lead fw-normal mb-0 me-3">Iniciar Sesión</p>
                        </div>

                        <!-- Email input -->
                        <div data-mdb-input-init class="form-outline mb-4 my-4">
                            <input type="text" id="form3Example3" v-model="credentials.usuario" class="form-control form-control-lg" />
                            <label class="form-label" for="form3Example3">Usuario</label>
                        </div>

                        <!-- Password input -->
                        <div data-mdb-input-init class="form-outline mb-3">
                            <input type="password" id="form3Example4" v-model="credentials.password" class="form-control form-control-lg" />
                            <label class="form-label" for="form3Example4">Contraseña</label>
                        </div>

                        <div class="text-center justify-content-center text-lg-start mt-4 pt-2">
                            <button data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Ingresar</button>
                        </div>
                    </form>
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
        console.log("Login exitoso", data);
      } catch (error) {
        console.error("Error en login", error);
      }
    };

    return { credentials, login };
  }
};
</script>