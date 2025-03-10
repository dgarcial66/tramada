# TRAMADA TEXTILES

Tramada es una empresa dedicada a la industria textil, diseñando sus propios modelos de prendas para clientes al detal y al por mayor. Este proyecto está dirigido a mejorar el registro y organización de toda su materia prima y productos, con el fin de optimizar el control logístico y la trazabilidad de los materiales.

![Versión](https://img.shields.io/badge/versi%C3%B3n-2.0.1-green)

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Diagrama BPMN](#diagrama-bpmn)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Créditos](#créditos)
- [Estado del Proyecto](#estado-del-proyecto)
- [Tecnologías Usadas](#tecnologías-usadas)

## Descripción

Este proyecto busca implementar un sistema para mejorar el control y manejo de materias primas en la empresa. El objetivo principal es optimizar los procesos relacionados con la gestión de inventario, asegurando un flujo eficiente de materiales y una mejor trazabilidad de los mismos.

### Funcionalidades

- Seguimiento en tiempo real del inventario de materias primas.
- Registro y control de entradas y salidas de materiales.
- Generación de informes y reportes sobre el estado del inventario.

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

```bash
   git clone git@github.com:Mikejoya/tramada.git
   cd tramada
```

## Uso

1. Base de datos: Crea la base de datos que se encuentra en la carpeta database dentro del proyecto y levanta el servicio. Recuerda que este proyecto usa MariaDB, pero también es compatible con MySQL.

2. Levantar la API: Posiciónate en la carpeta projectNode y ejecuta:

```Bash
- npm install
- npm run dev
```

3. Levantar el frontend: Posiciónate en la carpeta projectReact y ejecuta:

```Bash
- npm install
- npm run dev
```

## Contribuciones

¡Las contribuciones son bienvenidas! Usamos el flujo de trabajo Git Flow.

Para colaborar, clona el repositorio y trabaja en la rama adecuada según la siguiente estructura:

Más información sobre Git Flow [aqui](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

- `main`: Para producción (solo código estable).

- `develop`: Para desarrollo (código más avanzado).

- `feature/`: Para nuevas funcionalidades.

- `hotfix/`: Para correcciones críticas.

- `release/`: Para preparar releases.

## Pasos para contribuir

1. Haz un fork del proyecto.

2. Crea una rama para tu feature

```bash
    git checkout -b feature/nueva-funcionalidad
```

3. Haz commit de tus cambios

```bash
    git commit -m 'Agrega nueva funcionalidad
```

4. Haz push a la rama

```bash
    git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [MIT](https://github.com/Mikejoya/tramada/blob/main/License) para más detalles.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue)

## Créditos

Agradecimientos a los colaboradores:

- [dGarcia66](https://github.com/dgarcial66): Por \*\*contribución.
- [lopaspi89](https://github.com/lopaspi89): Por \*\*contribución.

## Estado del Proyecto

Este proyecto está en **desarrollo activo**.

## Tecnologías Usadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Mariadb](https://mariadb.com/)

## Ayuda

Siempre puedes dejar un issue en el repositorio. Estaremos pendientes.
