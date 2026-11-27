import SeccionClientesPendiente from "../components/SeccionClientesPendiente";

interface FormClientePageProps {
  modo: "crear" | "editar";
}

export default function FormClientePage({ modo }: FormClientePageProps) {
  return (
    <SeccionClientesPendiente
      title={modo === "crear" ? "Registro de cliente" : "Edición de cliente"}
      description="Carga y actualización de los datos del cliente."
    />
  );
}
