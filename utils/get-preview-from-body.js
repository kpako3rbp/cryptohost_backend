import { marked } from 'marked';

export default (body, maxSize = 50) => {
  const plainText = marked(body).replace(/<\/?[^>]+(>|$)/g, ''); // Конвертация и удаление HTML тегов
  return plainText.slice(0, maxSize);
};
