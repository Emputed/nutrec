<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Edad</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="paciente in pacientes" :key="paciente.id_paciente">
                <th scope="row">{{ paciente.id_paciente }}</th>
                <td>{{ paciente.nombre }}</td>
                <td>{{ paciente.apellido }}</td>
                <td>{{ paciente.edad }}</td>
                <td>
                    <button type="button" class="btn btn-success"
                        @click="editarPaciente(paciente.id_paciente)">Editar</button>
                    <button type="button" class="btn btn-success"
                        @click="medidasPaciente(paciente.id_paciente)">Medidas</button>
                    <button type="button" class="btn btn-success" @click="planesPaciente(paciente.id_paciente)">Subir
                        plan</button>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                    <button type="button" class="btn btn-danger"><router-link to="/chat">Mensajes</router-link></button>
                </td>
            </tr>
        </tbody>
    </table>
    <button type="button" class="btn btn-success" @click="registrarPaciente">Registrar paciente</button>

</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../axios.js';
import { useRouter } from 'vue-router'; // Importamos el router
import { usePacienteStore } from '@/stores/pacienteStore.js';
import { useMedidasStore } from '@/stores/medidasStore.js';
import { useIdStore } from '@/stores/idStore';
import { usePlanesStore } from '@/stores/planesStore';

export default {
    name: 'crud',
    setup() {
        const pacientes = ref([]);
        const pacienteStore = usePacienteStore();
        const medidasStore = useMedidasStore();
        const planesStore = usePlanesStore();

        const idStore = useIdStore();
        const router = useRouter();

        const getPacientes = async () => {
            try {
                const response = await api.get('/crud/pacientes');
                pacientes.value = response.data;
            } catch (error) {
                console.error('Error en crud-getPacientes: ', error);
            }
        };

        const editarPaciente = async (id_paciente) => {
            // Redirigir a la vista de edición del paciente
            try {
                const response = await api.get(`/crud/paciente/${id_paciente}`);
                pacienteStore.setPaciente({
                    id_paciente: response.data.id_paciente,
                    nombre: response.data.nombre,
                    apellido: response.data.apellido,
                    f_nacimiento: response.data.f_nacimiento,
                    usuario: response.data.usuario,
                    password: response.data.password,
                    estatus: response.data.estatus
                });
                console.log(response);
                router.push({ name: 'edit' });
            } catch (error) {
                console.log("editarPaciente en CRUD: ", error);
            }
        };

        const medidasPaciente = async (id_paciente) => {
            try {
                const response = await api.get(`/crud/medidas/${id_paciente}`);
                medidasStore.setMedidas(response.data);
                idStore.setId(id_paciente);
                console.log(response);
                router.push({ name: 'MedidasView' });
            } catch (error) {
                console.log("Error en medidasPaciente ", error);
            }
        };

        const planesPaciente = async (id_paciente) => {
            try {
                const response = await api.get(`/crud/planes/${id_paciente}`);
                idStore.setId(id_paciente);
                planesStore.setPlanes(response.data);
                console.log(response);
                router.push({ name: 'PlanView' });
            }catch(error){
                console.log("Error en planesPaciente", error);
            }
        }

        onMounted(() => {
            getPacientes();
        });

        return { pacientes, editarPaciente, medidasPaciente, planesPaciente };
    },

    methods: {
        registrarPaciente() {
            this.$router.push({ name: 'registro' });
        },
        btnMedidas() {
            this.$router.push({ name: 'MedidasView' });
        }
    }
};
</script>
