import moment from 'moment';

export function formatDateSmall(date) {
  const formated = moment(date).format('DD/MM');

  return formated;
}

export function formatDateTime(date) {
  const formated = moment(date).format('DD/MM/YYYY [às] HH:mm');

  return formated;
}
