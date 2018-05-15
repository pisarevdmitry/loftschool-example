/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const repeat = document.querySelector('.repeat');

    loadingBlock.innerText = 'Загрузка...';

    return new Promise((resolve) =>{
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', { method: 'GET' })
            .then(response =>{
                return response.json()
            })
            .then(data => {
                let result = data.sort((a, b) =>  a.name <= b.name ? -1 : 1);

                loadingBlock.innerText = '';
                filterBlock.style.display = 'block';
                if (repeat) {
                    repeat.style.display = 'none'
                }
                resolve(result)
            })
            .catch(() => {
                loadingBlock.innerText = 'Не удалось загрузить города';
                if (!repeat) {
                    let button = document.createElement('button');

                    button.innerText = 'Повторить';
                    button.classList = 'repeat';
                    button.addEventListener('click', loadTowns);
                    homeworkContainer.insertBefore(button, filterBlock)
                } else {
                    repeat.style.display = 'inline-block'
                }
            })
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (!chunk) {
        return false
    }

    return full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
const list = loadTowns();

filterInput.addEventListener('keyup', function() {
    let request = filterInput.value;
    let fragment = document.createDocumentFragment();

    list.then(values => {
        filterResult.innerHTML= '';
        values.filter(item => isMatching(item.name, request)).forEach((item) => {
            let div = document.createElement('div');

            div.innerText = item.name;
            fragment.appendChild(div)

        });
        filterResult.appendChild(fragment)
    })

});

export {
    loadTowns,
    isMatching
};
