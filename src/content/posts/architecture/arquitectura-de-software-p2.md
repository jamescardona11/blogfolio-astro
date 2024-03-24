---
title: Arquitectura de software - P2
date: 2022-11-01
slug: arquitectura-de-software-p2
status: draft
---

# Arquitectura de software - P2

*Segunda parte de ?? post*

Nuevamente bienvenido, si has llegado hasta la segunda parte espero sea de tu agrado nuevamente este post sigue siendo muy teórico pero ya empezamos adentrarnos en muchos más conceptos de desarrollo y para dar paso a desarrollar una aplicación con todos estos conceptos.

En este post vamos a ver la explicación básica de algunas arquitecturas, como dije en el primer post, no pretendo resolver los detalles finos de cada arquitectura es dar una mirada general, este post no te va hacer experto pero te puede ayudar a empezar a entender por donde puedes empezar o continuar si ya sabes alguno de estos conceptos.

## Arquitectura por capas

Cuando desarrollamos un sistema, generalmente agrupamos y dividimos en pequeñas partes esas partes pueden tener algo en común que representa una responsabilidad del sistema. Ejemplo podemos tener una capa que sea la que controle todo el flujo de datos de la base de datos, de una API, etc. El patrón arquitectónico de capas es el más usado(y abusado)

> Entonces una capa es una unidad conceptual que agrupa una o varios componentes que tienen una responsabilidad similar.

##### Ventajas:

- Solo necesitamos entender las capas en las que estamos trabajando
- Cada capa es replicable por una implementación equivalente sin impactar otras capas
- Las capas son candidatas para estandarización
- Una capa puede usar diferentes high-level-layers

##### Desventajas

- Las capas no pueden encapsular todo
- Cada capa **añade** un grado de complejidad
- Pueden ser confusas si no se tiene experiencia

La cantidad de capas de una arquitectura no hace que sea mejor. Si enfocamos la solución donde una capa solo conoce la capa inmediatamente "debajo" de ella, terminamos creando clases proxy para pasar por capas intermedias en lugar de usar directamente la capa que necesitamos.

Llevamos a nuestro proyecto a un abstracción excesiva en afán de crear el sistema perfecto y las pequeñas actualizaciones repercuten en todas las áreas de la la aplicación.

Mantener un balance es la mejor forma de iniciar con una arquitectura por capas, usando las capas que necesitamos para la etapa del proyecto, no busques el santo gríal arquitectónico. Debemos ajustarnos a la necesidad del proyecto y llevarlo a tener éxito.

### MVC y MV*

MVC o modelo-vista-controlador, es uno de los primeros enfoques  en hablar de "separación de responsabilidades", conceptualmente es muy sencillo, esto ayuda a que su barrera de entrada sea bajo, pero puede tener complicaciones en proyectos que evolucionan rápido.

Una de las razones es que podemos separar responsabilidades, aunque muchos desarrolladores no saben como *desacoplar* y terminan mezclando en algunas capas diferentes conceptos que terminan siendo un problema.

> Acoplamiento: Que dos o más componentes dependan entre si

Las capas presentes:

- **Modelo:** Representa la lógica o core del negocio

- **View:** Representa un competente de UI

- **Controller:** Encargado de la coordinación entre la vista y el modelo.
  
  - Decide que se muestra en la vista y que información
  
  - Traduce una acción del usuario en business logic

**Conceptos adicionales**

- La vista puede usar los modelos directamente

- Cuando el modelo cambia, este dispara un evento inmediatamente para actualizar la vista

- Puede haber multiples view por cada controlador

**Problemas de este enfoque**

- La vista esta altamente acoplada al controlador

- El controlador tiene más de una sola responsabilidad (abordaremos esto más adelante)

- Sin abstracción adicional un cambio en el modelo puede repercutir en multiples vistas

MVC proporciona un buen punto de partida a como se programaba hace 30 años pero si la complejidad del sistema crece necesitamos mayor desacoplamiento.

Esta solución útil cuando el proyecto es pequeño y para presentar una prueba de concepto, agregando algunas reglas de dependencias y usando abstracción podemos considerarlo como un punto de partida.

#### MV* => MVP & MVVM

Cuando hablamos de MV* es las variaciones que se han realizado a MVC para hacer que escale mucho mejor para otros tipos de proyectos, en la última parte mencionábamos las reglas de dependencias, es lo que MVP y MVVM tienen y que hace que la separación de responsabilidades sea mucho más clara. Por así decirlo el mediador entre la vista y los datos cambia de concepto.

##### MVP

MVP o Modelo-Vista-Presentador, nos trae dentro de sus cambios que la vista se vuelve pasiva y esta ignora los modelos, delegando esa responsabilidad a lo que llamaremos presentador que será el encargado de interactuar con los modelos.


- Su foco esta en crear "pequeños" controladores llamados **Presentadores** que idealmente no contienen lógica de negocio y simplemente invocan proveedores de información y que devuelve la data cruda para que el presentador interactué con esta y posteriormente la envié a la vista.
- Empezamos a hacer separación de responsabilidades al dividir la presentación, los datos y la lógica del negocio.
- Un cambio en los modelos no dispara o actualiza la vista directamente como si pasaba en MVC. Siempre va primero al *presentador* que puede realizar alguna lógica adiciona antes de enviar a la vista.
- Idealmente solo queremos un presentador por vista que se encargue de coordinar la interacción con los datos.

##### MVVM

MVP o Modelo-Vista-Vista Modelo, en la arquitectura MVVM, el Modelo representa los datos y la lógica de negocio, la Vista se encarga de la interfaz de usuario y el ViewModel actúa como intermediario entre el Modelo y la Vista, facilitando la comunicación y el enlace de datos. Hoy en día en desarrollo de aplicaciones móviles es más común usar MVVM que MVP su diferencia radica en crear algo que se llama "data binding"(enlace de datos) desde la vista hasta el modelo

- Un ViewModel corresponde a una única vista y viceversa
- Mover la lógica de la vista al ViewModel para simplificar la vista
- Pueden existir uno o más mapeos entre la data usada in la vista y la data en el viewModel
- Binding/Enlace los datos del viewModel en la vista, de modo que cuando los datos se cambian en el viewModel se reflejan en la Vista

Esta es la teoría práctica y funciona muy bien para muchas cosas pero vamos a ver(cuando estemos desarrollando la app que acompañara la teoría) que depende la situación no vamos a querer enlazar directamente la vista con el modelo.



### DDD y un cambio importante como se estructuran las Apps

DDD o Diseño impulsado por el dominio, no es una tecnología avanzada o un método específico. El propósito de DDD es enfocarse en la implementación de dominio y no preocuparse por decisiones técnicas pronto. 
Parte de como se logra esto es crear un lenguaje en común para todos los participantes de un equipo, incluyendo parte técnica y no técnica. Cuando las aplicaciones escalan y cada vez son más grandes podemos acotar el dominio principal separando en subdominios esto nos da el poder de que aunque manejemos el mismo lenguaje no todos tenga que saber que hace un subdominio o otro, solo establecer reglas de comunicación para que estos puedan interactuar.

Algunas de las características de DDD
- Puedes crear un dominio que pueden contener subdominios
- La tarea de un subdominio es empaquetar objetos para que se reduzca la complejidad
- Un objetivo es tener un acoplamiento fuerte entre las características inherentes a un subdominio y un acoplamiento débil con otros subdominios (También conocido como acoplamiento y alta cohesión)
- Todos los objetos con un fuerte acoplamiento funcional mutuo se colocarán en el mismo subsistema


Quiero añadir que un dominio no hace referencia a como modelemos las bases de datos, esto hace referencia más a los modelos y las reglas de negocio de esos modelos.
Porque fue importante DDD para construir las arquitecturas modernas y aunque DDD no te plantea muchas cosas exactas desde este punto otras arquitecturas toman DDD como referencia para poder crear modelos por capas más complejos
- Onion
- Ports & Adapters (Hexagonal)
- Clean Architecture

Nuevamente esto es un breve overview sobre que es DDD, si quieres profundizar hay muchos post que se encargan de explicar a profundidad cada uno de estos conceptos o puedes consultar un libro si quieres aprender más al respecto.


### Ports & Adapters Architecture

Ports & Adapters Architecture o también conocida como Arquitectura Hexagonal, junto con Clean, son **Domain Centric**, son fundamentalmente impulsadas por conceptos de DDD pero no es lo único, acá queremos poner establecer fronteras claras y unos mecanismos de **"intercambio/transformación"** con el mundo exterior.

Podemos definir a grandes rasgos que tenemos tres grandes componentes que componen nuestra arquitectura:
- La lógica de aplicación
- Los puertos
- Los adaptadores


#### Capas

**Dominio**: Core Logic, Business Logic, algoritmos esenciales para el propósito.
Implementa casos de uso que son el corazón de la aplicación, cuando tu cambias el dominio cambias la esencia.

**Infrastructure**: La infraestructura representa la tecnología, es todo lo que no es business domain.

**Adapters**: Consideremos la idea de tener un SubLayer dentro de infraestructura, Es como tu app interactúa con el mundo. Ej: GUI controllers, Loggers, Monitors, Email/SMS, API Gateways, REST controllers.
Al final podemos decir que es una clase que transforma(adapta) una interfaz en otra.

Los adaptadores que representan la interfaz de usuario se denominan **adaptadores primarios** o de **control** porque son los que inician alguna acción en la aplicación, mientras que los adaptadores del lado derecho, que representan las conexiones a las herramientas externas/backend se le denominan **adaptadores secundarios** o **conducidos** porque siempre reaccionan a una acción de un adaptador primario.
Los adaptadores, se suponen que son ligeros. Ellos solo deberían contener data-conversion, error handling, y validación de reglas sintácticas. NUNCA coloques business logic en adaptadores.

**Puertos**: Un puerto es un punto de entrada y salida independiente del consumidor hacia/desde la aplicación. En muchos lenguajes es una interface.
Recordemos, lo de adentro no depende del exterior, en otras palabras el Dominio/Core no pueden depender de ningún adaptador.
En nuestra aplicación, usaremos esta interfaz como un punto de entrada y/o salida sin conocimiento de la implementación concreta que realmente se inyectará.


#### ¿Qué logramos?
- Cuando aislamos la lógica empresarial de los mecanismos y herramientas que utilizan el sistema usando un diseño puerto/adaptador, con nuestra aplicación en el centro del sistema, nos permite mantener la aplicación aislada de los detalles de implementación como tecnologías efímeras, herramientas y mecanismos de entrega, lo que facilita y acelera la prueba y la creación de test. Cuando hablamos de DDD había una idea para hacerlo pero no algo concreto, lo que nos trae esta arquitectura son reglas claras para lograrlo. 
- Al tener abstracción fácilmente podemos colocar o quitar los implementaciones a conveniencia sin afectar como funciona nuestro sistema solo reemplazamos la implementación específica.
- También empezamos a ver lo que es las reglas de dependencia entre capas. 



### Clean Architecture

