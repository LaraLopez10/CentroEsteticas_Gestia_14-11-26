import { useState } from "react";
import {
  Plus,
  Save,
  Pencil,
  Trash2,
  Eye,
  Search,
  Users,
  Mail,
  CalendarDays,
  Wallet,
  Settings,
  Info,
  Inbox,
  SearchX,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import PaginaModulo from "../../../components/shared/PaginaModulo";
import EncabezadoModulo from "../../../components/shared/EncabezadoModulo";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";
import Checkbox from "../../../components/ui/Checkbox";
import Switch from "../../../components/ui/Switch";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import SearchInput from "../../../components/ui/SearchInput";
import Tabla from "../../../components/ui/Tabla";
import PanelTabla from "../../../components/ui/PanelTabla";
import Paginacion from "../../../components/ui/Paginacion";
import Modal from "../../../components/ui/Modal";
import Pestañas from "../../../components/ui/Pestañas";
import Tooltip from "../../../components/ui/Tooltip";
import EmptyState from "../../../components/ui/EmptyState";

import Skeleton, {
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonForm,
} from "../../../components/ui/Skeleton";

import type { TableColumn } from "../../../components/ui/Tabla";
import useToast from "../../../hooks/useToast";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface Registro {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
}

const colores = [
  { nombre: "Primary", hex: "#65283E" },
  { nombre: "Primary hover", hex: "#793D51" },
  { nombre: "Primary light", hex: "#F4E7EC" },
  { nombre: "Secondary", hex: "#EAD7BC" },
  { nombre: "Secondary hover", hex: "#DCC5A5" },
  { nombre: "Background", hex: "#FAF7F2" },
  { nombre: "Surface", hex: "#FFFFFF" },
  { nombre: "Text primary", hex: "#452B35" },
  { nombre: "Text secondary", hex: "#796B70" },
  { nombre: "Border", hex: "#E5D9CF" },
  { nombre: "Success", hex: "#39805C" },
  { nombre: "Warning", hex: "#B58132" },
  { nombre: "Error", hex: "#B94040" },
  { nombre: "Info", hex: "#4675B5" },
];

const opcionesEstado = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
  { value: "pendiente", label: "Pendiente" },
];

const registros: Registro[] = Array.from({ length: 32 }, (_, index) => ({
  id: index + 1,
  nombre: `Registro de ejemplo ${index + 1}`,
  email: `ejemplo${index + 1}@correo.com`,
  estado: index % 3 !== 0,
}));

export default function UIKitPage() {
  const toast = useToast();

  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("activo");
  const [observaciones, setObservaciones] = useState("");
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const [search, setSearch] = useState("");
  const [filtroTabla, setFiltroTabla] = useState("todos");
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>("md");

  const registrosFiltrados = registros.filter((registro) => {
    const coincideBusqueda = `${registro.nombre} ${registro.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const coincideEstado =
      filtroTabla === "todos" ||
      (filtroTabla === "activo" && registro.estado) ||
      (filtroTabla === "inactivo" && !registro.estado);

    return coincideBusqueda && coincideEstado;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(registrosFiltrados.length / pageSize),
  );

  const currentPage = Math.min(page, totalPages);

  const registrosPaginados = registrosFiltrados.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const columns: TableColumn<Registro>[] = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      render: (registro) => `#${registro.id}`,
    },
    {
      key: "nombre",
      header: "Nombre",
      render: (registro) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">{registro.nombre}</span>

          <span className="text-xs text-text-secondary">{registro.email}</span>
        </div>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (registro) => (
        <Badge variant={registro.estado ? "success" : "neutral"} dot>
          {registro.estado ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      align: "right",
      width: "150px",
      render: (registro) => (
        <div className="flex justify-end gap-1">
          <Tooltip content="Ver detalles">
            <Button
              variant="ghost"
              size="icon"
              icon={Eye}
              aria-label={`Ver registro ${registro.id}`}
              onClick={() => toast.info("Ver registro", registro.nombre)}
            />
          </Tooltip>

          <Tooltip content="Editar registro">
            <Button
              variant="ghost"
              size="icon"
              icon={Pencil}
              aria-label={`Editar registro ${registro.id}`}
              onClick={() => setModalOpen(true)}
            />
          </Tooltip>

          <Tooltip content="Eliminar registro">
            <Button
              variant="ghost"
              size="icon"
              icon={Trash2}
              className="text-error"
              aria-label={`Eliminar registro ${registro.id}`}
              onClick={() =>
                toast.warning(
                  "Eliminar registro",
                  "Esta es una acción de demostración.",
                )
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: Users,
      content: <p>Contenido de la sección general.</p>,
    },
    {
      id: "historial",
      label: "Historial",
      icon: CalendarDays,
      count: 5,
      content: <p>Contenido del historial de registros.</p>,
    },
    {
      id: "configuracion",
      label: "Configuración",
      icon: Settings,
      content: <p>Contenido de configuración.</p>,
    },
    {
      id: "deshabilitado",
      label: "Deshabilitado",
      disabled: true,
      content: null,
    },
  ];

  const limpiarFiltros = () => {
    setSearch("");
    setFiltroTabla("todos");
    setPage(1);
    setSelectedRows([]);
  };

  const restablecer = () => {
    setNombre("");
    setEstado("activo");
    setObservaciones("");
    setChecked(true);
    setEnabled(true);
    setLoading(false);
    setPageSize(5);
    setModalOpen(false);
    setModalSize("md");
    limpiarFiltros();
    toast.clearToasts();

    toast.success(
      "UI Kit restablecido",
      "Se restauraron los valores iniciales.",
    );
  };

  return (
    <PaginaModulo>
      <EncabezadoModulo
        title="Design System"
        description="Biblioteca visual de componentes reutilizables de Gestia."
        actions={
          <Button variant="outline" icon={RotateCcw} onClick={restablecer}>
            Restablecer
          </Button>
        }
      />

      {/* IDENTIDAD VISUAL */}

      <Card
        title="01. Identidad visual"
        description="Paleta de colores, tipografías y estilos globales."
        divided
      >
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {colores.map((color) => (
              <div key={color.nombre} className="flex flex-col gap-2">
                <div
                  className="h-20 rounded-card border border-border"
                  style={{ backgroundColor: color.hex }}
                />

                <span className="text-sm font-medium text-text-primary">
                  {color.nombre}
                </span>

                <span className="text-xs text-text-secondary">{color.hex}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-text-secondary">
                The Seasons
              </span>

              <p className="font-display text-5xl text-primary">Aa Bb Cc</p>

              <p className="font-display text-3xl text-primary">
                Gestión con estilo.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-text-secondary">
                Codec Pro
              </span>

              <p className="font-sans text-4xl text-text-primary">Aa Bb Cc</p>

              <p className="font-sans text-base text-text-secondary">
                ABCDEFGHIJKLMNÑOPQRSTUVWXYZ
              </p>

              <p className="font-sans text-base text-text-primary">
                0123456789
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <h1 className="font-display text-4xl text-primary">
              Título principal
            </h1>

            <h2 className="font-display text-3xl text-primary">
              Título de sección
            </h2>

            <h3 className="font-display text-xl text-primary">
              Título de tarjeta
            </h3>

            <p className="text-base text-text-primary">
              Texto principal de la interfaz.
            </p>

            <p className="text-sm text-text-secondary">
              Texto secundario y descripciones.
            </p>

            <p className="text-xs text-text-secondary">
              Información complementaria.
            </p>
          </div>

          <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-text-primary">Espaciados</h3>

              {[4, 8, 12, 16, 20, 24, 32, 48].map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <span className="w-12 text-xs text-text-secondary">
                    {size}px
                  </span>

                  <div
                    className="h-3 rounded bg-primary"
                    style={{ width: size * 3 }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-text-primary">Bordes</h3>

              <div className="rounded-card border border-border p-5">
                Card — 12px
              </div>

              <div className="rounded-button border border-border p-5">
                Button — 8px
              </div>

              <div className="rounded-input border border-border p-5">
                Input — 8px
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* BUTTON */}

      <Card
        title="02. Button"
        description="Variantes, tamaños, iconos y estados."
        divided
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-text-secondary">
              Variantes
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <span className="text-sm font-medium text-text-secondary">
              Tamaños
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>

              <Button size="icon" icon={Plus} aria-label="Agregar" />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <span className="text-sm font-medium text-text-secondary">
              Botones con iconos
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <Button icon={Plus}>Nuevo registro</Button>

              <Button
                icon={Save}
                onClick={() => toast.success("Cambios guardados")}
              >
                Guardar
              </Button>

              <Button variant="outline" icon={Download} iconPosition="right">
                Exportar
              </Button>

              <Button variant="danger" icon={Trash2}>
                Eliminar
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <span className="text-sm font-medium text-text-secondary">
              Estados
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <Button>Normal</Button>
              <Button loading>Cargando</Button>
              <Button disabled>Deshabilitado</Button>
              <Button variant="outline" disabled>
                Outline deshabilitado
              </Button>
            </div>
          </div>

          <div className="max-w-sm">
            <Button fullWidth>Botón de ancho completo</Button>
          </div>
        </div>
      </Card>

      {/* INPUT */}

      <Card
        title="03. Input"
        description="Campos de texto y estados de validación."
        divided
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Input
            label="Input normal"
            placeholder="Ingresá un nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />

          <Input
            label="Campo obligatorio"
            placeholder="Nombre completo"
            required
          />

          <Input
            label="Correo electrónico"
            type="email"
            icon={Mail}
            placeholder="correo@ejemplo.com"
          />

          <Input
            label="Campo con error"
            defaultValue="correo@"
            error="Ingresá un correo válido."
          />

          <Input
            label="Campo deshabilitado"
            defaultValue="No editable"
            disabled
          />

          <Input
            label="Solo lectura"
            defaultValue="Información registrada"
            readOnly
          />

          <Input
            label="Campo con ayuda"
            placeholder="351 000 0000"
            helperText="Incluí el código de área."
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Ingresá una contraseña"
          />

          <Input label="Importe" type="number" placeholder="0.00" />

          <Input label="Fecha" type="date" />

          <Input label="Hora" type="time" />

          <Input
            label="Campo con icono"
            icon={Search}
            placeholder="Buscar información"
          />
        </div>
      </Card>

      {/* SELECT */}

      <Card title="04. Select" description="Selectores de opciones." divided>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Select
            label="Select normal"
            options={opcionesEstado}
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          />

          <Select
            label="Con placeholder"
            placeholder="Seleccioná una opción"
            options={opcionesEstado}
            defaultValue=""
          />

          <Select label="Campo obligatorio" options={opcionesEstado} required />

          <Select
            label="Select con error"
            placeholder="Seleccioná un estado"
            options={opcionesEstado}
            defaultValue=""
            error="Seleccioná una opción."
          />

          <Select
            label="Deshabilitado"
            options={opcionesEstado}
            defaultValue="activo"
            disabled
          />
        </div>
      </Card>

      {/* TEXTAREA */}

      <Card
        title="05. Textarea"
        description="Campos de texto multilínea."
        divided
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Textarea
            label="Textarea normal"
            placeholder="Ingresá observaciones..."
            rows={4}
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
          />

          <Textarea
            label="Con límite de caracteres"
            placeholder="Máximo 150 caracteres"
            maxLength={150}
            rows={4}
          />

          <Textarea
            label="Con error"
            error="Este campo es obligatorio."
            rows={3}
          />

          <Textarea
            label="Deshabilitado"
            defaultValue="Contenido no editable."
            rows={3}
            disabled
          />
        </div>
      </Card>

      {/* CHECKBOX Y SWITCH */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title="06. Checkbox"
          description="Selección individual y múltiple."
          divided
        >
          <div className="flex flex-col gap-5">
            <Checkbox
              label="Checkbox controlado"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />

            <Checkbox label="Sin seleccionar" />

            <Checkbox label="Seleccionado" defaultChecked />

            <Checkbox label="Indeterminado" indeterminate />

            <Checkbox label="Deshabilitado" disabled />

            <Checkbox label="Seleccionado deshabilitado" checked disabled />
          </div>
        </Card>

        <Card
          title="07. Switch"
          description="Activación y desactivación de opciones."
          divided
        >
          <div className="flex flex-col gap-5">
            <Switch
              label="Switch controlado"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />

            <Switch label="Activado" defaultChecked />

            <Switch label="Desactivado" />

            <Switch label="Deshabilitado" disabled />

            <Switch label="Activado deshabilitado" checked disabled />

            <Switch label="Tamaño small" size="sm" />
            <Switch label="Tamaño medium" size="md" />
            <Switch label="Tamaño large" size="lg" />
          </div>
        </Card>
      </div>

      {/* CARD */}

      <Card
        title="08. Card"
        description="Contenedores de información reutilizables."
        divided
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card title="Default" icon={Sparkles} variant="default">
              <p className="text-sm">Tarjeta predeterminada.</p>
            </Card>

            <Card title="Soft" icon={Sparkles} variant="soft">
              <p className="text-sm">Tarjeta con fondo suave.</p>
            </Card>

            <Card title="Outline" icon={Sparkles} variant="outline">
              <p className="text-sm">Tarjeta con borde primario.</p>
            </Card>

            <Card title="Primary" icon={Sparkles} variant="primary">
              <p className="text-sm">Tarjeta destacada.</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card title="Clientes" icon={Users}>
              <span className="text-3xl font-semibold text-primary">156</span>
            </Card>

            <Card title="Turnos" icon={CalendarDays}>
              <span className="text-3xl font-semibold text-primary">24</span>
            </Card>

            <Card title="Ingresos" icon={Wallet}>
              <span className="text-3xl font-semibold text-primary">
                $850.000
              </span>
            </Card>

            <Card title="Servicios" icon={Sparkles}>
              <span className="text-3xl font-semibold text-primary">18</span>
            </Card>
          </div>

          <Card
            title="Tarjeta completa"
            description="Encabezado, contenido, acciones y pie."
            divided
            actions={
              <Button
                variant="ghost"
                size="icon"
                icon={Pencil}
                aria-label="Editar tarjeta"
              />
            }
            footer={
              <>
                <Button variant="outline">Cancelar</Button>

                <Button onClick={() => toast.success("Cambios guardados")}>
                  Guardar
                </Button>
              </>
            }
          >
            <p className="text-sm text-text-secondary">
              Contenido dinámico de la tarjeta.
            </p>
          </Card>
        </div>
      </Card>

      {/* BADGE */}

      <Card
        title="09. Badge"
        description="Etiquetas para representar estados."
        divided
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success" dot>
              Activo
            </Badge>
            <Badge variant="neutral" dot>
              Inactivo
            </Badge>
            <Badge variant="warning" dot>
              Pendiente
            </Badge>
            <Badge variant="info" dot>
              Confirmado
            </Badge>
            <Badge variant="primary" dot>
              En curso
            </Badge>
            <Badge variant="danger" dot>
              Cancelado
            </Badge>
            <Badge variant="success" dot>
              Completado
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" outline>
              Primary
            </Badge>
            <Badge variant="secondary" outline>
              Secondary
            </Badge>
            <Badge variant="success" outline>
              Success
            </Badge>
            <Badge variant="warning" outline>
              Warning
            </Badge>
            <Badge variant="danger" outline>
              Danger
            </Badge>
            <Badge variant="info" outline>
              Info
            </Badge>
            <Badge variant="neutral" outline>
              Neutral
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge size="sm" variant="primary">
              Small
            </Badge>

            <Badge size="md" variant="primary">
              Medium
            </Badge>

            <Badge size="lg" variant="primary">
              Large
            </Badge>

            <Badge variant="primary" rounded={false}>
              Rectangular
            </Badge>

            <Badge variant="info" icon={Info}>
              Con icono
            </Badge>
          </div>
        </div>
      </Card>

      {/* SEARCH INPUT */}

      <Card
        title="10. SearchInput"
        description="Buscador reutilizable."
        divided
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SearchInput
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Buscar registros..."
          />

          <SearchInput
            value="Texto de ejemplo"
            onChange={(value) =>
              toast.info("Búsqueda", value || "Texto limpiado")
            }
          />

          <SearchInput
            value=""
            onChange={() => {}}
            placeholder="Buscador deshabilitado"
            disabled
          />
        </div>
      </Card>

      {/* TABLA, PANEL TABLA Y PAGINACION */}

      <PanelTabla
        title="11. Tabla, PanelTabla y Paginacion"
        description="Ejemplo funcional de un listado completo."
        actions={
          <>
            <Button
              variant="outline"
              icon={Download}
              onClick={() => toast.info("Exportación de demostración")}
            >
              Exportar
            </Button>

            <Button icon={Plus} onClick={() => setModalOpen(true)}>
              Nuevo registro
            </Button>
          </>
        }
        toolbar={
          <>
            <SearchInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              placeholder="Buscar registros..."
              className="max-w-sm"
            />

            <div className="w-full sm:w-48">
              <Select
                value={filtroTabla}
                options={[
                  { value: "todos", label: "Todos los estados" },
                  { value: "activo", label: "Activo" },
                  { value: "inactivo", label: "Inactivo" },
                ]}
                onChange={(event) => {
                  setFiltroTabla(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <Button variant="outline" icon={RotateCcw} onClick={limpiarFiltros}>
              Limpiar
            </Button>

            <Switch
              label="Simular carga"
              checked={loading}
              onChange={() => setLoading(!loading)}
            />
          </>
        }
        selectedCount={selectedRows.length}
        selectionActions={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRows([])}
            >
              Limpiar selección
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() =>
                toast.warning(
                  "Acción múltiple",
                  `${selectedRows.length} registros seleccionados.`,
                )
              }
            >
              Eliminar
            </Button>
          </>
        }
        footer={
          <Paginacion
            page={currentPage}
            pageSize={pageSize}
            totalRecords={registrosFiltrados.length}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            disabled={loading}
          />
        }
      >
        <Tabla
          columns={columns}
          data={registrosPaginados}
          rowKey={(registro) => registro.id}
          loading={loading}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          emptyMessage="No se encontraron registros"
          emptyDescription="Probá modificando los filtros."
        />
      </PanelTabla>

      {/* PESTAÑAS */}

      <Card
        title="12. Pestañas"
        description="Variantes de navegación interna."
        divided
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-text-secondary">Underline</span>

            <Pestañas variant="underline" items={tabs} />
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">Pills</span>

            <Pestañas variant="pills" items={tabs} />
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">Segmented</span>

            <Pestañas variant="segmented" items={tabs} fullWidth />
          </div>
        </div>
      </Card>

      {/* MODAL */}

      <Card
        title="13. Modal"
        description="Ventanas reutilizables con diferentes tamaños."
        divided
      >
        <div className="flex flex-wrap gap-3">
          {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => {
                setModalSize(size);
                setModalOpen(true);
              }}
            >
              Modal {size}
            </Button>
          ))}
        </div>
      </Card>

      {/* TOOLTIP */}

      <Card
        title="14. Tooltip"
        description="Información contextual sobre las acciones."
        divided
      >
        <div className="flex flex-wrap items-center justify-center gap-8 py-8">
          <Tooltip content="Tooltip superior" position="top">
            <Button variant="outline">Top</Button>
          </Tooltip>

          <Tooltip content="Tooltip inferior" position="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>

          <Tooltip content="Tooltip izquierdo" position="left">
            <Button variant="outline">Left</Button>
          </Tooltip>

          <Tooltip content="Tooltip derecho" position="right">
            <Button variant="outline">Right</Button>
          </Tooltip>
        </div>

        <div className="flex justify-center gap-3">
          <Tooltip content="Ver detalles">
            <Button
              variant="ghost"
              size="icon"
              icon={Eye}
              aria-label="Ver detalles"
            />
          </Tooltip>

          <Tooltip content="Editar registro">
            <Button
              variant="ghost"
              size="icon"
              icon={Pencil}
              aria-label="Editar registro"
            />
          </Tooltip>

          <Tooltip content="Eliminar registro">
            <Button
              variant="ghost"
              size="icon"
              icon={Trash2}
              aria-label="Eliminar registro"
            />
          </Tooltip>

          <Tooltip content="Información adicional">
            <Button
              variant="ghost"
              size="icon"
              icon={Info}
              aria-label="Información adicional"
            />
          </Tooltip>
        </div>
      </Card>

      {/* EMPTY STATE */}

      <Card
        title="15. EmptyState"
        description="Estados sin registros o resultados."
        divided
      >
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <EmptyState
            title="Sin registros"
            description="Todavía no hay información."
            icon={Inbox}
            size="sm"
            bordered
          />

          <EmptyState
            title="No hay clientes registrados"
            description="Comenzá registrando tu primer cliente."
            icon={Users}
            size="md"
            bordered
            actions={
              <Button icon={Plus} onClick={() => setModalOpen(true)}>
                Nuevo registro
              </Button>
            }
          />

          <EmptyState
            title="Sin resultados"
            description="Probá modificando los filtros."
            icon={SearchX}
            size="lg"
            bordered
            actions={
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            }
          />
        </div>
      </Card>

      {/* SKELETON */}

      <Card
        title="16. Skeleton"
        description="Componentes visuales durante la carga."
        divided
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-text-secondary">
              Variantes individuales
            </span>

            <Skeleton variant="text" width="70%" />

            <Skeleton variant="rectangular" width="100%" height={60} />

            <Skeleton variant="circular" width={60} height={60} />

            <Skeleton variant="rounded" width="100%" height={45} />
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">SkeletonText</span>

            <SkeletonText lines={4} />
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">SkeletonCard</span>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">SkeletonTable</span>

            <div className="overflow-x-auto rounded-card border border-border">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  <SkeletonTable rows={5} columns={4} selectable />
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">SkeletonForm</span>

            <SkeletonForm fields={6} columns={3} />
          </div>
        </div>
      </Card>

      {/* TOAST */}

      <Card
        title="17. Toast"
        description="Sistema global de notificaciones."
        divided
      >
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast.success(
                "Operación exitosa",
                "Los cambios se guardaron correctamente.",
              )
            }
          >
            Success
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              toast.error(
                "Ocurrió un error",
                "No se pudo completar la operación.",
              )
            }
          >
            Error
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast.warning("Advertencia", "Revisá la información ingresada.")
            }
          >
            Warning
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Información", "Tenés una nueva notificación.")
            }
          >
            Info
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.showToast({
                title: "Notificación permanente",
                description: "Cerrala manualmente.",
                variant: "info",
                duration: 0,
              })
            }
          >
            Permanente
          </Button>

          <Button variant="ghost" onClick={toast.clearToasts}>
            Limpiar todas
          </Button>
        </div>
      </Card>

      {/* FORMULARIO COMPLETO */}

      <Card
        title="18. Formulario completo"
        description="Ejemplo de integración de componentes en un formulario."
        divided
        footer={
          <>
            <Button variant="outline" onClick={restablecer}>
              Cancelar
            </Button>

            <Button icon={Save} type="submit" form="formulario-demo">
              Guardar registro
            </Button>
          </>
        }
      >
        <form
          id="formulario-demo"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();

            toast.success(
              "Formulario completado",
              "Los datos son únicamente de demostración.",
            );
          }}
        >
          <Input label="Nombre" required />
          <Input label="Apellido" required />
          <Input label="Documento" />
          <Input label="Teléfono" type="tel" />
          <Input label="Correo electrónico" type="email" />
          <Input label="Fecha de nacimiento" type="date" />

          <Select label="Estado" options={opcionesEstado} />

          <Input label="Domicilio" />
          <Input label="Localidad" />

          <div className="md:col-span-2 xl:col-span-3">
            <Textarea
              label="Observaciones"
              placeholder="Ingresá una observación..."
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-4 md:col-span-2 xl:col-span-3">
            <Checkbox label="Enviar notificaciones por correo" />
            <Checkbox label="Enviar recordatorios de turnos" />
            <Switch label="Registro activo" defaultChecked />
          </div>
        </form>
      </Card>

      {/* MODAL GLOBAL DE DEMOSTRACIÓN */}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Modal ${modalSize}`}
        description="Ejemplo de ventana reutilizable."
        icon={Users}
        size={modalSize}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>

            <Button
              icon={Save}
              onClick={() => {
                setModalOpen(false);

                toast.success(
                  "Modal confirmado",
                  "Operación realizada correctamente.",
                );
              }}
            >
              Guardar
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nombre" />
          <Input label="Apellido" />
          <Input label="Teléfono" type="tel" />
          <Input label="Correo electrónico" type="email" />

          <div className="sm:col-span-2">
            <Select label="Estado" options={opcionesEstado} />
          </div>

          <div className="sm:col-span-2">
            <Textarea label="Observaciones" rows={3} />
          </div>

          <div className="sm:col-span-2">
            <Switch label="Registro activo" defaultChecked />
          </div>
        </div>
      </Modal>

      {/* PIE DEL DESIGN SYSTEM */}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-5">
        <div>
          <p className="font-display text-xl text-primary">
            Gestia Design System
          </p>

          <p className="text-xs text-text-secondary">
            Biblioteca de componentes reutilizables.
          </p>
        </div>

        <span className="text-xs text-text-secondary">Versión 1.0</span>
      </footer>
    </PaginaModulo>
  );
}
