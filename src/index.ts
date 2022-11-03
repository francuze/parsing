import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.delivery-club.ru/srv/KFC_msk/feedbacks'; // URL, который мы очищаем
const AxiosInstance = axios.create(); // Создать новый экземпляр Axios

interface feedbacks { // Интерфейс 
    author: string; // Имя кто отправил отзыв
    feedback: string; // Сам отзыв
    rating: string;
    order: string; // Заказ
}
  
// Отправляю асинхронный HTTP-запрос Get на URL-адрес
AxiosInstance.get(url)
  .then( // Прогрузка страницы
    response => {
      const html = response.data; // Получаю данные от сайта
      const $ = cheerio.load(html); 
      const Orders: cheerio.Cheerio = $('.vendor-reviews-item__container');
      const feedbacklist: feedbacks[] = [];
      Orders.each((i,element) => {
        const author = $(element).find('.vendor-reviews-item__username').text().replace(/\s\s+/g, '');
        const feedback = $(element).find('.vendor-reviews-item__text').text().replace(/\s\s+/g, '');
        const order = $(element).find('.vendor-reviews-item__order').text().replace(/\s\s+/g, '');
        const rating = $(element).find('.vendor-reviews-item__icon').text().replace(/\s\s+/g, '');
        feedbacklist.push({
          author,
          feedback,
          order,
          rating
        })
        console.log(feedbacklist);
      });
    }
  )
  .catch(console.error); // Обработка ошибки