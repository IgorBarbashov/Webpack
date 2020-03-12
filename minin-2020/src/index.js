import { Post } from './Post';
import './styles/styles.css';
import json from './assets/json';
import WebpackLogo from './assets/webpack-logo.png';
import xml from './assets/data.xml';
import csv from './assets/data.csv';

const post = new Post('Webpack post title', WebpackLogo);

console.log('post:', post.toString());
console.log('json:', json);
console.log('xml:', xml);
console.log('csv:', csv);
