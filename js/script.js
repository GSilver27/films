/*

ЗАДАЧИ 1
1) Удалить все рекламные блоки со страницы (правая часть сайта)
2) Изменить жанр фильма, поменять "комедия" на "драма"
3) Изменить задний фон с постером фильма на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS
4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 
5) Добавить нумерацию выведенных фильмов

ЗАДАЧИ 2
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    

    // ЗАДАЧИ 1
    const adv = document.querySelectorAll('.promo__adv img'),
          genre = document.querySelector('.promo__genre'),
          promoBg = document.querySelector('.promo__bg'),
          movieList = document.querySelector('.promo__interactive-list');

    // 1
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
       
    // 2-3
    const makeChanges = () => {
        genre.textContent = "драма";

        promoBg.style.background = "url('../img/bg.jpg')";
    };

    // 4
    const sortArr = (arr) => {
        arr.sort();
    };

    // 5
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        // 2. 5
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        // 2. 3
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                // отсортировуем нумерацию
                createMovieList(films, parent);
            });
        });
    }

    // ЗАДАЧИ 2
    // 1
    const addForm = document.querySelector('form.add'),
          addInput = document.querySelector('.adding__input'),
          checkbox = document.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            // 2
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`;
            }

            // 4
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});
