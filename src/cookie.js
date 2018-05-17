/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

showCookie(document.cookie.split(';'));

function showCookie(cookie) {
    if (!cookie) {
        return
    }
    listTable.innerHTML='';
    cookie.forEach(item => {
        item = item.trim();
        addCookie(item)
    })
}
function addCookie(cookie) {
    let [CookieName, CookieValue] = cookie.split('=')
    const line = document.createElement('tr');
    const itemName = document.createElement('td');
    const itemValue = document.createElement('td');
    const buttonDelete = document.createElement('button');

    itemName.innerText = CookieName;
    itemValue.innerText = CookieValue;
    buttonDelete.innerText = 'Удалить куку';
    line.appendChild(itemName);
    line.appendChild(itemValue);
    line.appendChild(buttonDelete);
    listTable.appendChild(line)
}

function isValid([name, value], filter) {
    name = name.toUpperCase();
    value = value.toUpperCase();
    filter = filter.toUpperCase();

    return (name.indexOf(filter) >= 0 || value.indexOf(filter) >= 0)
}
function filterCookie() {
    let list = document.cookie,
        filter = filterNameInput.value,
        cookie = list.split(';');

    if (!filter) {
        showCookie(cookie)
    } else {
        let filtered = cookie.filter(item =>{
            return isValid(item.split('='), filter)
        });

        showCookie(filtered)
    }
}
listTable.addEventListener('click', (e) =>{
    if (e.target.tagName === 'BUTTON') {
        let parent = e.target.parentNode,
            CookieName = parent.firstElementChild.innerText;

        document.cookie =`${CookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT `;
        parent.remove()
    }
});
filterNameInput.addEventListener('keyup', filterCookie)

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let filter = filterNameInput.value;
    let CookieName = addNameInput.value,
        CookieValue = addValueInput.value;

    if (!CookieName || !CookieValue) {
        return
    }
    if (document.cookie.indexOf(`${CookieName}=`) >= 0) {
        document.cookie =`${CookieName}=${CookieValue}; expires=3600 `;
        filterCookie();
    } else {
        if ( isValid([CookieName, CookieValue], filter)) {
            addCookie(`${CookieName}=${CookieValue}`);
        }
        document.cookie =`${CookieName}=${CookieValue}; expires=3600 `;
    }
});
