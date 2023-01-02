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
const countryListQuery = document.querySelector('.country-list');
const countryInfoQuery = document.querySelector('.country-info');

let searchCountriesItems;
let countryList;
let countryInfo;

const styles = document.querySelector('body');
const loadStyles = `<style>
  #search-box {
    margin-top: 40px;
    margin-left: 40px;
    width: 300px;
  }
  #search-box:focus {
    border:2px solid blue;
    box-shadow: 0 0 10px #719ECE;
  }
  .countryItem {
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
  }
  .countryTitle {
    font-size:20px
  }
  .country-info {
    margin-left: 40px; 
  }
  .infoItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .infoItemTitle {
    font-size: 30px;
    font-weight: bold;
  }
  .infoItemParamBox {
    font-size: 20px;
    font-weight: bold;
  }
  .infoItemValue {
    font-size: 20px;
    font-weight: normal;
  }
  </style>`;
styles.insertAdjacentHTML('beforeend', loadStyles);

searchCountries.addEventListener('input', debounce(textOut, DEBOUNCE_DELAY));

function createItems(className, selector) {
  const element = document.createElement('div');
  element.classList = className;
  selector.append(element);
  return element;
}

function createCountryList(flags, name) {
  countryList.insertAdjacentHTML(
    'beforeend',
    `
  <li class="countryItem">
  <img src="${flags}"alt="flag of contry" width="40">
  <span class="countryTitle"> ${name}</span>
  </li>`
  );
}

function createCountryInfo(flags, name, capital, population, languages) {
  if (searchCountriesItems) searchCountriesItems.remove();
  countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="infoItem"><img class="infoItemImage" src="${flags}"
      alt="flag of contry" width="40">
      <span class="infoItemTitle">${name}</span></div>
      <div class="infoItemParamBox"><p class="infoItemParam">Capital : <span class="infoItemValue">${capital}</span></p>
      <p class="infoItemParam">Population : <span class="infoItemValue">${population}</span></p>
      <p class="infoItemParam">Languages : <span class="infoItemValue">${languages}</span></p></div>`
  );
}

function textOut() {
  searchCountriesItems = document.querySelector('.countryItems');
  const searchInfoItems = document.querySelector('.infoItems');
  if (searchCountriesItems) searchCountriesItems.remove();
  if (searchInfoItems) searchInfoItems.remove();
  countryInfo = createItems('infoItems', countryInfoQuery);
  countryList = createItems('countryItems', countryListQuery);
  if (searchCountries.value !== '') {
    fetchCountries(searchCountries.value.trim())
      .then(data => {
        if (data) {
          if (data.length > 10)
            return Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          for (let i = 0; i < data.length; i += 1) {
            const { name, capital, population, flags, languages } = data[i];

            if (data.length === 1) {
              createCountryInfo(
                flags.svg,
                name.official,
                capital.toString(),
                population,
                Object.values(languages).toString()
              );
            } else createCountryList(flags.svg, name.official);
          }
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('ops, there is no country with that name');
      });
  } else {
    if (searchCountriesItems) searchCountriesItems.remove();
    if (searchInfoItems) searchInfoItems.remove();
  }
}

// const { name, capital, population, flags, languages } = data[i];
// console.log('Повна назва країни :', name.official);
// console.log('Столиця :', capital.toString());
// console.log('Населення :', population);
// console.log('Зображення прапора :', flags.svg);
// console.log('Масив мов :', Object.values(languages).toString());
