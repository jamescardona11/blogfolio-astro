---
title: Explorando las Sealed Clases - Dart
date: 2022-11-01
slug: exploring-sealed-clases-dart
status: published
summary: Sealed Classes offer a powerful solution for controlling the class hierarchy in object-oriented programming. By restricting inheritance to a specific set of subclasses, they provide control, stability, and expressiveness to the code.
link: https://medium.com/@jamescardona11/exploring-sealed-classes-dart-8bd275a372eb
tags: [flutter, dart, oop]
---

# Exploring Sealed Classes - Dart

## Introduction:

Sealed Classes have emerged as a powerful and versatile concept in object-oriented programming. They allow developers to define a limited and exclusive set of subclasses that can derive from a base class.

### What are Sealed Classes?

A Sealed Class is a special class that restricts inheritance to a specific set of subclasses. In other words, once a Sealed Class is defined, only classes declared within the same file or module can inherit from it. This provides an additional level of control over the class hierarchy and ensures that only explicitly defined subclasses can extend the functionality of the sealed class.

### Why use Sealed Classes?

Sealed Classes exist to establish constraints in the class hierarchy, limiting and closing the possible cases for certain types of data. While we might typically consider using Enums to solve this situation, we will explore their advantages and limitations later.

#### Benefits of Sealed Classes:

1. Control and Stability: By restricting inheritance to a specific set of subclasses, Sealed Classes provide greater control over the class hierarchy and prevent the addition of unwanted subclasses. (We will expand on this idea later.)

2. Limits unexpected behaviors: By limiting the options, we also limit the "what" and "how" of these classes, offering more control over their context and intentions. This reduces the possibility of errors or unwanted behaviors.

3. Facilitates exhaustiveness in control structures: By using `when` or `map`, we can ensure that we cover all scenarios and variations of the subclasses. This helps us avoid runtime errors.

---

1. Rigidity: Their design and advantage lie in limiting, controlling, or restricting, but this can also be a disadvantage by limiting the flexibility of design and making future extensibility more challenging. If a new subclass needs to be added in the future, modifying the sealed class and all parts of the code that use it would be necessary, which can require significant effort.

2. Coupling: The use of Sealed Classes can increase coupling between classes, as the sealed class and its subclasses are closely related and dependent on each other. This can make the code more difficult to maintain.

### The Problem and the Solution

Before Dart 3.0, there was no native solution to represent Sealed Classes. Let's try to simulate the problem and solve it without Dart 3.0, so we can eventually reach the way to do it from now on.

Suppose we want to create a class hierarchy to represent the organs of the human body.

Organs: Brain, Heart, Lungs, Liver

##### Enums

If we want to represent a limited and restricted hierarchy, we could attempt to do so with Enums:

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

The advantage is that if we need to add a new element to the Enum, Dart will warn us that the `when` clause needs to be modified to include the new subclass. The disadvantage is that Enums have limitations when it comes to adding attributes and encapsulating behaviors. (I won't go into detail on how to make Enums more powerful in Dart.)

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

The advantage of this approach is that we can create more advanced behaviors for each subclass. However, it also presents some disadvantages. The clearest one is that the `when` clause doesn't notify you if you add a new class, leaving some cases unexplored. Additionally, we can extend the `Organ` class outside the file, leading to unintended and uncontrolled behaviors, which is not what we want with Sealed Classes.

#### Pub libraries

There are some libraries on pub.dev that can partially address the problem by using code generation to create the behaviors we require a Sealed Classes: [Freezed]([freezed | Dart Package](https://pub.dev/packages/freezed#union-types-and-sealed-classes))

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

Where can Sealed Classes mainly shine in Flutter? One of the areas where they can shine the most is when using state management; being able to define different states will help keep the code compact and easy to handle.

> You can find a reference here: [Link](https://medium.com/@CavinMac/sealed-classes-in-flutter-with-bloc-ee2761418b65)

## Conclusión:

Sealed Classes offer a powerful solution for controlling the class hierarchy in object-oriented programming. Restricting inheritance to a specific set of subclasses provides control, stability, and expressiveness to the code. However, they also have some disadvantages, such as rigidity and additional coupling. Understanding the context and project requirements before deciding to use Sealed Classes is essential.

Some of the content presented here was created with the assistance of ChatGPT.

#### REF:

Ref1: https://medium.com/dartlang/announcing-dart-3-53f065a10635

Thank you for reading this far. Consider giving it a like, sharing it, and staying tuned for future articles. Feel free to contact me via [LinkedIn](https://www.linkedin.com/in/jamescardona11/).

![](https://i.imgur.com/q7fqQHS.gif)
