import some from './some';
// import $ from 'jquery';

// $('.title').html('Some text1');

console.log(
    some.avg(1, 2, 3, 11)
);

console.log(
    some.merge({a:5}, {b:6})
);

// если импортируем через ExtractTextPlugin - он плолжит этот файл в dist/
// если импортируем НЕ через ExtractTextPlugin - добавить все в <head>
import '../css/style.css';