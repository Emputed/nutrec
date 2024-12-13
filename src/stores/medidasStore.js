import { defineStore } from "pinia";
import { usePacienteStore } from "./pacienteStore";

export const useMedidasStore = defineStore('medidasStore', {
    state: () => ({
        medidas : []
    }),
    actions:{
        setMedidas(medidas){
            this.medidas = medidas.map(this.normalizarMedida);
        },
        addMedida(medida){
            const medidaNormalizada = this.normalizarMedida(medida);
            this.medidas.push(medidaNormalizada);
        },
        clearMedidas(){
            this.medidas = [];
        },
        normalizarMedida(medida){
            const genero = '';
            const edad = '';
            return {
                id_medida: medida.id_medida || null,
                id_paciente: medida.id_paciente || null,
                fecha: medida.fecha || null,
                m_peso: medida.m_peso || null, // en kg
                estatura: medida.estatura || null, // en metros
                m_brazo: medida.m_brazo || null, // en cm
                m_pierna: medida.m_pierna || null, // en cm
                m_cintura: medida.m_cintura || null, // en cm
                genero: this.setGenero() || null, // 0 masculino o 1 femenino
                edad: this.setEdad() || null, 
                imc: this.calcularIMC(medida.m_peso, medida.estatura), 
                gastoCalorico: this.calcularGastoCalorico(
                    medida.m_peso, 
                    medida.estatura, 
                    genero, 
                    edad, 
                ) 
            };
        },
        calcularIMC(peso, estatura) {
            if (!peso || !estatura) return null;
            return +(peso / (estatura * estatura)).toFixed(2);
        },
        calcularGastoCalorico(peso, estatura, genero, edad){
            if(genero === 0){       //HOMBRE
                return +(66.473 + (peso * 13.751) + (5.0033 * (estatura*100)) - (6.55 * edad)).toFixed(2);
            }else{                  //MUJER  
                return +(665.51 + (peso * 9.463) + (1.8496 * (estatura*100)) - (4.7 * edad)).toFixed(2);
            }
        },
        setGenero(){
            const pacienteStore = usePacienteStore();
            return pacienteStore.genero;
        },
        setEdad(){
            const pacienteStore = usePacienteStore();
            return pacienteStore.edad;
        }
    }
})