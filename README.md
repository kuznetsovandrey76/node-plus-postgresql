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


Создаем таблицу в psql   
```
create table flights1(
id serial primary key,
origin varchar(50) not null,
destination varchar(50) not null,
duration integer
);
```