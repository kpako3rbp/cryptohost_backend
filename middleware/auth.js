import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma-client.js';

export const authAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]; // Отрезаем Bearer

    // декодируем токен, чтобы получить из него id пользователя
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id, // ищем в БД пользователя с таким же id, как в токене
        role: 'admin',
      },
    });

    if (!admin) {
      return res.status(401).json({
        message: 'Нет доступа: администратор не авторизован',
      });
    }

    // если админ найден, то добавляем его в запрос
    req.admin = admin;

    // console.log('admin', admin)

    // если все ок, то мы выполняем следующую функцию (которая идет следом
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Нет доступа: администратор не авторизован',
    });
  }
};

export const authUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]; // Отрезаем Bearer

    // декодируем токен, чтобы получить из него id пользователя
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id, // ищем в БД пользователя с таким же id, как в токене
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Нет доступа: пользователь не авторизован',
      });
    }

    // если пользователь найден, то добавляем его в запрос
    req.user = user;

    // если все ок, то мы выполняем следующую функцию (которая идет следом
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Нет доступа: пользователь не авторизован',
    });
  }
};

export default { authAdmin, authUser };
