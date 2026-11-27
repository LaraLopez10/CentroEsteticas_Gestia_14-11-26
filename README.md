# Gestia | Sistema de Gestión para Centros de Estética

![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-591D35)
![React](https://img.shields.io/badge/React-Frontend-823D53)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-D4A5AF)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styles-EAD9C3)
![.NET](https://img.shields.io/badge/.NET-Backend-591D35)
![Supabase](https://img.shields.io/badge/Supabase-Database-823D53)

## Sobre Gestia

**Gestia** es una plataforma integral de gestión diseñada para centros de estética, profesionales independientes y negocios especializados en belleza y bienestar.

Su objetivo es centralizar, automatizar y simplificar la administración diaria de cada establecimiento, ofreciendo una experiencia moderna, intuitiva, personalizable y escalable.

El sistema está pensado para centros especializados en:

- Manicura y pedicura.
- Maquillaje.
- Peluquería.
- Extensión de pestañas.
- Diseño de cejas.
- Masajes.
- Bronceado.
- Tratamientos faciales y corporales.
- Otros servicios de estética y bienestar.

## Objetivos del proyecto

- Digitalizar la administración de centros de estética.
- Optimizar la gestión de turnos y reservas.
- Reducir las tareas administrativas manuales.
- Mejorar la experiencia de los clientes.
- Facilitar el control financiero del negocio.
- Centralizar la información en una única plataforma.
- Permitir el crecimiento de cada establecimiento.
- Ofrecer una solución adaptable a diferentes modelos de negocio.

## Funcionalidades

### Dashboard

- Indicadores generales del negocio.
- Resumen de ingresos.
- Turnos del día.
- Próximas reservas.
- Accesos rápidos.
- Estadísticas de rendimiento.
- Alertas y notificaciones.

### Agenda y turnos

- Calendario diario, semanal y mensual.
- Creación, edición y cancelación de turnos.
- Asignación de profesionales.
- Control de disponibilidad.
- Configuración de horarios laborales.
- Bloqueo de horarios.
- Estados de las reservas.
- Prevención de superposición de turnos.
- Políticas de confirmación y cancelación configurables.

### Clientes

- Registro y administración de clientes.
- Información personal y de contacto.
- Historial de turnos.
- Historial de servicios realizados.
- Observaciones y preferencias.
- Seguimiento de clientes frecuentes.
- Registro de cumpleaños.

### Servicios

- Creación y administración de servicios.
- Categorías de servicios.
- Configuración de precios.
- Duración estimada.
- Asignación de profesionales.
- Activación y desactivación de servicios.

### Profesionales

- Administración del equipo de trabajo.
- Configuración de horarios.
- Asignación de especialidades.
- Gestión de disponibilidad.
- Seguimiento de rendimiento.
- Administración de permisos.

### Sucursales y espacios

- Administración de sucursales.
- Gestión de salas y cabinas.
- Asignación de profesionales por establecimiento.
- Control de disponibilidad de espacios.
- Configuración de horarios por sucursal.

### Inventario

- Registro de productos e insumos.
- Control de stock.
- Movimientos de inventario.
- Alertas de stock mínimo.
- Registro de proveedores.
- Seguimiento del consumo de insumos.

### Caja y movimientos

- Registro de ingresos y egresos.
- Administración de medios de pago.
- Apertura y cierre de caja.
- Historial de movimientos.
- Control de pagos pendientes.
- Resumen financiero.

### Reportes y estadísticas

- Ingresos por período.
- Servicios más solicitados.
- Rendimiento por profesional.
- Cantidad de turnos realizados.
- Tasa de cancelaciones.
- Evolución del negocio.

### Notificaciones

- Recordatorios de turnos.
- Confirmaciones de reservas.
- Avisos de cancelación.
- Alertas administrativas.
- Notificaciones de cumpleaños.

### Sitio público

Cada establecimiento podrá disponer de un espacio público personalizado donde sus clientes podrán:

- Consultar servicios y precios.
- Visualizar profesionales.
- Consultar horarios disponibles.
- Reservar turnos online.
- Consultar sus reservas.
- Cancelar turnos según las políticas del establecimiento.

### Personalización

- Identidad visual del establecimiento.
- Logotipo y colores.
- Información comercial.
- Horarios de atención.
- Políticas de reserva.
- Configuración de notificaciones.

## Arquitectura del sistema

Gestia está diseñado bajo un modelo **SaaS (Software as a Service)** con una arquitectura **multi-tenant**, permitiendo que múltiples establecimientos utilicen la misma plataforma manteniendo sus datos y configuraciones independientes.

### Frontend

- React.
- TypeScript.
- Tailwind CSS.
- Vite.
- Componentes reutilizables.
- Diseño responsive.
- Arquitectura modular orientada a funcionalidades.

### Backend

- C#.
- ASP.NET Core Web API.
- Entity Framework Core.
- API REST.
- Autenticación y autorización.
- Validación de datos.
- Aislamiento de información por establecimiento.

### Base de datos

- PostgreSQL.
- Supabase.
- Modelo de datos relacional.
- Integridad referencial.
- Estrategias de aislamiento multi-tenant.
- Escalabilidad y persistencia de información.

## Estructura del proyecto

Estructura de referencia para la organización del frontend:

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   └── feedback/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── agenda/
│   ├── clientes/
│   ├── servicios/
│   ├── profesionales/
│   ├── sucursales/
│   ├── salas/
│   ├── inventario/
│   ├── caja/
│   ├── reportes/
│   ├── notificaciones/
│   └── configuracion/
├── hooks/
├── layouts/
├── routes/
├── services/
├── types/
├── utils/
├── styles/
├── App.tsx
└── main.tsx
```

## Sistema de diseño

Gestia cuenta con una identidad visual elegante, minimalista y profesional, orientada al sector de la estética y el bienestar.

### Paleta de colores

| Color     | Código HEX |
| --------- | ---------- |
| Burdeos   | `#591D35`  |
| Borgoña   | `#823D53`  |
| Rosa nude | `#D4A5AF`  |
| Champán   | `#EAD9C3`  |
| Marfil    | `#FAF7F2`  |

### Componentes reutilizables

- Botones.
- Inputs.
- Selectores.
- Checkboxes.
- Modales.
- Tablas.
- Tarjetas.
- Badges.
- Tooltips.
- Calendarios.
- Paginadores.
- Buscadores.
- Filtros.
- Alertas.
- Skeletons.
- Estados vacíos.
- Sidebar.
- Encabezados de módulos.
- Formularios.

El sistema de diseño busca garantizar consistencia visual, accesibilidad, mantenibilidad y reutilización de código.

## Roles y permisos

El sistema contempla una arquitectura de autorización basada en roles.

Los permisos determinarán las funcionalidades disponibles para cada usuario, permitiendo administrar el acceso a los diferentes módulos y proteger la información de cada establecimiento.

La definición definitiva de roles y permisos se realizará durante el desarrollo del sistema.

## Seguridad

- Autenticación de usuarios.
- Autorización basada en roles y permisos.
- Protección de rutas privadas.
- Validación de datos en frontend y backend.
- Aislamiento de información entre establecimientos.
- Gestión segura de credenciales.
- Variables de entorno.
- Control de acceso a recursos.
- Registro de operaciones relevantes.

## Instalación y ejecución

### Requisitos previos

- Node.js.
- pnpm.
- Git.
- .NET SDK para el backend.
- Instancia de PostgreSQL o proyecto en Supabase.

### Instalar dependencias del frontend

```bash
pnpm install
```

### Ejecutar en modo desarrollo

```bash
pnpm dev
```

### Generar una compilación de producción

```bash
pnpm build
```

### Previsualizar la compilación

```bash
pnpm preview
```

## Roadmap

### Etapa 1 — Sistema de gestión

- [ ] Sistema de autenticación.
- [ ] Arquitectura multi-tenant.
- [ ] Sistema de diseño y componentes reutilizables.
- [ ] Dashboard administrativo.
- [ ] Agenda y turnos.
- [ ] Gestión de clientes.
- [ ] Gestión de servicios.
- [ ] Gestión de profesionales.
- [ ] Sucursales y salas.
- [ ] Inventario.
- [ ] Caja y movimientos.
- [ ] Reportes y estadísticas.
- [ ] Notificaciones.
- [ ] Sitio público de reservas.
- [ ] Personalización del establecimiento.
- [ ] Integración con backend y base de datos.
- [ ] Testing y despliegue.

### Etapa 2 — Expansión del sistema

- [ ] Programa de fidelización.
- [ ] Sistema de puntos y recompensas.
- [ ] Promociones y descuentos.
- [ ] Encuestas de satisfacción.
- [ ] Marketplace de servicios.
- [ ] Facturación electrónica.
- [ ] Integración con plataformas de pago.
- [ ] Automatización de comunicaciones.
- [ ] Reportes avanzados.
- [ ] Administración multiempresa.

## Buenas prácticas de desarrollo

- Principios SOLID.
- Separación de responsabilidades.
- Componentes reutilizables.
- Tipado estricto con TypeScript.
- Arquitectura modular.
- Centralización de servicios.
- Manejo consistente de errores.
- Diseño responsive.
- Accesibilidad.
- Testing.
- Control de versiones con Git.

## Estado del proyecto

Gestia se encuentra actualmente en desarrollo activo.

La primera etapa está orientada a la construcción de la arquitectura, el sistema de diseño, las interfaces administrativas y las funcionalidades principales, para posteriormente consolidar su integración con el backend y la base de datos.

## Licencia

Proyecto de software privado. Licencia definitiva pendiente de definición.

---

**GESTIA**

_La gestión de tu negocio, en un solo lugar._

Desarrollado para transformar la manera en que los centros de estética administran, organizan y hacen crecer sus negocios.
