// Фільтрація полів
// У відповіді від бекенду повертаються об'єкти, велика частина властивостей яких, тобі не знадобиться.
// Щоб скоротити обсяг переданих даних, додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів.
// Ознайомся з документацією синтаксису фільтрів.
// Тобі потрібні тільки наступні властивості:
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

import Notiflix from 'notiflix';

function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/name';
  return fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('ops, there is no country with that name');
    });
}
export { fetchCountries };
