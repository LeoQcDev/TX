const getDriver = require("./setupDriver");
const { By, until } = require("selenium-webdriver");

(async function testObtenerPlanes() {
  const driver = await getDriver();

  try {
    console.log("Iniciando prueba de carga de planes...");

    // Tiempo de carga de la página
    console.time("Tiempo de carga de la página");
    await driver.get("http://localhost:3000/economia/plan_importacion");
    console.timeEnd("Tiempo de carga de la página");
    console.log("Página cargada correctamente.");

    // Espera a que aparezca el loader y luego verifica si desaparece
    console.time("Tiempo de espera para carga de datos");
    await driver.wait(until.elementLocated(By.css(".loading")), 5000);
    console.log("Loader encontrado. Esperando a que desaparezca...");

    // Espera hasta que el loader ya no sea visible
    await driver.wait(async () => {
      try {
        const loader = await driver.findElement(By.css(".loading"));
        return !(await loader.isDisplayed());
      } catch (error) {
        // El loader podría ser eliminado, lo que también es válido
        return true;
      }
    }, 10000);
    console.timeEnd("Tiempo de espera para carga de datos");
    console.log("Los datos han terminado de cargarse.");

    // Verifica que los datos de los planes se hayan renderizado
    console.time("Tiempo para verificar datos cargados");
    const planes = await driver.findElements(By.css(".plan-item"));
    console.timeEnd("Tiempo para verificar datos cargados");

    console.log(`Número de planes cargados: ${planes.length}`);

    if (planes.length === 0) {
      throw new Error("No se cargaron planes de importación");
    }

    console.log("Prueba exitosa: Los planes se cargaron correctamente.");
  } catch (error) {
    console.error("Error durante la prueba:", error.message);
  } finally {
    console.log("Finalizando prueba. Cerrando el navegador...");
    await driver.quit();
  }
})();
