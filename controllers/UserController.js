import prisma from '../prisma/prisma-client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// TODO передалать эту сущность в администратора и добавить сущность для пользователя (потом)
/**
 *
 @route POST /api/user/login
 @desc Авторизация
 @access Public
 */
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        login,
      },
    });

    // Пароль, который ввел пользователь хэшируется и сверяется с захэшированным паролем с БД
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        login: user.login,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
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
 @route POST /api/user/register
 @desc Регистрация
 @access Public
 */
export const register = async (req, res) => {
  try {
    const { email, login, password } = req.body;

    const registeredUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUserByEmail) {
      return res.status(400).json({
        message: 'Пользователь с таким email уже существует',
      });
    }

    const registeredUserByLogin = await prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (registeredUserByLogin) {
      return res.status(400).json({
        message: 'Пользователь с таким логином уже существует',
      });
    }

    // salt это строка, которая будет добавляться к хэшу, чтобы усилить безопасность
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        login,
        password: hashedPassword,
        created_at: new Date(),
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        login,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
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
 @route GET /api/user/current
 @desc Текущий пользователь
 @access Protected
 */
export const current = async (req, res) => {
  // возвращаем текущего пользователя, которого мы записали в мидлваре auth
  return res.status(200).json(req.user);
};
