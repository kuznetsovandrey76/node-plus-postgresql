_Структура_  
```
- app.js   
- package.json   
- index.js   
- views/   
  - home.handlebars   
  - layouts/   
    - main.handlebars   	
- public/   
  - main.js     
  - style.css 
```  
1. `npm install`  
2. `node app`  
3. `touch Procfile` in Procfile `web: node app.js`    

_Предварительная работа в psql_   
1. При входе в SQL SHELL(psql) все данные берем из pgAdmin3 or Heroku  
2. `psql \! chcp 1251` - исправляем корявый шрифт  
3. `\dt` - список таблиц в БД   
4. Создаем новую таблицу     
```
create table flights1(
id serial primary key,
origin varchar(50) not null,
destination varchar(50) not null,
duration integer
);
```
