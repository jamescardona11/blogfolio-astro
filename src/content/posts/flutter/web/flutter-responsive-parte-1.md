---
title: Flutter responsive
lang: es
date: 2022-8-11
status: published
slug: flutter-responsive-parte-1
summary: Hacer aplicaciones es un tarea sencilla y generalmente orientada a dispositivos móviles, ¿qué pasa cuando la aplicación se extiende a tablets o web?, generalmente el responsive es obligatorio hoy en día y en las aplicaciones móviles solo que en casos muy puntuales debemos hacer cambios para que se adapte nuestra UI, pero en general no es una preocupación.
link: https://blog.jamescardona11.com/flutter-responsive-parte-1
tags: [flutter, web]
---

Hacer aplicaciones es un tarea sencilla y generalmente orientada a dispositivos móviles, ¿qué pasa cuando la aplicación se extiende a tablets o web?, generalmente el responsive es obligatorio hoy en día y en las aplicaciones móviles solo que en casos muy puntuales debemos hacer cambios para que se adapte nuestra UI, pero en general no es una preocupación.

¿Qué pasa con las aplicaciones que requieren esto? ¿Flutter me ayuda a solucionar el problema fácil?
La verdad no es algo muy complejo, existen muchas librerías que nos ayudan a solucionar este problema, vamos a entender la base de estas librerías y entender lo que hacen estás para adaptar nuestra pantalla de forma responsive.

<p align="center" width="100%">

<img src="https://i.imgur.com/3EldbWc.gif" width="450" />
</p>

### Estrategia para hacer una app responsive

Una forma de hacerlo es: tener puntos de control, voy a listar algunas ideas para estos puntos de control.

1. El tamaño de la pantalla cambia, estos puntos nos darán una alerta depara adaptar al UI a un tamaño de pantalla diferente.
2. La orientación cambia, usaremos algo para que nos dé una alerta de cuando debemos adaptar a una orientación diferente.
3. Puntos de control condicionales, son puntos de control específicos de condiciones, ejemplo si el dispositivo es web i mobile, mostrar o ocultar un widget dependiendo de una condición.

### ¿Qué tiene flutter para esto?

Lo que más me gusta de flutter es que ya tiene muchas cosas listas, vamos a listar, que vamos a usar. Luego los usaremos para desarrollar una app.

- LayoutBuilder
- OrientationBuilder
- Visibility
- MediaQuery

Otros:

- FittedBox
- AspectRatio
- FractionallySizedBox
- ConstrainedBox
- Expanded y Flexible

Puedes encontrar algunos ejemplos y explicación de como funcionan otros widgets al final en las referencias.

#### 1. MediaQuery

Puedes usar MediaQuery para obtener el tamaño de la pantalla, el padding y muchas otras cosas.
Es un widget muy importante para manejar algunas medidas en porcentajes de pantalla.

```dart
Size mSize = MediaQuery.of(context).size;
EdgeInsets mPadding = MediaQuery.of(context).padding;
Orientation mOrientation = MediaQuery.of(context).orientation;
```

#### 2. Visibility

Muy útil para hacer condiciones que oculte/muestre widgets.

```dart
Visibility(
  visible: condition,
  replacement: widgetIfConditionIsFalse,
  child: widgetIfConditionIsTrie,
)
```

#### 3. OrientationBuilder

Con esto podemos hacer un re-build reaccionando a la "orientación" de un widget. Quiere esto decir si el tamaño de un widget corresponde es su AspectRation más a un widget _landscape_ o _portrait_.

\*\* Importante esta orientación es diferente a la del MediaQuery
El orientation del MediaQuery hace referencia a la orientación del dispositivo.

```dart
OrientationBuilder(
  builder: (context, orientation) => Center(
    child: Text('[OrientationBuilder]:\n$orientation'),
  ),
),
```

```dart
// Ejemplo tomado de codemagic, referencia al final
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Orientation deviceOrientation = MediaQuery.of(context).orientation;

    return Scaffold(
      body: Column(
        children: [
          Expanded(
            flex: 2,
            child: Container(
              color: Colors.amber,
              child: OrientationBuilder(
                builder: (context, orientation) => Center(
                  child: Text(
                    'View 1\n\n' +
                        '[MediaQuery orientation]:\n$deviceOrientation\n\n' +
                        '[OrientationBuilder]:\n$orientation',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: OrientationBuilder(
              builder: (context, orientation) => Container(
                color: Colors.white,
                child: Center(
                  child: Text(
                    'View 2\n\n' +
                        '[MediaQuery orientation]:\n$deviceOrientation\n\n' +
                        '[OrientationBuilder]:\n$orientation',
                    style: TextStyle(color: Colors.amber, fontSize: 18),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

<p align="center" width="100%">

<img src="https://i.imgur.com/TCpDBv3.png" width="250" />
</p>

#### 4. LayoutBuilder

Es una herramienta útil como lo es MediaQuery para poder hacer muchas cosas con tamaños locales, orientación y poder renderizar diferentes widgets depende de la situación.

** Importante esta **Size\*\* es diferente a la del MediaQuery, es local relativo al widget.

```dart
LayoutBuilder(
  builder: (context, constraints) => Container(
    color: Colors.orange,
    child: Center(
      child: Text(
        '[LayoutBuilder]:\n
        ${constraints.maxWidth}x${constraints.maxHeight}',
      ),
    ),
  ),
)
```

#### 5. Misc

Si eres nuevo y aún no conoces bien el funcionamiento de **Row**, **Column**, **Flexible**, **Expanded**, te dejo acá unas referencias para complementar:

- [Column vs Row][columnvsrow]
- [Expanded vs Flexible][expandedvsflexible]
- [AspectRatio][aspectratio]

### Empecemos a crear nuestra app

Los ejemplos anteriores son algo básicos, pero útiles para poder empezar a construir nuestros Widgets, a medida que construyamos la aplicación de práctica usaremos otros widgets muy útiles.

Usemos este recurso de [Figma Community][figma-ref].

Este post trata de responsive así que no me voy a detener mucho en como desarrollar cada pieza de esta UI, te voy a dejar una referencia a Github donde puede descargarla.

1. Puedes intentar construir el diseño de Figma por tu cuenta. (Sin responsive)
2. Puedes usar este [repositorio](https://github.com/jamescardona11/my-blog-tutorials/tree/dashboard-web-responsive) la rama (**dashboard-web-responsive**), con el panel listo en web y saltar hasta la sección, **Empecemos el responsive**.

<p align="center" width="100%">
  <img src="https://i.imgur.com/WofXxha.png" width="450" />
</p>

### Empecemos el responsive

Lo primero que voy a hacer es crear una widget que me ayude a saber los puntos de control. Este widget será basado en **LayoutBuilder** y dependiendo del tamaño de la pantalla vamos a devolver una pantalla específica para **mobile**, **tablet** o **web**.

En mi caso voy a tomar como referencia los siguientes puntos de control.

- Mobile: [0, 700]
- Tablet: [700, 1200]
- Web: [1200, infinite]

```dart
const mobileMaxWidth = 700;
const webMaxWidth = 1200;

class ResponsiveWidget extends StatelessWidget {
  /// default constructor
  const ResponsiveWidget({
    Key? key,
    this.mobile,
    this.tablet,
    this.web,
  }) : super(key: key);

  final Widget? mobile;
  final Widget? tablet;
  final Widget? web;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final _maxWidth = constraints.maxWidth;

        if (_maxWidth < mobileMaxWidth) {
          return mobile ?? SizedBox();
        } else if (_maxWidth < webMaxWidth) {
          return tablet ?? SizedBox();
        }

        return web ?? SizedBox();
      },
    );
  }
}
```

Básicamente con este widget podemos manipular que tipo de screen queremos mostrar.

El siguiente paso es cambiar el home_page.dart que teníamos antes por:

```dart
class HomePage extends StatelessWidget {
  const HomePage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ResponsiveWidget(
      mobile: MobileLayout(),
      tablet: TabletLayout(),
      web: WebLayout(),
    );
  }
}
```

El web_layout.dart va a quedar como era el antiguo **HomePage**, los otros dos MobileLayout y TabletLayout por el momento vamos a dejarlos vacíos.

```dart
class WebLayout extends StatelessWidget {
  /// default constructor
  const WebLayout({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      width: size.width,
      height: size.height,
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          NavMenu(),
          Expanded(child: MainCenterLayout()),
          SideBar(),
        ],
      ),
    );
  }
}
```

Hasta este punto no hemos mucho, pero veamos que pasa si movemos el tamaño de la pantalla. Notarán que tenemos problemas de _overflow_ en el WebLayout.

¿Qué creen que debemos considerar o hacer para solucionarlo?

- Encontremos algunos puntos de control para la aplicación.
  
  1. Breakpoint cuando el width 1360
  
  2. Breakpoint cuando el width 1630
* Usemos estos puntos de control iniciales para modificar algunos aspectos de nuestro dashboard.

En el web layout.dart y coloquemos un **LayoutBuilder** y vamos a ocultar el _NavMenu_ y el _SideBar_ vamos a mostrar un botón con icon cuando se oculte el menu.

Una de las posibles formas de hacer esto es tener dos tipos de vistas, una por con **Stack** para ocultar el _NavMenu_ y el _SideBar_ y otro con **Row** para mostrar todo.

Mi idea es esta:

<p align="center" width="100%">
  <img src="https://i.imgur.com/tmtikTR.gif" width="450" />
</p>

Entonces agreguemos el LayoutBuilder y con las dos vistas Row y Stack, el punto de control que voy a usar es 1630 para cambiar entre vistas.

```dart
...
child: LayoutBuilder(
        builder: (_, constraints) {
          if (constraints.maxWidth <= 1630) {
            return Stack(
              children: [
                MainCenterLayout(),
                NavMenu(),
                SideBar(),
              ],
            );
          } else {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                NavMenu(),
                MainCenterLayout(),
                SideBar(),
              ],
            );
          }
        },
      ),
```

Hagamos las modificaciones adicionales:

El NavMenu va quedar así.

```dart
...
@override
Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 1360)
          return ElevatedButton(
            onPressed: () {},
            child: Image.asset(AssetsManager.iconMenu),
            style: ElevatedButton.styleFrom(
              shape: CircleBorder(),
              padding: EdgeInsets.all(20),
              primary: Colors.white,
            ),
          );

        return CardComponent(...
```

El SideBar va quedar así.

```dart
...
@override
Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = MediaQuery.of(context).size;

        if (size.width <= 1630)
          return Align(
            alignment: Alignment.topRight,
            child: ElevatedButton(
              onPressed: () {},
              child: Icon(
                Icons.arrow_back_ios_new_rounded,
                color: blueColor,
              ),
              style: ElevatedButton.styleFrom(
                shape: CircleBorder(),
                padding: EdgeInsets.all(20),
                primary: Colors.white,
              ),
            ),
          );

        return SizedBox(...
```

Por último vamos a crear un LeftPadding para el MainCenterLayout

```dart
...
@override
Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    final leftPadding = size.width < 1360 || size.width > 1630 ? 25.0 : 290.0;

    return Padding(
      padding: EdgeInsets.only(
        left: leftPadding,
        right: 30,
        top: 10,
        bottom: 10,
      ),
      ...
```

Ya tenemos un primer acercamiento a una posible solución, recuerda que no es la única y probablemente hayan otras más cortas, efectivas o eficientes.

> Las animaciones para mostrar los menus pueden pasar dos cosas, que las deje como un mini-post adicional o que te tomes el reto de realizarlas.

⚠️ Aún queda solucionar algunos overflow cuando el **height** cambia.

El reto acá es que los trates de solucionar por tu cuenta.

Después de eso puedes ver mi solución. No es perfecta, pero nos permite trabajar hasta un height de 1000px sin problemas.

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/GgcusW5RLS9Nu/giphy.gifhttps://media.giphy.com/media/GgcusW5RLS9Nu/giphy.gif" width="450" />
</p>

Voy a usar BoxConstraints y LayoutBuilder para solucionar el problema.

BoxConstraints es auto descriptivo es colocarle a algunas medidas a una caja.

```dart
Container(
      constraints: BoxConstraints(
        minHeight: 360,
        maxHeight: size.height * 0.4,
        maxWidth: 960,
        minWidth: 720,
      )
...
```

En el \_StatisticsWidget, sustituimos el SizedBox por el container y en el CardComponent usamos el constraints del LayoutBuilder.

```dart
Container(
    constraints: BoxConstraints(
        minHeight: 360,
        maxHeight: size.height * 0.4,
        maxWidth: 960,
        minWidth: 720,
      ),
    child: LayoutBuilder(
        builder: (context, constraints) => Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Row(
            ...
            children: [
              GraphWidget(...),
              Column(
                ...
                children: [
                  Row(...),
                  CardComponent(
                    width: 440,
                    height: constraints.maxHeight * 0.4,
                    child: Container(),
                  )
```

Donde esta el PostItemWidget usamos el BoxConstraints sustituyendo el SizedBox.

```dart
Container(
    constraints: BoxConstraints(
        minHeight: 360,
        maxHeight: size.height * 0.4,
        maxWidth: 960,
        minWidth: 720,
    ),
    child: ...
```

### Repo parte 1: [Github](https://github.com/jamescardona11/my-blog-tutorials/tree/dashboard-web-responsive-parte-1)

### Parte 2: Versión mobile y tablet

En la parte dos vamos a trabajar en la aplicación mobile y tablet para poder crear nuestro responsive, para eso ya tenemos gran parte avanzada y solo nos falta crear algunos componentes específicos y navegación.

Gracias por llegar hasta acá, considera dar un like, compartir y nos vemos en la próxima parte de esta serie de web-responsive.

<p align="center" width="100%">
  <img src="https://media.giphy.com/media/lHUqlB9cPwESCr078o/giphy.gif" width="200" />
</p>

### Referencias

- Flutter: https://docs.flutter.dev/development/ui/layout/adaptive-responsive
- CodeMagic: https://blog.codemagic.io/building-responsive-applications-with-flutter/
- Youtube: https://www.youtube.com/watch?v=p9Q9w-523t4

[//]: #Ref
[figma-ref]: https://www.figma.com/community/file/1120470173523939363
[github]: /static/images/flutter-web/ui_dashboard.png
[columnvsrow]: https://medium.com/jlouage/flutter-row-column-cheat-sheet-78c38d242041
[expandedvsflexible]: https://itnext.io/flutter-responsive-apps-flexible-vs-expanded-ff8cc92b468f
[aspectratio]: https://api.flutter.dev/flutter/widgets/AspectRatio-class.html
