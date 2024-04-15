import prisma from '../prisma/prisma-client.js';
import { slugify } from 'transliteration';

/**
 *
 @route GET /api/news-categories/
 @desc Получение всех категорий
 @access Private or Public
 */
export const getAll = async (req, res) => {
  try {
    const newsCategories = await prisma.newsCategory.findMany({
      where: {
        deleted: false, // Исключаем удаленные категории
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).json(newsCategories);
  } catch (error) {
    return res.status(400).json({
      message: `Не удалось получить категории: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route POST /api/news-categories/create
 @desc Добавление категории
 @access Private
 */
export const create = async (req, res) => {
  try {
    const data = req.body;
    // const { name } = data;

    const existingNewsCategory = await prisma.newsCategory.findFirst({
      where: {
        name: data.name,
        deleted: false,
      },
    });

    if (existingNewsCategory) {
      return res.status(400).json({
        message: 'Категория с таким именем уже существует',
      });
    }

    const category = await prisma.newsCategory.create({
      data: {
        name: data.name,
        created_at: new Date(),
        created_by: req.admin.id,
        slug: slugify(data.name),
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось добавить категорию: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route PUT /api/news-categories/update/:id
 @desc Редактирование категории
 @access Private
 */
export const update = async (req, res) => {
  try {
    const data = req.body;
    const { id } = data;

    const existingNewsCategory = await prisma.newsCategory.findFirst({
      where: {
        name: data.name,
        deleted: false,
      },
    });

    if (existingNewsCategory) {
      return res.status(400).json({
        message: 'Категория с таким именем уже существует',
      });
    }

    await prisma.newsCategory.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        name: data.name,
        slug: slugify(data.name),
        updated: true,
        updated_at: new Date(),
        updated_by: req.admin.id,
      },
    });

    return res.status(200).json({
      message: 'Категория успешно обновлена',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось отредактировать категорию: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route PUT /api/news-categories/remove/:id
 @desc Удаление категории
 @access Private
 */
export const softRemove = async (req, res) => {
  try {
    const { id } = req.body;

    const existingNewsCategory = await prisma.newsCategory.findUnique({
      where: {
        id,
      },
    });

    if (!existingNewsCategory) {
      return res.status(404).json({
        message: 'Категория не найдена',
      });
    }

    await prisma.newsCategory.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
        updated: true,
        updated_at: new Date(),
        updated_by: req.admin.id,
      },
    });

    return res.status(200).json({
      message: 'Категория успешно удалена',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось удалить категорию: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 @route POST /api/news-categories/remove-hard/:id
 @desc Удаление категории безвозвратно
 @access Private
 */
export const hardRemove = async (req, res) => {
  try {
    const { id } = req.body;

    const existingNewsCategory = await prisma.newsCategory.findUnique({
      where: {
        id,
      },
    });

    if (!existingNewsCategory) {
      return res.status(404).json({
        message: 'Категория не найдена',
      });
    }

    await prisma.newsCategory.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Категория успешно безвозвратно удалена',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Не удалось безвозвратно удалить категорию: ${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
};
