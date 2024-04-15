import path from 'path';
import prisma from '../prisma/prisma-client.js';
import { slugify } from 'transliteration';
import deleteCoverImg from '../utils/delete-cover-img.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getPreviewFromBody from '../utils/get-preview-from-body.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 *
 @route GET /api/crypto-activities/
 @desc Получение всех криптоактивностей
 @access Public or Private
 */
export const getAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const pageSizeInt = parseInt(pageSize, 10);
    const skip = (page - 1) * pageSizeInt;

    const where = {
      deleted: false,
    };

    const totalCount = await prisma.cryptoActivity.count({
      where,
    });

    const cryptoActivityPosts = await prisma.cryptoActivity.findMany({
      where,
      skip,
      take: pageSizeInt,
      orderBy: {
        published_at: 'desc',
      },
      // Отдаем только те поля, который нужны
      select: {
        id: true,
        meta_title: true,
        title: true,
        published_at: true,
        image: true,
        slug: true,
        body: true,
        views: true,
      },
    });

    // Проход по каждой статье и создание поля description
    // Очищается разметка Markdown и отдается только заданное количество символов.
    cryptoActivityPosts.forEach((post) => {
      post.description = `${getPreviewFromBody(post.body, 100)} ...`;
      delete post.body;
    });

    res.status(200).json({
      activities: cryptoActivityPosts,
      total: totalCount,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Не удалось получить криптоактивности: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route GET /api/crypto-activities/:id
 @desc Получение одной криптоактивности
 @access Public or Private
 */
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const cryptoActivityPost = await prisma.cryptoActivity.findUnique({
      where: {
        id,
      },
    });

    if (!cryptoActivityPost) {
      return res.status(404).json({ message: 'Криптоактивность не найдена' });
    }

    // Увеличение счетчика просмотров на 1
    await prisma.cryptoActivity.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return res.status(200).json(cryptoActivityPost);
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось получить криптоактивность: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route POST /api/crypto-activities/create
 @desc Добавление новой криптоактивности
 @access Private
 */
export const create = async (req, res) => {
  try {
    const data = req.body;
    // publishedAt по умолчанию ставится текущая дата, но если изменено, то указанная дата
    // const { metaTitle, title, categoryId, publishedAt, image, body } = data;

    let currentSlug = slugify(data.title);

    const cryptoActivityPostWithSameSlug =
      await prisma.cryptoActivity.findFirst({
        where: {
          slug: currentSlug,
          deleted: false,
        },
      });

    if (cryptoActivityPostWithSameSlug) {
      // Если криптоактивность с таким слагом уже есть, то добавляем в конце сегодняшнюю дату
      currentSlug = `${currentSlug}-${Date.now()}`;
    }

    const cryptoActivityPost = await prisma.cryptoActivity.create({
      data: {
        meta_title: data.metaTitle || data.title,
        title: data.title,
        created_at: new Date(),
        created_by: req.admin.id,
        published_at: data.publishedAt
          ? new Date(data.publishedAt)
          : new Date(),
        image: data.image,
        slug: currentSlug,
        body: data.body,
      },
    });

    return res.status(201).json(cryptoActivityPost);
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось добавить криптоактивность: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route PUT /api/crypto-activities/update/:id
 @desc Редактирование криптоактивности
 @access Private
 */
export const update = async (req, res) => {
  try {
    const data = req.body;
    const { id } = data;

    let currentSlug = slugify(data.title);

    const cryptoActivityPostWithSameSlug = await prisma.newsPost.findFirst({
      where: {
        slug: currentSlug,
        deleted: false,
      },
    });

    if (cryptoActivityPostWithSameSlug) {
      // Если новость с таким слагом уже есть, то добавляем в конце сегодняшнюю дату
      currentSlug = `${currentSlug}-${Date.now()}`;
    }

    await prisma.cryptoActivity.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        meta_title: data.metaTitle || data.title,
        title: data.title,
        image: data.image,
        slug: currentSlug,
        body: data.body,
        updated: true,
        updated_at: new Date(),
        updated_by: req.admin.id,
      },
    });

    return res.status(200).json({
      message: 'Криптоактивность успешно обновлена',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось отредактировать криптоактивность: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route PUT /api/crypto-activities/remove/:id
 @desc Удаление криптоактивности
 @access Private
 */
export const softRemove = async (req, res) => {
  try {
    const { id } = req.body;

    // Получаем информацию о новости
    const cryptoActivityPost = await prisma.cryptoActivity.findUnique({
      where: {
        id,
        deleted: false,
      },
    });

    if (!cryptoActivityPost) {
      return res.status(404).json({
        message: 'Криптоактивность не найдена',
      });
    }

    await prisma.cryptoActivity.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        updated: true,
        updated_at: new Date(),
        updated_by: req.admin.id,
      },
    });

    return res.status(200).json({
      message: 'Криптоактивность успешно удалена',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось удалить криптоактивность: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route POST /api/crypto-activities/remove-hard/:id
 @desc Удаление криптоактивности безвозвратно
 @access Private
 */
export const hardRemove = async (req, res) => {
  try {
    const { id } = req.body;

    // Получаем информацию о новости
    const cryptoActivityPost = await prisma.cryptoActivity.findUnique({
      where: {
        id,
      },
    });

    if (!cryptoActivityPost) {
      return res.status(404).json({
        message: 'Криптоактивность не найдена',
      });
    }

    // Удаляем файл обложки
    const imagePath = path.join(__dirname, '..', cryptoActivityPost.image);
    const imageThumbPath = path.join(
      __dirname,
      '..',
      `${
        cryptoActivityPost.image.split('.')[0]
      }-thumb.${cryptoActivityPost.image.split('.').pop()}`
    );
    deleteCoverImg(imagePath);
    deleteCoverImg(imageThumbPath);

    await prisma.cryptoActivity.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Криптоактивность успешно удалена безвозвратно',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось безвозвратно удалить криптоактивность: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};
