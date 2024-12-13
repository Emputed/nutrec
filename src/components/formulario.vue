<template>
    <div class="vh-100">
        <div>
            <h2>DATOS GENERALES</h2>
        </div>
        <form @submit.prevent="saveData">
            <div class="input-group mb-3">
                <label for="nombre" class="form-label m-2">Nombre/s</label>
                <input type="text" class="form-control" id="nombre" v-model="paciente.nombre" required>
            </div>
            <div class="input-group mb-3">
                <label for="apellido" class="form-label m-2">Apellidos</label>
                <input type="text" class="form-control" id="apellido" v-model="paciente.apellido" required>
            </div>
            <div class="input-group mb-3">
                <label for="edad" class="form-label m-2">Fecha de nacimiento</label>
                <input type="text" class="form-control" placeholder="YYYY-MM-DD" aria-describedby="basic-addon2"
                    id="edad" v-model="paciente.f_nacimiento" required>
            </div>

            <div class="btn-group mb-3" role="group" aria-label="Seleccionar género">
                <label for="edad" class="form-label m-2">Genero</label>
                <input type="radio" class="btn-check" name="gender" id="masculino" autocomplete="off" :value="0"
                    v-model="paciente.genero" />
                <label class="btn btn-outline-success" for="masculino">Masculino</label>

                <input type="radio" class="btn-check" name="gender" id="femenino" autocomplete="off" :value="1"
                    v-model="paciente.genero" />
                <label class="btn btn-outline-success" for="femenino">Femenino</label>
            </div>

            <div>
                <h2>DATOS DE INICIO DE SESIÓN</h2>
            </div>
            <div class="row g-2 m-3">
                <div class="col-sm">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input id="usuario" type="text" class="form-control" aria-label="Cintura" v-model="paciente.usuario"
                        required>
                </div>
                <div class="col-sm">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control" aria-label="Cadera"
                        v-model="paciente.password" required>
                </div>
            </div>
            <div class="container mb-3">
                <button class="btn btn-success">REGISTRAR</button>
            </div>
        </form>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import api from "../axios.js"
import Swal from 'sweetalert2';

export default {
    name: 'formulario',
    data() {
        return {
            res: {},
            paciente: {
                id: '',
                nombre: '',
                apellido: '',
                f_nacimiento: '',
                usuario: '',
                password: '',
                state: '',
                genero:'',
            }
        }
    },
    methods: {
        saveData() {
            const router = useRouter();
            api.post("/paciente/register", this.paciente)
                .then(
                    ({ data }) => {
                        Swal.fire('¡Registrado!', 'El paciente ha sido registrado con éxito.', 'success');
                        this.$router.push({ name: 'crud' });
                        console.log(this.res.messsage);
                    }
                )
        }
    }
}
</script>