import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

// Створи фронтенд частину програми пошуку даних про країну за її частковою або повною назвою.
// HTTP-запит
// Використовуй публічний API Rest Countries v2, а саме ресурс name, який повертає масив об'єктів країн, що задовольнили критерій пошуку.
// Додай мінімальне оформлення елементів інтерфейсу.
// Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.
// Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.

// Фільтрація полів
// У відповіді від бекенду повертаються об'єкти, велика частина властивостей яких, тобі не знадобиться. Щоб скоротити обсяг переданих даних, додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів. Ознайомся з документацією синтаксису фільтрів.
// Тобі потрібні тільки наступні властивості:
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// Поле пошуку
// Назву країни для пошуку користувач вводить у текстове поле input#search - box.
// HTTP - запити виконуються при введенні назви країни, тобто на події input.
// Але робити запит з кожним натисканням клавіші не можна, оскільки одночасно буде багато запитів і вони будуть виконуватися в непередбачуваному порядку.
// Необхідно застосувати прийом Debounce на обробнику події і робити HTTP - запит через 300мс після того, як користувач перестав вводити текст.
// Використовуй пакет lodash.debounce.
// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
// Виконай санітизацію введеного рядка методом trim(), це вирішить проблему, коли в полі введення тільки пробіли, або вони є на початку і в кінці рядка.

const DEBOUNCE_DELAY = 300;

const searchCountries = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchCountries.addEventListener('input', debounce(textOut, DEBOUNCE_DELAY));

function textOut() {
  // console.log(searchCountries.value);
  Notiflix.Notify.success(`textOut = ${searchCountries.value} `);
  fetchCountries(searchCountries.value);
}

// console.log(test);
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');
