const apiUrl = "http://localhost/RSP_Laboratorio/server.php";
const $ = (id) => document.getElementById(id);

let vehicles = [];

const addTable = () => {
  const headers = $("header");
  headers.innerHTML = "";

  const selectedInputs = [...inputsDefault, ...inputsAereo, ...inputsTerrestre, ...inputsActions];
  selectedInputs.forEach((header) => {
    const th = document.createElement("th");
    th.id = `header-${header.id}`;
    th.textContent = header.name;
    headers.appendChild(th);
  });
};

const createRow = (item) => {
  const tr = document.createElement("tr");
  const inputsDefault = ["id", "modelo", "anoFab", "velMax"];
  const inputsAereo = ["altMax", "autonomia"];
  const inputsTerrestre = ["cantPue", "cantRue"];
  const inputsActions = ["edit", "delete"];
  const allInputs = [...inputsDefault, ...inputsAereo, ...inputsTerrestre, ...inputsActions];

  allInputs.forEach((header) => {
    const td = document.createElement("td");
    td.id = `cell-${header}`;

    if (header === "edit" || header === "delete") {
      const btn = document.createElement("button");
      btn.id = `btn-${header}`;
      btn.textContent = header === "edit" ? "Edit" : "Delete";
      td.appendChild(btn);
    } else {
      if (header in item) {
        td.textContent = item[header];
      }
    }
    tr.appendChild(td);
  });

  return tr;
};






const uploadDataTable = (data) => {
  const tbody = $("table-body");
  tbody.innerHTML = "";
  data.forEach((item) => {
    tbody.appendChild(createRow(item));
  });
};

const hideForm = (toHide, toShow) => {
  const formToHide = $(toHide);
  const formToShow = $(toShow);

  formToHide.style.display = "none";
  formToShow.style.display = "flex";
};

const showAbmForm = (toShow, toHide) => {
  const formsToShow = $(toShow);
  const formToHide = $(toHide);
  formsToShow.style.display = "flex";
  formToHide.style.display = "none";
  const btnCancel = $("btn-cancel");
  const btnAccept = $("btn-accept");
  btnCancel.disabled = false;
  btnAccept.disabled = false;
};

const handleDataFormSubmit = (e) => {
  e.preventDefault();
  showAbmForm("form-amb-container", "form-data-container");
  createFormAbm();
};

const createFormAbm = (initialValues) => {
  addInputByDefault(initialValues);
  addInputByTypeVehicle(initialValues);
};

const createInputField = (name, type) => {
  const inputField = document.createElement("div");
  inputField.id = "input-field";

  const label = document.createElement("label");
  label.textContent = `${name}:`;
  label.setAttribute("for", `input-${name}`);

  const input = document.createElement("input");
  input.placeholder = `Ingrese ${name}`;
  input.type = type;
  input.id = `input-${name}`;
  input.required = true;

  inputField.appendChild(label);
  inputField.appendChild(input);

  return inputField;
};

const addInputByDefault = (initialValues) => {
  const inputsContainer = $("default-inputs-container");
  inputsContainer.innerHTML = "";

  const vehicleIdInput = createInputField("id", "number");
  const vehicleModelInput = createInputField("modelo", "text");
  const vehicleYearInput = createInputField("anoFab", "number");
  const vehicleVelMaxInput = createInputField("velMax", "number");

  const idInput = vehicleIdInput.querySelector("input");
  const modelInput = vehicleModelInput.querySelector("input");
  const yearInput = vehicleYearInput.querySelector("input");
  const velMaxInput = vehicleVelMaxInput.querySelector("input");

  idInput.id = "input-id";
  modelInput.id = "input-modelo";
  yearInput.id = "input-anoFab";
  velMaxInput.id = "input-velMax";

  idInput.value = initialValues ? initialValues.id : "";
  modelInput.value = initialValues ? initialValues.modelo : "";
  yearInput.value = initialValues ? initialValues.anoFab : "";
  velMaxInput.value = initialValues ? initialValues.velMax : "";

  idInput.disabled = true;

  inputsContainer.appendChild(vehicleIdInput);
  inputsContainer.appendChild(vehicleModelInput);
  inputsContainer.appendChild(vehicleYearInput);
  inputsContainer.appendChild(vehicleVelMaxInput);
  
  const selectTypeOfVehicle = $("dll-type-vehicle");

  if (initialValues !== undefined) {
    // Aquí se verifica si los initialValues corresponden a un tipo de vehículo específico, ajusta esto según tus clases de vehículos
    selectTypeOfVehicle.value = initialValues instanceof Aereo ? "aereo" : "terrestre";
    selectTypeOfVehicle.disabled = true;
  } else {
    selectTypeOfVehicle.disabled = false;
  }
};



const addInputByTypeVehicle = (initialValues) => {
  const inputsContainer = $("dynamic-inputs-container");
  inputsContainer.innerHTML = "";

  const vehicleTypeField = $("dll-type-vehicle");
  const selectedInputs = vehicleTypeField.value === "aereo" ? inputsAereo : inputsTerrestre;

  selectedInputs.forEach((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    
    if (initialValues) {
      if (input.id in initialValues) {
        inputElement.value = initialValues[input.id];

        if (input.type === "number") {
          inputElement.setAttribute("min", input.min);
        }
      }
    }

    inputsContainer.appendChild(inputContainer);
  });
};


const addVehicle = (item) => {
  let vehicleObject;

  if ("altMax" in item && "autonomia" in item) {
    vehicleObject = new Aereo(
      item.id,
      item.marca,
      item.modelo,
      item.anoFab,
      item.velMax,
      item.altMax,
      item.autonomia
    );
  } else if ("cantPue" in item && "cantRue" in item) {
    vehicleObject = new Terrestre(
      item.id,
      item.marca,
      item.modelo,
      item.anoFab,
      item.velMax,
      item.cantPue,
      item.cantRue
    );
  } else {
    vehicleObject = new Vehiculo(
      item.id,
      item.marca,
      item.modelo,
      item.anoFab,
      item.velMax
    );
  }

  vehicles.push(vehicleObject);
  uploadDataTable(vehicles); // Actualizar la tabla después de agregar un vehículo
};


const editVehicle = (vehicleEdited) => {
  const vehicleId = parseInt(vehicleEdited.id);
  const vehicleToUpdate = vehicles.find(
    (vehicle) => vehicle.id.toString() === vehicleId.toString()
  );

  if (vehicleToUpdate) {
    vehicleToUpdate.update(vehicleEdited);
    uploadDataTable(vehicles);
  }
};

const deleteVehicle = (id) => {
  const vehicleId = parseInt(id);
  vehicles = vehicles.filter((vehicle) => vehicle.id.toString() !== vehicleId.toString());

  if (vehicles) {
    uploadDataTable(vehicles);
  }
};


const getFormDataAsObject = (formData) => {
  const data = formData.querySelectorAll("input");
  const dataArray = Array.from(data).map((value) => ({
    [value.id.replace("input-", "")]: value.value,
  }));

  return dataArray.reduce((acc, value) => ({ ...acc, ...value }), {});
};

const handleAbmFormSubmit = (e) => {
  e.preventDefault();
  const vehicle = getFormDataAsObject(e.target);
  const btnCancel = $("btn-cancel");
  const btnAccept = $("btn-accept");
  btnCancel.disabled = true;
  btnAccept.disabled = true;
  if (vehicle.id === undefined || vehicle.id === null || vehicle.id === '') {
    put(vehicle);
  } else {
    post(vehicle);
  }
  e.stopPropagation();
};


const post = (data) => {
  document.getElementById('spinner').style.display = 'flex';
  const dataToSend = data;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
    .then(response => {
      document.getElementById('spinner').style.display = 'none';
      showAbmForm("form-data-container", "form-amb-container");

      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }

      editVehicle(dataToSend);
    })
    .catch(error => {
      alert(error);
    });
}

toggleButtonsDisabled = (disabled) => {
  const dataForm = document.getElementById("form-data-container");
  const buttons = dataForm.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

async function deleteData(id) {
  document.getElementById('spinner').style.display = 'flex';
  toggleButtonsDisabled(true);

  const datosEliminar = id
  try {
    const respuesta = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: datosEliminar})
    });
    document.getElementById('spinner').style.display = 'none';
    toggleButtonsDisabled(false);

    if (!respuesta.ok) {
      throw new Error(`Error de red: ${respuesta.status}`);
    }
    deleteVehicle(id)
  } catch (error) {
    alert(error)
  }
}

const put = async (vehicle) => {
  document.getElementById('spinner').style.display = 'flex';

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicle)
    });

    document.getElementById('spinner').style.display = 'none';

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    const data = await response.json();
    vehicle.id = data.id;
    console.log(vehicle);
    addVehicle(vehicle);
    showAbmForm("form-data-container", "form-amb-container");
  } catch (error) {
    alert('Error durante la actualización:', error);
  }
};



const handleEdit = (e) => {
  const row = e.target.closest("tr");
  e.preventDefault();

  if (row) {
    const cellIdElement = row.querySelector("td[id='cell-id']");

    if (cellIdElement) {
      const id = parseInt(cellIdElement.textContent);
      const vehicleToEdit = vehicles.find(vehicle => vehicle.id === id);

      if (!vehicleToEdit) {
        alert('Vehículo no encontrado para editar');
        return;
      }

      showAbmForm("form-amb-container", "form-data-container");
      createFormAbm(vehicleToEdit);
    }
  }
  e.stopPropagation();
};


const handleDelete = (e) => {
  const row = e.target.closest("tr");
  e.preventDefault();

    if (row) {
      const cellIdElement = row.querySelector("td[id='cell-id']");

      if (cellIdElement) {
        const id = cellIdElement.textContent;
        deleteData(id);
      }
    }
  e.stopPropagation();
}

const onClickOnAction = () => {

  const table = $("data-table");

  table.addEventListener("click", (e) => {
  e.preventDefault();

    const clickedButton = document.querySelector('button:focus');
    const buttonId = clickedButton.id; 

    switch (buttonId) {
      case "btn-edit":
        handleEdit(e);
        break;
      case "btn-delete":
        handleDelete(e);
        break;
    }
  e.stopPropagation();

  });
};

const xhttp = new XMLHttpRequest(); // Instancio el objeto
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4) {
    if (xhttp.status == 200) {
      const data = JSON.parse(xhttp.responseText);
      vehicles = data.map((item) => {
        if ("altMax" in item && "autonomia" in item) {
          return new Aereo(
            item.id,
            item.modelo,
            item.anoFab,
            item.velMax,
            item.altMax,
            item.autonomia
          );
        } else if ("cantPue" in item && "cantRue" in item) {
          return new Terrestre(
            item.id,
            item.modelo,
            item.anoFab,
            item.velMax,
            item.cantPue,
            item.cantRue
          );
        }
        return null; // Si no se encuentra un tipo válido de vehículo, se devuelve null
      }).filter(vehicle => vehicle !== null);
      

      console.log(vehicles);
      document.getElementById('spinner').style.display = 'none';
      showAbmForm("form-data-container", "form-amb-container");
      addTable();
      uploadDataTable(vehicles);

      const btnAdd = $("btn_add");
      btnAdd.addEventListener("click", (e) => handleDataFormSubmit(e));

      onClickOnAction();

      const abmForm = $("form-amb-container");
      abmForm.addEventListener("submit", (e) => handleAbmFormSubmit(e));

      $("dll-type-vehicle").addEventListener("click", () => {
        addInputByTypeVehicle();
      });

      const btnCancel = $("btn-cancel");
      btnCancel.addEventListener("click", () => showAbmForm("form-data-container", "form-amb-container"));
    } else {
      alert('Error al obtener los datos');
    }
  }
};
xhttp.open("GET", apiUrl, true);
xhttp.setRequestHeader("encabezado", "valor");
xhttp.send();
