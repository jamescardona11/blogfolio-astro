---
title: Arquitectura de software - P1
date: 2023-05-29
slug: arquitectura-de-software-p1
status: draft
---

# Arquitectura de software - P1

*Primer parte de ?? post*

Publicaciones sobre arquitectura de software encontrarás decenas de miles, adicional muchos videos y contenido explicando a un desarrollador ¿cómo hacer una arquitectura de software "correcta/perfecta"?, ¿Qué es Clean Architecture? etc..

Cuando consumes contenido sobre arquitectura de software, puede pasar varias cosas en ese proceso de aprendizaje:

- Cada vez quieres consumir más. *No caigas en el tutorial hell.*

- Creer que un par de conceptos basta. *Debate las ideas con personas que dominen el tema y valida si lo aprendido es útil para el contexto de tu empresa o proyecto*

- No entiendes nada y te desanimas. *Recuerda que el software no es un sprint, ve a un ritmo que te permite aprender y aplicar*

Cuando aprendes sobre arquitectura y realmente puedes aplicar en un proyecto, puedes interactuar con otras personas y debatir sobre este tema, ganaras un escalón más para convertirte en un mejor desarrollador.

En este post voy a usar dos fuentes de información, documentación técnica en post/videos/libros(las referencias al final) y otra parte será opinión personal de mis años como desarrollador y lo que he aprendido estudiando y aplicando en diferentes proyectos. Lo más **importante** es que valides con tu propio conocimiento, criterio e investigación, puede que no estés en acuerdo con lo que menciono, opinó o comento acá, pero mantente abierto a diferentes conceptos y forma/valida tus propios conceptos. Mientras vayas leyendo voy a ir presentando algunos "problemas" e intentaré brindar alternativas sobre ellos y como podemos tratarlos.

Antes de iniciar, toma un tiempo para responder estas preguntas, desde la intuición, conocimiento o experiencia acumulada.

- ¿Por qué es importante la arquitectura de software?

- ¿Existe alguna arquitectura perfecta, correcta o universal?

- ¿Si aplico una solución 'A' que funciono en un proyecto 'P', a un proyecto 'K' tengo certeza de éxito?

- ¿Siempre debo aplicar una arquitectura de software?

## Definamos arquitectura de software

Definiciones hay muchas, pero más o menos apuntan a un mismo objetivo pero tomando un camino diferente. Voy a dejar una definición que se ajusta lo que quiero lograr con este post, lo importante no es la definición, sino entender lo que es y el objetivo de arquitectura de software, filtrar **las palabras claves** de cada definición.

Definición:

> Es el **conjunto de estructuras** necesarias para **razonar** sobre **el sistema**, que comprende los **elementos** del software, las **relaciones** entre ellos y las **propiedades** de ambos.
> 
> *Software Architecture in Practice. Paul Clements.*

Consideremos algunas cosas adicionales que puedes tener encuentra para añadir en ese conjunto de pensamientos relacionados a arquitectura de software.

- Decisiones que preparan el proyecto para el **cambio**.

- Las soluciones deben ir enfocadas al proyecto, no a gustos personales.

- Proporciona **decisiones de diseño** para organizar el software y promover atributos de **calidad**.

- Prepara el proyecto para **reutilización** de módulos y/o componentes

- La arquitectura no es responsabilidad de una persona, es responsabilidad de un equipo

- La arquitectura es para aumentar la **calidad** del software

- La forma en que establecemos la **relación** y las **interacciones** pueden **agregar/reducir complejidad** a nuestros proyectos.

Esas palabras claves marcadas en negritas las cambiaremos por conceptos de desarrollo, y posteriormente llevaremos muchos de esos conceptos a soluciones de software.

**Problema 1:**

Podemos decir que la definición es concreta y entendibles; sin embargo sigue teniendo una barrera alta para entender cada uno de los conceptos, mucho más llevarlos a código. Las definiciones no se adaptan en todos los casos, condiciones o contextos y para muchos desarrolladores es difícil adaptarse al **cambio**.

#### ¿Cómo hemos llegado hasta acá?

Para poder llegar a que hoy en día tengamos puesto de trabajo dedicado a arquitectos de software, que la arquitectura sea un tema transversal a los diferentes equipos de trabajo a la hora de solucionar problemas. Que sea un tema tan hablado, discutido y es un punto de inflexión para el seniority.

Primero, el desarrollo de software es relativamente joven comparado con muchas otras áreas de saber, y el desarrollo ha adaptado soluciones de otras áreas para crear  soluciones  más "completas" en software.

El timeline para llegar a lo que hoy conocemos como software será algo como esto, saltándome aspectos importantes y muchos temas que si los hiciera uno a uno, no terminaría nunca.

Retrocedamos un poco en el tiempo:

1. 1950s Programación no estructurada

2. 1960s Programación estructurada

3. 1970s Programación funcional y procedimientos
   
   - 1979 - Model View Controller

4- 1980s Programación orientada a objetos

5- 1990s Programación orientada a temas y aspectos

- Entity Boundary Interactor

- Model View Presenter

6- 2000s 

- 2002: Single Responsibility Principle 

- 2003: Domain Driven Design

- 2005: Model View Viewmodel

- 2005: Ports & Adapters, Hexagonal

- 2008: Onion

- 2009: Microservice

- 2012: Clean architecture

*Software Architecture in Practice. @hgraca*

Partamos de una premisa, la información generada en las últimas dos décadas al rededor de desarrollo de software es infinitamente mayor a la generada antes de la adopción masiva del internet. *Vivimos en una época de turbulencia de información*.

Antes del internet se hablaba poco de desarrollo de software, la información y los "grandes pensadores" sobre soluciones más complejas y a gran escala eran contados.

Hoy abunda la información y con un agravante información incompleta o no concluyente sobre muchos temas, no creo que se pueda aprender sobre arquitectura viendo un video de 30 minutos o leyendo un post, pero eso nos han hecho creer. Esta serie de post sirve para tener un punto de vista adicional, pero debes seguir aprendiendo.

**Problema 2:**

La habilidad de navegar entre tanta información es algo valioso para no gastar tiempo consumiendo información poco relevante. Gran parte del contenido no aporta un aspecto importante para aprender sobre arquitectura, volviendo a la definición de arriba: **RAZONAR** Arquitectura es mucho más y es un proceso que parte desde antes de crear código.

#### ¿Por qué se creo la arquitectura de software?

*Lo siguiente es 90% opinión*

Te ha pasado que desarrollaste algún producto de software y que cada vez que el producto evoluciona es un problema poder adaptarlo a nuevas soluciones. Modificar una parte del código pone en peligro la integridad de otras partes. Si no te ha pasado has sido afortunado; me ha pasado y no es agradable desarrollar una solución que no escala y es fácil de mantener en el tiempo. Una de las partes más costosas en el desarrollo de software es la *Mantenibilidad.*

Lo siguiente puede ser trivial, una solución de software no es demostrable con ningún modelo o marco de referencia que nos asegure que antes de iniciar un proyecto vamos a tener 100% de éxito en cada paso que demos. Debemos adaptarnos.

La arquitectura se creo en parte para hacer fácil la *estructura* del sistema y que el tiempo se enfoque en soluciones, con esto quiero decir; que una buena arquitectura ya resolvió muchas cosas y nuestro trabajo como ingenieros es crear soluciones a problemas y no repensar como se hace la interacción de componentes del sistema, no repensar la organización de responsabilidades. La arquitectura nos ayuda compartir un lenguaje técnico en común y que todos podamos escribir código que otras personas puedan entender, que una parte del código que se diseñe sea fácil de mantener, rehusar y escalar.

> Cualquier tonto puede escribir código que entiendan las máquinas, pero solo un buen programador escribe código que entienden otras personas
> 
> *Martin Fowler*

**¿Para qué?**

Los proyectos tienen diferentes características necesarias, importantes o que se necesitan cumplir para que cumpla los estándares, requisitos del cliente y calidad deseada, como:

- autonomía, agilidad, usabilidad, durabilidad, precisión, portabilidad, eficacia, escalabilidad, sencillez, estabilidad, robustez, modularidad, etc.

*Software Architecture - Building Evolutionary Architectures*

La responsabilidad del arquitecto y del equipo es determinar cuales de esas características son relevantes en el proyecto, para la etapa y seniority del equipo, así mismo poder equilibrar esas "preocupaciones" determina en una parte del impacto en el tiempo de desarrollo. Es importante elegir con cuidado, ya que algunas características son contradictorias entre si, y tratar de incluir todas puede llevar a una sobre ingeniería y un colapso de la solución y los actores de ella.

El para qué puedo resumirlo en "tomar decisiones que den equilibrio al desarrollo y el equilibrio nos lleva a compensaciones en diferentes etapas"

**Problema 3:**

Cuando encontramos información en internet nos dan una solución técnica que no involucra un contexto y podemos pensar que la arquitectura es una solución solo técnica cuando involucrar la solución de un problema del negocio/empresa.

## ¿Cómo iniciar con la arquitectura en un nuevo proyecto?

Cuando afrontamos la creación de un sistema de software es inevitable que haya diferentes niveles de seniority entre el equipo, lo cual hace que tengamos que adaptarnos y entender que cada ingeniero es vital dentro de la solución, adicional es importante que el team-lead y/o el arquitecto tengan claridad de la arquitectura que van a implementar para evitar retrabajo. En mi opinión, pensar en una arquitectura se hace desde antes de iniciar a escribir código, pero esta se desarrolla cuando se escribe código.

Los siguientes puntos son un "lienzo" de que puedes hacer pero cada proyecto podrá ir evaluando y creando nuevos puntos.

1. Crea reglas claras de como interactúan los componentes del sistema

2. Busca alguna arquitectura para iniciar, pero recuerda adaptarla a las necesidades del proyecto

3. Ten flexibilidad para que otras personas aporten nuevas ideas

4. Mantén claridad sobre cada decisión de diseño y compártela con el equipo para generar debate

5. Evalúa bien el seniority y que puede afrontar y que no cada ingeniero

6. Recuerda que la arquitectura está enfocada en llevar el proyecto al éxito

7. No hagas sobre ingeniería

8. Mantén las soluciones sencillas

Recuerda que una arquitectura **evoluciona** a medida que el equipo, el sistema y la etapa cambian. No pretendas solucionar todos los problemas en el día cero, una buena arquitectura debe tener capacidad de adaptarse y cambiar.

>  *Sobre que es una arquitectura evolutiva vamos a hablar en la segunda parte de esta serie.*

## Los problemas

En este post traté tres problemas, resumiendo: la falta de contexto y pensar que lo único que debemos hacer es código, basándonos en un tutorial corto y sin considerar lo que necesita mi negocio, ¿qué madurez tiene mi equipo? y ¿cuál es el propósito del software?. Hacen que simplemente empecemos a hacer código y entrar en problemas diferentes, digamos que podrás tener una "buena" arquitectura sin tus problemas anteriores pero tienes nuevos problemas, solo que ahora son problemas "más sofisticados".

Con esto no quiero decir que no debas abordar los problemas que surgen en un desarrollo de software aplicando técnicas de diseño de software, combinada de patrones de diseños y reglas para estructurar todo. De hecho es muy importante que lo hagas, lo que quiero decir y asegurar hasta acá es: **La arquitectura es muy importante**, pero no la hagas por hacerla, piensa y evalúa primero que necesitas y **EVOLUCIONA** tu arquitectura en cada etapa del desarrollo.

Al terminar esta serie de post, mi objetivo es que tengas una idea más de como abordar una arquitectura. Pero no puedo asegurar que esto te sirva, tampoco si es aplicable a tu contexto. Pero parte de **responder** la pregunta ¿como crear una arquitectura? es consultar, leer, comentar, preguntar y tener la valentía de escuchar/leer nuevas ideas.

Hasta el momento no hemos hablado nada de arquitectura, pero ya dejamos sentadas algunas bases de lo que queremos con este post. 

Resolver estos problemas y entender como ser un arquitecto de software desde mi óptica se debe hacer desde diferentes puntos de vista depende tu seniority.

## Conclusión

Hasta el momento solo hemos dado una introducción a arquitectura y entre líneas la importancia para un proyecto de software, en las próximas partes de esta serie de post abordaremos los componentes de una arquitectura.

Lo que yo he notado y esto es una opinión es que la arquitectura de software en gran parte es interpretación(veremos poco a poco esto), trata de tener apertura para conocer nuevos puntos de vista.

He repetido varios conceptos y he hablado mucho sobre evolucionar, la razón es que las arquitecturas modernas evolucionaron desde soluciones "básicas".

Gracias por llegar hasta acá, considera dar un like, compartir y nos vemos en un próximo artículo.
