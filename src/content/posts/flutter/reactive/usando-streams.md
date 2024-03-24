---
title: Usando Streams
date: 2022-2-30
status: published
summary: En esta publicación, exploraremos los conceptos básicos del uso de Streams en Flutter.
link: https://blog.jamescardona11.com/usando-streams
tags: [dart, flutter, reactive-programming]
---

# Usando Streams

Inicialmente, te doy la bienvenida, espero puedas encontrar útil, entretenido y de valor este post. Quiero empezar explicando el propósito del post:

- Entender ¿para qué son?, y su uso básico

Vamos a tratar de descubrir alguno de los usos de los **Streams**, este tipo de objetos y/o concepto no son únicos de Flutter, desde hace mucho tiempo otras tecnologías los han incorporado. Yo tuve mi primer contacto con ellos cerca del 2016, pero no entendí mucho sobre ellos; siempre consideré que era un gap por cubrir en mi carrera profesional y desde que los empece a usarlos para aplicaciones Flutter he mejorado mucho mi solución de problemas.

## ¿Qué es un stream?

Formalmente, la definición es muy clara, pero creo que voy a usar de la vieja confiable: "La analogía".

<img title="" src="https://i.imgur.com/S48jJMO.png" alt="" data-align="center">

Básicamente, los Streams es una secuencia de información que fluye a uno o muchos puntos de salida. Imagina una banda transportadora del equipaje de un aeropuerto, esta envía paquetes y hay puntos de salida de esos paquetes, uno puede ser donde las personas esperan el equipaje, otro puede ser el equipaje que va a otras empresas de transporte, etc.

La definición más **formal** seria: los stream representa un secuencia de eventos asíncronos.

Flutter lanza esta funcionalidad para:

>  Widgets + Streams = Reactive Flutter App

En programación reactiva tenemos algunos conceptos importantes y básicos:

- Stream de datos: Es el flujo de datos que va cambiando
- **Observable**: Captura el flujo de datos y espera que alguien se subscriba
- Subject: Emisor de eventos, cuando hay un nuevo evento por medio del subject el observable notifica a todos los que están subscritos
- **Subscription**: La función para conectarse que el observer empiece a escuchar los cambios del observable
- **Observer**: Quien se subscribe al observer
- Operators: Son funciones que modifican el flujo de datos antes de llegar al observer

<div>
<img title="" src="https://i.imgur.com/oDmAMnS.png" alt="" data-align="center">
</div>

volvamos a flutter...

### Tipos de Stream

En flutter tenemos dos tipos de stream, *single stream subscription* y *broadcast stream*.

La diferencia es sencilla, el *Single Stream* solo se pueden escuchar una vez y no comienza a generar eventos hasta que haya un listener y deja de enviar eventos cuando el listener deja de escuchar.

Los *Broadcast Stream* puede tener n-cantidad de listener y los eventos se disparan, haya listener o no. Para crearlos usamos ```asBroadcastStream()```. En cualquier momento un listener puede darse de baja, pero los otros seguirán recibiendo actualizaciones.

#### Ejemplos básico:

```dart
// Example #1
Stream<int> numbersTo10() {
  return Stream.fromIterable(List.generate(10, (index) => index));
}

// Example #2
Stream<int> onlyOdds() {
  return Stream.fromIterable(List.generate(10, (index) => index))
      .where((event) => event % 2 == 0);
}

// Example #3
Stream<String> streamPeriodic() {
  return Stream<String>.periodic(
      const Duration(seconds: 1), (c) => 'Periodic, c = $c').take(5);
}
```

Cada uno de estos ejemplos hace algo básico, 

1- Vamos a emitir por medio de un Stream una lista de diez números de uno en uno

2- Vamos a usar el operador ```where``` para modificar la salida del Stream, emitir solo los números pares

3- En el último hacemos uso de un constructor para emitir información de forma periódica y solo tomaremos cinco con el operador ```take```

Para poder imprimir el resultado podemos hacerlo de la siguiente forma:

```dart
numbersTo10().forEach((element) {
    print('Number: $element');
});

streamPeriodic().forEach((element) {
    print(element);
});

onlyOdds().forEach((element) {
    print('Odds: $element');
});
```

Hasta acá me has hablado que debemos tener un listener, en este caso, ¿dónde está?

Puede que ya te hayas dado cuenta, pero internamente el forEach tiene un listener y luego transforma lo que va escuchando de un evento.

Si quieres hacerlo de una forma diferente puede usar la función ```listen```, que vamos a ver un poco más abajo.

## StreamController

Es una clase que nos añade muchas más funcionalidades a un *Stream* para poder manipular los Stream de forma más fácil. 

Con esta podemos crear *broadcastStreams*, adicional podemos "separar" la responsabilidad para agregar información usando *StreamSink*.

Podemos usarlo de la siguiente forma, donde T representa un tipo de dato.

```dart
StreamController streamController = StreamController<T>();
```

**¿Cómo nos subscribimos?**

```dart
streamController.stream.listen((event) {
    print("Data:\n$event");
}, onDone: () {
    print("onDone");
}, onError: (error) {
    print("onError");
});
```

Muy importante cuando usemos *StreamController* llamar el método ```close()```

## StreamBuilder

"*Al rescate de los widgets*"

Si queremos combinar nuestros streams con los widgets, hay varias formas de hacerlo, una de las formas más sencillas es usar el StreamBuilder. Este es un widget especial que nos permite suscribirnos a un Stream y reaccionar al cambio de eventos.

#### Ejemplo

El siguiente ejemplo trata de ilustrar como podemos reaccionar a los cambios cuando agregamos nueva información a un Stream.

1- Definamos las variables iniciales.

```dart
final strController = StreamController<String>();
final List<String> petsList = [];
```

```
2- Creemos cómo será el flujo de datos, es una función que agrega los datos de un array esperando un tiempo para emitir el siguiente.

```dart
Future<void> initStreamControllerExample() async {
   // This is the information to emit, which can be obtained from a DB, API, etc.
   final pets = ['Cat', 'Dog', 'Parrot', 'Rabbit', 'Cow', 'Sheep'];

   for (final pet in pets) {
     await Future.delayed(Duration(milliseconds: 1500));

     strController.add(pet);
   }
}
```

3- Construyamos el *StreamBuilder*

```dart
StreamBuilder<String>(
    stream: strController.stream,
    builder: (_, snapshot) {
        if (snapshot.hasData) {
            petsList.add(snapshot.requireData);
        }

        return ListView.builder(
            itemCount: petsList.length,
            itemBuilder: (_, i) => ListTile(
              title: Text(petsList[i]),
            ),
        );
    },
)
```

4- Cerremos el *StreamController*

```dart
@override
void dispose() {
    strController.close();
    super.dispose();
}
```

El resultado será:

<p align="center" width="100%">
  <img src="https://i.imgur.com/SZP9kYJ.gif" width="200" />
</p>

## ¿ State management ?

¿ State management ?

Si has leído hasta acá, probablemente te has dado cuenta de que esto tiene mucha pinta de poder ayudarnos a manejar el estado de nuestra aplicación. El stream tiene algunas cosas muy interesantes para poder manejar el estado de la aplicación, de hecho algunas librerías famosas de state-management usan Streams para poder reaccionar a los cambios.

Si te interesa más sobre esto y ¿cómo crear tu propio state-management?, mantente al tanto que pronto vendrá un contenido relacionado a eso.

Donde crearemos un state-management y vamos a hacer ejemplos más complejos usando API, DB y otras cosas bien interesantes con RxDart.

Si quieres profundizar más, te recomiendo mucho  [Blog de Vandad Nahavandipoor](https://vandad.sh/blog/)

Código en github: [Code](https://github.com/jamescardona11/my-personal-blog/tree/main/code/usign_stream_flutter)

Gracias por llegar hasta acá, Dale me gusta a mi artículo 🤞Suscríbete a mi boletín si estás interesado en artículos como estos.

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/3oEduOnl5IHM5NRodO/giphy.gif" width="200" />
</p>
## Referencias:

Ref1: https://www.youtube.com/watch?v=tUB3rNsMYAk

Ref2: https://www.raywenderlich.com/books/flutter-apprentice/v1.0.ea3/chapters/15-streams

Ref3: https://medium.com/@ayushpguptaapg/using-streams-in-flutter-62fed41662e4

Ref4: https://dart.dev/tutorials/language/streams
