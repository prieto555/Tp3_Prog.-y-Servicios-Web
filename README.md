# TP3 - Brujula Sur

## Instalacion y ejecucion local

### Requisitos previos
Para ejecutar el proyecto en local se necesita tener instalado:
- Node.js
- npm

### Pasos de instalacion
1. Abrir una terminal en la carpeta del proyecto:
```bash
cd Tp3_Prog.-y-Servicios-Web
```

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar el servidor local:
```bash
npm start
```

4. Abrir el sitio en el navegador:
```text
http://localhost:3000
```

El comando `npm start` ejecuta un servidor local con `http-server`. Esto es importante porque el proyecto carga componentes HTML con jQuery mediante `load()`, y esas cargas funcionan correctamente cuando el sitio se sirve desde un servidor local.

### Build para despliegue
Para generar una version lista para publicar:
```bash
npm run build
```

El resultado queda en la carpeta:
```text
dist/
```

### Deploy a GitHub Pages
Si se quiere publicar en GitHub Pages:
```bash
npm run deploy:gh
```

Este comando ejecuta el build y publica la carpeta `dist/`.

## Documentacion tecnica

### 1. Descripcion general
Este proyecto es un sitio web de turismo llamado **Brujula Sur**, construido con HTML, Bootstrap 5, Bootstrap Icons, jQuery y JavaScript del lado del cliente. La propuesta toma la base visual y funcional de trabajos anteriores, pero en este TP se reorganiza en una arquitectura por componentes HTML cargados dinamicamente dentro de cada vista.

La aplicacion se compone de seis pantallas principales:
- `Principal.html`: pagina inicial con hero, destinos destacados, metricas, botones de navegacion y testimonios.
- `Destinos.html`: catalogo de destinos con filtros por categoria y region, galeria y tabla comparativa.
- `Agencias.html`: listado de agencias con filtros, tarjetas interactivas tipo flip y valoracion con estrellas.
- `Precios.html`: seccion de paquetes, destacado comercial, tabla de precios y tooltips.
- `Blog.html`: layout editorial con filtros, likes, comentarios desplegables y comentarios persistidos.
- `Contactos.html`: formulario validado, modal de exito y modulo educativo de phishing.

El sitio no utiliza backend propio. Toda la interaccion ocurre en el navegador y los datos dinamicos se resuelven con DOM, eventos, `localStorage`, componentes HTML y utilidades de Bootstrap.

### 2. Objetivo tecnico del proyecto
La implementacion busca demostrar:
- Uso de Bootstrap 5 para layout responsivo, grillas, navbar, cards, formularios y modales.
- Modularizacion del HTML mediante componentes reutilizables en la carpeta `components/`.
- Carga dinamica de fragmentos con jQuery y `load()`.
- Manipulacion del DOM para personalizar contenido, filtros, estados activos y feedback visual.
- Validacion de formularios con JavaScript y clases nativas de Bootstrap.
- Persistencia local con `localStorage`.
- Integracion de iconografia mediante Bootstrap Icons y un sprite SVG propio.
- Preparacion para despliegue mediante un script de build y configuracion de Vercel/GitHub Pages.

### 3. Estructura del repositorio
```text
Tp3_Prog.-y-Servicios-Web/
|-- assets/
|   `-- img/
|       |-- agencias/
|       |   |-- andina-travel.svg
|       |   |-- horizonte-cultural.svg
|       |   |-- mar-abierto.svg
|       |   `-- sabores-rutas.svg
|       `-- ui/
|           `-- ui-sprite.svg
|-- components/
|   |-- agencies-cards.html
|   |-- agencies-filters.html
|   |-- agencies-hero.html
|   |-- blog-comments.html
|   |-- blog-content.html
|   |-- blog-hero.html
|   |-- buttons.html
|   |-- cards.html
|   |-- checkboxes.html
|   |-- contact-form.html
|   |-- contact-hero.html
|   |-- destinations-filters.html
|   |-- destinations-gallery.html
|   |-- destinations-hero.html
|   |-- destinations-table.html
|   |-- dropdowns.html
|   |-- featured-destinations.html
|   |-- footer.html
|   |-- hero-home.html
|   |-- inputs.html
|   |-- navbar.html
|   |-- prices-hero.html
|   |-- prices-highlight.html
|   |-- prices-table.html
|   |-- radio-group.html
|   |-- selects.html
|   |-- stats.html
|   |-- testimonials.html
|   `-- textarea.html
|-- scripts/
|   `-- build.js
|-- views/
|   |-- Agencias.html
|   |-- Blog.html
|   |-- Contactos.html
|   |-- Destinos.html
|   |-- Precios.html
|   `-- Principal.html
|-- index.html
|-- package.json
|-- package-lock.json
|-- vercel.json
`-- README.md
```

### 4. Arquitectura general
#### 4.1 Enfoque estructural
La arquitectura se basa en paginas HTML independientes dentro de `views/`, pero cada pagina delega partes de su interfaz a fragmentos reutilizables de `components/`.

Cada vista mantiene esta estructura general:
- carga Bootstrap CSS y Bootstrap Icons desde `node_modules`;
- define contenedores vacios como `#navbar`, `#footer` o `#prices-table`;
- importa jQuery y Bootstrap Bundle;
- usa `$(selector).load("../components/archivo.html")` para insertar componentes;
- registra eventos despues de que cada componente termina de cargar.

Esta decision reduce la repeticion de markup en header, footer y secciones comunes, aunque mantiene la logica JavaScript embebida en cada vista.

#### 4.2 Distribucion de responsabilidades
- `views/`: arman la pagina, cargan componentes y contienen la logica especifica de cada pantalla.
- `components/`: guardan fragmentos HTML reutilizables o secciones completas.
- `assets/`: contiene logos SVG de agencias y un sprite SVG para iconos propios.
- `scripts/build.js`: genera una carpeta `dist/` lista para despliegue.
- `package.json`: declara dependencias, scripts de ejecucion, build y deploy.

### 5. Dependencias y herramientas
El proyecto usa dependencias instaladas localmente:
- `bootstrap`: framework CSS y componentes interactivos.
- `bootstrap-icons`: iconografia visual para botones, navbar y secciones.
- `jquery`: carga dinamica de componentes, eventos y manipulacion DOM.
- `@popperjs/core`: dependencia necesaria para componentes de Bootstrap.
- `gh-pages`: publicacion del build en GitHub Pages.

Scripts disponibles:
```bash
npm start
npm run build
npm run deploy:gh
```

`npm start` levanta el sitio con `http-server` en el puerto 3000.  
`npm run build` genera una copia desplegable en `dist/`.  
`npm run deploy:gh` ejecuta el build y publica la carpeta `dist/` en GitHub Pages.

### 6. Decisiones de diseno y justificacion
#### 6.1 Bootstrap como base visual
Se eligio Bootstrap 5 para acelerar el maquetado responsivo y usar componentes ya resueltos, especialmente:
- grillas (`container`, `row`, `col-*`);
- navbar responsive;
- formularios;
- modales;
- cards;
- botones;
- utilidades de espaciado, color, flexbox y display.

Esto permite concentrar el trabajo en comportamiento, composicion de secciones y experiencia de usuario.

#### 6.2 Componentes HTML cargados con jQuery
En lugar de repetir todo el HTML en cada pagina, se separaron piezas reutilizables en `components/`. Las vistas las cargan con jQuery:
```js
$("#navbar").load("../components/navbar.html");
```

Este enfoque no requiere bundlers ni frameworks de frontend. Es simple de entender en un contexto academico, aunque depende de ejecutar el proyecto desde un servidor local o remoto para que las cargas AJAX funcionen correctamente.

#### 6.3 Logica por pantalla
Cada vista incluye su propio bloque `<script>`. Esto facilita encontrar la logica asociada a la pagina abierta, pero genera repeticion en funciones comunes como:
- inicializacion del navbar mobile;
- marcado del enlace activo;
- validacion del newsletter del footer.

Para un proyecto mas grande, esas funciones podrian moverse a un archivo JavaScript compartido.

#### 6.4 Estilos inline y clases utilitarias
El proyecto usa principalmente clases de Bootstrap y estilos inline. La ventaja es que cada componente queda autocontenido y rapido de ajustar. La desventaja es que algunos colores, sombras y bordes se repiten, por lo que una futura evolucion podria beneficiarse de una hoja CSS global con variables de tema.

#### 6.5 Interacciones con JavaScript vanilla, jQuery y Bootstrap
El TP3 deja de apoyarse mayormente en interacciones CSS-only y pasa a resolver comportamientos con JavaScript:
- filtros por categoria;
- cards flip;
- tooltips personalizados;
- likes;
- comentarios;
- validacion;
- estados de carga;
- contadores animados;
- scroll reveal;
- modales Bootstrap.

### 7. Analisis tecnico por archivo principal
#### 7.1 `index.html`
Funciona como entrada del sitio. Redirige automaticamente a:
```text
views/Principal.html
```

Incluye tambien un enlace manual por si el navegador no ejecuta la redireccion.

#### 7.2 `views/Principal.html`
Responsabilidades principales:
- cargar navbar, footer y componentes de portada;
- personalizar textos del hero;
- completar dinamicamente las tarjetas de destinos destacados;
- convertir botones genericos en enlaces reales hacia otras vistas;
- animar contadores cuando la seccion entra en pantalla.

Componentes utilizados:
- `navbar.html`
- `hero-home.html`
- `featured-destinations.html`
- `stats.html`
- `buttons.html`
- `testimonials.html`
- `footer.html`

Decision relevante:
- la pagina inicial combina contenido estatico con personalizacion dinamica, usando arrays de datos para poblar tarjetas sin duplicar tres versiones completas del markup.

#### 7.3 `views/Destinos.html`
Responsabilidades principales:
- presentar un hero de destinos;
- cargar filtros;
- aplicar filtrado por categoria y region;
- mostrar estado vacio si no hay resultados;
- cargar galeria y tabla comparativa.

Componentes utilizados:
- `destinations-hero.html`
- `destinations-filters.html`
- `destinations-gallery.html`
- `destinations-table.html`

Decision relevante:
- el filtro combina dos criterios: categoria activa en chips y region seleccionada en un `select`. Los items se muestran u ocultan segun atributos `data-category` y `data-region`.

#### 7.4 `views/Agencias.html`
Responsabilidades principales:
- mostrar agencias por categoria;
- filtrar tarjetas;
- implementar comportamiento flip entre frente y dorso;
- permitir valoracion interactiva con estrellas;
- actualizar la valoracion visible en la cara frontal de la tarjeta.

Componentes utilizados:
- `agencies-hero.html`
- `agencies-filters.html`
- `agencies-cards.html`

Decision relevante:
- las tarjetas usan clases de estado (`is-flipped`) para alternar entre frente y reverso. La valoracion se resuelve con eventos de hover/click sobre iconos de Bootstrap Icons.

#### 7.5 `views/Precios.html`
Responsabilidades principales:
- cargar hero de precios;
- mostrar paquete destacado;
- presentar tabla de precios;
- resaltar filas al pasar el mouse o enfocar;
- actualizar un resumen lateral con precio, destino y detalle;
- mostrar tooltips personalizados.

Componentes utilizados:
- `prices-hero.html`
- `prices-highlight.html`
- `prices-table.html`

Decision relevante:
- la tabla usa atributos `data-destination`, `data-price` y `data-detail` para actualizar la informacion destacada sin duplicar logica por fila.

#### 7.6 `views/Blog.html`
Responsabilidades principales:
- cargar hero, contenido editorial y comentarios;
- filtrar articulos por categoria;
- mostrar u ocultar comentarios internos de cada articulo;
- alternar estado de interes/guardado;
- renderizar animaciones de aparicion con `IntersectionObserver`;
- validar y persistir comentarios de usuarios en `localStorage`;
- sanitizar entradas para reducir riesgo de inyeccion basica.

Componentes utilizados:
- `blog-hero.html`
- `blog-content.html`
- `blog-comments.html`

Decision relevante:
- los comentarios personalizados se guardan en `localStorage` bajo la clave `brujula-sur-blog-comments`. Al recargar la pagina, se restauran y se insertan arriba de los comentarios existentes.

#### 7.7 `views/Contactos.html`
Responsabilidades principales:
- cargar hero y formulario;
- validar nombre, email, telefono, asunto, mensaje y terminos;
- sanitizar entradas de usuario;
- mostrar feedback visual con clases `is-valid` e `is-invalid`;
- simular envio con delay;
- abrir un modal de exito;
- incluir un modulo educativo de phishing con quiz interactivo;
- validar newsletter del footer.

Componentes utilizados:
- `contact-hero.html`
- `contact-form.html`
- `footer.html`

Decision relevante:
- el formulario usa `novalidate` para controlar la validacion desde JavaScript y mostrar mensajes propios. El modulo de phishing esta planteado como actividad educativa y no recolecta datos reales.

### 8. Componentes reutilizables
#### 8.1 `navbar.html`
Contiene:
- navbar responsive de Bootstrap;
- marca del sitio;
- enlaces a todas las vistas;
- iconos Bootstrap;
- icono de brujula desde `ui-sprite.svg`;
- logica visual para alternar icono de menu abierto/cerrado.

La logica de enlace activo y persistencia del menu mobile se inicializa desde cada vista.

#### 8.2 `footer.html`
Contiene:
- formulario de newsletter;
- mapa embebido de OpenStreetMap;
- enlaces sociales;
- accesos rapidos;
- informacion institucional.

El newsletter se valida con JavaScript en las vistas que definen esa logica.

#### 8.3 Componentes de formulario
Los archivos `inputs.html`, `selects.html`, `textarea.html`, `checkboxes.html`, `radio-group.html`, `dropdowns.html` y `buttons.html` funcionan como demostraciones o piezas reutilizables de controles UI.

El formulario principal de contacto se concentra en `contact-form.html`.

#### 8.4 Componentes de contenido turistico
Incluyen:
- heroes por pagina;
- tarjetas destacadas;
- galeria de destinos;
- tablas comparativas;
- precios;
- agencias;
- blog;
- testimonios;
- metricas.

Estos componentes separan contenido y estructura de la logica de cada vista.

### 9. Estado, persistencia y datos
El sitio no usa base de datos ni API externa propia. Los estados se manejan localmente:
- `brujula-sur-navbar-open`: recuerda si el menu mobile estaba abierto.
- `brujula-sur-blog-comments`: guarda comentarios agregados por el usuario.

Tambien se utilizan atributos `data-*` para conectar markup con logica:
- `data-category` para filtros;
- `data-region` para destinos;
- `data-filter` para agencias;
- `data-target` para comentarios;
- `data-destination`, `data-price` y `data-detail` para precios;
- `data-correct` para respuestas del quiz de phishing.

### 10. Responsive design
La responsividad se apoya principalmente en Bootstrap:
- `container` para ancho maximo;
- `row` y `col-*` para grillas;
- `navbar-expand-lg` para menu responsive;
- clases `d-flex`, `flex-column`, `gap-*`, `mt-*`, `py-*`, etc.;
- columnas especificas para mobile, tablet y desktop.

La navegacion se transforma en menu colapsable en pantallas menores a `lg`. Las cards, tablas y formularios se apilan usando clases de grilla para conservar legibilidad.

### 11. Accesibilidad y buenas practicas aplicadas
Se observan varias decisiones positivas:
- `lang="es"` en las paginas;
- `meta viewport` para responsive;
- uso de `label` asociado a campos de formulario;
- textos `alt` en imagenes;
- botones con `type="button"` cuando no envian formularios;
- uso de `aria-label`, `aria-controls`, `aria-expanded` en navbar;
- modales Bootstrap con `aria-labelledby` y `aria-hidden`;
- feedback visual de validacion en formularios;
- uso de `loading="lazy"` en iframe del mapa;
- `referrerpolicy` en el mapa embebido.

### 12. Build y despliegue
El archivo `scripts/build.js` genera una carpeta `dist/` limpia con:
- archivos del proyecto;
- vistas;
- componentes;
- assets;
- `package.json`;
- dependencias necesarias copiadas desde `node_modules`.

El script excluye:
- `node_modules` completo;
- `.git`;
- `dist`;
- `scripts`.

Luego copia solo los paquetes necesarios:
- `bootstrap`;
- `bootstrap-icons`;
- `jquery`;
- `@popperjs`.

Esto permite desplegar el sitio manteniendo rutas relativas hacia `node_modules` dentro de `dist/`.

### 13. Fortalezas tecnicas
- Buena separacion visual por componentes HTML.
- Uso consistente de Bootstrap para responsive design.
- Interacciones reales implementadas sin backend.
- Formularios con validacion, sanitizacion y feedback.
- Persistencia local de comentarios.
- Build propio simple y entendible.
- Uso combinado de Bootstrap Icons y sprite SVG propio.
- Sitio navegable por multiples vistas.

### 14. Deuda tecnica detectada
- La logica de navbar activo y menu mobile esta repetida en casi todas las vistas.
- No existe un archivo JavaScript comun para funciones compartidas.
- Hay muchos estilos inline, lo que dificulta cambios globales de tema.
- Algunas cadenas muestran problemas de codificacion de acentos, por ejemplo `aquÃ­` o `seÃ±ales`; conviene normalizar los archivos a UTF-8.
- El nombre de la vista `Contactos.html` difiere de la convencion singular usada en otros trabajos (`Contacto.html`), aunque los enlaces actuales apuntan correctamente a `Contactos.html`.
- `jquery` figura como version `^4.0.0`; al ser una version nueva, puede convenir revisar compatibilidad si se despliega en entornos estrictos.
- No hay tests automatizados ni validacion de HTML/CSS en el pipeline.

### 15. Recomendaciones de evolucion
Si el proyecto continua creciendo, conviene:
1. Extraer funciones repetidas a un archivo `js/main.js`.
2. Crear una hoja `css/styles.css` con variables de color, sombras, radios y utilidades propias.
3. Normalizar todos los archivos a UTF-8.
4. Agregar `aria-current="page"` al enlace activo de la navegacion.
5. Evitar estilos inline en componentes muy repetidos.
6. Agregar validacion de HTML con una herramienta automatica.
7. Revisar el build para copiar solo archivos estrictamente necesarios.
8. Considerar un motor de templates o framework liviano si aumenta la cantidad de vistas.

### 16. Conclusiones tecnicas
El TP3 representa una evolucion respecto de una pagina estatica tradicional: mantiene el sitio turistico como aplicacion multipagina, pero introduce modularizacion, dependencias gestionadas por npm, Bootstrap como sistema visual, jQuery para composicion dinamica y JavaScript para interacciones mas completas.

La principal decision tecnica fue dividir la interfaz en componentes HTML y cargarlos en cada vista. Esto mejora la organizacion del proyecto y evita repetir secciones grandes como navbar, footer, heroes y bloques de contenido. A su vez, la logica embebida por pagina permite que cada pantalla tenga comportamientos especificos sin agregar una arquitectura compleja.

Desde el punto de vista academico, el proyecto demuestra manejo de estructura HTML, responsive design, componentes, eventos, validacion, persistencia local, modales, filtros y despliegue. Su mayor oportunidad de mejora esta en centralizar JavaScript y estilos compartidos para que el mantenimiento sea mas simple a medida que el sitio crezca.

## Archivos clave para revisar
- `views/Principal.html`
- `views/Destinos.html`
- `views/Agencias.html`
- `views/Precios.html`
- `views/Blog.html`
- `views/Contactos.html`
- `components/navbar.html`
- `components/footer.html`
- `components/contact-form.html`
- `scripts/build.js`
- `package.json`
