# Usamos la imagen oficial de MariaDB 11.4.5
FROM mariadb:11.4.5

# Puedes configurar variables de entorno aquí si quieres valores por defecto

# Copiamos el script de inicialización dentro del contenedor
COPY database/init.sql /docker-entrypoint-initdb.d/

# Expone el puerto estándar de MariaDB
EXPOSE 3306

# El contenedor usará el entrypoint y comando que trae la imagen oficial,
# por lo que no hace falta especificar CMD o ENTRYPOINT aquí a menos que quieras personalizarlo.
