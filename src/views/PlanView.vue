<template>
    <subirPlan/>
    <div>
        <mostrarPlan/>
    </div>
</template>
<script>
import subirPlan from '@/components/subirPlan.vue';
import mostrarPlan from '@/components/mostrarPlan.vue';

export default {
    name: 'PlanView',
     components:{
        subirPlan,
        mostrarPlan,
     },
}
</script>