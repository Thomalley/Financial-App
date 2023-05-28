export default function vacationsCalculator(vacationDays) {
  let twoYearsAgoDeposit = 0;
  let twoYearsAgoCharge = 0;
  let creditDaysTaken = 0;
  let creditDaysAvailable = 0;
  let creditDaysDeposit = 0;

  if (vacationDays.length > 0) {
    for (let i = 0; i < vacationDays.length; i += 1) {
      if (vacationDays[i].isExtra) {
        creditDaysAvailable += (vacationDays[i].vacationDeposit - vacationDays[i].vacationCharge);
        creditDaysTaken += vacationDays[i].vacationCharge;
        creditDaysDeposit += vacationDays[i].vacationDeposit;
      } else {
        twoYearsAgoDeposit += vacationDays[i].vacationDeposit;
        twoYearsAgoCharge += vacationDays[i].vacationCharge;
      }
    }
  }

  return {
    twoYearsAgoDeposit,
    twoYearsAgoCharge,
    creditDaysTaken,
    creditDaysAvailable,
    creditDaysDeposit,
  };
}
