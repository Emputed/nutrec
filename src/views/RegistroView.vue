<template>
    <div>
       <div class="container">
            <formulario></formulario>
       </div> 
    </div>
</template>
<script>
import formulario from '@/components/formulario.vue';
import navbar from '@/components/navbar.vue';

export default{
    name: 'RegistroView',
    components: {
        formulario,
        navbar
    }
}
</script>