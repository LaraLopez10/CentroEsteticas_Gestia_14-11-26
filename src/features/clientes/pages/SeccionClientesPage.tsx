import SeccionClientesPendiente from "../components/SeccionClientesPendiente";

interface SeccionClientesPageProps {
  title: string;
  description: string;
}

/** Punto de entrada provisional para cumpleaños y secciones del perfil. */
export default function SeccionClientesPage(props: SeccionClientesPageProps) {
  return <SeccionClientesPendiente {...props} />;
}
