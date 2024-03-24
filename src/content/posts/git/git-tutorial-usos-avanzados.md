---
title: Git para todos. Parte 3 - Uso avanzado
date: 2022-5-21
slug: git-principiantes-p3
lang: es
status: published
summary: En este tutorial y el próximo vamos a ver algunas situaciones particulares y como las podemos gestionar con git.
link: https://blog.jamescardona11.com/git-uso-avanzado-p3
serie: 
  order: 3
  title: Git para todos
tags: [git, beginner]
---

Si llegaste hasta acá, estoy seguro que ya tienes dominado gran parte de lo que se requiere para ser un pro en git.
En este tutorial y el próximo vamos a ver algunas situaciones particulares y como las podemos gestionar con git.
Ese es el objetivo poder entrar a entender y resolver situaciones difíciles.

<TOCInline toc={props.toc} exclude="Contenido|GIT" fromHeading={3} toHeading={4} asDisclosure />

### Volvamos a lo básico - Un buen commit

¿Cómo definimos un buen commit? ¿Por qué me debo preocupar por esto ?
La verdad la razón base por volver a tratar este tema acá es que cuando estoy desarrollando debo pensar como solucionar problemas que pueda tener el "yo futuro"

Una de la forma de hacerlo es creando commits adecuados que me permitan solucionar problemas futuros.

- **Compacto:** Los cambios deben ser específicos o relacionados.
- **Descriptivo:** Debe ser legible la solución, los pendientes y que hiciste
- **Pensar en el futuro:** Un buen commit va a ayudar hacer un tracking de posibles errores en el futuro

**Propuesta para los commits:**

```
<type>: <description>
[optional body]

[] List of changes

[optional scope]
```

**Ejemplo:**

```
fix: fix the animation for drawer

[X] Add new flag to control the state when is open
[X] Test on android and iOS
[ ] is pending interact with ....

TOK-1766 Jira
```

Esto fue tomado de acá: https://udacity.github.io/git-styleguide/

### Stash

¿Qué pasa si tengo trabajo iniciado y debía hacer algo antes de iniciar?
Tengo que ayudar a alguien y necesito "descartar" mi trabajo temporal. En cualquier caso similar no quiero perder mi avance y tampoco quiero hacer un commit.

Git nos da la posibilidad de usar un "sub-espacio" temporal, esto es lo que se conoce como **stash**, esté espacio temporal nos permite guardar cambios sin llevarlos al historial de commits.

#### Comandos básicos

- `git stash`: Para guardar cambios sin commit
- `git stash list`: Para listar los que tenemos en el stash
- `git stash show`: Muestra el último stash
- `git stash show stash@{1}`: Muestra un stash específico
- `git stash pop`: Aplica los cambios a nuestro workspace
- `git stash drop`: Descarta los cambios
- `git stash clear`: Descarta todos los cambios
- `git stash branch <branch-name>`: Crear una rama nueva desde el último stash
- `git stash branch <branch_name> stash@{#}`: Crear una rama nueva desde un stash específico

Cuando usamos el comando `git stash list` sale algo parecido a esto:

![stash-list](https://i.imgur.com/7jufv66.png)

Entendamos está información:

- Stash@{0}– esto es solo una referencia oculta. Se refiere al stash particular. De forma predeterminada, Stash@{0}siempre es el último stash.
- WIP On rama– rama es solo un nombre de branch como cualquier otra branch y WIP significa _Work In Progress_.
- `8177255 <...>` es el hash de confirmación y un breve encabezado

### Reset

Esté es un comando muy peligroso porque puede dañar nuestro trabajo si se utiliza mal, pero es muy útil para muchas cosas.
El **reset** es básicamente volver a un estado anterior, una branch, un archivo, un commit.

Generalmente, es usado para devolver el estado de una branch que se dañó luego de un merge o algún cambio no deseado. Por el momento vamos a ver este comportamiento y ampliaremos más su uso en el próximo tutorial.

Recuerdas el concepto de **HEAD**, cuando hacemos un merge y queremos devolvernos al estado anterior de ese merge podemos usar:
`<destino>` para este ejemplo puede ser un hash o un HEAD.

`git reset --hard <destino>`: Restablece el estado destino. Cualquier cambio en los archivos ya committed en el árbol de trabajo son descartados. En palabras simples, borra todos los commits hasta el hash/HEAD destino.

`git reset --mixed`: Restablece el estado destino. Preserva los archivos hasta 1el hash/HEAD destino pero debes hacer algo con ellos, borrarlos, eliminarlos o agregarlos nuevamente al árbol de commits.

### Cherry pick

Básicamente, el cherry pick es un comando que nos permite integrar, desde una branch B, un único commit a la rama destino. Esto es útil cuando tenemos una funcionalidad compartida que aun no se ha integrado en la rama destino, pero se require para poder seguir el ciclo de desarrollo.
Otro caso de uso es cuando tenemos un hotfix por medio de un cherry pick podemos traer el cambio del hotfix a una rama destino.

![cherry-pick](https://i.imgur.com/3exgITA.png)

### Uso del reflog

El reflog es el 'diario', el journal donde se registran todas las interacciones con git.
Es fácil de usar, pero poderoso para que podamos complementar nuestro trabajo a la hora de buscar y encontrar diferentes acciones realizadas previamente

![reflog](https://i.imgur.com/JmsRXnn.png)

En el siguiente tutorial veremos varios usos de este comando.

### Conclusiones

Después de hacer este tutorial, estamos listos para iniciar el último y más retador, donde veremos más de 10 casos y situaciones a resolver con todo lo aprendido hasta ahora.

### Referencias

[Git-tower](https://www.git-tower.com/learn/git/ebook)

[Git-Oficial](https://git-scm.com/)

[Github](https://lab.github.com/)

[Git book](https://git-scm.com/book/es/v2).

[Version control Git - Book](https://books.google.com.co/books/about/Version_Control_with_Git.html?id=qIucp61eqAwC&redir_esc=y)

&nbsp;
&nbsp;
