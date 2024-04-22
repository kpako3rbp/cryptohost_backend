# Backend-часть

## Начало работы

1. Создание экспресс-приложения:
    ```bash
    $ npm i -g express-generator // установка генератора експресс
    $ express --no-view // без статических файлов, нужны только роуты
    $ npm install
    ```

2. Установка пакетов:
    ```bash
    $ npm i dotenv concurrently // 1) для использования переменных из окружения 2) для запуска бекенда и фронтенда одновременно
    $ npm i -D nodemon // для автоперезагрузки сервера при изменениях (в dev-ззависимости)
    ```

   Можно сразу дописать `package.json` и установить все, что нужно на начальном этапе:
    ```json
    "dependencies": {
        "@prisma/client": "^5.12.1",
        "bcrypt": "^5.1.0",
        "concurrently": "^8.2.2",
        "cookie-parser": "~1.4.4",
        "cors": "^2.8.5",
        "debug": "~2.6.9",
        "dotenv": "^16.4.5",
        "express": "~4.16.1",
        "jsonwebtoken": "^9.0.0",
        "morgan": "~1.9.1"
    },
    "devDependencies": {
        "nodemon": "^3.1.0",
        "prettier": "^2.6.2",
        "prisma": "^5.12.1"
    },
    "prettier": {
        "singleQuote": true
    }
    ```

3. Команда `server`, `client` и `dev` в `package.json` для запуска:
    ```json
    "server": "nodemon ./bin/www",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
    ```

## Дополнительная подготовка

1. Переменные окружения:
   Создаем файл `.env` и добавляем:
    ```dotenv
    PORT=8000
    ```

2. Сделаем `type = module`:
   Переделываем импорты в `bin -> env`, `app.js`.

3. Добавляем `dotenv.config()` в `app.js`.

## Подключение БД

1. Установка ORM Prisma:
    ```bash
    $ npm i prisma
    ```

2. Инициализация:
    ```bash
    $ npx prisma init --datasource-provider sqlite
    ```

   В `.env` будут добавлены данные:
    ```dotenv
    DATABASE_URL="file:./dev.db"
    ```

   !!! Так же нужно добавить туда `JWT_SECRET`, это нужно для хэширования пароля !!!

3. В файле `schema.prisma` нужно будет описать все модели. Например, так может выглядеть схема для User:
    ```prisma
    model User {
      id              String     @id @default(uuid()) // обязательно нужно присвоить уникальный id
      email           String
      password        String
      name            String
      createdEmployee Employee[] // связка с таблицей с сотрудниками (пример)
    }
    ```

   Эти схемы затем будут преобразованы в таблицы с помощью языка SQL.

4. Когда схемы созданы, мы можем сделать миграцию:
    ```bash
    $ npx prisma migrate dev --name init
    ```

   Будет создана БД `prisma -> dev.db`. Схемы будут находиться в папке `prisma -> migrations`.

   !!!-------------!!!
   Если нужно внести изменения и сделать миграцию заново, то надо ввести:
    ```bash
    $ npx prisma migrate dev
    ```

   После этого нужно перезагрузить prisma studio, чтобы изменения отобразились.
   !!!-------------!!!

5. !!! ОБЯЗАТЕЛЬНО нужно создать файл `prisma -> prisma-client.js` с содержимым:
    ```javascript
    import { PrismaClient } from '@prisma/client';

    const prisma = new PrismaClient();

    export default prisma;
    ```

6. Теперь можно запустить визуальное отображение БД:
    ```bash
    $ npx prisma studio
    ```

   БД будет открыта на порту 5555 (по умолчанию).

## Создание роутов, контроллеров

1. Создаем папки `middleware`, `controllers`.
   Необходимо сделать аутентификацию, тут проще воспользоваться готовым кодом:
   Файлы:
    - `controllers -> UserController.js`,
    - `middleware -> auth.js`,
    - `routes -> users.js`.

2. Импорт `usersRouter` в `app.js` и использование:
    ```javascript
    app.use('/api/user', usersRouter);
    ```

==================

Теперь можно отправлять запросы с помощью Postman для тестирования. Очень важно, чтобы был
создан `prisma -> prisma-client.js`, иначе ничего работать не будет.


# Frontend-часть

## Установка react, redux-typescript

1. Создаем папку `client`, в которой будет располагаться фронтенд админ-панели.
   ```bash
    $ npx create-next-app client --template redux-typescript
    ```


