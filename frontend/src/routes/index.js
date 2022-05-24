import { roles } from "./roles";

// pages
import NewWalkPage from "../pages/NewWalkPage";
import NewDogPage from "../pages/NewDogPage";
// import DogDetailPage from "../pages/DogDetailPage";
import EditUser from "../pages/EditProfilePage";
import EditDog from "../pages/DogEditPage";
import WalkDetailPage from "../pages/WalkDetailPage";
import EditWalk from "../pages/WalkEdit";
import Post from "../pages/EditPostPage";
import NewPost from "../pages/NewPostPage";
import HomePage from "../pages/HomePage";
import DogsUserPage from "../pages/DogsUserPage";
import Checkouts from "../pages/Checkout";
import Ventas from "../pages/Ventas";
import ReserveDetail from "./../pages/ReserveDetail";
import UserList from "./../components/UserList";
import WalksUserPage from "./../pages/WalksUserPage";
import ReviewsUserPage from "./../pages/ReviewsUserPage";
import SignupGoogle from "./../pages/SignupGoogle";
/* import NewNotification from "../pages/NewNotification"; */
import ReviewPage from "../pages/ReviewPage";
import AccountDeactivate from "../pages/AccountDeactivate";
import ContactUs from "../pages/ContactUs";
import ContactUsDetail from "../pages/ContactUsDetail";

// icons
import { BiHelpCircle } from "react-icons/bi";
/* import { IoNotificationsOutline } from "react-icons/io5"; */
import { RiStarSFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { FaDog, FaWalking, FaMicroblog } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";

export const drawerRoutes = [
  // home pages
  {
    path: "/home",
    title: "Home",
    requiredRoles: [roles.ADMIN, roles.OWNER, roles.WALKER],
    icon: FiHome,
  },
  {
    path: "/walks",
    title: "Paseos",
    requiredRoles: [roles.OWNER],
    icon: FaWalking,
  },
  // users pages
  {
    path: "/users",
    title: "Usuarios",
    requiredRoles: [roles.ADMIN],
    icon: AiOutlineUser,
  },
  // dog pages
  {
    path: "/new-dog",
    title: "Nueva mascota",
    requiredRoles: [roles.OWNER],
    icon: FaDog,
  },
  {
    path: "/users/dogs",
    title: "Mis mascotas",
    requiredRoles: [roles.OWNER],
    icon: GiDogHouse,
  },
  {
    path: "/users/dogs",
    title: "Perros",
    requiredRoles: [roles.ADMIN],
    icon: GiDogHouse,
  },
  // walk pages
  {
    path: "/new-walk",
    title: "Nuevo paseo",
    requiredRoles: [roles.WALKER],
    icon: FaWalking,
  },
  {
    path: "/users/walks",
    title: "Mis paseos",
    requiredRoles: [roles.WALKER],
    icon: FaWalking,
  },
  {
    path: "/users/walks",
    title: "Paseos",
    requiredRoles: [roles.ADMIN],
    icon: FaWalking,
  },

  // Checkout pages
  {
    path: "/miscompras",
    title: "Mis compras",
    requiredRoles: [roles.OWNER],
    icon: MdOutlineAttachMoney,
  },
  {
    path: "/misventas",
    title: "Mis ventas",
    requiredRoles: [roles.WALKER],
    icon: MdOutlineAttachMoney,
  },
  {
    path: "/ordenes",
    title: "Ordenes",
    requiredRoles: [roles.ADMIN],
    icon: MdOutlineAttachMoney,
  },

  // Reviews pages
  {
    path: "/misreseñas",
    title: "Mis reseñas",
    requiredRoles: [ roles.WALKER],
    icon: RiStarSFill,
  },

  // Blog pages
/*   {
    path: "/new-notification",
    title: "Notificaciones",
    requiredRoles: [roles.ADMIN],
    icon: IoNotificationsOutline,
  }, */
  {
    path: "/posts",
    title: "Blog",
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    icon: FaMicroblog,
  },
  {
    path: "/new-post",
    title: "Nuevo post",
    requiredRoles: [roles.ADMIN],
    icon: FaMicroblog,
  },
  {
    path: "/contactus",
    title: "Contacto",
    requiredRoles: [ roles.WALKER, roles.OWNER],
    icon: BiHelpCircle,
  },
  {
    path: "/contact",
    title: "Contacto",
    requiredRoles: [roles.ADMIN],
    icon: BiHelpCircle,
  },
];

export const allowedRoutes = [
  // home pages
  {
    path: "/home",
    title: "Home",
    component: HomePage,
    requiredRoles: [roles.ADMIN, roles.OWNER, roles.WALKER],
    exact: true,
  },
  // user pages
  {
    path: "/users/edit",
    title: "Usuario",
    component: EditUser,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  // dog pages
  {
    path: "/new-dog",
    title: "Crear perro",
    component: NewDogPage,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  {
    path: "/dogs/:id/edit",
    title: "Editar mascota",
    component: EditDog,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  {
    path: "/users/dogs",
    title: "Mis mascotas",
    component: DogsUserPage,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  // walk pages
  {
    path: "/new-walk",
    title: "Crear paseo",
    component: NewWalkPage,
    requiredRoles: [roles.ADMIN, roles.WALKER],
    exact: true,
  },
  {
    path: "/users/walks",
    title: "Paseos",
    component: WalksUserPage,
    requiredRoles: [roles.ADMIN, roles.WALKER],
    exact: true,
  },

  {
    path: "/walks/:id",
    title: "Detalle de paseo",
    component: WalkDetailPage,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  {
    path: "/walks/edit/:id",
    title: "Editar paseo",
    component: EditWalk,
    requiredRoles: [roles.ADMIN, roles.WALKER],
    exact: true,
  },
  {
    path: "/posts/:id/edit",
    title: "Editar Blog",
    component: Post,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  {
    path: "/new-post",
    title: "Crear Blog",
    component: NewPost,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  // checkout
  {
    path: "/checkout",
    title: "Procesando pago",
    component: Checkouts,
    requiredRoles: [roles.ADMIN, roles.WALKER, roles.OWNER],
    exact: true,
  },
  {
    path: "/misventas",
    title: "Mis ventas",
    component: Ventas,
    requiredRoles: [roles.WALKER],
    exact: true,
  },
  {
    path: "/miscompras",
    title: "Mis compras",
    component: Ventas,
    requiredRoles: [roles.OWNER],
    exact: true,
  },
  {
    path: "/ordenes",
    title: "Ordenes",
    component: Ventas,
    requiredRoles: [roles.ADMIN],
    exact: true,
  },
  {
    path: "/reserve/:id",
    title: "Reserva",
    component: ReserveDetail,
    requiredRoles: [roles.ADMIN, roles.OWNER, roles.WALKER],
    exact: true,
  },
  {
    path: "/review/user/:id",
    title: "Opinión",
    component: ReviewPage,
    requiredRoles: [roles.ADMIN, roles.OWNER],
    exact: true,
  },
  // users
  {
    path: "/users",
    title: "Usuarios",
    component: UserList,
    requiredRoles: [roles.ADMIN],
    exact: true,
  },
  {
    path: "/account/missing-information",
    title: "Completa tu perfil",
    component: SignupGoogle,
    requiredRoles: [roles.OWNER],
    exact: true,
  },
  {
    path: "/account/deactivate",
    title: "Desactivar cuenta",
    component: AccountDeactivate,
    requiredRoles: [roles.ADMIN, roles.OWNER, roles.WALKER],
    exact: true,
  },

  // USER PAGE MIS RESÑAS
  {
    path: "/misreseñas",
    title: "Mis reseñas",
    component: ReviewsUserPage,
    requiredRoles: [ roles.WALKER],
    exact: true,
  },
 /*  {
    path: "/new-notification",
    title: "Nueva notificicaión",
    component: NewNotification,
    requiredRoles: [roles.ADMIN],
    exact: true,
  }, */

    // CONTACTUS
    {
      path: "/contactus",
      title: "Contacto",
      component: ContactUs,
      requiredRoles: [ roles.WALKER, roles.OWNER],
      exact: true,
    },
    {
      path: "/contact",
      title: "Contacto",
      component: ContactUs,
      requiredRoles: [roles.ADMIN],
      exact: true,
    },
    {
      path: "/contact/:id",
      title: "Detalle del contacto",
      component: ContactUsDetail,
      requiredRoles: [roles.ADMIN],
      exact: true,
    },
];


