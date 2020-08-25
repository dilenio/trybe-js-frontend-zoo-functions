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
const { employees } = require('./data');

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

}

const changeAmPm = hour => (hour > 12 ? `${hour - 12}pm` : `${hour}am`);

const changeHourMessage = (day, object) => {
  const { open, close } = data.hours[day];
  if (open === 0 && close === 0) {
    object[day] = 'CLOSED';
  } else {
    object[day] = `Open from ${changeAmPm(open)} until ${changeAmPm(close)}`;
  }
  return object;
};

function schedule(dayName) {
  const result = {};
  if (!dayName) {
    Object.keys(data.hours)
      .forEach(day => changeHourMessage(day, result));
  } else {
    changeHourMessage(dayName, result);
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const animalResponsible = data.employees
    .filter(element => element.id === id)[0].responsibleFor[0];
  const animalDetails = data.animals
    .filter(element => element.id === animalResponsible)[0].residents
    .sort((a, b) => b.age - a.age)[0];
  const result = [];
  result.push(animalDetails.name);
  result.push(animalDetails.sex);
  result.push(animalDetails.age);
  return result;
}

function increasePrices(percentage) {
  Object.entries(data.prices).forEach((entrance) => {
    data.prices[entrance[0]] = Math.ceil(entrance[1] * (1 + (percentage / 100)) * 100) / 100;
  });
}

// Inicio do Employee Coverage
const employeeList = (list) => data.employees
  .find((employee) => {
    const { firstName, lastName, id } = employee;
    return (firstName === list || lastName === list || id === list);
  });

const animalList = (animal) => animal.responsibleFor
  .map((animalId) => data.animals
    .find((animal) => animal.id === animalId).name);

const returnObject = (employee, object) => {
  object[`${employee.firstName} ${employee.lastName}`] = animalList(employee);
};

function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName) {
    returnObject(employeeList(idOrName), result);
  } else {
    data.employees.forEach(employee => returnObject(employee, result));
  }
  return result;
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
