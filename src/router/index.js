import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CrudView from "@/views/CrudView.vue";
import EditView from "@/views/EditView.vue";
import MedidasRegisterView from "@/views/MedidasRegisterView.vue";
import MedidasView from "@/views/MedidasView.vue";
import PlanView from "@/views/PlanView.vue";
import ChatView from "@/views/ChatView.vue";
import PlanPacienteView from "@/views/PlanPacienteView.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registro",
    name: "registro",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegistroView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/crud",
    name: "crud",
    component: CrudView,
    beforeEnter: (to, from, next) => {
      const store = useAuthStore();
      const status = store.status;
      if(status === 1){
        next();
      }else{
        next('/');
      }
    }
  },
  {
    path: "/edit",
    name: "edit",
    component: EditView,
    props: true,
  },
  {
    path: "/medida",
    name: "MedidasRegisterView",
    component: MedidasRegisterView,
    props: true,
  },
  {
    path: "/medidas",
    name: "MedidasView",
    component: MedidasView,
    props: true,
  },
  {
    path: "/plan",
    name: "PlanView",
    component: PlanView,
    props: true,
  },
  {
    path: "/chat",
    name: "ChatView",
    component: ChatView,
    props: true,
  },
  {
    path: "/plan_paciente",
    name: "PlanPacienteView",
    component: PlanPacienteView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();
  // Si no hay token, redirige a la página de inicio de sesión
  if (!store.token) {
    if (to.path !== '/') {
      return next('/');
    }
    return next();
  }
  // Verifica la validez del token si no está autenticado
  if (!store.flag) {
    try {
      await api.get('paciente/verify-token', {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      store.setFlag(true); // Si el token es válido, establece flag
    } catch (error) {
      console.error("Token inválido o expirado:", error);
      store.logout();
      if (to.path !== '/') {
        return next('/');
      }
      return next();
    }
  }

  // Permite la navegación si el usuario está autenticado
  next();
});


export default router;
