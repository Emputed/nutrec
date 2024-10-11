import { defineStore } from "pinia";

export const useIdStore = defineStore('idStore',{
    state: ()=>({
        idPaciente:null,
    }),
    actions:{
        setId(id_paciente){
            this.idPaciente = id_paciente;
        }
    }
})