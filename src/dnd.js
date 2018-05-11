/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div');
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const divWidth = Math.floor(Math.random() * screenWidth / 2);
    const divHeight = Math.floor(Math.random() * screenHeight / 2);

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
    div.classList = 'draggable-div';
    div.style.cssText = `
           background-color : ${getRandomColor()};
           width: ${divWidth}px;
           height: ${divHeight}px;
           position : absolute;
           top : ${(Math.random() * (screenHeight - divHeight) )}px;
           left : ${(Math.random() * (screenWidth - divWidth) )}px;
           cursor: pointer`;

    return div

}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', event => {
        const getCoords = elem => {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };
        const move = (event) => {
            target.style.left = event.pageX - shiftX + 'px';
            target.style.top = event.pageY - shiftY + 'px';
        };
        let coords = getCoords(target);
        let shiftX = event.pageX - coords.left;
        let shiftY = event.pageY - coords.top;

        target.style.zIndex = 1000;

        move(event);
        target.ondragstart = () => {
            return false;
        };
        document.addEventListener('mousemove', move );
        target.addEventListener('mouseup', () =>{
            target.style.zIndex = 0;
            document.removeEventListener('mousemove', move)
        })

    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
