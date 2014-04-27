---
layout: post
status: publish
published: true
title: Transiciones personalizadas. Parte 2
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2820
wordpress_url: http://codehero.co/?p=2820
date: 2013-12-06 00:04:44.000000000 -04:30
categories:
- Cursos
- iOS 7 decodificado
tags: []
---
<p>Bienvenidos a iOS 7 Descodificado, una nueva serie que hemos creado para mostrarte las nuevas herramientas que Apple a introducido en su nueva actualización de iOS. En capítulos anteriores vimos algunos nuevos cambios a nivel de interfaz que Apple introdujo en esta nueva actualización, como también algunos cambios en el manejo de imágenes y campos de textos.</p>

<p>En este nuevo capítulo seguiremos estudiando cómo realizar transiciones animadas entre controladores, haciendo uso de las nuevas herramientas que Apple nos da en esta nueva actualización. Como nos caracteriza haremos demostraciones para agilizar el proceso de entendimiento.</p>

<hr />

<h2>Despedir controladores</h2>

<p>Para despedir los controladores con animaciones personalizadas es mucho mas sencillo en iOS 7 y bastante parecido a la presentación de los mismos (que estudiamos en el el capítulo anterior <a href="http://codehero.co/ios7-decodificado-transiciones-personalizadas/">iOS 7 Decodificado: Transiciones personalizadas</a>.</p>

<p>Lo primero que debemos saber es que el UIViewController que presenta al controlador es el encargado tanto de la animación al mostrarlo como al despedirlo. Para realizar la animación de despedida de una vista de forma animada, nos ubicamos en el Controlador encargado de manejar la animación y agregamos el siguiente método del delegate <code>UIViewControllerTransitioningDelegate</code></p>

<pre>
- (id < UIViewControllerAnimatedTransitioning >)animationControllerForDismissedController:(UIViewController *)dismissed
{
// retornamos el metodo UIViewControllerAnimatedTransitioning
}
</pre>

<p>Luego de esto prácticamente seguimos los pasos de la animaciones estudiados en el capítulo anterior.</p>

<h3>Crear una clase de transición animada que controlará el movimiento de los controladores</h3>

<p>En esta etapa creamos la animación de la transición para despedir controladores, nuestro caso seria algo así:</p>

<ul>
<li>DismissTransition.h</li>
</ul>

<pre>
@interface DismissTransition : NSObject <UIViewControllerAnimatedTransitioning>
@end
</pre>

<ul>
<li>DismissTransition.m</li>
</ul>

<pre>
#import "DismissTransition.h"

@implementation DismissTransition
- (NSTimeInterval) transitionDuration:(id)transitionContext
{
    return 1.0f;
}
- (void) animateTransition:(id)transitionContext
{
    // Esta implementación la vamos a dejar para mas adelante
}
@end
</pre>

<h3>Implementar el delegado de la transición</h3>

<p>En esta etapa solo instanciamos nuestra transición en el método que implementamos en el paso número dos. Es básicamente algo así:</p>

<pre>
- (id < UIViewControllerAnimatedTransitioning >)  animationControllerForDismissedController:(UIViewController *)dismissed
{
    DismissTransition *transition = [[DismissTransition alloc] init];
    return transition;
}
</pre>

<h3>Implementar la animación en la clase de transición</h3>

<p>Como ya vimos en el capítulo anterior esta es la etapa más difícil ya que debemos desarrollar el código de la animación. Para este curso haremos que la vista se eleve un poco y luego baje dandole un efecto de caída sobre su lado derecho. Veamos el código mejor:</p>

<pre>
- (void) animateTransition:(id)transitionContext
{
    // ubicamos la vista que vamos a mover
    UIViewController *fromVC = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];


    // Ubicamos el tamanio del contexto
    __block CGRect presentedFrame = [transitionContext initialFrameForViewController:fromVC];

    //Arrancamos con nuestra animación
    [UIView animateKeyframesWithDuration:1.0f delay:0.0 options:0 animations:^{
        //Separamos la animación en dos
        //Una parte que levante la vista un poco
        [UIView addKeyframeWithRelativeStartTime:0.0 relativeDuration:0.8 animations:^{
            fromVC.view.frame = CGRectMake(
                                           presentedFrame.origin.x,
                                           -20,
                                           presentedFrame.size.width,
                                           presentedFrame.size.height
                                           );}];
        // la última parte que la deje caer haciéndola rotar unos grados
        [UIView  addKeyframeWithRelativeStartTime:0.8 relativeDuration:0.2 animations:^{

            presentedFrame.origin.y += CGRectGetHeight(presentedFrame) + 20;
            fromVC.view.frame = presentedFrame;
            fromVC.view.transform = CGAffineTransformMakeRotation(0.2);
        }];
    } completion:^(BOOL finished) {
        //Finalizamos la transición
        [transitionContext completeTransition:YES];
    }];

}
</pre>

<p>Con estos pequeños pasos producimos un efecto como éste, al despedir nuestros UIViewController:</p>

<p><img src="http://i.imgur.com/iJAbAAC.png?1" alt="animationDismiss" /></p>

<p>No entraremos mucho en detalles con las animaciones de despedidas de los controladores, porque, como se habrán dado cuenta los que siguen la serie constantemente, es bastante parecido a la presentación que vimos en el capítulo anterior.</p>

<h2>Transiciones Interactivas</h2>

<p>Seguramente ya deben saber por donde viene esta rama de transiciones interactivas, consiste en simplemente ejecutar una transición seguida por un gesto, es decir, seleccionamos un View y lo movemos hasta que culmine con la transición.</p>

<p>Esto con estas nuevas características que introdujo Apple al mercado con iOS7, nos resulta bastante fácil y para hacerlo más sencillo aún lo vamos a separar en tres fáciles pasos.</p>

<ul>
<li>Iniciar y adaptar la transición.</li>
<li>modificar e interactuar con los cambios de la interacción.</li>
<li>Finalizar o cancelar la animación.</li>
</ul>

<h3>Iniciar y adaptar la transición.</h3>

<p>Para iniciar y adaptar la transición interactiva, lo primero que debemos hacer es crear un objeto <code>UIPanGestureRecognizer</code> y agregarla a la vista del controlador una vez presentado. Esto lo hacemos con las siguientes líneas de comando:</p>

<pre>
    [self presentViewController:vc animated:YES completion:^{
        UIPanGestureRecognizer *gesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handleGesture:)];
        [vc.view addGestureRecognizer:gesture];
    }];
</pre>

<p>En este ejemplo estaremos agarrando el mismo ejemplo anterior y una vez culminada la presentación del controlador le agregamos el gesto.</p>

<p>Luego creamos el método que llama el selector del UIGestureReconize que posteriormente codificaremos.</p>

<pre>
- (void) handleGesture: (UIPanGestureRecognizer *)gesture
{
    switch (gesture.state) {
        case UIGestureRecognizerStateBegan: {

            break;
        }
        case UIGestureRecognizerStateChanged:{

            break;
        }
        case UIGestureRecognizerStateEnded:{

            break;
        }
        case UIGestureRecognizerStateCancelled:
        {

            break;
        }
        default:

            break;
    }
}
</pre>

<p>Por último vamos a necesitar a necesitar unas variables que vamos agregar en el <code>.h</code> del controlador y luego implementar un protocolo de transición en nuestra clase</p>

<p>-<code>.h</code></p>

<pre>
@property (strong, nonatomic) UIPercentDrivenInteractiveTransition *myInteractiveTransition;
@property (assign, nonatomic) BOOL interactive;
</pre>

<p>-Implementación del protocolo</p>

<pre>
- (id <UIViewControllerInteractiveTransitioning>) interactionControllerForDismissal:(id< UIViewControllerAnimatedTransitioning >)animator
{
    if (self.interactive) {

        self.myInteractiveTransition = [[UIPercentDrivenInteractiveTransition alloc] init];
        return self.myInteractiveTransition;
    }
    return nil;
}
</pre>

<p>¡Listo!. ya finalizamos esta etapa donde simplemente preparamos el camino para desarrollar la interacción con las transiciones de la aplicación.</p>

<h3>modificar e interactuar con los cambios de la interacción.</h3>

<p>En esta etapa vamos a ir evaluando y modificando la posición de la transición para que este se mueva según sea el caso. Veamos como lo hicimos:</p>

<pre>
- (void) handleGesture: (UIPanGestureRecognizer *)gesture
{
    switch (gesture.state) {
    // Empieza el gestare
        case UIGestureRecognizerStateBegan: {
        // indicamos al sistema que existe una interacción
            self.interactive = YES;
            // Inndicamos al sistema que empiece a despedir el view
            [self dismissViewControllerAnimated:YES completion:^{
                //Una vez finalizado la despedida indicamos al sistema que se termino la iteración
                self.interactive = NO;
                }];

            break;
        }
        // Cambios del gesture
        case UIGestureRecognizerStateChanged:{
        //Obtenemos datos importantes de la vista como:
        // vista contenedora del gesture
        //Punto de translación
        //porcentaje de tranlacion con respecto a la altura en nuestro caso
            UIView *view = gesture.view.superview;
            CGPoint translation = [gesture translationInView:view];
            CGFloat percentTransitioned = (translation.y / (CGRectGetWidth(view.frame)));

            // Modificamos la transición con el porcentaje antes obtenido
            [self.myInteractiveTransition updateInteractiveTransition:-percentTransitioned];
            break;
        }
        case UIGestureRecognizerStateEnded:{

            break;
        }
        case UIGestureRecognizerStateCancelled:
        {
            [ cancelInteractiveTransition];

            break;
        }
        default:
            break;
    }
}
</pre>

<p>En esta etapa nos ubicamos en el método del selector de nuestro gestureReconizer para empezar a codificarlo.</p>

<p>Lo primero que hacemos en el <code>UIGestureRecognizerStateBegan</code> es indicarle al sistema cuando el usuario esta o no en contacto con la vista.</p>

<p>Luego en <code>UIGestureRecognizerStateChanged</code> recopilamos una serie de datos para sacar el porcentaje de movimiento del gesture y asignárselo a la transición.</p>

<h3>Finalizar o cancelar la animación</h3>

<p>Para finalizar y cancelar la animación nos vemos en dos casos, cuando el usuario termina el movimiento para despedir la vista o simplemente cuando se arrepiente y deja la vista como estaba. Esto lo resolvemos estableciendo un punto en el porcentaje para decidir la mejor solución. vemos como lo resolvimos:</p>

<pre>
- (void) handleGesture: (UIPanGestureRecognizer *)gesture
{
    switch (gesture.state) {
            // Empieza el gestare
        case UIGestureRecognizerStateBegan: {...}
        case UIGestureRecognizerStateChanged:{...}
        case UIGestureRecognizerStateEnded:{

            if (self.myInteractiveTransition.percentComplete > 0.25) {
                [self.myInteractiveTransition finishInteractiveTransition];
            }else{
                [self.myInteractiveTransition cancelInteractiveTransition];
            }

            break;
        }
        case UIGestureRecognizerStateCancelled:
        {
            [self.myInteractiveTransition cancelInteractiveTransition];

            break;
        }
        default:
            break;
    }
}
</pre>

<p>Como ven esto es bastante simple, solo le indicamos a la transición, que cuando el movimiento sobrepase el 25% entonces finalizamos si no cancelamos la transición.</p>

<p>Aun nos queda un pequeño detalle que resolver, y es en la transición de la vista a la que estamos realizándole cambios. En nuestro caso es <code>DismissTransition</code> y lo resolvemos cambiando:</p>

<pre>
[transitionContext completeTransition:YES];
</pre>

<p>por:</p>

<pre>
[transitionContext completeTransition:![transitionContext transitionWasCancelled]];
</pre>

<p>Finalmente hemos finalizado nuestra transición personalizada e interactiva. ¿Bastante fácil verdad? queda de su parte poner en practica estos conceptos.</p>

<hr />

<h2>Conclusión</h2>

<p>En este nueva serie estaremos estudiando los cambios y bondades que nos ofrece Apple con su nuevo sistema operativo iOS 7 a nivel de programación. En este capítulo estuvimos estudiando de forma muy básica como presentar transiciones animadas con un sencillo ejemplo que podrán descargar en nuestro repositorio en <a href="https://github.com/sampayo/transiciones_animadas_basica_ios7">git</a>.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie <a href="http://codehero.co/series/ios-siete-decodificado/">iOS 7 Decodificado</a> y a mantenerte alerta a los nuevos capítulos de esta nueva serie, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
