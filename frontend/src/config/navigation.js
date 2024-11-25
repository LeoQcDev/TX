/* Aqui se incluiran los links para las redirecciones entre paginas internas del proyecto */

import {
  MessageCircle,
  Users,
  BarChart2,
  TrendingUp,
  ShoppingBag,
  Briefcase,
  Hammer,
  Settings,
  BookOpen,
  FileText,
  Sliders,
  MoreHorizontal,
  Box,
} from "lucide-react";

export const menuItems = [
  { icon: MessageCircle, text: "Conversaciones", href: "/conversaciones" },
  { icon: Users, text: "Empleados", href: "/empleados" },
  { icon: BarChart2, text: "Control", href: "/control" },
  { icon: TrendingUp, text: "Economía", href: "/economia" },
  { icon: ShoppingBag, text: "Comercial", href: "/comercial" },
  { icon: Briefcase, text: "Mercado", href: "/mercado" },
  { icon: Hammer, text: "Operación", href: "/operacion" },
  { icon: Sliders, text: "Ajustes", href: "/ajustes" },
  { icon: Settings, text: "Administración", href: "/administracion" },
  { icon: MoreHorizontal, text: "Otros", href: "/otros" },
  { icon: BookOpen, text: "Jurídico", href: "/juridico" },
  { icon: Box, text: "Aplicaciones", href: "/aplicaciones" },
  { icon: FileText, text: "Reportes", href: "/reportes" },
];

export const sectionsLinks = {
  Conversaciones: [
    { href: "/conversaciones/chat-en-vivo", label: "Chat en Vivo" },
    { href: "/conversaciones/historial", label: "Historial de Mensajes" },
    {
      href: "/conversaciones/config-notificaciones",
      label: "Configuración de Notificaciones",
    },
  ],
  Empleados: [
    { href: "/empleados/lista", label: "Lista de Empleados" },
    { href: "/empleados/horarios", label: "Horarios" },
    { href: "/empleados/evaluaciones", label: "Evaluaciones de Desempeño" },
  ],
  Control: [
    { href: "/control/monitoreo", label: "Monitoreo" },
    { href: "/control/auditorias", label: "Auditorías" },
    { href: "/control/incidencias", label: "Gestión de Incidencias" },
  ],
  Economía: [
    { href: "/economia/pedido", label: "Pedido" },
    { href: "/economia/aprobacion", label: "Aprobación" },
    { href: "/economia/plan-importacion", label: "Plan de importación" },
    { href: "/economia/cliente", label: "Cliente" },
  ],
  Comercial: [
    { href: "/comercial/compras", label: "Compras" },
    { href: "/comercial/ventas", label: "Ventas" },
    { href: "/comercial/clientes", label: "Clientes" },
    { href: "/comercial/marketing", label: "Estrategias de marketing" },
  ],
  Mercado: [
    { href: "/mercado/investigacion", label: "Investigación de mercado" },
    { href: "/mercado/tendencias", label: "Tendencias" },
    { href: "/mercado/competencia", label: "Competencia" },
  ],
  Operación: [
    { href: "/operacion/logistica", label: "Logística" },
    { href: "/operacion/proyectos", label: "Gestión de proyectos" },
    { href: "/operacion/produccion", label: "Producción" },
  ],
  Ajustes: [
    { href: "/ajustes/preferencias", label: "Preferencias del usuario" },
    { href: "/ajustes/seguridad", label: "Seguridad" },
    { href: "/ajustes/integraciones", label: "Integraciones" },
  ],
  Administración: [
    { href: "/administracion/control", label: "Panel de control" },
    { href: "/administracion/politicas", label: "Políticas internas" },
    { href: "/administracion/recursos", label: "Gestión de recursos" },
  ],
  Otros: [
    { href: "/otros/servicios", label: "Servicios adicionales" },
    { href: "/otros/soporte", label: "Soporte" },
    { href: "/otros/eventos", label: "Eventos" },
  ],
  Jurídico: [
    { href: "/juridico/contratos", label: "Contratos" },
    { href: "/juridico/cumplimiento", label: "Cumplimiento" },
    { href: "/juridico/asesoria", label: "Asesoría legal" },
  ],
  Aplicaciones: [
    { href: "/aplicaciones/internas", label: "Aplicaciones internas" },
    { href: "/aplicaciones/api", label: "API" },
    { href: "/aplicaciones/documentacion", label: "Documentación" },
  ],
  Reportes: [
    { href: "/reportes/mensuales", label: "Reportes mensuales" },
    { href: "/reportes/analisis", label: "Análisis de datos" },
    { href: "/reportes/exportaciones", label: "Exportaciones" },
  ],
  Configuración: [
    { href: "/configuracion/polo", label: "Polo" },
    { href: "/configuracion/margen-comercial", label: "Margen comercial" },
    { href: "/configuracion/representante", label: "Representante" },
    { href: "/configuracion/contrato", label: "Contrato" },
  ],
};

export const sectionTitles = {
  economia: "Economía",
  operacion: "Operación",
  administracion: "Administración",
  juridico: "Jurídico",
  configuracion: "Configuración",
  // ... agregar más mapeos según sea necesario
};
