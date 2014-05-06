---
layout: post
status: publish
published: true
title: Transiciones personalizadas
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2658
wordpress_url: http://codehero.co/?p=2658
date: 2013-11-22 00:22:57.000000000 -04:30
serie: iOS 7 descodificado
dificultad: Aprendiz
duracion: 20
github: https://github.com/sampayo/transiciones_animadas_basica_ios7
description: "iOS 7 Decodificado: Este capítulo busca otorgarte las herramientas necesarias para que puedas hacer tus transiciones personalizadas entre UIViewController"
categories:
- Cursos
- iOS 7 decodificado
tags:
- curso
- iOS7
- Transiciones
---
<p>Bienvenidos a iOS 7 Descodificado, una nueva serie que hemos creado para mostrarte las nuevas herramientas que Apple a introducido en su nueva actualización de iOS. En capítulos anteriores vimos algunos nuevos cambios a nivel de interfaz que Apple introdujo en esta nueva actualización, como también algunos cambios en el manejo de imágenes y campos de textos.</p>

<p>En este nuevo capítulo estudiaremos cómo realizar transiciones animadas entre controladores, haciendo uso de las nuevas herramientas que Apple nos da en esta nueva actualización. Como nos caracteriza haremos demostraciones para agilizar el proceso de entendimiento.</p>

<hr />

<h2>Transiciones</h2>

<p>Como bien deben saber las transiciones entre <code>UIViewController</code> son bastante simples, básicamente solo van apareciendo hasta ser mostradas por completa. Las formas comunes para presentar un viewController es:</p>

<pre>
[self.navigationController pushViewController:vc animated:YES];
[self presentViewController:vc animated:YES completion:nil];
</pre>

<p>Son dos simples comandos, el primero es para mostrar el UIViewController y agregarlo a la lista de controladores que lleva el UINavigationController, el cual nos permite devolvernos o avanzar en linea. El segundo comando no requiere del UINavigationController y simplemente muestra el nuevo controlador de abajo hacia arriba.</p>

<p>Pero lo que realmente nos importa en este curso es la creación de animaciones especiales personalizadas entre UIViewControllers, que estaremos viendo a continuación.</p>

<hr />

<h2>Transiciones Animadas</h2>

<p>Finalmente Apple en iOS7 no libera de grandes cantidades de códigos complejos para hacer una simple animación entre controladores, ofreciéndonos delegados y otras herramientas que nos dejan hacer esto en unas simples líneas de código.</p>

<p>A partir de iOS 7.0 Apple ha presentado nuevas herramientas para ofrecer a los desarrolladores una mayor flexibilidad para el manejo de transiciones en UIViewController:</p>

<ul>
<li>Nuevos métodos UIView de animación de bloques</li>
<li>Nuevos protocolos y el concepto de controlador de animación</li>
<li>Controladores de interacción y los coordinadores de transición</li>
<li>Los nuevos métodos de ayuda relacionados con la animación</li>
</ul>

<p>Vamos a conocer los nuevos conceptos que rodean las transiciones con un ejemplo básico. Vamos a poner en práctica una forma simplificada de transición diferente a las habituales.</p>

<h3>¿Qué necesitamos para hacer nuestras propias transiciones?</h3>

<ol>
<li>Especifica que la presentación debe utilizar una transición personalizada</li>
<li>Adoptar el delegado de la transición</li>
<li>Crear una clase de transición animada que controlará el movimiento de los controladores </li>
<li>Implementar el delegado de la transición</li>
<li>Implementar la animación en la clase de transición</li>
</ol>

<p>Parece difícil pero es una simple receta de cocina que recordaran con facilidad en el futuro.</p>

<h4>1. Especifica que la presentación debe utilizar una transición personalizada</h4>

<p>En este paso solo debemos decirle al controlador que queremos implementar el
delegado para las transiciones entre controladores, esto puede ser algo así:</p>

<pre>
- (IBAction) activarTransicion:(id)sender
{
    UIViewController *vc = [[UIViewController alloc] init];
    vc.modalPresentationStyle = UIModalPresentationCustom;

    // indicamos que queremos implementar los métodos del delegado
    // de la transición
    vc.transitioningDelegate = self;

    [self presentViewController:vc animated:YES completion:nil];
}
</pre>

<p>Como ven con el metido <code>vc.transitioningDelegate</code> especificamos quien se hada cargo de implementar los metodos del delegado. Finalmente para terminar con este paso debemos indicarle en nuestro controlador que vamos a implementar el delegado</p>

<pre>
#import < UIKit/UIKit.h>

@interface viewController : UIViewController < UIViewControllerTransitioningDelegate>
</pre>

<p>¿Bastante simple no? sigamos que el resto también es bastante sencillo.</p>

<h4>2. Adoptar el delegado de la transición</h4>

<p>En este paso debemos adoptar el delegado de la transición, aunque ya le dijimos a nuestro controlador que vamos hacer uso de el, debemos implementar los métodos del delegado, estos son:</p>

<pre>
@optional
- (id <UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source;

- (id <UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed;

- (id <UIViewControllerInteractiveTransitioning>)interactionControllerForPresentation:(id <UIViewControllerAnimatedTransitioning>)animator;

- (id <UIViewControllerInteractiveTransitioning>)interactionControllerForDismissal:(id <UIViewControllerAnimatedTransitioning>)animator;
</pre>

<p>Para nuestro ejemplo solo haremos uso de uno, ya que todos son opcionales:</p>

<pre>
- (id <UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed
{

}
</pre>

<h4>3. Crear una clase de transición animada que controlará el movimiento de los controladores</h4>

<p>Esta etapa es prácticamente una de las más importante ya que debemos crear la clase donde estará el código de nuestra animación. Para este ejemplo haremos una animación bastante sencilla en iOS7 y consiste en que la vista realice una especie de rebote antes llegar a su posición final.</p>

<p>Para esto vamos a crear una clase que denominaremos <code>BouncyTransition</code> que hereda de <code>NSObject</code> y básicamente es así:</p>

<ul>
<li>BouncyTransition.h</li>
</ul>

<pre>
#import < Foundation/Foundation.h>
@interface BouncyTransition : NSObject <UIViewControllerAnimatedTransitioning>
@end
</pre>

<ul>
<li>BouncyTransition.m</li>
</ul>

<pre>
@implementation BouncyTransition
- (NSTimeInterval) transitionDuration:(id<UIViewControllerContextTransitioning>)transitionContext
{
    return 1.0f;
}
- (void) animateTransition:(id<UIViewControllerContextTransitioning>)transitionContext
{
// TODO
}
@end
</pre>

<h4>4. Implementar el delegado de la transición</h4>

<p>En esta etapa solo instanciamos nuestra transición en el método que implementamos  en el paso número dos. Es básicamente algo así:</p>

<pre>
- (id < UIViewControllerAnimatedTransitioning>) animationControllerForPresentedController:(UIViewController *)presented  presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source {

    BouncyTransition *transition = [[BouncyTransition alloc] init];
    return transition;

}
</pre>

<p>Como ven simplemente le estamos diciendo a nuestro delegado que vamos a utilizar la transición <code>BouncyTransition</code> que acabamos de crear para mostrar el UIViewController.</p>

<blockquote>
  <p>No olvides importar la clase de la transición al principio de la clase</p>
</blockquote>

<h4>5. Implementar la animación en la clase de transición</h4>

<p>Esta es el paso más importante de la transición, hasta ahora como se dieron cuenta es bastante simple, pero ahora llegamos a la implementación en sí de la animación, pero no teman que Apple nos lo puso bastante fácil.</p>

<p>Lo primero que debemos saber en esta etapa es identificar los controladores, tanto el que presenta como el presentado. Veamos:</p>

<pre>
UIViewController *presentado = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];

UIViewController *presentador = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
</pre>

<p>Una vez identificado nuestros controladores agregamos al <code>containerView</code> de la transición el controlador que vamos a mostrar:</p>

<pre>
[[transitionContext containerView] addSubview:presentado.view];
</pre>

<p>listo! finalmente luego de hacer esto, jugamos con el tamaño y las animaciones para hacer que nuestra transición quede como lo estamos esperando. Veamos aquí la animación:</p>

<pre>

CGRect fullFrame = [transitionContext initialFrameForViewController:fromVC];
CGFloat height = CGRectGetHeight(fullFrame);

toVC.view.frame = CGRectMake(
                              fullFrame.origin.x,
                              height + 16,
                              CGRectGetWidth(fullFrame),
                              height
);

[UIView animateWithDuration:[self transitionDuration:transitionContext]
        delay:0 usingSpringWithDamping:0.5f
        initialSpringVelocity:0.6f
        options:UIViewAnimationOptionCurveEaseInOut
        animations:^{

        toVC.view.frame = CGRectMake(20, 20, CGRectGetWidth(fullFrame) - 40, height - 40 );

    } completion:^(BOOL finished) {

        [transitionContext completeTransition:YES];

    }];
}
</pre>

<p>Una vez realizados estos cinco sencillos pasos, obtendremos una animación como esta:</p>

<p><img src="http://i.imgur.com/mbyaC5A.png" alt="transicion" /></p>

<hr />

<h2>Conclusión</h2>

<p>En este nueva serie estaremos estudiando los cambios y bondades que nos ofrece Apple con su nuevo sistema operativo iOS 7 a nivel de programación. En este capítulo estuvimos estudiando de forma muy básica como presentar transiciones animadas con un sencillo ejemplo que podrán descargar en nuestro repositorio en <a href="https://github.com/sampayo/transiciones_animadas_basica_ios7">git</a>.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie <a href="http://codehero.co/series/ios-desde-cero/">iOS desde cero</a> y a mantenerte alerta a los nuevos capítulos de esta nueva serie, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
