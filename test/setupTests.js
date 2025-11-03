// setupTests.js
import "@testing-library/jest-dom";
//Por qué se necesita “setup” (configuración previa)

//Los tests se ejecutan en entornos aislados (Vitest crea un sandbox virtual para cada archivo).
//Entonces, si no le dices explícitamente “usa jest-dom antes de ejecutar los tests”, esos matchers no estarán definidos → de ahí el error que te salió:

//❌ Invalid Chai property: toBeInTheDocument
