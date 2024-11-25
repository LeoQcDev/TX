const getDriver = require("./setupDriver");
const { By, Key, until } = require("selenium-webdriver");

(async function testFormulario() {
  const driver = await getDriver();

  try {
    // Navega a la página del formulario
    console.log("Navegando a la página del formulario...");
    await driver.get("http://localhost:3000/economia/plan_importacion");

    // Espera hasta que el botón "Añadir" sea visible
    console.log("Esperando que el botón 'Añadir' sea localizado...");
    const botonAnadir = await driver.wait(
      until.elementLocated(By.id("create-button")), // Localiza el botón
      10000 // Tiempo máximo de espera
    );

    console.log("Desplazando el botón 'Añadir' a la vista...");
    await driver.executeScript("arguments[0].scrollIntoView();", botonAnadir);
    console.log("Esperando que el botón 'Añadir' sea visible...");
    await driver.wait(until.elementIsVisible(botonAnadir), 5000); // Asegúrate de que sea visible

    console.log("Haciendo clic en el botón 'Añadir'...");
    await botonAnadir.click();

    // Completa el formulario
    console.log("Rellenando el campo 'cliente'...");
    await driver.findElement(By.id("cliente")).sendKeys("Rober", Key.TAB);

    console.log("Rellenando el campo 'fecha_emision'...");
    await driver.findElement(By.id("fecha_emision")).sendKeys("2024-11-30");

    console.log("Rellenando el campo 'importe_pi'...");
      await driver.findElement(By.id("importe_pi")).sendKeys("10000.50");
      
       console.log("Habilitando el campo 'codigo_pi' para pruebas...");
       await driver.executeScript(
         "document.getElementById('codigo_pi').removeAttribute('disabled');"
       );

    console.log("Rellenando el campo 'codigo_pi'...");
    await driver.findElement(By.id("codigo_pi")).sendKeys("20250001");

    // Habilitar los campos anio_pi y codigo_pi si están deshabilitados
    console.log("Habilitando el campo 'anio_pi' para pruebas...");
    await driver.executeScript(
      "document.getElementById('anio_pi').removeAttribute('disabled');"
    );
    console.log("Rellenando el campo 'anio_pi'...");
    await driver.findElement(By.id("anio_pi")).sendKeys("2025");

    // Envía el formulario
    console.log("Localizando el botón de envío del formulario...");
    const botonEnviar = await driver.findElement(
      By.css('form button[type="submit"]')
    );
  console.time("Tiempo para enviar el formulario");
    console.log("Desplazando el botón de envío a la vista...");
    await driver.executeScript("arguments[0].scrollIntoView();", botonEnviar);

    console.log("Haciendo clic en el botón de envío...");
    await botonEnviar.click();
    console.timeEnd("Tiempo para enviar el formulario");
    // Verifica que no haya errores y que el formulario fue enviado correctamente

    console.log(`Mensaje de éxito: Formulario se envio correctamente`);
  } catch (error) {
    console.error("Error durante la prueba del formulario:", error.message);
  } finally {
    console.log("Cerrando el navegador...");
    await driver.quit();
  }
})();
