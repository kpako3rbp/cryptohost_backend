import fs from 'fs';

export default (imagePath) => {
  // Проверяем, существует ли файл
  if (fs.existsSync(imagePath)) {
    // Удаляем файл
    fs.unlinkSync(imagePath);
    console.log(`Файл обложки удален: ${imagePath}`);
  } else {
    console.log(`Файл обложки не найден: ${imagePath}`);
  }
};
