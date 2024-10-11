import { defineStore } from "pinia";

export const useMedidasStore = defineStore('medidasStore', {
    state: () => ({
        paciente:null,
        medidas : []
    }),
    actions:{
        setIdPaciente(id_paciente){
            this.paciente.id_paciente = id_paciente;
        },
        setMedidas(medidas){
            this.medidas = medidas;
        },
        addMedida(medida){
            this.medidas.push(medida);
        },
        claerMedidas(){
            this.medidas = [];
        }
    }
})