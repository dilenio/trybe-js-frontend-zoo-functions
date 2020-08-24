/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
const { prices } = require('./data');

function animalsByIds(...ids) {
  return data.animals
    .filter(element => ids
      .includes(element.id));
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(element => element.name === animal).residents
    .every(element => element.age >= age);
}

function employeeByName(employeeName) {
  const employee = data.employees
    .filter(emp => emp.firstName === employeeName || emp.lastName === employeeName)[0];
  return (employee !== undefined ? employee : {});
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.flatMap(employee => employee.managers)
    .some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let response = {};
  if (!species) {
    data.animals.forEach((element) => {
      const { name, residents } = element;
      response[name] = residents.length;
    });
  } else {
    response = data.animals
      .find(element => element.name === species)
      .residents.length;
  }
  return response;
}

function entryCalculator(entrants) {
  let totalAdult = 0;
  let totalSenior = 0;
  let totalChild = 0;
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  if (entrants.Adult) {
    totalAdult = entrants.Adult * data.prices.Adult;
  }
  if (entrants.Senior) {
    totalSenior = entrants.Senior * data.prices.Senior;
  }
  if (entrants.Child) {
    totalChild = entrants.Child * data.prices.Child;
  }
  return (totalAdult + totalSenior + totalChild);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  Object.entries(data.prices).forEach((entrance) => {
    data.prices[entrance[0]] = Math.ceil(entrance[1] * (1 + (percentage / 100)) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {

}


module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
