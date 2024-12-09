<template>
    <footer class="custom-footer text-white py-4">
      <div class="container">
        <div class="row align-items-center">
          <!-- Primera columna -->
          <div class="col-12 col-md-6 text-center mb-3 mb-md-0">
            <h5>{{ consultorioEcatepec.clinicName }}</h5>
            <p>{{ consultorioEcatepec.clinicAddress }}</p>
            <p>{{ consultorioEcatepec.clinicCity }}</p>
          </div>
          <!-- Segunda columna -->
          <div class="col-12 col-md-6 text-center">
            <h5>{{ consultorioGAM.clinicName }}</h5>
            <p>{{ consultorioGAM.clinicAddress }}</p>
            <p>{{ consultorioGAM.clinicCity }}</p>
          </div>
        </div>
        <div class="text-center mt-3">
          <small>&copy; 2024 PlanifyWell. Todos los derechos reservados.</small>
        </div>
      </div>
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
                clinicCity: "Tulpetlac, Ecatepec de Morelos"
            },
            consultorioGAM: {
                clinicName: "Consultorio de Nutrición Nutrec GAM",
                clinicAddress: "Av. 412 #272, San Juan de Aragón VI Sección",
                clinicCity: "Gustavo A. Madero, Ciudad de México"
            }
        };
    }
}
</script>

<style scoped>
footer {
  background-color: #70AE6E;
  color: #fff;
  padding: 20px;
  margin-top: auto;
  width: 100%;
}
</style>