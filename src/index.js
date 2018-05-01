/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let index=0 ; index<array.length; index++) {
        fn(array[index], index, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray =[];

    for (let index=0 ; index<array.length; index++) {
        newArray[index] = fn(array[index], index, array)
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let index;

    if (initial === undefined) {
        index =1;
        initial = array[0]
    } else {
        index =0
    }
    for (; index < array.length; index++) {
        initial = fn(initial, array[index], index, array)
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = [],
        index = 0;

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr[index] = prop.toUpperCase();
            index++
        }
    }

    return arr
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArray = [];

    if (to > array.length) {
        to= array.length
    } else if (to < 0) {
        to = array.length +to > 0 ?array.length +to: 0 ;
    }
    if (from < 0) {
        from = array.length + from > 0 ?array.length +from: 0 ;
    }

    for (let i= from, index=0; i< to ;i++, index++) {

        newArray[index] = array[i];
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(obj, prop, value) {
            obj[prop] = value * value;

            return true;
        }
    });

    return proxy
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
