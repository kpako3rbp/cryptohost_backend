import { body } from 'express-validator';

export const registerValidation = [
  body('login')
    .notEmpty()
    .withMessage('Укажите логин')
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage('Логин должен быть от 3 до 20 символов'),
  body('email')
    .notEmpty()
    .withMessage('Укажите почту')
    .isEmail()
    .withMessage('Неверный формат почты'),
  body('password')
    .notEmpty()
    .withMessage('Укажите пароль')
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage('Пароль должен быть от 5 до 50 символов'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('Подтвердите пароль')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли не совпадают');
      }
      return true;
    }),
];

export const loginValidation = [
  body('login').notEmpty().withMessage('Укажите логин'),
  body('password').notEmpty().withMessage('Укажите пароль'),
];

export const promoBannerValidation = {
  create: [
    body('meta_title')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('Мета-заголовок должен быть быть от 3 до 100 символов'),
    body('title')
      .isLength({ min: 3, max: 100 })
      .withMessage('Заголовок должен быть быть от 3 до 100 символов'),
    body('description')
      .isLength({ min: 3, max: 100 })
      .withMessage('Описание должно содержать от 3 до 100 символов'),
    body('image')
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с uploads/'),
    body('url')
      .notEmpty()
      .withMessage('Укажите ссылку')
      .isURL()
      .withMessage('Укажите корректный URL'),
  ],
  update: [
    body('meta_title')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('Мета-заголовок должен быть быть от 3 до 100 символов'),
    body('title')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('Заголовок должен быть быть от 3 до 100 символов'),
    body('description')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('Описание должно содержать от 3 до 100 символов'),
    body('image')
      .optional()
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с uploads/'),
    body('url')
      .optional()
      .notEmpty()
      .withMessage('Укажите ссылку')
      .isURL()
      .withMessage('Укажите корректный URL'),
  ],
};

export const newsCategoryValidation = [
  body('name')
    .notEmpty()
    .withMessage('Укажите имя категории')
    .isLength({ min: 2, max: 20 })
    .withMessage('Название категории должно содержать от 2 до 20 символов'),
];

export const newsPostValidation = {
  create: [
    body('metaTitle', 'Мета-заголовок должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('title', 'Заголовок новости должен быть от 3 до 100 символов')
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('categoryId', 'Укажите ID категории').isString(),
    body('publishedAt', 'Неверный формат даты публикации')
      .optional()
      .isISO8601(),
    body('image', 'Укажите ссылку на изображение, начинающуюся с uploads/')
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с /uploads/'),
    body('body', 'Текст статьи должен быть не менее 10 символов')
      .isLength({ min: 10 })
      .isString(),
  ],
  update: [
    body('metaTitle', 'Мета-заголовок должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('title', 'Заголовок новости должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('categoryId', 'Укажите ID категории').optional().isString(),
    body('publishedAt', 'Неверный формат даты публикации')
      .optional()
      .isISO8601(),
    body('image', 'Укажите ссылку на изображение, начинающуюся с uploads/')
      .optional()
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с /uploads/'),
    body('body', 'Текст статьи должен быть не менее 10 символов')
      .optional()
      .isLength({ min: 10 })
      .isString(),
  ],
};

export const cryptoActivitiesValidation = {
  create: [
    body('metaTitle', 'Мета-заголовок должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('title', 'Заголовок криптоактивности должен быть от 3 до 100 символов')
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('publishedAt', 'Неверный формат даты публикации')
      .optional()
      .isISO8601(), // Поле published_at опциональное
    body('image', 'Укажите ссылку на изображение, начинающуюся с uploads/')
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с /uploads/'),
    body('body', 'Текст статьи должен быть не менее 10 символов')
      .isLength({ min: 10 })
      .isString(),
  ],
  update: [
    body('metaTitle', 'Мета-заголовок должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('title', 'Заголовок криптоактивности должен быть от 3 до 100 символов')
      .optional()
      .isLength({ min: 3, max: 100 })
      .isString(),
    body('publishedAt', 'Неверный формат даты публикации')
      .optional()
      .isISO8601(),
    body('image', 'Укажите ссылку на изображение, начинающуюся с uploads/')
      .optional()
      .notEmpty()
      .withMessage('Укажите путь к изображению')
      .matches(/^uploads\//)
      .withMessage('Укажите ссылку на изображение, начинающуюся с /uploads/'),
    body('body', 'Текст статьи должен быть не менее 10 символов')
      .optional()
      .isLength({ min: 10 })
      .isString(),
  ],
};
