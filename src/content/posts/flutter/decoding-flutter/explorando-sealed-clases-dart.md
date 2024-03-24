---
title: Explorando las Sealed Clases - Dart
date: 2022-11-01
slug: explorando-sealed-clases-dart
lang: es
status: published
summary: Las Sealed Classes ofrecen una solución poderosa para controlar la jerarquía de clases en la programación orientada a objetos. Al restringir la herencia a un conjunto específico de subclases, brindan control, estabilidad y expresividad al código.
link: https://medium.com/@jamescardona11/explorando-las-selaed-clases-dart-f3e1ed2bb11d
tags: [flutter, dart, oop]
---

# Explorando las Selaed Clases - Dart

## Introducción:

En programación orientada a objetos, las Sealed Classes(Clases selladas) han emergido como un concepto poderoso y versátil. Estas permiten a los desarrolladores definir un conjunto limitado y exclusivo de subclases que pueden derivarse de una clase base.

### ¿Qué son las Sealed Classes?

Es una clase especial que restringe la herencia a un conjunto específico de subclases. En otras palabras, una vez que se define una Sealed Class, solo las clases declaradas dentro del mismo archivo o módulo pueden heredar de ella. Esto proporciona un nivel adicional de control sobre la jerarquía de clases y garantiza que solo las subclases definidas explícitamente puedan extender la funcionalidad de la clase sellada.

### ¿Por qué existen las Sealed Classes?

La existencia se basa en establecer restricciones en la jerarquia de clases, limitada y cerrada de casos posibles para ciertos tipos de datos. Por lo general esta situación podriamos pensar en resolverla con Enums, pero veremos más adelante sus ventajas y limitaciones.

#### Ventajas y Desventajas

1. Control y estabilidad: Al restringir la herencia a un conjunto específico de subclases, las Sealed proporcionan un mayor control sobre la jerarquia de clases y evitan la adición de subclases no deseadas. (Expandiremos la idea más adelante)

2. Limita los comportamientos inesperados: Al limitar las opciones, también limitamos el ¿qué y el cómo?, de estas clases, ofreciendo más control sobre el contexto y las intenciones de estas clases, reduce la posibilidad de errores o comportamientos no deseados.

3. Facilita la exhaustividad en estructuras de control: Al usar `when` o `map` se puede garantizar que cubramos todos los escenarios y variaciones de las subclases. Esto nos ayuda a evitar errores en tiempo de ejecución.

4. Rigidez: Su diseño y ventaja es limitar, controlar o restringir, pero también puede ser una desventaja al limitar la flexibilidad del diseño y dificultar la extensibilidad futura. Si se requiere agregar una nueva subclase en el futuro, será necesario modificar la clase sellada y todas las partes del código que la utilizan, lo que puede resultar en un esfuerzo considerable.

5. Acoplamiento: El uso de Sealed Classes puede aumentar el acoplamiento entre las clases, ya que la clase sellada y sus subclases están estrechamente relacionadas y dependen entre sí. Esto puede hacer que el código sea más difícil de mantener.

### El problema y la solución

Hasta antes de Dart 3.0 no existia nativamente algo para representar las Sealed Classes para ello vamos a tratar de simular el problema y resolverlo sin Dart 3.0 para que al final lleguemos a la forma que podemos hacerlo desde ahora.

Supongamos que vamos a crear una jerarquia de clases para representar los organos del ser humano.

Organs: Brain, Heart, Lungs, Liver

##### Enums

Si queremos represetar una jerarquia limitada y restringida podemos intentar hacerlo con Enums:

```dart
enum Organ {
  Brain,
  Heart,
  Lungs,
  Liver,
}


extension OrganExtension on Organ {
  T when<T>({
    required T Function() brain,
    required T Function() heart,
    required T Function() lungs,
    required T Function() liver,
  }) {

  }
}

void main() {
  final organ = Organ.Lungs;

  switch (this) {
      case Organ.Brain:
        print("Brain");
      case Organ.Heart:
        print("Heart");
      case Organ.Lungs:
        print("Lungs");
      case Organ.Liver:
        print("Liver");
    }
}
```

La ventaja es que si necesitamos agregar un nuevo elemento al Enum Dart nos avisará que el when debe ser modificado para extender la nueva subclase, la desventaja es que  los enum tienen una limitación para agregar atributos y en la encapsulación de  comportamientos. (No voy a entrar en el detalle que puedes hacer Enum más poderosos en Dart)

##### Abstract class

```dart
abstract class Organ {
  String name;

  Organ(this.name);
}

class Brain extends Organ {
  int psychicPower;
  Brain({this.psychicPower = 0}): super("Brain");

}

class Heart extends Organ {
  final int heartRate;
  Heart({this.heartRate = 200}): super("Heart");
}

class Lungs extends Organ {
  Lungs(): super("Lungs");
}

class Liver extends Organ {
  Liver(): super("Liver");
}


extension SealedClassExtension on Organ {
  T when<T>({
    required T Function(Brain) brain,
    required T Function(Heart) heart,
    required T Function(Lungs) lungs,
    required T Function(Liver) liver,
  }) {
    if (this is Brain) {
      return brain(this as Brain);
    } else if (this is Heart) {
      return heart(this as Heart);
    } else if (this is Lungs) {
      return lungs(this as Lungs);
    } else if (this is Liver) {
      return liver(this as Liver);
    }

    throw Exception("Unknown subclass");
  }
}

void main() {
  final organ = Brain(psychicPower: 200);

  organ.when(
    brain: (Brain brain) => print("Brain and my power is ${brain.psychicPower}"),
    heart: (_) => print("Hearth"),
    lungs: (_) => print("Lungs"),
    liver: (_) => print("Liver"),
  );


}
```

La ventaja de esta forma es que podemos crear comportamientos más avanzados para cada subclase, pero también ofrece algunas desventajas, la más clara es el `when` que no te avisa si agregas una clase nueva dejando casos sin explorar, también podemos extender la clase `Organ` fuera del archivo haciendo comportamientos no deseados y no controlados que es lo queremos con las Sealed Classes.

#### Pub libraries

En pub.dev hay algunas librerías que pueden suplir parte del problema, usando generación de código para poder crear los comportamientos que requerimos de las Sealed Classes: [Freezed]([freezed | Dart Package](https://pub.dev/packages/freezed#union-types-and-sealed-classes))

##### Dart 3 💙💙💙

```dart
sealed class Organ {...}

class Brain extends Organ {...}
class Heart extends Organ {...}
class Lungs extends Organ {...}
class Liver extends Organ {...}

void main() {
 final organ = Brain(psychicPower: 200);

 switch(organ){
     case Heart _ : print("Hearth");
     case Lungs _ : print("Lungs");
     case Liver _ : print("Liver");
     case Brain _ : print("Brain and my power is ${organ.psychicPower}");
 }
}
```

¿Dónde pueden brillar particularmente en Flutter? Una de las partes donde más puede brillar es cuando usamos algún State Management, poder definir diferentes estados, es algo que te va ayudar a tener el código compacto y fácil de manejar.

> Puedes encontrar una referencia acá: [Link](https://medium.com/@CavinMac/sealed-classes-in-flutter-with-bloc-ee2761418b65)

## Conclusión:

Las Sealed Classes ofrecen una solución poderosa para controlar la jerarquía de clases en la programación orientada a objetos. Al restringir la herencia a un conjunto específico de subclases, brindan control, estabilidad y expresividad al código. Sin embargo, también presentan algunas desventajas, como rigidez y acoplamiento adicional. Es esencial comprender el contexto y los requisitos del proyecto antes de decidir utilizar Sealed Classes.

Algunas de las cosas creadas acá fueron creadas con la ayuda de ChatGPT.

#### REF:

Ref1: https://medium.com/dartlang/announcing-dart-3-53f065a10635

Gracias por llegar hasta acá considera dar un like, compartir y nos vemos en un próximo artículo. Puedes contactarme via [LinkedIn](https://www.linkedin.com/in/jamescardona11/) si requieres algo.

<img title="" src="https://i.imgur.com/q7fqQHS.gif" alt="" data-align="center">
