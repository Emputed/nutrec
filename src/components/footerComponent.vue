<template>
    <footer class="custom-footer text-white py-4">
        <div class="row align-items-center">
            <div class="col container text-center">
            <h5>{{ consultorioEcatepec.clinicName }}</h5>
            <p>{{  consultorioEcatepec.clinicAddress }}</p>
            <p>{{  consultorioEcatepec.clinicCity }}</p>
            
        </div>
        <div class="col container text-center">
            <h5>{{ consultorioGAM.clinicName }}</h5>
            <p>{{  consultorioGAM.clinicAddress }}</p>
            <p>{{  consultorioGAM.clinicCity }}</p>
        </div>
        </div>
        
        <small>&copy; 2024 PlanifyWell. Todos los derechos reservados.</small>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            consultorioEcatepec: {
                clinicName: "Consultorio de Nutrición Nutrec ECATEPEC",
                clinicAddress: "Av. Mexico 222",
                clinicCity: "Tulpetlac , Ecatepec de Morelos"
            },
            consultorioGAM: {
                clinicName: "Consultorio de Nutrición Nutrec GAM",
                clinicAddress: "AV. 412 #272, San Juan de Aragón VI Sección",
                clinicCity: "Gustavo A. Madero, Ciudad de México"
            }
        };
    }
}
</script>

<style>
.custom-footer {
    background-color: #70AE6E;
    /* Fondo con el color personalizado */
}

.social-icons a {
    font-size: 1.5rem;
}

.social-icons a:hover {
    color: #444;
    /* Cambia a un color oscuro al pasar el mouse */
}
</style>