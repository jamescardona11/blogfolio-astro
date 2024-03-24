---
title: Patrones de diseño - 1
date: 2022-4-25
slug: patrones-de-diseno-1
lang: es
status: published
summary: Los patrones de diseño son marcos de referencia que ayudan a resolver problemas recurrentes en el desarrollo de software.
link: https://blog.jamescardona11.com/patrones-de-diseno-1
tags: [design-patterns, architecture]
---

Primero quiero empezar con un **disclaimer**, no soy un experto, solo quiero aprender algunas cosas nuevas, realmente información, videos, artículos y libros sobre este tema hay muchos, no es algo nuevo y no estoy sacando el tema más único, para mí es un buen reto poder trasmitir esa información por medio de un blog/newsletter.

Mi compromiso es hacer una serie de **_Posts_** con mí aprendizaje, inicialmente voy a empezar con pattern design. No sé si en el intermedio de esto comparta otras cosas, pero seguro estaré haciendo publicaciones cortas y dejaré referencias en mí [github](https://github.com/jamescardona11).

La estructura de esta mini serie será así:

1. ¿Qué son los patrones de diseño y por qué son importantes?
2. Tres patrones creacionales
3. Tres patrones estructurales
4. Tres patrones de comportamiento
5. Mis impresiones sobre los patrones de diseño

Mi objetivo es agregar valor en cada uno de las publicaciones.
Dejemos tanta charla y entremos en detalle. 😀

### ¿Qué son los patrones de diseño?

Hagamos una analogía sobre la programación de software como proceso creativo podemos compararlo con una cocina de un hotel, donde hay un montón de chefs(desarrolladores) que deben realizar recetas(código) para entregarlas a los clientes.
Supongamos que las recetas solo estén en la mente de los chefs, así que ponemos a dos chefs diferentes a ejecutar la misma receta, seguramente en este caso el plato(solución) es 50% diferente.

Así que si ambos chefs se sientan a escribir la receta e intentan de nuevo crear un plato, probablemente la receta sea un 90% parecida. Siempre en un proceso creativo, no podemos acotar que se hagan igual las soluciones, pero si buscar que tengamos un **marco de referencia** para solucionar problemas.

Para mí eso son los patrones de diseños, son marcos de referencias, es la receta, el plan de acción para solucionar problemas.

La síntesis es, un patrón de diseño, define una forma solucionar problemas recurrentes. Por más que nuestra aplicación sea única, tendrá partes comunes a otras aplicaciones: acceso a datos, creación de objetos, lectura de información, etc.

### ¿Cómo se clasifican?

Los patrones de diseño, entre ellos se clasifican en tres grupos.

- Patrones creacionales: Son los que se encargan de solucionar problemas a la hora de creación de objetos.

- Patrones estructurales: Son patrones que nos ayudan a configurar relaciones entre objetos.

- Patrones de comportamiento: Son patrones que nos ayudan a realizar interacciones entre clases y objetos.

### ¿Usarlos o no usarlos?

Si identificamos una situación donde un problema se puede solucionar con un patrón de diseño, usarlo es la mejor decisión. En mí caso personal, he identificado que un patrón resolvía mí problema después de tener un código no tan "ordenado".

Evita soluciones que te obliguen a adaptar tu código a un patrón, esto no es una buena práctica y se puede convertir en un anti-patrón.

Algo que siempre es bueno preguntarse,

- ¿el proyecto puede asumir la complejidad de un patrón en específico?
- ¿el equipo tiene experiencia necesaria para asumir la implementación?
- ¿el cliente está dispuesto asumir tiempos para la implementación?
  En lo personal me recuerdo que desarrollo software es para solucionar problemas, no para hacer un código a nuestro gusto y asumir el uso de ciertos patrones que pueden agregar complejidad al sistema y que pueden perjudicar el desempeño de los diferentes actores de la solución puede no ser la solución.

### Conclusión

Cuando alguien quieres crear aplicaciones robustas y fáciles de mantener en el tiempo, probablemente debemos cumplir con algunas "reglas". Nos ayudarán a acoplarnos más fácil a arquitecturas, cumplir los principios SOLID, etc.

Ayudar a estandarizar el código en proyectos de software es de los retos más importantes si quieres escalar tu aplicación. Un patrón de diseño es como una herramienta, tú decides si usarlo o no, pero es bueno conocerlo por si requiero solucionar algo.

En los siguientes post vamos a estar incorporando algo de código.

&nbsp;
&nbsp;
&nbsp;

Gracias por llegar hasta acá considera dar un like, compartir y nos vemos en un próximo artículo. (linkedin)

<p align="center" width="100%">
  <img src="https://i.imgur.com/q7fqQHS.gif" width="200" />
</p>
