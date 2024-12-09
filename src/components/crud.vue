<template>
    <h3 class="m-3">PANEL DE CONTROL</h3>
    <!-- Buscador -->
    <div class="container mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Buscar por nombre..."
      />
    </div>
    <!-- Tabla -->
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
        <tr
          v-for="paciente in paginatedPacientes"
          :key="paciente.id_paciente"
        >
          <th scope="row">{{ paciente.id_paciente }}</th>
          <td>{{ paciente.nombre }}</td>
          <td>{{ paciente.apellido }}</td>
          <td>{{ paciente.edad }}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              @click="editarPaciente(paciente.id_paciente)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="medidasPaciente(paciente.id_paciente)"
            >
              Medidas
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="planesPaciente(paciente.id_paciente)"
            >
              Subir plan
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarPaciente(paciente.id_paciente)"
            >
              Eliminar
            </button>
            <button
              type="button"
              class="btn btn-warning"
              @click="mensajePaciente(paciente.id_paciente)"
            >
              Chat
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!-- Paginación -->
    <nav aria-label="Paginación">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">
            Anterior
          </button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  
    <button
      type="button"
      class="btn btn-success mb-3"
      @click="registrarPaciente"
    >
      Registrar paciente
    </button>
  </template>
  

<script>
import { ref, onMounted, computed } from 'vue';
import api from '../axios.js';
import { useRouter } from 'vue-router'; // Importamos el router
import { usePacienteStore } from '@/stores/pacienteStore.js';
import { useMedidasStore } from '@/stores/medidasStore.js';
import { useIdStore } from '@/stores/idStore';
import { usePlanesStore } from '@/stores/planesStore';
import Swal from 'sweetalert2';

export default {
    name: 'crud',
    setup() {
        const pacientes = ref([]);
        const pacienteStore = usePacienteStore();
        const medidasStore = useMedidasStore();
        const planesStore = usePlanesStore();

        const idStore = useIdStore();
        const router = useRouter();

        //PARA PAGINACION DE LA TABLA
        const searchQuery = ref('');
        const currentPage = ref(1);
        const rowsPerPage = ref(10);

        const getPacientes = async () => {
            try {
                const response = await api.get('/crud/pacientes');
                pacientes.value = response.data;
            } catch (error) {
                console.error('Error en crud-getPacientes: ', error);
            }
        };

        const filteredPacientes = computed(() => {
            return pacientes.value.filter((paciente) =>
                paciente.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredPacientes.value.length / rowsPerPage.value);
        });

        const paginatedPacientes = computed(() => {
            const startIndex = (currentPage.value - 1) * rowsPerPage.value;
            const endIndex = startIndex + rowsPerPage.value;
            return filteredPacientes.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const editarPaciente = async (id_paciente) => {
            // Redirigir a la vista de edición del paciente
            try {
                const response = await api.get(`/crud/paciente/${id_paciente}`);
                const data = response.data;

                pacienteStore.setId_paciente(data.id_paciente);
                pacienteStore.setNombre(data.nombre);
                pacienteStore.setApellido(data.apellido);
                pacienteStore.setNacimiento(data.f_nacimiento);
                pacienteStore.setUsuario(data.usuario);
                pacienteStore.setPassword(data.password);

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
            } catch (error) {
                console.log("Error en planesPaciente", error);
            }
        };

        const eliminarPaciente = async (id_paciente) => {
            try {
                const result = await Swal.fire({
                    title: 'Eliminar paciente',
                    text: '¿Esta seguro de eliminar este paciente?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-secondary'
                    }
                });
                if (result.isConfirmed) {
                    const response = await api.delete(`paciente/delete/${id_paciente}`);
                    console.log(response.data);
                    Swal.fire('¡Eliminado!', 'El paciente ha sido eliminado con éxito.', 'success');
                }
            } catch (error) {
                console.log("Error al querer eliminar al paciente");
                Swal.fire('Error', 'Hubo un problema al intentar eliminar al paciente.', 'error');
            }
        }

        const mensajePaciente = (id_paciente) => {
            idStore.setId(id_paciente);
            console.log(idStore.idPaciente);
            router.push({ name: 'ChatView' });
        }

        onMounted(() => {
            getPacientes();
        });

        return {
            pacientes,
            editarPaciente,
            medidasPaciente,
            planesPaciente,
            eliminarPaciente,
            mensajePaciente,
            searchQuery,
            currentPage,
            rowsPerPage,
            filteredPacientes,
            paginatedPacientes,
            totalPages,
            changePage,
        };
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
