export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();
  const daysDiff = today.getDate() - birthDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearsDiff--;
  }

  return yearsDiff;
};

export const getOptionsValue = (array, index) => {
  const value = array.map((item, i) => (i === index ? item.value : null));
  return value;
};
