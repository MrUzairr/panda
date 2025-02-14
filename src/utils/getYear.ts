export const getCurrentYear = (lang = 'en') => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
  const formatter = new Intl.DateTimeFormat(lang, options);
  const year = formatter.format(new Date());

  if (lang === 'ar') {
    return year.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  }

  return year;
};
