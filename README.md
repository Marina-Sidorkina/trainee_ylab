# Study project Front-2022

Учебный проект на React

## Требования

- Node.js >= 12

## Установка

`npm install`

## Запуск для разработки

В режиме разработки (development)  приложение запускается командой:

`npm start`

В режиме разработки используется локальный webpack http сервер для отслеживания изменения в коде и последующего “горячего” обновления приложения в браузера. 

## Настройка

Конфигурация приложения в файле `src/config.ts`. В config.ts можно добавлять свои параметры под соответствующие сервисы.

Параметры сборки определяются в файле `webpack.config.ts`. По умолчанию учтены режимы разработки/продакшена, импорта файлов с jsx, less, картинок, шрифтов, прокси для апи (обхода CORS).

## Сборка для продакшена

Для публикации проекта на сервере сначала выполняется сборка приложения командой:

`npm run build`

Собранные и минимизированные файлы оказываются в папке `/dist`. На http сервере директория `/dist` должны быть публичной. 
Основные файлы в ней - это `index.html` и `main.js`

Для продакшена потребуется настроить http сервер. Рекомендуется использовать nginx.
Nginx должен отдавать статичные файлы из `./dist`, а если url не на существующий файл, то отдавать `./dist/index.html`.

Пример настройки nginx

```
server {
    listen 80;
    server_name study-front2022.com;
    location / {
        root /home/user/study-front2022/dist;
        try_files $uri /index.html;
    }
}
```

## Алиасы путей

Вместо указания относительных путей `../` можно применить алиас на `src` директорию.

```js
import Button from "@src/components/button"
```
