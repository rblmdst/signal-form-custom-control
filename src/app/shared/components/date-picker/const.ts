export const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const getYearsToAllowAgeBetween = (minAge: number, maxAge: number) => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - minAge;
  const minYear = currentYear - maxAge;
  const total = maxYear - minYear + 1;
  const years = new Array(total).fill(0).map((_, index) => minYear + index).sort((a,b)=> b-a);
  return years;
};
