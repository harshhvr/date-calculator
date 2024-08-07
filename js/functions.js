// functions

Date.prototype.calcDateDiffInDays = function (
  date1 = new Date(),
  date2 = new Date()
) {
  return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
};

Date.prototype.calcDateBeforeWeeksFromDate = function (
  dateValue = new Date(),
  weeksValue = new Number()
) {
  const day = 1000 * 60 * 60 * 24;
  const daysOfWeeks = weeksValue * 7;
  const millisecondsOfWeeks = daysOfWeeks * day;
  return new Date(dateValue.getTime() - millisecondsOfWeeks);
};

Date.prototype.calcDateAfterWeeksFromDate = function (
  dateValue = new Date(),
  weeksValue = new Number()
) {
  const day = 1000 * 60 * 60 * 24;
  const daysOfWeeks = weeksValue * 7;
  const millisecondsOfWeeks = daysOfWeeks * day;
  return new Date(dateValue.getTime() + millisecondsOfWeeks);
};

Date.prototype.getMonthName = function () {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][this.getMonth()];
};

Date.prototype.getMonthDays = function () {
  const month = this.getMonth();
  let days = null;

  if (
    month === 0 ||
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 7 ||
    month === 9 ||
    month === 11
  )
    days = 31;
  else if (month === 3 || month === 5 || month === 8 || month === 10) days = 30;
  else if (month === 1) days = month % 4 === 0 ? 29 : 28;

  return days;
};

Date.prototype.getCompleteWeeksOfThisMonth = function () {
  const date = new Date(this);
  date.setDate(1);
  return date.getDay() === 0 ? 4 : 3;
};

Date.prototype.getIncompleteWeeksOfThisMonth = function () {
  const date = new Date(this);
  date.setDate(1);

  return date.getMonthDays() > 28 && date.getDay() ? 1 : date.getDay() > 28;
};

Date.prototype.getMonthWeeks = function () {
  return (
    this.getCompleteWeeksOfThisMonth() + this.getCompleteWeeksOfThisMonth()
  );
};

const date = new Date();
date.setMonth(7);

// console.log(date.getMonthName());
// console.log(date.getMonthDays());
// console.log(date.getCompleteWeeksOfThisMonth());
// console.log(date.getMonthWeeks());

function Calculator() {
  this.getCalculatorProps = (calculatorQueries) => {
    let calc_entries = {};

    Object.entries(calculatorQueries).forEach((calcEntries) => {
      let calc_sub_entries = {};

      Object.entries(calcEntries[1]).forEach((calcSupEntries) => {
        calc_sub_entries = {
          ...calc_sub_entries,
          ...{
            [calcSupEntries[0]]: document.querySelector(calcSupEntries[1]),
          },
        };
      });

      calc_entries = {
        ...calc_entries,
        ...{ [calcEntries[0]]: calc_sub_entries },
      };
    });

    return calc_entries;
  };
  this.calculate1 = (
    calcQueries = {
      inputs: { date1: "", date2: "" },
      outputs: { days: "", weeks: "" },
      actions: { submit: "", reset: "" },
    }
  ) => {
    const calc = this.getCalculatorProps(calcQueries);

    calc.inputs.date2.setAttribute("disabled", true);

    calc.inputs.date1.addEventListener("input", (e) => {
      e.preventDefault();
      calc.inputs.date1.setAttribute("disabled", true);
      calc.inputs.date2.removeAttribute("disabled");
      calc.inputs.date2.setAttribute("min", e.target.value);
      calc.inputs.date2.value = null;
    });

    calc.inputs.date2.addEventListener("input", (e) => {
      e.preventDefault();
      calc.inputs.date2.setAttribute("disabled", true);
    });

    calc.actions.submit.addEventListener("click", (e) => {
      e.preventDefault();

      const inputDate_value = calc.inputs.date1.value;
      const date2_value = calc.inputs.date2.value;

      const d = new Date();
      const d1 = new Date(inputDate_value);
      const d2 = new Date(date2_value);

      const _days = new Date().calcDateDiffInDays(d1, d2);
      const _weeks = Math.floor(_days / 7);
      const _remainingDays = _days % 7;
      const _weeksRounded = Math.round(_days / 7);

      let output_days = "";
      let output_weeks = "";

      if (_days > 1) {
        output_days = `${_days} days`;
      } else {
        output_days = `${_days} day`;
      }

      if (_days > 7 && _remainingDays > 0) {
        if (_weeksRounded > 1) {
          output_weeks = `${_weeks} weeks`;
        } else {
          output_weeks = `${_weeks} week`;
        }

        output_weeks = `${output_weeks} and`;

        if (_remainingDays > 1) {
          output_weeks = `${output_weeks} ${_remainingDays} days`;
        } else {
          output_weeks = `${output_weeks} ${_remainingDays} day`;
        }

        output_weeks = `${output_weeks}<br>Therefore,`;
      }

      if (_weeksRounded > 1) {
        output_weeks = `${output_weeks} ${_weeksRounded} weeks`;
      } else {
        output_weeks = `${output_weeks} ${_weeksRounded} week`;
      }

      if (_remainingDays === 0) {
        output_weeks = `${output_weeks} (exact)`;
      } else if (_remainingDays < 4) {
        output_weeks = `${output_weeks} (approx)`;
      } else {
        output_weeks = `${output_weeks} (around)`;
      }

      calc.outputs.days.innerHTML = output_days;
      calc.outputs.weeks.innerHTML = output_weeks;

      calc.inputs.date1.removeAttribute("disabled");
      calc.inputs.date2.setAttribute("disabled", true);
    });

    calc.actions.reset.addEventListener("click", (e) => {
      e.preventDefault();

      calc.inputs.date1.value = null;
      calc.inputs.date2.value = null;

      calc.inputs.date1.removeAttribute("disabled");
      calc.inputs.date2.setAttribute("disabled", true);
    });
  };
  this.calculate2 = (
    calcQueries = {
      inputs: { inputDate: "", timePeriod: "", weeks: "" },
      outputs: { resultDateLabel: "", resultDate: "" },
      actions: { submit: "", reset: "" },
    }
  ) => {
    const calc = this.getCalculatorProps(calcQueries);
    console.log(calc);

    calc.inputs.weeks.addEventListener("input", (e) => {
      e.preventDefault();
      console.log(e);
      console.log(e.charCode);
      return true;
    });

    calc.actions.submit.addEventListener("click", (e) => {
      e.preventDefault();

      const inputDate_value = calc.inputs.inputDate.value;
      const timePeriod_value = calc.inputs.timePeriod.value;
      const weeks_value = calc.inputs.weeks.value;

      const _inputDate = new Date(inputDate_value);

      let output_resultDateLabel = null;
      let output_resultDate = null;
      let _resultDate = null;

      if (timePeriod_value === "before") {
        _resultDate = new Date().calcDateBeforeWeeksFromDate(
          _inputDate,
          weeks_value
        );
      } else if (timePeriod_value === "after") {
        _resultDate = new Date().calcDateAfterWeeksFromDate(
          _inputDate,
          weeks_value
        );
      }

      output_resultDate = _resultDate.toLocaleDateString("en-GB", {
        dateStyle: "long",
      });

      if (timePeriod_value === "before") {
        output_resultDateLabel = `Date before ${weeks_value} ${
          weeks_value > 1 ? "weeks" : "week"
        }`;
      } else if (timePeriod_value === "after") {
        output_resultDateLabel = `Date after ${weeks_value} ${
          weeks_value > 1 ? "weeks" : "week"
        }`;
      } else {
        output_resultDateLabel = "Resultant date";
      }

      calc.outputs.resultDateLabel.innerHTML = output_resultDateLabel;
      calc.outputs.resultDate.innerHTML = output_resultDate;
    });

    calc.actions.reset.addEventListener("click", (e) => {
      e.preventDefault();

      calc.inputs.inputDate.value = null;
      calc.inputs.timePeriod.value = null;
      calc.inputs.weeks.value = null;
    });
  };
}
