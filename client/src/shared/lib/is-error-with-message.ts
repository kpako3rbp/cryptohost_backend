import { ErrorWithMessage } from '../ui/ErrorMessage/types';

// Проверяем имеет ли ошибка сообщение.
export const isErrorWithMessage = (
  error: unknown
): error is ErrorWithMessage => {
  // проверяем является ли ошибка объектом (и не null, потому что null это объект), что внутри нее есть объект data
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object'
  );
};
