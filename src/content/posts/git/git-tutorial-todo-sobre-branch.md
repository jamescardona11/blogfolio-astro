---
title: Git para todos. Parte 2 - Branches
date: 2022-5-17
slug: git-principiantes-p2
lang: es
status: published
summary: Git nos facilita el trabajo proporcionando las branches, esa poderosa herramienta para poder interactuar en "sub-espacios" de trabajo. Con esto gestionar equipos distribuidos y crear diferentes flujos de trabajo no es un problema.
link: https://blog.jamescardona11.com/git-todo-sobre-branches-p2
serie: 
  order: 2
  title: Git para todos
tags: [git, beginner]
---

Git nos facilita el trabajo proporcionando las branches, esa poderosa herramienta para poder interactuar en "sub-espacios" de trabajo.
Con esto gestionar equipos distribuidos y crear diferentes flujos de trabajo no es un problema.
Esta funcionalidad tiene sus consideraciones y por eso se han inventado diferentes **workflows** para establecer reglas que nos ayuden a trabajar sobre un marco común para el equipo.

<TOCInline toc={props.toc} exclude="Contenido|GIT" fromHeading={3} toHeading={4} asDisclosure />

### ¿Qué son las Branch?

Una branch es espacio de memoria separado donde podemos crear, modificar y eliminar parte de nuestro trabajo sin que el espacio principal se vea afectado hasta que decidamos unir ambos espacios en uno solo.
Su uso se extiende para poder dejar versiones 'seguras/fiables' del código, crear workflows para trabajo en equipo, hacer pruebas de concepto, solucionar errores específicos, entre otras cosas.
Una branch nos permite independizar el trabajo y enfocarnos en pequeñas unidades de trabajo (features).

### ¿Cómo interactuamos con ellas?

- `git branch <name>`: Para crear una branch desde la 'posición' donde estamos
  - usa `-u` para que la branch siga un tracking con la branch remota.
- `git switch <name>`: Para cambiarnos de espacio de trabajo
- `git branch -m <new-name>`: Para cambiar el nombre de la branch
- `git branch -d <name>`: Para borrar la branch
  - usa `-D` cuando quieras forzar el borrado

#### ¿Qué es el HEAD?

![head](https://i.imgur.com/3m3kBc6.png)

Git almacena nuestro trabajo enlazando la historia de nuestros commits por medio de _hash_, pero para facilitarnos parte de como se visualiza o no tener que acordarnos de los _hash_ nos provee un indicador que se llama **HEAD**, entonces la parte superior del historial tiene un **HEAD~0**, a medida que descendemos vamos aumentando el índice: _HEAD~1_, _HEAD~2_, _HEAD~n_.

Git siempre crea nuestras branch a partir del **HEAD** donde estemos ubicados.
Si queremos crear una branch desde una posición concreta podemos usar:

- `git branch <name> #hash` o `git branch <name> #head`

Cuando borramos una branch, lo que estamos haciendo es borrar el tag que apunta a esa dirección de memoria.

### ¿Qué son los conflictos?

Cuando unimos dos branches diferentes, git se encarga de unir la mayor cantidad de código en uno solo usando estrategias automáticas, pero cuando ambas branches hacen modificaciones sobre lines o archivos donde git no pueda decidir como es la mejor forma de resolver esas diferencias va a mostrar una alerta que se conoce como **conflictos**.

Esto es un ejemplo de un conflicto
![diff](https://i.imgur.com/uSIsaUo.png)

#### ¿Cómo se resuelven?

Realmente es trivial lo que voy a escribir, pero simplemente eligiendo/decidiendo como unir esas diferencias.

Para ver las diferencias de un archivo `git diff <filename>`
La recomendación para mezclar conflictos es usar una herramienta externa integrada a tu IDE de desarrollo o una GUI para git.

### Merge vs Rebase

Hay varias estrategias para unir branches, pero podemos decir que estás dos son las más famosas, es importante entender que no es que una sea mejor que la otra, simplemente son diferentes en su forma de como queda el historial o gráfico de commits.
Su uso depende de las estrategias del equipo o los requisitos del proyecto.

![mergevsrebase](https://i.imgur.com/V5hElXV.png)

#### Merge

Es una estrategia muy usada y su ejecución es sencilla, simplemente crea un nuevo punto llamado _merge commit_ donde está la unión y resultado final de la unión. Adicional, preserva el historial conectando la branch que estamos mezclando.

![merge](https://i.imgur.com/kZTX9X9.png)

#### Rebase

Es una estrategia no tan común y con algunas consideraciones adicionales, en la estrategia de **merge** no se sobrescribe el historial, simplemente se enlaza y se inicia desde un punto nuevo llamado _merge commit_. El **rebase** si sobrescribe el historial y su forma de hacer la unión, se hace en tres pasos.

- _step 1:_ Busca el ancestro común de ambas branches, luego "remueve" temporalmente los commits de la _branch A (destino)_
- _step 2:_ Coloca cronológicamente los commits de la _branch B (origen)_ en secuencia en la _branch A (destino)_
- _step 3:_ Une (Rebasa) los commits de la _branch A (destino)_ después del último commit de la _branch B (origen)_

En esta secuencia se puede ver que el historial se sobrescribe y se crean uno nuevo.

![rebase](https://i.imgur.com/ixozRBG.png)

**Advertencia** No usar rebase sobre commits que ya están compartidos en una branch remota

### Git flujos de trabajo

Ya hemos avanzado mucho aprendiendo sobre branches, pero nos falta un eslabón para que los equipos puedan trabajar ordenadamente, respetando **reglas** y siguiendo flujo común, esto se conoce como Git-Workflow.

Puedes crear tu propio marco de trabajo o usar uno que sea ampliamente usado por la comunidad.
En este caso tenemos algunos de ellos:

- Gitflow
- Github flow
- Trunk-Based-Development
- Git release flow
- Gitlab flow
- Master only flow

Vamos a ver la diferencias entre dos de estos.

#### Gitflow

Este es el más conocido y el más usado por muchas empresas dada la facilidad de uso.

Es un flujo para trabajos de equipos compactos, parte de la idea que creamos una branch principal (**main**), es nuestra branch segura y de acá derivamos la estrategia creando branches de soporte.

- Desarrollo: Features branches
- Pre-prod: Develop
- Prod: Releases branches
- Zona segura: main

Es útil para proyectos que tienen un ciclo de publicación programado. Un trabajo basado en publicaciones.

##### ¿Cómo funciona?

Vamos a establecer las dos branches principales, **Main** y **Develop** para llevar el historial del proyecto, son branches de larga duración. La branch main se usa para almacenar el historial de publicación. La branch develop se usa para la integración de nuevos features.

###### 1) Branches de features

Son para crear un historial nuevo para pequeñas funcionalidades que se van a desarrollar en el ciclo de desarrollo. Las branches nuevas deben partir de la branch develop y cuando la feature esta terminada se debe integrar nuevamente a develop.

###### 2) Branches de release

Cuando se acerque la fecha de release o tengamos suficientes características integradas debemos bifurcar las características en una branch de release, cuando se crea esta branch ya no pueden añadirse nuevas funcionalidades a la branch de release y esta branch solo deben producirse la solución de errores(hotfix).

Cuando el release esta listo se debe enviar a la branch main y adicional a la branch develop.

###### 3) Branches de hotfix

Son branches que sirven para reparar errores en producción, siempre deben salir de la branch main. Cuando se termine la corrección debe integrarse a main y a develop.

![gitflow](https://i.imgur.com/6MSdEke.png)

#### Trunk-Based Development

Es un poco más moderno y su poder se basa en construir equipos más maduros. Donde todo se integra en una branch principal y desde ahí salen las features. Evitamos tener branches de larga duración.

Desarrollo: Features branches
Prod: Main o Tag-references

###### ¿Cómo funciona?

Es una estrategia donde se usa una branch principal main, en esta branch todo el equipo se integra haciendo push a esta branch. La branch main-trunk se puede usar para hacer release donde se requiera, como por ejemplo a ambientes de pre-productivos, local, etc. Su veracidad y respaldo la dan los tags o etiquetas. Se dice que las branches de features solo deben durar pocos días.

###### 1) ¿Qué se requiere que un equipo trabaje con TBD?

Madurez sin esto esta estrategia se verá impactada por múltiples conflictos que a su vez se evidencia en fallos de la aplicación. Madurez personal como técnica.

###### 2) ¿Cuándo usarlo?:

- Si la frecuencia de release es alta, trunk based development es la estrategia adecuada.
- Equipos maduros y productos establecidos, con sus tiempos y fechas de release bien definidos, es probable que no lo necesiten

![tbd](https://i.imgur.com/91do0rJ.png)

&nbsp;
&nbsp;
&nbsp;

### Conclusiones

Esté camino, apenas empieza, hay muchas cosas por aprender y explorar, pero básicamente con este tutorial ya tienes lo necesario para gestionar tu trabajo de equipo y adicional poder proponer soluciones a la hora de trabajar con diferentes workflows.

### Referencias

[Git-Oficial](https://git-scm.com/)

[Github](https://lab.github.com/)

[Git book](https://git-scm.com/book/es/v2)

[Git-tower](https://www.git-tower.com/learn/git/ebook)

[Version control Git - Book](https://books.google.com.co/books/about/Version_Control_with_Git.html?id=qIucp61eqAwC&redir_esc=y)

Gracias por llegar hasta acá, considera dar un like, compartir y nos vemos en un próximo artículo.

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/lHUqlB9cPwESCr078o/giphy.gif" width="200" />
</p>
