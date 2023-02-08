export const DateToday = () => {
  let dateToday = new Date();

  let todayMonth = dateToday.getMonth() + 1;
  todayMonth = todayMonth.toString();

  if (todayMonth.length < 2) {
    todayMonth = "0" + todayMonth;
  }

  dateToday =
    dateToday.getFullYear() + "-" + todayMonth + "-" + dateToday.getDate();

  return { dateToday };
};
