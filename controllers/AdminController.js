import prisma from '../prisma/prisma-client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// TODO передалать эту сущность в администратора и добавить сущность для пользователя (потом)
/**
 *
 @route POST /api/admin/login
 @desc Авторизация
 @access Public
 */
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const admin = await prisma.admin.findFirst({
      where: {
        login,
      },
    });

    // Пароль, который ввел пользователь хэшируется и сверяется с захэшированным паролем с БД
    const isPasswordCorrect =
      admin && (await bcrypt.compare(password, admin.password));

    const secret = process.env.JWT_SECRET;

    if (admin && isPasswordCorrect && secret) {
      res.status(200).json({
        id: admin.id,
        email: admin.email,
        login: admin.login,
        token: jwt.sign({ id: admin.id }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res.status(400).json({
        message: 'Неверно введен логин или пароль',
      });
    }
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    return res.status(500).json({
      message: 'Внутренняя ошибка сервера',
    });
  }
};

/**
 *
 @route POST /api/admin/register
 @desc Регистрация
 @access Public
 */
export const register = async (req, res) => {
  try {
    const { email, login, password } = req.body;

    const registeredAdminByEmail = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (registeredAdminByEmail) {
      return res.status(400).json({
        message: 'Администратор с таким email уже существует',
      });
    }

    const registeredAdminByLogin = await prisma.admin.findFirst({
      where: {
        login,
      },
    });

    if (registeredAdminByLogin) {
      return res.status(400).json({
        message: 'Администратор с таким логином уже существует',
      });
    }

    // salt это строка, которая будет добавляться к хэшу, чтобы усилить безопасность
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prisma.admin.create({
      data: {
        email,
        login,
        password: hashedPassword,
        created_at: new Date(),
      },
    });

    const secret = process.env.JWT_SECRET;

    if (admin && secret) {
      res.status(201).json({
        id: admin.id,
        email: admin.email,
        login,
        token: jwt.sign({ id: admin.id }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res.status(400).json({
        message: 'Не удалось создать пользователя',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Ошибка регистрации: ${error}`,
    });
  }
};

/**
 *
 @route GET /api/admin/current
 @desc Текущий пользователь
 @access Protected
 */
export const current = async (req, res) => {
  // возвращаем текущего пользователя, которого мы записали в мидлваре auth
  return res.status(200).json(req.admin);
};
