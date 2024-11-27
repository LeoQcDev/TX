// validations.js

const zipCodes = {
  // Pinar del Rio
  24150: { municipio: "Sandino", provincia: "Pinar del Rio" },
  22200: { municipio: "Mantua", provincia: "Pinar del Rio" },
  22300: { municipio: "Minas de Matahambre", provincia: "Pinar del Rio" },
  22400: { municipio: "Viñales", provincia: "Pinar del Rio" },
  22600: { municipio: "La Palma", provincia: "Pinar del Rio" },
  22600: { municipio: "Bahía Honda", provincia: "Pinar del Rio" },
  22700: { municipio: "Candelaria", provincia: "Pinar del Rio" },
  22800: { municipio: "San Cristóbal", provincia: "Pinar del Rio" },
  22900: { municipio: "Los Palacios", provincia: "Pinar del Rio" },
  23000: { municipio: "Consolación del Sur", provincia: "Pinar del Rio" },
  20100: { municipio: "Pinar del Rio", provincia: "Pinar del Rio" },
  23100: { municipio: "San Luis", provincia: "Pinar del Rio" },
  23200: { municipio: "San Juan y Martínez", provincia: "Pinar del Rio" },
  23300: { municipio: "Guane", provincia: "Pinar del Rio" },

  // La Habana
  11300: { municipio: "Playa", provincia: "La Habana" },
  10400: { municipio: "Plaza de la Revolución", provincia: "La Habana" },
  10200: { municipio: "Centro Habana", provincia: "La Habana" },
  10100: { municipio: "La Habana Vieja", provincia: "La Habana" },
  11200: { municipio: "Regla", provincia: "La Habana" },
  10900: { municipio: "La Habana del Este", provincia: "La Habana" },
  11100: { municipio: "Guanabacoa", provincia: "La Habana" },
  11000: { municipio: "San Miguel del Padrón", provincia: "La Habana" },
  10700: { municipio: "10 de Octubre", provincia: "La Habana" },
  10500: { municipio: "10 de Octubre", provincia: "La Habana" },
  10600: { municipio: "Cerro", provincia: "La Habana" },
  11500: { municipio: "Mariano", provincia: "La Habana" },
  17100: { municipio: "La Lisa", provincia: "La Habana" },
  10800: { municipio: "Boyeros", provincia: "La Habana" },
  10900: { municipio: "Arroyo Naranjo", provincia: "La Habana" },
  14000: { municipio: "Cotorro", provincia: "La Habana" },

  // Mayabeque
  33400: { municipio: "Batabanó", provincia: "Mayabeque" },
  32600: { municipio: "Bejucal", provincia: "Mayabeque" },
  33900: { municipio: "Guines", provincia: "Mayabeque" },
  32800: { municipio: "Jaruco", provincia: "Mayabeque" },
  33000: { municipio: "Madruga", provincia: "Mayabeque" },
  33300: { municipio: "Melena del Sur", provincia: "Mayabeque" },
  33100: { municipio: "Nueva Paz", provincia: "Mayabeque" },
  33500: { municipio: "Quivicán", provincia: "Mayabeque" },
  32700: { municipio: "San José de las Lajas", provincia: "Mayabeque" },
  33200: { municipio: "San Nicolás", provincia: "Mayabeque" },
  32900: { municipio: "Santa Cruz del Norte", provincia: "Mayabeque" },

  // Artemisa
  33700: { municipio: "Alquízar", provincia: "Artemisa" },
  33800: { municipio: "Artemisa", provincia: "Artemisa" },
  22600: { municipio: "Bahía Honda", provincia: "Artemisa" },
  32400: { municipio: "Bauta", provincia: "Artemisa" },
  32300: { municipio: "Caimito", provincia: "Artemisa" },
  22700: { municipio: "Candelaria", provincia: "Artemisa" },
  32200: { municipio: "Guanajay", provincia: "Artemisa" },
  33600: { municipio: "Güira de Melena", provincia: "Artemisa" },
  32100: { municipio: "Mariel", provincia: "Artemisa" },
  32500: { municipio: "San Antonio de los Baños", provincia: "Artemisa" },
  22800: { municipio: "San Cristóbal", provincia: "Artemisa" },

  // Matanzas
  40100: { municipio: "Matanzas", provincia: "Matanzas" },
  42110: { municipio: "Cárdenas", provincia: "Matanzas" },
  42200: { municipio: "Varadero", provincia: "Matanzas" },
  42300: { municipio: "Martí", provincia: "Matanzas" },
  42400: { municipio: "Colón", provincia: "Matanzas" },
  42500: { municipio: "Perico", provincia: "Matanzas" },
  42600: { municipio: "Jovellanos", provincia: "Matanzas" },
  42700: { municipio: "Pedro Betancourt", provincia: "Matanzas" },
  42800: { municipio: "Limonar", provincia: "Matanzas" },
  42900: { municipio: "Unión de Reyes", provincia: "Matanzas" },
  43000: { municipio: "Ciénaga de Zapata", provincia: "Matanzas" },
  43100: { municipio: "Jagüey Grande", provincia: "Matanzas" },
  43200: { municipio: "Calimete", provincia: "Matanzas" },
  43300: { municipio: "Los Arabos", provincia: "Matanzas" },

  // Cienfuegos
  57100: { municipio: "Aguada de Pasajeros", provincia: "Cienfuegos" },
  57200: { municipio: "Rodas", provincia: "Cienfuegos" },
  57300: { municipio: "Palmira", provincia: "Cienfuegos" },
  57400: { municipio: "Lajas", provincia: "Cienfuegos" },
  57500: { municipio: "Cruces", provincia: "Cienfuegos" },
  57600: { municipio: "Cumanayagua", provincia: "Cienfuegos" },
  55100: { municipio: "Cienfuegos", provincia: "Cienfuegos" },
  57700: { municipio: "Abreus", provincia: "Cienfuegos" },

  // Villa Clara
  50200: { municipio: "Caibarién", provincia: "Villa Clara" },
  50300: { municipio: "Camajuaní", provincia: "Villa Clara" },
  50400: { municipio: "Cifuentes", provincia: "Villa Clara" },
  50500: { municipio: "Corralillo", provincia: "Villa Clara" },
  50100: { municipio: "Encrucijada", provincia: "Villa Clara" },
  50600: { municipio: "Manicaragua", provincia: "Villa Clara" },
  50700: { municipio: "Placetas", provincia: "Villa Clara" },
  50800: { municipio: "Quemado de Güines", provincia: "Villa Clara" },
  50900: { municipio: "Ranchuelo", provincia: "Villa Clara" },
  51000: { municipio: "Sagua la Grande", provincia: "Villa Clara" },
  51100: { municipio: "Santa Clara", provincia: "Villa Clara" },
  51200: { municipio: "Santo Domingo", provincia: "Villa Clara" },
  51300: { municipio: "Remedios", provincia: "Villa Clara" },

  // Sancti Spiritus
  62410: { municipio: "Cabaiguán", provincia: "Sancti Spiritus" },
  62500: { municipio: "Fomento", provincia: "Sancti Spiritus" },
  62200: { municipio: "Jatibonico", provincia: "Sancti Spiritus" },
  62700: { municipio: "La Sierpe", provincia: "Sancti Spiritus" },
  60100: { municipio: "Sancti Spiritus", provincia: "Sancti Spiritus" },
  62300: { municipio: "Taguasco", provincia: "Sancti Spiritus" },
  62600: { municipio: "Trinidad", provincia: "Sancti Spiritus" },
  62100: { municipio: "Yaguajay", provincia: "Sancti Spiritus" },

  // Ciego de Ávila
  67100: { municipio: "Chambas", provincia: "Ciego de Ávila" },
  67210: { municipio: "Morón", provincia: "Ciego de Ávila" },
  67300: { municipio: "Bolivia", provincia: "Ciego de Ávila" },
  67400: { municipio: "Primero de Enero", provincia: "Ciego de Ávila" },
  67500: { municipio: "Ciro Redondo", provincia: "Ciego de Ávila" },
  67600: { municipio: "Florencia", provincia: "Ciego de Ávila" },
  67700: { municipio: "Majagua", provincia: "Ciego de Ávila" },
  65100: { municipio: "Ciego de Ávila", provincia: "Ciego de Ávila" },
  67800: { municipio: "Venezuela", provincia: "Ciego de Ávila" },

  // Camagüey
  73300: { municipio: "Carlos Manuel de Céspedes", provincia: "Camagüey" },
  73400: { municipio: "Esmeralda", provincia: "Camagüey" },
  73200: { municipio: "Florida", provincia: "Camagüey" },
  73500: { municipio: "Guáimaro", provincia: "Camagüey" },
  73600: { municipio: "Minas", provincia: "Camagüey" },
  70100: { municipio: "Camagüey", provincia: "Camagüey" },
  73800: { municipio: "Najasa", provincia: "Camagüey" },
  73100: { municipio: "Nuevitas", provincia: "Camagüey" },
  73900: { municipio: "Santa Cruz del Sur", provincia: "Camagüey" },
  73700: { municipio: "Sibanicú", provincia: "Camagüey" },
  73000: { municipio: "Sierra de Cubitas", provincia: "Camagüey" },
  74000: { municipio: "Vertientes", provincia: "Camagüey" },

  // Las Tunas
  77400: { municipio: "Amancio", provincia: "Las Tunas" },
  77500: { municipio: "Colombia", provincia: "Las Tunas" },
  77300: { municipio: "Jesús Menéndez", provincia: "Las Tunas" },
  77200: { municipio: "Majibacoa", provincia: "Las Tunas" },
  75100: { municipio: "Las Tunas", provincia: "Las Tunas" },
  77100: { municipio: "Manatí", provincia: "Las Tunas" },
  77600: { municipio: "Jobabo", provincia: "Las Tunas" },
  77000: { municipio: "Puerto Padre", provincia: "Las Tunas" },

  // Holguín
  82500: { municipio: "Antilla", provincia: "Holguín" },
  82600: { municipio: "Báguanos", provincia: "Holguín" },
  82700: { municipio: "Banes", provincia: "Holguín" },
  82800: { municipio: "Cacocum", provincia: "Holguín" },
  82900: { municipio: "Calixto García", provincia: "Holguín" },
  82100: { municipio: "Cueto", provincia: "Holguín" },
  82300: { municipio: "Frank País", provincia: "Holguín" },
  80100: { municipio: "Holguín", provincia: "Holguín" },
  82200: { municipio: "Moa", provincia: "Holguín" },
  82400: { municipio: "Mayarí", provincia: "Holguín" },
  83000: { municipio: "Gibara", provincia: "Holguín" },
  83100: { municipio: "Rafael Freyre", provincia: "Holguín" },

  // Granma
  85200: { municipio: "Bartolomé Masó", provincia: "Granma" },
  85100: { municipio: "Bayamo", provincia: "Granma" },
  85300: { municipio: "Buey Arriba", provincia: "Granma" },
  85400: { municipio: "Campechuela", provincia: "Granma" },
  85500: { municipio: "Cauto Cristo", provincia: "Granma" },
  85600: { municipio: "Guisa", provincia: "Granma" },
  85700: { municipio: "Jiguaní", provincia: "Granma" },
  85800: { municipio: "Manzanillo", provincia: "Granma" },
  85900: { municipio: "Media Luna", provincia: "Granma" },
  86000: { municipio: "Niquero", provincia: "Granma" },
  86100: { municipio: "Pilón", provincia: "Granma" },
  86200: { municipio: "Río Cauto", provincia: "Granma" },
  86300: { municipio: "Yara", provincia: "Granma" },

  // Santiago de Cuba
  93100: { municipio: "Contramaestre", provincia: "Santiago de Cuba" },
  93200: { municipio: "Guamá", provincia: "Santiago de Cuba" },
  91100: { municipio: "Santiago de Cuba", provincia: "Santiago de Cuba" },
  93300: { municipio: "Mella", provincia: "Santiago de Cuba" },
  93400: { municipio: "Palma Soriano", provincia: "Santiago de Cuba" },
  93500: { municipio: "San Luis", provincia: "Santiago de Cuba" },
  93600: { municipio: "Segundo Frente", provincia: "Santiago de Cuba" },
  93700: { municipio: "Songo-La Maya", provincia: "Santiago de Cuba" },
  93800: { municipio: "Tercer Frente", provincia: "Santiago de Cuba" },

  // Guantánamo
  95100: { municipio: "Baracoa", provincia: "Guantánamo" },
  95200: { municipio: "Caimanera", provincia: "Guantánamo" },
  95300: { municipio: "El Salvador", provincia: "Guantánamo" },
  95400: { municipio: "Guantánamo", provincia: "Guantánamo" },
  95500: { municipio: "Imías", provincia: "Guantánamo" },
  95600: { municipio: "Maisí", provincia: "Guantánamo" },
  95700: { municipio: "Manuel Tames", provincia: "Guantánamo" },
  95800: { municipio: "Niceto Pérez", provincia: "Guantánamo" },
  95900: { municipio: "San Antonio del Sur", provincia: "Guantánamo" },
  96000: { municipio: "Yateras", provincia: "Guantánamo" },
};

export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
  if (!regex.test(email)) {
    return "Formato de correo no válido (ej. ejemplo@dominio.com)";
  }
  return null; // El correo es válido
}

export function validatePhone(phone) {
  const regex = /^\+53\s\d{8}$/;
  if (phone.trim() === "") {
    return true;
  }
  if (!regex.test(phone)) {
    return "Formato no válido (ej. +53 XXXXXXXX)";
  }
  return null; // El teléfono es válido
}

export function validateClientCode(customerCode) {
  const regex = /^\d{5}$/;
  if (!regex.test(customerCode) || customerCode.length > 5) {
    return "El código del cliente debe ser exactamente de 5 dígitos";
  }
  return null; // El código del cliente es válido
}

export function validateContractNumber(contractNumber) {
  const regex = /^TX-\d{5}$/;
  if (!regex.test(contractNumber)) {
    return "Formato no válido (ej. TX-00000)";
  }
  return null; // El número de contrato es válido
}

export function validateDate(date) {
  const today = new Date().toISOString().split("T")[0];
  const selectedDate = new Date(date).toISOString().split("T")[0];
  if (today > selectedDate) {
    return `Por favor, seleccione una fecha igual o posterior a ${today}`;
  }
  return null;
}

export function validateZipCode(zipCode, setValue) {
  const locationData = zipCodes[zipCode];
  if (locationData) {
    // Actualizar los campos de municipio y provincia si el código postal es válido
    setValue("municipality", locationData.municipio);
    setValue("province", locationData.provincia);
    return true; // Valido
  } else {
    // Limpiar los campos si el código postal es inválido
    setValue("municipality", "");
    setValue("province", "");
    return "Código postal no válido";
  }
}

export function validateUrl(url) {
  // El TLD puede tener entre 2 y 63 caracteres
  const regex =
    /^(https?:\/\/)(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}(:\d+)?(\/[^\s]*)?$/;
  if (url.trim() === "") {
    return true;
  }
  if (!regex.test(url)) {
    return "Formato no válido (ej. https://www.ejemplo.com)";
  }
  return null; // La URL es válida
}

export function validateNipCode(nipCode) {
  const regex = /^\d{9}$/;
  if (!regex.test(nipCode) || nipCode.length > 9) {
    return "El código NIP debe ser exactamente de 9 dígitos";
  }
  return null;
}

export function validateReeupCode(reeupCode) {
  const regex = /^\d{6}$/;
  if (!regex.test(reeupCode) || reeupCode.length > 6) {
    return "El código REEUP debe ser exactamente de 6 dígitos";
  }
  return null;
}

export function validateCommercialRegistry(commercialRegistry) {
  const regex = /^\d{7}$/;
  if (!regex.test(commercialRegistry) || commercialRegistry.length > 7) {
    return "El código de registro mercantil debe ser exactamente de 7 dígitos";
  }
  return null;
}

export function validateEmptyString(text) {
  if (text.trim() === "") {
    return null;
  } else {
    return text;
  }
}

export const validateNumero711 = (value) => {
  if (!value) return "El número 711 es requerido";
  if (!/^[0-9]+\/OC$/.test(value)) {
    return "El formato debe ser números seguidos de /OC";
  }
  return true;
};

export const validatePresentador = (value) => {
  if (!value?.trim()) return "El presentador es requerido";
  if (value.trim().length < 2) {
    return "El presentador debe tener al menos 2 caracteres";
  }
  return true;
};
export const validateGrupo = (value) => {
  if (!value?.trim()) return "El grupo es requerido";
  if (value.trim().length < 2) {
    return "El grupo debe tener al menos 2 caracteres";
  }
  return true;
};
export const validateTipoPedido = (value) => {
  if (!value?.trim()) return "El tipo de pedido es requerido";
  if (value.trim().length < 2) {
    return "El tipo de pedido debe tener al menos 2 caracteres";
  }
  return true;
};
export const validateCliente = (value) => {
  if (!value) return "El cliente es requerido";
  return true;
};
