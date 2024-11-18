// Elements selection
const ctaBtn = document.querySelector(".cta-btn");
const inputs = [...document.querySelectorAll(".top input")];
const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");

// Data
// declare here to be accessible in diff functions
let ageYears;
let ageMonths;

// Functions

const addErrInfo = function (validitionObj, errMsg, errEl) {
  validitionObj.validition = false;

  validitionObj.messages.push(errMsg);
  validitionObj.elements.push(errEl);
};

/**
 * Determines if a given year is a leap year.
 *
 * A year is considered a leap year if it is divisible by 4,
 * except for years that are divisible by 100. However, years
 * divisible by 400 are leap years.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
const isLeapYear = function (year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * Returns an array containing the number of days in each month for a given year.
 *
 * @param {number} year - The year to determine that it's a leap year or not for February days number..
 * @returns {number[]} An array of 12 elements, each representing the number of days in the corresponding month.
 */
const getMonthDaysNum = (year) => [
  31,
  isLeapYear(year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

/**
 * Converts the value of the provided input element to a number.
 *
 * @param {HTMLInputElement} input - The input element to convert the value of.
 * @returns {number} The numeric value of the input element.
 */
const getInputNumber = (input) => +input.value;

/**
 * Checks if a given month number is valid.
 *
 * @param {number} monthNum - The month number to validate.
 * @returns {boolean} Returns true if the month number is between 1 and 12, inclusive; otherwise, returns false.
 */
const isMonthValid = (monthNum) =>
  monthNum >= 1 && monthNum <= 12 ? true : false;

/**
 * Checks if a given day number is valid.
 *
 * @param {number} dayNum - The day number to validate.
 * @returns {boolean} True if the day number is between 1 and 31, inclusive; otherwise, false.
 */
const isDayValid = (dayNum) => (dayNum >= 1 && dayNum <= 31 ? true : false);

/**
 * Checks if the provided day is in the future compared to the current date.
 *
 * @param {number} year - The year to check.
 * @param {number} month - The month to check.
 * @param {number} day - The day to check.
 * @returns {boolean} True if the provided day is in the future, false otherwise.
 */
const isDayInFuture = (year, month, day) => {
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();

  return year === currentYear && month === currentMonth && day > currentDay;
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

  const day = getInputNumber(dayInput);

  // Check if the day is between 1 to 31
  if (!isDayValid(day)) {
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

  const month = getInputNumber(monthInput);

  // Check if the month is between 1 to 12
  if (!isMonthValid(month)) {
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
  const year = getInputNumber(yearInput);

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
 * Returns the current date as an array of the current day, month, and year.
 * @returns {number[]} An array containing the current day, month, and year.
 */
const getCurrentDate = () => [
  getCurrentDay(),
  getCurrentMonth(),
  getCurrentYear(),
];

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
  if (month !== currentMonth) return;

  // Executing when the year is equal to the current year and the month is equal to the current month
  const currentDay = getCurrentDay();
  const day = getInputNumber(dayInput);

  // Check if the day is bigger than the current day
  if (day > currentDay) {
    addErrInfo(validitionObj, "Must be in the past", dayInput);
  }
};

/**
 * Checks if the provided day is valid for the selected month and year.
 *
 * @param {HTMLInputElement[]} inputs - An array containing the day, month, and year input elements.
 * @param {Object} validitionObj - An object to store the validation status, error messages, and elements to render errors to.
 * @returns {void} This function does not return a value.
 */
const checkMonthDayNumValidition = function (inputs, validitionObj) {
  const [dayInput, monthInput, yearInput] = inputs;

  // Getting data from UI
  const day = getInputNumber(dayInput);
  const month = getInputNumber(monthInput);
  const monthIndex = month - 1;
  const year = getInputNumber(yearInput);

  // Checking if the day/month input is empty or invalid or when user enter a day in the future, not check the month day number validation.
  if (monthInput.value === "") return;
  if (dayInput.value === "") return;
  if (!isMonthValid(month)) return;
  if (!isDayValid(day)) return;
  if (isDayInFuture(year, month, day)) return;

  const monthDaysNum = getMonthDaysNum(year);

  // Checking if the day is bigger than the limited day number according to the month i.e. April with 31 days is invalid.
  if (day > monthDaysNum[monthIndex])
    addErrInfo(validitionObj, "Must be a valid date", dayInput);
};

/**
 * Resets error messages and removes the "form-group-error" class from the parent elements of the provided form elements.
 *
 * @param {HTMLElement[]} els - An array of form elements for which to reset error messages.
 * @returns {void} This function does not return a value.
 */
const resetErrsInUI = function (els) {
  els.forEach((el) => {
    const parentErrEl = el.parentElement;

    console.log(parentErrEl);
    parentErrEl.classList.remove("form-group-error");

    document.querySelectorAll(".error-msg").forEach((el) => {
      el.remove();
    });
  });
};

/**
 * Renders error messages and attaches them to the corresponding form elements.
 *
 * @param {string[]} errMsgs - An array of error messages to be displayed.
 * @param {HTMLElement[]} errEls - An array of form elements that have errors.
 * @returns {void} This function does not return a value.
 */
const renderErrs = function (errMsgs, errEls) {
  errEls.forEach((el, i) => {
    const errMsg = errMsgs[i];

    const parentErrEl = el.parentElement;

    parentErrEl.classList.add("form-group-error");

    const errMsgEl = document.createElement("span");
    errMsgEl.classList.add("error-msg");
    errMsgEl.textContent = errMsg;

    parentErrEl.insertAdjacentElement("beforeend", errMsgEl);
  });
};

/**
 * Calculates the age in years based on the provided birth year.
 *
 * @param {number} birthYear - The birth year to calculate the age from.
 * @returns {number} The age in years.
 */
const calcAgeYears = function (birthYear) {
  const curYear = getCurrentYear();

  return curYear - birthYear;
};

/**
 * Calculates the age in months based on the provided birth month.
 *
 * @param {number} birthMonth - The birth month to calculate the age from.
 * @returns {number} The age in months.
 */
const calcAgeMonths = function (birthMonth) {
  const curMonth = getCurrentMonth();
  const monthDiff = curMonth - birthMonth;

  if (curMonth >= birthMonth) return monthDiff;
  else {
    ageYears--;
    // Another way : 12 - (month - curMonth);
    return monthDiff + 12;
  }
};

/**
 * Calculates the age in days based on the provided birth day.
 *
 * @param {number} birthDay - The birth day to calculate the age from.
 * @returns {number} The age in days.
 */
const calcAgeDays = function (birthDay) {
  const curDay = getCurrentDay();
  const dayDiff = curDay - birthDay;

  if (curDay >= birthDay) return dayDiff;

  if (curDay < birthDay && ageMonths === 0) {
    ageYears--;
    ageMonths += 11;
  } else if (curDay < birthDay) {
    ageMonths--;
  }

  // const DAYSTOMONTHSRATIO = 30.44;
  // Another way : 30 - (day - curDay)
  return dayDiff + 30;
};

const calcAge = function ([day, month, year]) {
  ageYears = calcAgeYears(year);

  ageMonths = calcAgeMonths(month);

  const ageDays = calcAgeDays(day);

  return [ageYears, ageMonths, ageDays];
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

  checkMonthDayNumValidition(inputs, validitionCheck);

  return validitionCheck;
};

// Event listeners
ctaBtn.addEventListener("click", function (e) {
  const {
    validition: isFormValid,
    messages: errMsgs,
    elements: errEls,
  } = formValidation();

  const [dayInput, monthInput, yearInput] = inputs;

  resetErrsInUI(inputs);

  // If the form is valid, show the result
  if (isFormValid) {
    calcAge([
      getInputNumber(dayInput),
      getInputNumber(monthInput),
      getInputNumber(yearInput),
    ]);
  }

  // If the form is invalid, show the errors
  else {
    renderErrs(errMsgs, errEls);
  }
});
