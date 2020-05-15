### `Como iniciar o projeto`

Crie um arquivo .env e preencha os valores </br>
 DATABASE_PROD_USER = database user
 </br>
DATABASE_PROD_PW = database password
</br>
DATABASE_PROD_DBNAME =  database db name
</br>
DATABASE_PROD_HOST = database host
 </br>
Na pasta root do projeto,instale as dependencias utilizando npm install e para inciar digite npm run dev e o projeto será inicializado em localhost:8080

### `Dependências utilizadas no projeto`

- Express
- jsonwebtoken
- md5
- mysql2
- sequelize
- yup
- dotenv
- cors

### `banco de dados`
banco utilizado: mysql
</br>
create table Usuario(IdUsuario bigint auto_increment primary key not null,Nome varchar(255) not null,Senha varchar(255) not null);
</br>
create table Entrega (IdEntrega bigint auto_increment primary key not null, 
IdUsuario bigint not null,
DataEntrega datetime not null,
PontoPartidaLat varchar(50) not null,
PontoPartidaLong varchar(50) not null,
PontoDestinoLat varchar(50) not null,
PontoDestinoLong varchar(50)not null,
TipoViagem varchar(50) not null,
Foreign Key (IdUsuario) references Usuario(IdUsuario)
);
