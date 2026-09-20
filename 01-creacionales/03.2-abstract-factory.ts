/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * !Instrucciones:
 	1.Completen las Clases de Productos:
    •	ElectricCar debe implementar Vehicle y mostrar el mensaje "Ensamblando un auto eléctrico".
    •	GasCar debe implementar Vehicle y mostrar el mensaje "Ensamblando un auto de combustión".
    •	ElectricEngine debe implementar Engine y mostrar el mensaje "Arrancando motor eléctrico".
    •	GasEngine debe implementar Engine y mostrar el mensaje "Arrancando motor de combustión".

	2.	Completen las Clases de Fábricas:
    •	ElectricVehicleFactory debe crear un ElectricCar y un ElectricEngine.
    •	GasVehicleFactory debe crear un GasCar y un GasEngine.

	3. Prueben el Código:
	  •	Ejecuten el código para asegurarse de que cada fábrica produce el tipo correcto de vehículo y motor.

 */
// 1. Interfaces de Vehicle y Engine

interface Vehicule {
  ensemble(): void;
}

interface Engine {
  start(): void;
}

// 2. Clases Concretas de Productos

class ElectricCar implements Vehicule {
  ensemble(): void {
    console.log("Ensamblando un auto eléctrico");
  }
}

class GasCar implements Vehicule {
  ensemble(): void {
    console.log("Ensamblando un auto de combustión");
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log("Arrancando motor eléctrico");
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log("Arrancando motor de combustión");
  }
}


// 3. Interfaz de la Fábrica Abstracta

interface VehiculeFactory {
  createVehicule(): Vehicule;
  createEngine(): Engine;
}

// 4. Clases Concretas de Fábricas

class ElectricVehiculeFactory implements VehiculeFactory {
  createVehicule(): Vehicule {
    return new ElectricCar();
  }
  createEngine(): Engine {
    return new ElectricEngine();
  }
}

class GasVehiculeFactory implements VehiculeFactory {
  createVehicule(): Vehicule {
    return new GasCar();
  }
  createEngine(): Engine {
    return new GasEngine();
  }
}

// 5. Código Cliente
function main(factory: VehiculeFactory) {
  const vehicle = factory.createVehicule();
  const engine = factory.createEngine();

  vehicle.ensemble();
  engine.start();
}

console.log('\n%cVehiculo eléctrico:', COLORS.green);
main(new ElectricVehiculeFactory());

console.log('\n\n%cVehiculo de combustión:', COLORS.green);
main(new GasVehiculeFactory());
// Pruebas

