---
title: Git para todos. Parte 4 - Deshacer errores
date: 2022-5-25
slug: git-principiantes-p4
lang: es
status: published
summary: Los errores pueden pasar, el desarrollo de software es un proceso creativo y que involucra personas, las personas cometemos errores. Para eso es git, es nuestro helper, nuestra muralla para combatir errores.
link: https://blog.jamescardona11.com/git-deshacer-errores-p4
serie: 
  order: 4
  title: Git para todos
tags: [git, beginner]
---

Los errores pueden pasar, el desarrollo de software es un proceso creativo y que involucra personas, las personas cometemos errores.
Para eso es git, es nuestro helper, nuestra muralla para combatir errores.

<TOCInline toc={props.toc} exclude="Contenido|GIT" fromHeading={3} toHeading={4} asDisclosure />

La recomendación para sacar el máximo provecho a este tutorial es preparar un ambiente para ver en acción como operan las diferentes condiciones.
Con todo lo que has aprendido hasta acá va a ser muy fácil para ti preparar ese ambiente de trabajo. Puedes usar este cómo **base** para iniciar [github](https://github.com/jamescardona11/git-exercism)

### 1 Descartar todos los cambios en un archivo (uncommitted)

Pre: Edita un archivo que estemos traqueando y que no hayamos confirmado los cambios

-> `git restore <file-name>` o
-> `git checkout <filename>`

### 2 Restaurar un archivo eliminado (uncommitted)

Pre: Elimina un archivo que estemos traqueando y que no hayamos confirmado el borrado

-> `git restore <file-name>`

### 3 Descartar algunas líneas de un archivo (uncommitted)

Pre: Edita un archivo que estemos traqueando diferentes líneas de código y que no hayamos confirmado los cambios

-> `git restore -p <file-name>`

### 4 Descartar todos los cambios en local (uncommitted)

Pre: Edita multiples archivo que estemos traqueando diferentes líneas de código y que no hayamos confirmado los cambios

-> `git restore .`

### 5 Arreglar el último commit

Pre: Has un commit y copia mal el mensaje o deja algunos archivos sin completar

-> `git commit --amend -m <new-message>`

Si quieres agregar algo que olvidaste
-> `git add .`
-> `git commit --amend -m <new-message>` o `git commit --amend --no-edit`

**amend** es un comando que reescribe el historial y si lo reescribimos debemos tener cuidado con los cambios en remoto

### 6 Revertir un commit en la mitad del proceso

Pre: Busca un estado previo(hash) de un commit para restaurar a ese estado

-> `git revert <hash>`
Cuando se hace esto git va a crear un nuevo commit con el estado del revert

### 7 Resetear a una versión anterior

Pre: Busca un estado previo(hash) de un branch para resetear a ese estado

-> `git reset --hard <#hash>`
Cuidado que el --hard va a eliminar los commits después del hash destino

-> `git reset --mixed <#hash>`
Mantienen los cambios descartados como cambios locales, para que puedas trabajar con ellos, modificarlos, etc.

### 8 Resetear un archivo a versión anterior

Pre: Busca un estado previo(hash) de un branch para resetear a ese estado

-> `git restore --source <#hash> <file-name>`

### 9 Recuperar commits borrados

Pre: Después de realizar el punto #8 puedes buscar el hash desde donde partiste para hacer el reset

-> `git reflog` search the hash o HEAD# antes del reset
-> `git branch <branch-name> <#hash>`

### 10 Recuperar una rama borrada

Pre: Buscar el hash desde donde partiste para borrar la rama

-> `git reflog` search the hash o HEAD# de la rama
-> `git branch <branch-name> <#hash>`

### 11 Mover un commit a una nueva rama

Pre: Crea un commit en una branch

-> `git branch <branch-name>`
-> `git reset HEAD~1 --hard`

### 12 Mover un commit a una rama diferente

Pre: Crea dos branch con al menos un commit en cada una, mueve uno de los commit a la otra rama

-> movernos a la rama destino `switch` o `checkout`
-> `git cherry-pick <hash>`
-> movernos a la rama origen de donde movimos el commit
-> `git reset HEAD~1 --hard`

### Conclusiones

Si llegaste hasta acá gracias por todo.
Puedes consultar más casos [acá](https://firstaidgit.io/#/), adicional te invito a dejarme nuevos casos y si quieres que hagamos algunos más.
Puedes buscarme en [Linkedin](https://www.linkedin.com/posts/jamescardona11_my-tech-blog-jamescardona11-activity-6932922428423634944-RDfk?utm_source=linkedin_share&utm_medium=member_desktop_web)

### Referencias

[Git-tower](https://www.git-tower.com/learn/git/ebook)

[Git-Oficial](https://git-scm.com/)

[Github](https://lab.github.com/)

[Git book](https://git-scm.com/book/es/v2).

[Version control Git - Book](https://books.google.com.co/books/about/Version_Control_with_Git.html?id=qIucp61eqAwC&redir_esc=y)

[Video](https://www.youtube.com/watch?v=lX9hsdsAeTk)

&nbsp;
&nbsp;
&nbsp;

Gracias por llegar hasta acá, considera dar un like, compartir y nos vemos en un próximo artículo.

<p align="center" width="100%">
  <img src="https://i.imgur.com/q7fqQHS.gif" width="200" />
</p>
