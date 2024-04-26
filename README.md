# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=30&pause=1000&random=false&width=500&lines=Male-Fashion+(Backend))](https://git.io/typing-svg)

![Swagger UI - Google Chrome 2024-04-27 00-57-29](https://github.com/ShnaiderDanila/male-fashion-store-api/assets/116545792/b235e855-785d-4d27-8dea-f99268839865)

## Описание проекта
**Male-Fashion** - интернет-магазин мужской одежды (e-commerce). Отзывчиво-адаптивное Full-Stack приложение.

**Ссылки на проект:**
- Frontend: https://male-fashion.ru
- Backend (REST API): https://male-fashion.ru/api
- Swagger: https://male-fashion.ru/api/docs

**Ссылки на репозитории:**
- Frontend: https://github.com/ShnaiderDanila/male-fashion-store-frontend
- Backend: https://github.com/ShnaiderDanila/male-fashion-store-api

## Функциональность (Backend): 
* Реализованы контроллеры, провайдеры и сервисы товаров, пользователей, авторизации, постов блога и заказов (по классификации CRUD).
  Полный список можно посмотреть в документации Swagger - https://male-fashion.ru/api/docs
* Настроена конфигурация переменных окружения .development.env и .production.env
* Реализована регистрация с помощью JWT токена.
* С помощью guard ограничен доступ к некоторым роутам для неавторизованных пользователей
* Настроена валидация данных через Class-validator и подключена через GlobalPipes
* Настроена раздача статических файлов
* Приложение развернуто на облачном сервере VSCALE
* Подключен домен male-fashion.ru (хостинг-провайдер - TimeWeb)
* Настроен NGINX
* Подключен SSL сертификат (certbot)

## Используемые технологии (Backend):
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

## 🚀 Запуск проекта (Backend):

#### Клонировать репозиторий:
```
git clone git@github.com:ShnaiderDanila/male-fashion-store-api.git
```
#### Установить зависимости:
```
npm install
```
#### Запустить приложение в DEV MODE:
```
npm run start:dev
```
#### Запустить приложение в PROD MODE:
```
npm run start:prod
```

## Планы по доработке проекта (Backend):
* Подключить сервис приема электронных платежей - ЮMoney
* Добавить роли пользователей
* Делегировать на backend логику обработки пагинации, сортировки, фильтрации товаров и логику обработки корзины
* Добавить новые роуты для админ панели


## Автор

**Данила Шнайдер**

- E-mail: [d.shnder@gmail.com](mailto:d.shnder@gmail.com)
- Telegram: [@shnaider_danila](https://t.me/shnaider_danila)


