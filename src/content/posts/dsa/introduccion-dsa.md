---
title: Introducción a DSA
date: 2023-05-29
slug: introduccion-dsa
lang: es
status: draft
link: https://medium.com/@jamescardona11/introducci%C3%B3n-a-dsa-c5bb4facc6c8
summary: El objetivo de este post es poder hacer una introducción a BigO, Array y HashTable para empezar a resolver problemas en plataformas como LeetCode.
tags : [dsa]
---

# Introducción a DSA

> DSA sería la contracción de Data Structure and Algorithms.

El objetivo de este post es poder hacer una introducción a BigO, Array y HashTable para empezar a resolver problemas en plataformas como [LeetCode](leetcode.com). Si no quieres resolver problemas, este post te ayudará atender parte de las bases sobre estructuras de datos.
*"Este post es grande, así que ponte cómodo y empecemos con la acción"*

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/4xWGyVKoXqg2eVCiq9/giphy.gif" width="200" alt="start" />
</p>



Como desarrolladores de software constantemente estamos buscando crear mejor código para nuestra empresa, para nuestros proyectos personales, tomamos cursos o capacitaciones para mejorar nuestras habilidades, pero **¿Qué es el buen código? ¿Qué código es mejor si tenemos dos soluciones?:** 

Puede que esta sea una respuesta que abarque muchos conceptos, pero voy a tratar de simplificar muchas cosas y vamos a intentar quedarnos con dos conceptos para poder desarrollar el objetivo de este post. ¿Qué significa mejor?

- Legible (Readable): ¿Es tu código limpio, otros lo pueden entender, es fácil de mantener?

- Escalable (Scalable): ¿Qué tan rápido corre tu código? ¿Cómo maneja la memoria?

Pensemos que el código es como cocinar, podemos decir que hay una buena forma de hacer un pastel y una mala forma de hacer un pastel. Tenemos las instrucciones que son la receta y esperamos que estás funcionen bien con nuestra cocina para finalmente tener un buen pastel.

<p align="center" width="100%">
  <img src="https://i.imgur.com/XvGjryA.png" width="400" alt="code-pie" />
</p>

Las computadoras son máquinas, para producir algo necesitan buenas recetas (buen código). En este caso sería lo mismo

Así cómo hay muchas formas de crear un pastel, cambiando los ingredientes, la preparación. Existen muchas formas de crear código.

Para empezar a entender que es un buen código en el contexto de este post desarrollemos dos soluciones para sumar los números del 1 al 100, ¿cómo podemos responder las anteriores preguntas sobre escalabilidad?

```js
// sum number 1 to 100
function numberSum(n) {
  let total = 0;
  for(let i = 1; i <= n; i++){
    total += i;
  }
  return total;
}


function numberSum2(n) {
  return n * (n+1) / 2;
}
```

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/ALdw5Fs766T5u/giphy.gif" width="250" />
</p>

Para determinar que código es más rápido podemos colocar un timer en cada una de las funciones cuando inicia y un timer cuando termina, encontrar la diferencia y con eso podemos determinar cual es más rápido.

```js
let t1 = performance.now();
numberSum(n); // numberSum2
let t2 = performance.now();

console.log(`Time: ${t2 - t1} ms`);

// Resultados: numberSum
// n= 10 Time: 0.020208999514579773 ms
// n= 10000  Time: 0.27854200080037117 ms
// n= 100000 Time: 4.513374999165535 ms
// n= 1000000000 Time: 962.9120420012623 ms
// n= 10000000000 Time: 10223.453041000292 ms


// Resultados: numberSum2
// n= 10 Time: 0.025875000283122063 ms
// n= 10000 Time: 0.017791999503970146 ms
// n= 100000 Time: 0.020124999806284904 ms
// n= 1000000000 Time: 0.016249999403953552 ms
// n= 10000000000 Time: 0.014209000393748283 ms
```

¿Qué conclusiones podemos sacar? ¿Es el tiempo una medida confiable para determinar la velocidad de un algoritmo?

Realmente el tiempo no es una medida buena para poder medir la rapidez de un algoritmo.

- Diferentes computadores tienen diferentes tiempos

- El mismo computador puede tener diferentes tiempos

- ¿Qué pasa si n sigue aumentando?

Si el tiempo no es una medida confiable, ¿cómo lo podemos hacer?

Lo que podemos crear es una medida estándar para cualquier entorno y es ahí donde entra BigO

## BigO

BigO es una forma de simplificar el conteo de operaciones, esto es lo común que podemos tener y que simplemente podemos medir la rapidez de un algoritmo midiéndola en relación con la cantidad de operaciones que debe realizar un código para ejecutarse.

A medida que un código tenga más operaciones podemos decir que ese código es "peor". Entre más cerca del rojo estemos mucho peor.

<p align="center" width="100%">
  <img src="https://i.imgur.com/JRSZB6U.png" width="500"  alt="BigO notation"/>
</p>

> Fuente: https://www.bigocheatsheet.com

#### Consideraciones para calcular la notación BigO.

- Siempre vamos a considerar el pero caso
- Vamos a remover constantes
- Diferentes entradas deben tener diferentes notaciones
  - Para loops seguidos O(a+b)
  - Para loops anidados O(a*b)

¿Qué tal si encontramos la BigO para nuestro código?

Contemos las operaciones:

```js
function numberSum(n) {
  let total = 0; // 1 operation

  for(let i = 1; i <= n; i++){ 
    total += i; // 1 operation n times = n operations in total
  }
  return total; //1 operation
}

// BigO: O(2 + n)
// Consideremos la regla de de remover constantes
// BigO: O(n)
```

```js
function numberSum2(n) {
  return n * (n+1) / 2; // 1 operation
}

// BigO: O(1)
```

Con esto podemos concluir que el algoritmo número dos en notación BigO es mejor.

##### Dos ejemplos más sobre BigO

Encuentra la notación BigO

Ejemplo #1

```js
function randomFn1(n) {
  let count = 0;
  let total = 0;
  for(let i = 1; i <= n; i++){
    if(i % 2 == 0){
      sum += 1;
    }
  }

  for(let i = 0; i <= n; i += 5){
    total += i * 5;
  }

  return total + count;
}
```

Ejemplo #2

```js
function randomFn2(n, m) {
  let a = 5;
  let b = 10;
  let c = 50;
  let total = 0;

  for(let i = 0; i <= n; i++){
    for(let j = i; j <= m; j ++){
      total = i * j; 
    }
  }
  return total;
}
```

- Solución #1: O(n)

- Solución #2: O(n*m)

¿Encontraste las respuestas?, si no revisa la parte de consideraciones para calcular BigO o deja un comentario para que puedas aclarar tus dudas.

### BigO para calcular Space Complexity

BigO también podemos usarlo para calcular el espacio en memoria que ocupa nuestro algoritmo en tiempo de ejecución. Es similar solo que esta vez vamos a seguir las siguientes reglas:

- Valores primitivos (numbers, bool, null) ocupan espacio constante.

- Strings necesitan O(n) de espacio donde n es el tamaño del String

- Objetos como Array, Maps o Sets ocuparan O(n) donde n será el tamaño del array o la cantidad de keys de los mapas.

```js
function sum(arr) { // arr is array
  let total = 0; // 1 space
  for(let i = 0; i <= arr.length; i++){ // 1 space by i
    total += arr[i] 
  }
  return total;
}

// O(1) space
```

```js
function double(arr) { // arr is array
 let newArr = []; // n spaces, n is length of arr
 for(let i = 0; i <= arr.length; i++){ // 1 space by i
   newArr.push(2*arr[i])
 }
 return total;
}

// O(n) space
```

Después de haber visto esto debemos tener una mejor compresión de como podemos medir potencialmente que tan bueno es nuestro código comparado con otro.

---

## Data Structure

Simplemente piensa en esto como una forma de agrupar y organizar información. Donde la información tiene algo en común.

<p align="center" width="100%">
  <img src="https://i.imgur.com/B3hfybN.png" width="300"  alt="Different data structure"/>
</p>

Pensemos en las siguientes preguntas y como encaja nuestro aprendizaje hasta acá,

- ¿Por qué existen tantas estructuras de datos?

- ¿Por qué aprender sobre ellas?

- ¿Cómo son diferentes?

Lo primero que se nos puede venir a la cabeza para responder las preguntas anteriores es, ¿cuál es la estructura de datos perfecta para todo?. Respuesta rápida no existe. Hay muchas de agrupar y organizar información, pero no todas las estructuras son buenas para todos los momentos o situaciones, así como en la vida real podríamos guardar ropa en el refrigerador, aunque parece que no es la forma adecuada.

Así mismo pasa en los algoritmos y el código, escoger una buena estructura de datos nos va a ayudar a resolver problemas más rápido, más fácil y haciendo mejor nuestro código. Tampoco pretendo que te vuelvas loco aprendiendo cada una de estas estructuras, algunas son muy específicas para problemas concretos. Puedes consultar sobre todas las estructuras de datos acá: [List of data structures - Wikipedia](https://en.wikipedia.org/wiki/List_of_data_structures)

En este post solo cubriremos dos Arrays y HashTable. En próximos post seguiremos con las más conocidas, usadas y útiles en el día a día.

Antes de seguir explorando las data structure, al menos en el contexto de este post que entiendas que es una **clase/class** de programación orientada objetos(OOP), no voy a entrar en detalles sobre que es una clase en este post, quédate con esta definición. *Es algo que tiene los planos para crear "cosas(objetos)" que tienen atributos y comportamientos*, aunque te invito a consultar más sobre OOP por tu cuenta.

La razón de aprender sobre *OOP* y *class* es porque vamos a implementar algunas estructuras desde cero y en muchos casos usaremos clases para poder desarrollar el comportamiento.

### Arrays

Esta colección es una de las más usadas o conocidas, y su principal característica es que organizan los elementos de forma secuencial uno después del otro.

```js
let arr = [1, 2, 3, 4, 5, 6]; // nums
let arr2 = ['b', 'l', 'o', 'g']; // chars
```

Los array también podemos separarlos en dos tipos estáticos y dinámicos, básicamente los que tienen un tamaño constante de elementos y los que pueden crecer en el tiempo.

Sobre los arrays podemos hacer diferentes operaciones, las más básicas son:

- lookup - O(1)
- push* - O(1) - Agregar un elemento al final del array
- insert - O(n)
- delete - O(n)

*Puede ser O(n) si el array es dinámico, en los array dinámicos la operación se conoce como append.

#### Implementemos un array
Hagamos la implementación de un Array desde cero. Incluyamos las siguientes operaciones:

- obtener un elemento mediante el índice, **get**
- agregar un elemento, **push**
- borrar el último elemento, **pop**
- borrar un elemento por el índice, **delete**

```js
class MyArray {
  push(item)
  get(index)
  pop()
  delete(index)
}
```

Empecemos por lo primero vamos a definir el length del array y un objeto llamado data para guardar los elementos.

```js
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
}
```

Este objeto data particularmente lo revisaremos en un apartado más adelante, pero si no sabes que es algo que guarda los elementos usando una {clave, valor}.

Procedamos a crear el método **push**

```js
class MyArray {
  constructor() {...}

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }
}
```

Básicamente, se guardan los elementos "al final" usando el length y se aumenta el length. Esta operación es de complejidad constante O(1).

Procedamos a crear el método **get**

```js
class MyArray {
  constructor() {...}

  push(item) {...}

  get(index) {
    return this.data[index];
  }
}
```

Este método **get** podríamos crear algunas validaciones por si tratamos de acceder a un elemento que no existe y ejecutar un error, pero para efectos prácticos sigamos adelante.
Nuevamente, esta operación es de complejidad constante O(1) porque al conocer la clave, en este caso el index obtener el elemento al instante.

Procedamos a crear el método **pop**

```js
class MyArray {
  constructor() {...}

  push(item) {...}

  get(index) {...}

  pop(index) {
    if (this.length == 0) return; // return empty if length is zero
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;

    return lastItem;
  }
}
```

En este método vamos a retornar vació si el array length es cero.
Luego vamos a obtener el último elemento por el índice restando uno al length. Vamos a borrar el elemento de *data* y vamos a reducir el length en uno.
Nuevamente, esta operación sigue siendo de complejidad constante O(1).

Procedamos a crear el método **delete**

```js
class MyArray {
  constructor() {...}

  push(item) {...}

  get(index) {...}

  pop(index) {...}

  delete(index) {
    const item = this.data[index];
    this._shiftItems(index);
    return item;
  }

  // move the items to the new position
  _shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.length - 1];
    this.length--;
  }
}
```

Este método sería el más complicado porque debemos mover los índices o modificar los índices para que todo quede como debe ser, no podemos tener un array un salto de índice.
Para este método obtenemos el elemento a eliminar y procedemos por medio del método complementario a mover los índices. Borramos y reducimos el length en uno.
Este método **delete** tiene una complejidad lineal O(n)

**Probemos que tal funciona nuestro array**

```js
const arr = new MyArray();
arr.push('hello');
arr.push('hi');
arr.push('there');
arr.push('!');

arr.delete(1);
arr.pop();

console.log(arr); // MyArray { length: 2, data: { '0': 'hello', '1': 'there' } }
```

Pueden obtener el código completo en el [github](https://github.com/jamescardona11/my-personal-blog/tree/main/code/dsa)

#### Ejercicios de LeetCode Arrays

Después de entender la lógica detrás de un array y entender lo que es BigO te voy a dejar algunos ejercicios propuestos para que puedas empezar a desarrollar mucho más tu habilidad de resolución y te vuelvas un maestro de las estructuras de datos:

- [Two Sum](https://leetcode.com/problems/two-sum/) - Easy
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) - Easy
- [Reverse String](https://leetcode.com/problems/reverse-string/) - Easy
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/) - Easy
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) - Easy
- [Valid Palindrome](https://leetcode.com/submissions/detail/848305630/) - Easy
- [Contains Duplicate](https://www.leetcode.com/problems/contains-duplicate) - Easy


<p align="center" width="100%">
  <img src="https://media.giphy.com/media/Caey86HvbOPuPwHrsx/giphy.gif" width="300"  alt="hash generator"/>
</p>


### HashTable

También conocidos como HashMaps, Maps, Unordered Maps, Dictionary hay muchas formas de llamar a esta estructura. La razón de iniciar con Array y HashTable es que son dos de las más comunes estructuras de datos en nuestro día a día como desarrollador. Tienen un uso muy frecuente en todos los lenguajes, para entender un poco sobre que es un hashTable descompongamos el nombre, ¿Qué significa Hash?.

Para responder esto empecemos con lo más simple, HashTable se compone principalmente de dos características **Key** y **Value**, donde key sería el como el índice en los Arrays, asumamos que existe algo que se llama **Hash function**(pronto lo veremos) que convierte nuestra Key en algo "único" y que eso se guarda en memoria así que sabemos en todo momento en que espacio de memoria está guardado determinado valor, de esta forma una HashTable puede fácilmente encontrar el correspondiente valor gracias a su Key.

#### ¿Qué es un hash function?

Simplemente, es algo que genera un "nuevo" valor con un length especifico a partir de un valor inicial.
Si vamos a un sitio como [MD5HashGenerator](https://www.md5hashgenerator.com) podemos ver que al darle un valor de entrada nos genera algo similar a lo que se ve en la siguiente imagen, usando un algoritmo de generación, el truco acá es que para el mismo valor de entrada debemos tener el mismo valor de salida si estamos usando el mismo algoritmo de hashing.

<p align="center" width="100%">
  <img src="https://i.imgur.com/kROJLzP.png" width="500"  alt="hash generator"/>
</p>
* Existen muchos tipos de algoritmos para generar ese hash.

Una aclaración importante es que los lenguajes usan una función de Hash óptima que demora poco tiempo y que está "muy ligada" a un espacio de memoria.

Las operaciones más comunes de un HashTable son:
- insert O(1)
- lookup O(1)
- delete O(1)

```js
let blog = {
  name: 'jamescardona11',
  owner: 'james',
  blogHasPowers: false,
}

blog.name // lookup - O(1)
blog.domain = 'blog.jamescardona11.com', // insert - O(1)
```

Después de ver que un HashTable todas las operaciones son O(1) deberíamos reconsiderar llamarla la *estructura perfecta*.
Como se mencionó al principio tenemos ventajas y desventajas en las HashTable y una de esas se llama Hash Collisions.

#### Hash collisions

Esto es un tema importante que lo entendamos, pero realmente es muy largo que probablemente llevaría un post completo para abordar todo y sus posibles soluciones.
Para entender un poco la situación dejo el siguiente video/gif para que se ilustre una problemática.

<p align="center" width="100%">
  <img src="https://i.imgur.com/a8mJbFm.gif" width="500"  alt="Hash Collisions"/>
</p>

Pueden encontrar la página de referencia en este [link](https://www.cs.usfca.edu/~galles/visualization/OpenHash.html)
En este ejemplo tenemos un espacio limitado de doce espacios, nuestros computadores tienen espacio limitado.
Podemos observar que como tenemos un espacio limitado para dos claves totalmente diferentes, el espacio de memoria es el "mismo", y esto es lo que se conoce como Hash Collisions.

Veamos en la siguiente imagen, supongamos que los índices 0...6 son espacios de memoria disponibles, cuando la HashFunction genera el valor y debe asignar en memoria puede generar colisiones, y una de las formas de resolverlo es generar punteros al siguiente valor guardado en ese espacio lo cual es llamado **LinkedList** que es otra estructura de datos que veremos en próximos post.

<p align="center" width="100%">
  <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2015/07/hashChaining1.png" width="500"  alt="Hash Collisions 1"/>
</p>

Pueden indagar mucho más en este post de [GeekForGeeks](https://www.geeksforgeeks.org/separate-chaining-collision-handling-technique-in-hashing/) 

La conclusión importante sobre esto es que cuando tenemos colisiones, la lectura y escritura en una HashTable cambian a O(n/k) donde k es el tamaño de la HashTable; otra vez, como BigO nos dice que eliminemos las constantes, quedaría así: O(n).

Resolver colisiones se puede hacer de diferentes formas como la que explicamos recientemente, si quieres saber más al respecto puedes consultar acá para iniciar. [Link](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution)

Como quedan las operaciones en las HashTable
- insert O(1) *
- lookup O(1) * 
- delete O(1)

*Depende de la implementación y ocasionalmente pueden ser O(n).

#### Implementemos un HashTable
Hagamos la implementación de un Array desde cero. Incluyamos las siguientes operaciones:

- obtener un elemento mediante la key, **get**
- agregar un elemento, **set**


Empecemos, para esto la plantilla sería donde el constructor recibe el tamaño de nuestra HashTable y donde tenemos una HashFunction definida.
```js
class MyHashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  // hash function
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) {}
  get(key) {}
}
```

Procedamos a crear el método **set**

```js
class MyHashTable {
  constructor(size) {...}

  // hash function
  _hash(key) {...}

  set(key, value) {
    if (key == null) return;

    const address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }

    this.data.push([key, value]);
  }
}
```
Vamos a implementar algo que nos ayude con las colisiones, por eso en cada posición vamos a guardar un array con dos posiciones key y value. Si hay una colisión guardaremos haremos un push en ese array de las nuevas key y value conservando los valores anteriores.

Procedamos a crear el método **get**

```js
class MyHashTable {
  constructor(size) {...}

  // hash function
  _hash(key) {...}

  set(key, value) {...}

  get(key) {
    const address = this._hash(key);
    const cb = this.data[address];

    if (cb) {
      for (let i = 0; i < cb.length; i++) {
        if (cb[i][0] === key) {
          return cb[i][1];
        }
      }
    }
    return undefined;
  }
}
```
Simplemente, vamos a comprobar si existe la key en el array y luego vamos a recorrer el array buscando la key específica.

**Probemos que tal funciona nuestro hashTable**

```js
const myHashTable = new MyHashTable(10);
myHashTable.set('cherry', 900);
myHashTable.set('grapes', 10000);
myHashTable.set('grapes', 10000);
myHashTable.set('apples', 9);

for (let i = 0; i < myHashTable.data.length; i++) {
  console.log(myHashTable.data[i]);
}
```

#### Ejercicios LeetCode de HashTables & Arrays

Después de entender la lógica detrás de un array y entender lo que es BigO te voy a dejar algunos ejercicios propuestos para que puedas empezar a desarrollar mucho más tu habilidad de resolución y te vuelvas un maestro de las estructuras de datos:

- [Two Sum](https://leetcode.com/problems/two-sum/) - Easy
- [Roman to Integer](https://leetcode.com/problems/roman-to-integer/) - Easy
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/) - Easy
- [Majority Element](https://leetcode.com/problems/majority-element/) - Easy/Medium
- [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) - Easy/Medium

## Referencias y Agradecimientos:
- Photo de portada por Mark Fletcher-Brown
- https://zerotomastery.io
- https://www.youtube.com/c/ColtSteeleCode


&nbsp;
&nbsp;
&nbsp;

Gracias por llegar hasta acá considera dar un like, compartir y nos vemos en un próximo artículo.

<p align="center" width="100%">
  <img src="https://i.imgur.com/q7fqQHS.gif" width="300" alt="gif_chiaoo" />
</p>
