---
title: Using Streams
date: 2022-2-30
status: published
summary: In this post, we will explore the basics of using Streams in Flutter.
link: https://blog.jamescardona11.com/using-streams
tags: [dart, flutter, reactive-programming]
---

# Using Streams

I hope you find this post useful, entertaining, and valuable. The purpose of the post is to understand the basics related to Streams

We're going to try to discover some of the uses of **Streams**, these types of objects and/or concepts are not unique to Flutter. Other technologies have been incorporated for a long time. I had my first contact with them around 2016, but I didn't understand much about them; I always considered that it was a gap to cover in my professional career. Since I started using them for Flutter apps I have greatly improved my problem-solving.

## What is a stream?

Formally, the definition is very clear, but I think I'm going to use a simple analogy.

Streams are a sequence of information that flows to one or many output points. Imagine a baggage conveyor belt at an airport, it sends packages and there are exit points for those packages, one can be where people wait for the luggage, another can be the luggage that goes to other transport companies, etc.

The most **formal** definition would be: the stream represents a sequence of asynchronous events.

Flutter releases this functionality to:

>  Widgets + Streams = Reactive Flutter App

In reactive programming we have some important and basic concepts:

- Data Stream: It is the data flow that is changing
- **Observable**: Capture the data stream and wait for someone to subscribe
- Subject: Emitter of events, when there is a new event through the subject, the observable notify all those who are subscribed
- **Subscription**: The function to connect so that the observer starts listening to the changes of the observable
- **Observer**: Who subscribes to the observer
- Operators: These are functions that modify the data flow before reaching the observer.

<div>
<img title="" src="https://i.imgur.com/oDmAMnS.png" alt="" data-align="center">
</div>

return to flutter...

### Types of Stream

In flutter, we have two types of stream, *a single stream subscription* and *a broadcast stream*.

The difference is simple, the *Single Stream* can only listen once and it doesn't start generating events until there is a listener and it stops sending events when the listener stops listening.

The *Broadcast Stream* can have an n-number of listeners and the events are fired whether there is a listener or not. To create them we use ```asBroadcastStream()```. At any time a listener can unsubscribe, but the others will continue to receive updates.

#### Basic Example:

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

Each of these examples does something basic,

1- We are going to broadcast through a Stream a list of ten numbers one by one
2- We are going to use the ```where``` operator to modify the output of the Stream, and emit only the even numbers
3- In the last one we make use of a constructor to emit information periodically and we will only take five with the operator ```take```

To be able to print the result we can do it in the following way:

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

So far you have told me that we must have a listener, in this case, where is it?

You may have already noticed, but internally the forEach has a listener and then transforms what it listens to into an event.

If you want to do it in a different way you can use the ```listen``` function, which we'll cover a bit further down.

## StreamController

It is a class that adds many more features to a *Stream* to be able to manipulate the Stream more easily.

With this we can create *broadcastStreams*, additionally, we can "separate" the responsibility for adding information using *StreamSink*.

We can use it in the following way, where T represents a data type.

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

Very important when using *StreamController*, don't forget call ```close()```

## StreamBuilder

"*To the rescue of widgets*"

If we want to combine our streams with the widgets, there are several ways to do it, one of the easiest ways is to use the StreamBuilder. This is a special widget that allows us to subscribe to a Stream and react to changing events.

#### Example

The following example tries to illustrate how we can react to changes when we add new information to a Stream.

1- Let's define the initial variables.

```dart
final strController = StreamController<String>();
final List<String> petsList = [];
```

```
2- Let's think about how the data flow will be, it is a function that adds the data of an array waiting for a time to emit the next one.

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

3- Build the *StreamBuilder*

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

4- Close the *StreamController* in the dispose.

```dart
@override
void dispose() {
    strController.close();
    super.dispose();
}
```

The result is:

<p align="center" width="100%">
  <img src="https://i.imgur.com/SZP9kYJ.gif" width="200" />
</p>

## ¿State management?

¿State management?

If you've read this far, you've probably realized that this looks like it could help us manage the state of our application. The stream has some very interesting things to be able to manage the state of the application, in fact, some famous state-management libraries use Streams to be able to react to changes.

If you are interested in more about this and how to create your state-management? stay tuned that content related to that will come soon.

Where we will create a state-management and we will make more complex examples using API, DB, and other very interesting things with RxDart.

If you want to go deeper, I highly recommend  [Blog de Vandad Nahavandipoor](https://vandad.sh/blog/)

Github: [Code](https://github.com/jamescardona11/my-personal-blog/tree/main/code/usign_stream_flutter)

Thanks for read. Like my article 🤞Subscribe to my newsletter if you are interested in articles like these.

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/3oEduOnl5IHM5NRodO/giphy.gif" width="200" />
</p>
## References:

Ref1: https://www.youtube.com/watch?v=tUB3rNsMYAk

Ref2: https://www.raywenderlich.com/books/flutter-apprentice/v1.0.ea3/chapters/15-streams

Ref3: https://medium.com/@ayushpguptaapg/using-streams-in-flutter-62fed41662e4

Ref4: https://dart.dev/tutorials/language/streams
