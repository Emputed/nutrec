<template>
    <div>
        <div>
            <h2>DATOS GENERALES</h2>
        </div>
        <form @submit.prevent="saveData">
            <div class="input-group mb-3">
                <label for="nombre" class="form-label">Nombre/s</label>
                <input type="text" class="form-control" id="nombre" v-model="paciente.nombre">
            </div>
            <div class="input-group mb-3">
                <label for="apellido" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="apellido" v-model="paciente.apellido">
            </div>
            <div class="input-group mb-3">
                <label for="edad" class="form-label">Fecha de nacimiento</label>
                <input type="text" class="form-control" placeholder="YYYY-MM-DD" aria-describedby="basic-addon2" id="edad"
                    v-model="paciente.f_nacimiento">
            </div>
            <div>
                <h2>DATOS DE INICIO DE SESIÓN</h2>
            </div>
            <div class="row g-2 m-3">
                <div class="col-sm">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input id="usuario" type="text" class="form-control" aria-label="Cintura"
                        v-model="paciente.usuario">
                </div>
                <div class="col-sm">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control" aria-label="Cadera"
                        v-model="paciente.password">
                </div>
            </div>
            <div class="container mb-3">
                <button class="btn btn-success" >REGISTRAR</button>
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
                        this.$router.push({name:'crud'});
                        console.log(this.res.messsage);
                    }
                )
        }
    }
}
</script>