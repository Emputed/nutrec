import { defineStore } from "pinia";

export const usePlanesStore = defineStore('planesStore', {
    state: () => ({
        paciente:null,
        planes : []
    }),
    actions:{
        setIdPaciente(id_paciente){
            this.paciente.id_paciente = id_paciente;
        },
        setPlanes(planes){
            this.planes = planes;
        },
        addplan(planes){
            this.planes.push(planes);
        },
        claerPlanes(){
            this.planes = [];
        }
    }
})