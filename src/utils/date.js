const formatDateTime = (time) => {
  const opciones = {
    year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  };
  const formatedDate = new Date(time)
    .toLocaleDateString('es', opciones);
  return formatedDate;
};

const formatDate = (time) => {
  const opciones = {
    year: 'numeric', month: '2-digit', day: '2-digit',
  };
  const formatedDate = new Date(`'${time}'`)
    .toLocaleDateString('es', opciones);
  return formatedDate;
};

const firstDayOfCurrentMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1);
  return firstDay.toISOString();
};

const lastMonth = (date) => {
  const dateLastMonth = new Date(date);
  dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);
  return dateLastMonth.toISOString();
};

const getNextMonth = (date) => {
  const dateNextMonth = new Date(date);
  dateNextMonth.setMonth(dateNextMonth.getMonth() + 1);
  return dateNextMonth.toISOString();
};

module.exports = {
  formatDateTime,
  formatDate,
  firstDayOfCurrentMonth,
  lastMonth,
  getNextMonth,
};
