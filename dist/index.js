"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = 'https://www.delivery-club.ru/srv/KFC_msk/feedbacks'; // URL, который мы очищаем
const AxiosInstance = axios_1.default.create(); // Создать новый экземпляр Axios
// Отправляю асинхронный HTTP-запрос Get на URL-адрес
AxiosInstance.get(url)
    .then(// Прогрузка страницы
// Прогрузка страницы
response => {
    const html = response.data; // Получаю данные от сайта
    const $ = cheerio_1.default.load(html);
    const Orders = $('.vendor-reviews-item__container');
    const feedback = [];
    Orders.each((i, element) => {
        const author = $(element).find('.vendor-reviews-item__username').text().replace(/\s\s+/g, '');
        const feedback = $(element).find('.vendor-reviews-item__text').text().replace(/\s\s+/g, '');
        const order = $(element).find('.vendor-reviews-item__order').text().replace(/\s\s+/g, '');
        const rating = $(element).find('.vendor-reviews-item__icon').text().replace(/\s\s+/g, '');
        console.log(`Автор: ` + author, `\n Отзыв: ` + feedback, `\n Рейтинг: ` + rating, `\n Отзыв: ` + order, `тест`);
    });
})
    .catch(console.error); // Обработка ошибки
//# sourceMappingURL=index.js.map