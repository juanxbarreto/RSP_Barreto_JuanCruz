// Inputs por defecto para la clase Vehiculo
const inputsDefault = [
    { name: "Id", id: "id", type: "number"},
    { name: "Modelo", id: "modelo", type: "text" },
    { name: "Año de Fabricación", id: "anoFab", type: "number", min: 1885 },
    { name: "Velocidad Máxima", id: "velMax", type: "number", min: 0 },
  ];
  
  // Inputs para la clase Aereo
  const inputsAereo = [
    { name: "Altura Máxima", id: "altMax", type: "number", min: 0 },
    { name: "Autonomía", id: "autonomia", type: "number", min: 0 },
  ];
  
  // Inputs para la clase Terrestre
  const inputsTerrestre = [
    { name: "Cantidad de Pasajeros", id: "cantPue", type: "number", min: -1 },
    { name: "Cantidad de Ruedas", id: "cantRue", type: "number", min: 0 },
  ];
  
  // Acciones para los vehículos
  const inputsActions = [
    { name: "Modificar", id: "edit"},
    { name: "Eliminar", id: "delete"},
  ];
  
  // Header para las acciones
  const headerActions = [
    { name: "Acciones", id: "actions"},
  ];
  