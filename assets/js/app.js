// Elements selection
const ctaBtn = document.querySelector(".cta-btn");
const inputs = [...document.querySelectorAll(".top input")];
const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");

// Functions

const addErrInfo = function (validitionObj, errMsg, errEl) {
  validitionObj.validition = false;

  validitionObj.messages.push(errMsg);
  validitionObj.elements.push(errEl);
};

/**
 * Checks if any of the provided input elements are empty and updates the provided validation object accordingly.
 *
 * @param {HTMLInputElement[]} inputs - An array of input elements to check for empty values.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {void | undefined} returns undefined if the day input is empty, otherwise returns void.
 */
const checkEmptyInputs = function (inputs, validitionObj) {
  inputs.forEach((input) => {
    if (input.value === "") {
      addErrInfo(validitionObj, "This field is required", input);
    }
  });
};

/**
 * Checks if the provided day input value is a valid day between 1 and 31.
 *
 * @param {HTMLInputElement} dayInput - The input element containing the day value to validate.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {void | undefined} returns undefined if the day input is empty, otherwise returns void.
 */
const checkDayValidtion = function (dayInput, validitionObj) {
  // Checking if the day input is empty not check the day validation
  if (dayInput.value === "") return;

  const day = +dayInput.value;

  // Check if the day is between 1 to 31
  if (day < 1 || day > 31) {
    addErrInfo(validitionObj, "Must be a valid day", dayInput);
  }
};

/**
 * Checks if the provided month input value is a valid month between 1 and 12.
 *
 * @param {HTMLInputElement} monthInput - The input element containing the value to validate.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {Object} The updated validitionObj with the validation status, error messages, and elements to render errors to.
 */
const checkMonthValidtion = function (monthInput, validitionObj) {
  // Checking if the month input is empty not check the month validation
  if (monthInput.value === "") return;

  const month = +monthInput.value;

  // Check if the month is between 1 to 12
  if (month < 1 || month > 12) {
    addErrInfo(validitionObj, "Must be a valid month", monthInput);
  }
};

/**
 * Checks if the provided year input value is a valid year, i.e. not greater than the current year.
 *
 * @param {HTMLInputElement} yearInput - The input element containing the value to validate.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {void | undefined} returns undefined if the year input is empty, otherwise returns void.
 */
const checkYearValidtion = function (yearInput, validitionObj) {
  // Checking if the year input is empty not check the year validation
  if (yearInput.value === "") return;

  const currentYear = new Date().getFullYear();
  const year = +yearInput.value;

  // Check if the year is bigger than the current year
  if (year > currentYear) {
    addErrInfo(validitionObj, "Must be in the past", yearInput);
  }
};

/**
 * Returns the current year as a number.
 * @returns {number} The current year.
 */
const getCurrentYear = () => new Date().getFullYear();

/**
 * Returns the current month as a number
 * @returns {number} The current month as a number.
 */
const getCurrentMonth = () => new Date().getMonth() + 1;

/**
 * Returns the current day of the month as a number.
 * @returns {number} The current day of the month.
 */
const getCurrentDay = () => new Date().getDate();

/**
 * Converts the value of the provided input element to a number.
 *
 * @param {HTMLInputElement} input - The input element to convert the value of.
 * @returns {number} The numeric value of the input element.
 */
const getInputNumber = (input) => +input.value;

/**
 * Checks if the provided year is equal to current year, check month to add error if it's greater than current month, and if month is equal to
 * current month too, check day to add error if it's greater than current day
 *
 * @param {HTMLInputElement[]} inputs - An array containing the day, month, and year input elements.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {void} This function does not return a value.
 */
const checkYearEqualCurrentYear = function (inputs, validitionObj) {
  const [dayInput, monthInput, yearInput] = inputs;

  // Checking if the year input is empty not check the year validation
  if (yearInput.value === "") return;

  // Checking if the input year is equal to the current year
  const currentYear = getCurrentYear();
  const year = getInputNumber(yearInput);
  if (year !== currentYear) return;

  // Executing when the year is equal to the current year
  const currentMonth = getCurrentMonth();
  const month = getInputNumber(monthInput);

  // Check if the month is bigger than the current month
  if (month > currentMonth) {
    addErrInfo(validitionObj, "Must be in the past", monthInput);
  }

  // Checking if the input month is equal to the current year
  if (!month === currentMonth) return;

  // Executing when the year is equal to the current year and the month is equal to the current month
  const currentDay = getCurrentDay();
  const day = getInputNumber(dayInput);

  // Check if the day is bigger than the current day
  if (day > currentDay) {
    addErrInfo(validitionObj, "Must be in the past", dayInput);
  }
};

const formValidation = function () {
  validitionCheck = {
    // True | False
    validition: true,
    // Properties to fill if validation fails
    messages: [],
    elements: [],
  };

  checkEmptyInputs(inputs, validitionCheck);

  checkDayValidtion(dayInput, validitionCheck);

  checkMonthValidtion(monthInput, validitionCheck);

  checkYearValidtion(yearInput, validitionCheck);

  checkYearEqualCurrentYear(inputs, validitionCheck);

  return validitionCheck;
};

// Event listeners
ctaBtn.addEventListener("click", function (e) {
  console.log(formValidation());
});
