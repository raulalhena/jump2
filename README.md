# Jump2Digital Hackathon Backend

API de control de productos y tickets. Se gestionan tanto productos como tickets a través de diferentes end points que facilitan las tareas básicas de CRUD: **CREAR, CONSULTAR, ACTUALIZAR Y BORRAR**, tienendo un end point para obtener analiticas de pedidos.

## Background

El proyecto ha sido creado para la participación en el Hackathon de **_Jump2Digital_** promocionado por **_Nuwe_**, siguiendo las especificaciones facilitadas.

## Usage

Para usarlo, es necesario realizar consultas a los endpoints descritos en la sección API para realizar la acción deseada a través de los verbos HTML: GET, POST, PUT, DELETE.

Se levanta el servidor Express, por defecto en el puerto 5000, para la exposición de la API, usando el ORM Prisma junto a MySQL para la persistencia de datos.

Encontrarás el uso de **_importación de módulos de ES6_**, configurado en el package.json. Se ha realizado con JS funcional a excepción de los modelos de datos **_Producto y Ticket, que se han encapsulado en clases_**. El trabajo asíncrono se ha implementado con el uso de **_async/await_** para simplificar y conseguir una mayor legibilidad del código.

## API/Component

Descripción de los dos modelos **_Producto y Ticket_** con sus correspondientes endpoints.

### Producto

### Endpoint: /producto

- **GET** - Consulta de producto particular (_método Product.get(\_id)_):

  - Recibe: JSON
    - Parametros:
      - id = String \- UUID \- Requerido
  - Devuelve: JSON

    - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - message = String \- Mensaje de producto encontrado o de error.
    - data = Objeto con los datos del producto obtenido:

      - id
      - name
      - price
      - description

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "Product found",
        "data": {
            "id": "5125c012-8611-4ad2-bdc5-e44d98fe1871",
            "name": "Raptor4",
            "price": 214,
            "description": "Laptops"
        }
    }

    ERROR:
    {
        "code": 400,
        "message": "Product not found",
        "data": null
    }
    ```

- **POST** - Crea un nuevo producto (_método Product.create()_):

  - Recibe: JSON
  - Parametros:
    - name = String \- Requerido
    - price = Number \- Double, para uso de decimales. \- Requerido
    - description = Enum \- (Valores predeterminados: **_PC, Laptops, Phones, Tablets, Others_**). \- Requerido
  - Devuelve: JSON
  - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
  - message = String \- Mensaje de producto creado o de error.
  - data = Objeto con los datos del producto creado:

    - id
    - name
    - price
    - description

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "New product created",
        "data": {
            "id": "172d44e2-9680-43ba-bbe0-5f01b68d99a4",
            "name": "INDOMINUS2",
            "price": 18000,
            "description": "PC"
        }
    }
    ```

- **PUT** \- Actualiza un producto existente (_método Product.update(productData)_):

  - Recibe: JSON
  - Parametros, según lo que se quiera modificar:
    - id = String \- UUID \- Requerido
    - name = String \- Opcional
    - price = Number \- Double, para uso de decimales. \- Opcional
    - description = Enum \- (Valores predeterminados: **_PC, Laptops, Phones, Tablets, Others_**). \- Opcional
  - Devuelve: JSON
  - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
  - message = String \- Mensaje de producto actualizado o de error.
  - data = Objeto con los datos del producto actualizado:

    - id
    - name
    - price
    - description

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "Product updated successfully",
        "data": {
            "id": "ceedc2a5-a1a2-4453-a377-95521a86fc0e",
            "name": "RAPTOR KID",
            "price": 800,
            "description": "Tablets"
        }
    }
    ```

- **DELETE** \- Elimina un producto existente (_método Product.delete(\_id)_):

  - Recibe: JSON
  - Parametros:
    - id = String \- UUID \- Requerido
  - Devuelve: JSON
  - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
  - message = String \- Mensaje de producto actualizado o de error.
  - data = Objeto con los datos del producto eliminado:

    - id
    - name
    - price
    - description

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "Product deleted successfully",
        "data": {
            "id": "f994b4bd-2e73-48a4-ac9a-2fe0a8a47715",
            "name": "Rex299",
            "price": 800,
            "description": "PC"
        }
    }
    ```

### Ticket

### Endpoint: /ticket

- **GET** - Consulta de ticket particular o todos los tickets según si recibe el parámetro _id_ o no (_método Ticket.get(\_id) o Ticket.getAll()_):

  - Recibe: JSON
    - Parametros (si es para consulta de un ticket particular):
      - id = String \- UUID \- Requerido
  - Devuelve: JSON

    - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - message = String \- Mensaje de ticket/s encontrado/s o de error.
    - data = Objeto/s con los datos del o de los ticket/s obtenidos:

      - id
      - productId
      - amount
      - paymentType

      **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "Tickets found",
        "data": [
            {
                "id": "0eb8a76b-22de-4b1a-957f-cc7e04eaea56",
                "productId": "aa2cf0ba-f39e-4349-ae72-5843a0dfb7ac",
                "amount": 2,
                "paymentType": "Mastercard"
            },
            {
                "id": "109aa5a9-c60b-4c5b-8745-57261ac46d2f",
                "productId": "f994b4bd-2e73-48a4-ac9a-2fe0a8a47715",
                "amount": 7,
                "paymentType": "Mastercard"
            }
        ]
    }
    ```

- **POST** - Crea un nuevo ticket (_método Ticket.create()_):

  - Recibe: JSON
  - Parametros:
    - productId = String \- UUID \- Requerido
    - amount = Number \- Requerido
    - paymentType = Enum \- (Valores predeterminados: **_Mastercard, Visa_**). \- Requeridos
  - Devuelve: JSON
  - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
  - message = String \- Mensaje de ticket creado o de error.
  - data = Objeto con los datos del ticket creado:

    - id
    - productId
    - amount
    - paymentType

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "New ticket created",
        "data": {
            "id": "8618464c-8db4-4ab4-80fe-317355cc937d",
            "productId": "aa2cf0ba-f39e-4349-ae72-5843a0dfb7ac",
            "amount": 8,
            "paymentType": "Visa"
        }
    }
    ```

- **DELETE** \- Elimina un ticket existente (_método Ticket.delete(\_id)_):

  - Recibe: JSON
  - Parametros:
    - id = String \- UUID \- Requerido
  - Devuelve: JSON
  - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
  - message = String \- Mensaje de producto actualizado o de error.
  - data = Objeto con los datos del ticket eliminado:

    - id
    - productId
    - amount
    - paymentType

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "Ticket deleted successfully",
        "data": {
            "id": "0eb8a76b-22de-4b1a-957f-cc7e04eaea56",
            "productId": "aa2cf0ba-f39e-4349-ae72-5843a0dfb7ac",
            "amount": 2,
            "paymentType": "Mastercard"
        }
    }
    ```

### Endpoint: /ticket/analitycs

- **GET** - Consulta de Ticket en conjunto con Producto para mostrar informe con los siguientes datos (_método Ticket.analitycs()_):

  1. Valor total de los productos vendidos.
  2. El número de productos vendidos por tipo de producto (_description_).
  3. Cantidad de productos vendidos por tipo de pago (_paymentType_).

  - Recibe: JSON
    - Parametros:
      - Ninguno
  - Devuelve: JSON

    - code = Number (Código de estado HTML: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - totalValue = Number \- Suma de los productos vendidos.
    - numTypeProductSold = Objeto con la cantidad de productos vendidos agrupados por tipo de producto(_description_).
    - paymentTypes = Objeto con tipo de pago y la suma de los productos pagados con el tipo de pago correspondiente:
      - paymentType = String \- Tipo de pago de Enum(_paymentType_).
      - \_count:
        - paymentType = Number \- Suma de pagos al que hace referencia _paymentType_.

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "totalValue": 508,
        "numTypeProductSold": {
            "PC": null,
            "Laptops": 1,
            "Phones": null,
            "Tablets": null,
            "Other": null
        },
        "paymentTypes": [
            {
                "paymentType": "Visa",
                "_count": {
                    "paymentType": 1
                }
            }
        ]
    }
    ```

## Installation

Para el correcto funcionamiento se requiere de los siguientes tecnologías:

1. NodeJS
2. Express
3. Prisma
4. MySQL
5. Git

Para agilizar el desarrollo se ha utilizado el paquete _nodemon_ que se encuentra en las dependencias de desarrollo del paquete _package.json_.

Para poder instalar todo lo necesario a excepción del servidor MySQL hay que seguir los siguientes pasos:

```shell
    # Clonar repositorio
    git clone https://github.com/raulalhena/jump2.git
```

```shell
    # Instalación
    npm i jump2
```

```shell
    # Imporación esquema BBDD
    mysql -u usuario -p nombre_basededatos < ./sql/jump2_v1.sql
```

```shell
    # Ejecución del servidor
    npm run dev
```

## Stack

1. NodeJS
2. Express
3. Prisma
4. MySQL

## Contact info

Contactame a mi email: raul.alhena@gmail.com

## License

GNU General Public License v3.0
[GNU](https://opensource.org/licenses/GPL-3.0)
