---
title: Clojure - ¿Cómo iniciar con lo básico?
date: 2022-5-4
slug: clojure-conceptos-basicos
lang: es
status: published
summary: Clojure, un lenguaje funcional, ofrece inmutabilidad, rendimiento Java, secuencias perezosas y capacidades de concurrencia, enriqueciendo la programación.
tags: [clojure, functional]
---

Es raro estar escribiendo esto, solo soy un aficionado a clojure. Probablemente, lo hago porque es un reto para mí un lenguaje como este, simplemente quiero ver que puedo crear a partir de esto. **Sic parvis magna.**
Como han leído en **post** anteriores, escribir es un reto que ayuda aprender nuevas cosas y el propósito fundamental de este post es poder introducir un poco clojure.

## ¿Qué es clojure?

Es un lenguaje de propósito general, usa el dialecto de LISP. Lo que hace interesante es que LISP apareció hace más de 5 décadas, clojure es como una versión moderna de este.
Los lenguajes de programación los podemos clasificar en 3 paradigmas, _imperativos_, _orientado a objetos_ y _funcionales_. Ninguno es mejor que el otro, cada uno tiene ventajas y desventajas a la hora de resolver problemas.
Clojure se clasifica en los lenguajes de tipo **funcional**. Pero no se queda solo ahí Clojure utiliza la máquina virtual de Java y puede transpilar a Javascript. Esto combina un lenguaje antiguo con
la potencia de lenguajes y librerías modernas de Java o Javascript.

#### ¿Qué nos ofrece clojure?

Dinámico, inmutable y funcional son promesas de valor de clojure, esto proporciona versatilidad para la manipulación de datos. Para algunos puede ser un problema si vienes de lenguajes fuertemente tipados. Clojure hace que el código sea más predecible, verificable y con capacidad de concurrencia.

Algunas características:

- Variables inmutables
- Rendimiento de Java
- Secuencias perezosas
- RELP (testear el código que escribes 'in live')
- Paralelismo

Clojure hasta hace poco tiempo para mí era un total misterio, decidí empezar para aprender algo nuevo, que pueda incorporar en mí día a día como programador.

### ¿Qué es programación funcional?

Hay libros y documentos escritos para explicar que es programación funcional, pero trataré de describirlo en unas pocas palabras.

Hagamos una analogía, la programación no-funcional, trata de escribir una receta, esa receta se va haciendo paso a paso y su propósito es el **como**(imperativo) se resuelve un problema. Trata de pensar en algún desarrollo que hayas hecho y probablemente se asemeje la analogía.

La programación funcional se asemeja a las funciones matemáticas, por medio de funciones _que_ describen la solución. Entonces en programación funcional describimos el **que**(declarativo) queremos hacer por medio de funciones.

Lo sé, esto no aclara al 100% que es programación funcional, veamos un ejemplo.

- Obtener la cantidad de elementos de una lista mayores a 10.
  Antes de cualquier cosa, sé que hay muchas formas de resolver esto, voy a hacer una solución que me ayude a explicar el concepto.

```dart
// Enfoque Imperativo
List<int> numbers = [1, 18, 6, 20, 4, 30, 2, 18, 100, 19, 2, 1];

int count = 0;
for(int num: numbers) {
  if( num > 10) {
    count++;
  }
}
log(count)
```

```javascript
// Enfoque declarativo
List<int> numbers = [1, 18, 6, 20, 4, 30, 2, 18, 100, 19, 2, 1];

int count = numbers.filter((a) => a > 10).count();

log(count)
```

Para muchos es una sorpresa, usan filter, map, where y otro sin número de funciones y no sabían que su enfoque era _declarativo_.
En el segundo enfoque, podemos decir que su solución se delega a funciones.

En una breve conclusión, la programación funcional tiene un enfoque de inmutabilidad y sin efectos secundarios.

&nbsp;

#### Empecemos con esto

La sintaxis de clojure es 'extraña' para la mayoría que venimos de lenguajes más modernos.

```clojure
;; Solución del ejemplo anterior
(println (filter (fn [e] (> e 10)) [1 18 6 20 4 30 2 18 100 19 2 1]))
```

Es el lenguaje del paréntesis, no te preocupes, te adecuarás pronto con algunos ejemplos.

##### Estructura

```clojure
;;    name   params         body
;;    -----  ------  -------------------
(defn greet  [name]  (str "Hello, " name) )
```

Veamos un par de ejemplos de clojure.

- función para decir cuantos años me falta para llegar a x-edad
  
  ```clojure
  (defn age-to [age x-age] (- x-age age))
  ;; uso
  (age-to 20 40) ;;=> 20
  ```
  
  - **defn** es como se definen las funciones, en este caso el nombre es **age-to**
  - [] entre paréntesis definimos una lista de argumentos que recibe la función
  - luego el body de la función, en este caso invocamos la resta

&nbsp;

- función para sumar los primeros x números
  
  ```clojure
  (defn sum-to-x [x] (reduce + (take x (iterate inc 1))))
  ;; uso
  (sum-to-x 10) ;; => 55
  ```
  
  - **Descifremos que hicimos acá**
  * En este caso sum-to-x, toma solo un argumento que es x
  
  * Empecemos de adentro hacia afuera, **iterate** retorna una secuencia de números
  
  * **take** toma los primeros x números de la secuencia
  
  * **reduce** los suma y devolvemos el resultado

&nbsp;

- otra forma de escribir lo mismo
  
  ```clojure
  (defn l-seq [] (iterate inc 1))
  (defn first-x [x] (take x (l-seq)))
  (defn sum-to-x [x] (reduce + (first-x x)))
  ;; uso
  (sum-to-x 10) ;; => 55
  ```
  
  - La ventaja radica en que podemos probar la veracidad de cada parte de la solución.

Creo que podemos hacer muchas cosas, pero por el momento es una breve introducción a clojure.
Mi recomendación para iniciar es [exercism](https://exercism.org/tracks/clojure).
Por ahí fue donde yo inicie y me ha gustado mucho.
Seguiré aprendiendo y puliendo mis conocimientos para traerles un nuevo post.

#### ¿Qué es lo próximo para mí en clojure?

- Terminar los ejercicios propuestos por [exercism](https://exercism.org/tracks/clojure)
- Desarrollar un backend básico con clojure
- Hacer una integración con flutter (sorpresa)

Para mí clojure es algo que quiero aprender a largo plazo. Me gusta y me parece que tiene un encanto los retos que me propone la programación funcional como desarrollador.

#### Ref

[clojure](https://clojure.org/guides/learn/clojure)

[riptutorial](https://riptutorial.com/Download/clojure-es.pdf)

[infoworld](https://www.infoworld.com/article/3613715/what-is-functional-programming-a-practical-guide.html)
&nbsp;
