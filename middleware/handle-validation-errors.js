import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req); // возвращаем ошибки после валидации схемы, если они есть

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Ошибка валидации',
      validationErrors: errors.array(),
    });
  }

  next();
};
