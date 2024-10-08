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
                <th scope="row">{{paciente.id_paciente}}</th>
                <td>{{paciente.nombre}}</td>
                <td>{{paciente.apellido}}</td>
                <td>{{paciente.edad}}</td>
                <td>
                    <button type="button" class="btn btn-success" @click="editarPaciente(paciente.id_paciente)">Editar</button>
                    <button type="button" class="btn btn-success">Subir plan</button>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Importamos el router

export default {
    name: 'crud',
    setup() {
        const pacientes = ref([]); 
        const router = useRouter(); // Usamos el router

        const getPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/crud/pacientes');
                pacientes.value = response.data;
            } catch (error) {
                console.error('Error en crud-getPacientes: ', error);
            }
        };

        const editarPaciente = (id_paciente) => {
            // Redirigir a la vista de edición del paciente
            console.log("Id desde componente crud: ", id_paciente);
            router.push({ name: 'edit', params: { id_paciente } });
        };

        onMounted(() => {
            getPacientes();
        });

        return { pacientes, editarPaciente };
    }
};
</script>
