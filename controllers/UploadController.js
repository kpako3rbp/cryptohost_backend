import Jimp from 'jimp';
import fs from 'fs';

/**
 *
 @route POST /api/upload/:entityType
 @desc Загрузка изображения
 @access Private
 */
export const uploadImage = async (req, res) => {
  try {
    // Получаем требуемую ширину изображения из запроса клиента
    const { imageWidth, thumbWidth } = req.query;
    const desiredImageWidth = imageWidth ? parseInt(imageWidth) : 1920;
    const desiredThumbWidth = thumbWidth ? parseInt(thumbWidth) : 600;

    // Формируем пути для сохранения изображений
    const imagePath = `${req.file.destination}/${req.file.filename}`;
    const thumbnailPath = `${req.file.destination}/${
      req.file.filename.split('.')[0]
    }-thumb.${req.file.filename.split('.').pop()}`;

    // Открываем изображение с помощью Jimp
    const image = await Jimp.read(imagePath);

    // Изменяем размер изображения по ширине с сохранением пропорций
    await image.resize(desiredImageWidth, Jimp.AUTO);

    // Сохраняем измененное изображение
    await image.writeAsync(imagePath);

    // Создаем миниатюру изображения с шириной 600 пикселей
    const thumbnail = image.clone(); // Клонируем изображение для миниатюры
    await thumbnail.resize(desiredThumbWidth, Jimp.AUTO); // Изменяем размер для миниатюры
    await thumbnail.writeAsync(thumbnailPath); // Сохраняем миниатюру

    // Отправляем URL в ответе
    res.status(201).json({ imageUrl: imagePath, thumbnailUrl: thumbnailPath });
  } catch (error) {
    return res.status(500).json({
      message: `Ошибка при загрузке изображения: ${error}`,
    });
  }
};
