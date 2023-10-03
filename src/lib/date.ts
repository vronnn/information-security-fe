import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const DATE_FORMAT = {
  // Sabtu, 11 Februari 2022
  FULL_DATE_WITH_DAY: 'PPPP',
  /** 15 Agustus 2021 */
  FULL: 'dd MMMM yyyy',
  /** 11 Jan 2022 */
  DATE_WITH_SHORTENED_MONTH: 'd MMM yyyy',
};

export function formatLocaleDate(
  date: Date,
  formatKey: keyof typeof DATE_FORMAT,
) {
  return format(date, DATE_FORMAT[formatKey], { locale: id });
}

/**
 * Convert Date object to API format
 * @returns date with format 'yyyy-MM-dd'
 */
export function formatDateForAPI(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 *
 * Convert Date to Age
 * @returns number of age
 */
export function birthdayToAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
