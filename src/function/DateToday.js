export const DateToday = () => {
  let dateToday = new Date();

  dateToday = dateToday.toISOString().split("T")[0];

  return { dateToday };
};
