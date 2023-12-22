export const formatDate = (date: string) => {
  const elementsDate = date.split('-');

  const dateFormate =
    elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

  return dateFormate;
};
