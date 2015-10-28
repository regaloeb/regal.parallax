Voici un petit plugin jQuery pour faire du parallax.

J'ai essayé de le faire le plus simple possible à utiliser.
Peut-être ai-je laissé passer des erreurs dans la construction du plugin ?
Si vous en repérez, merci de m'en informer, j'aime apprendre de mes erreurs !

Mise en place :
	Une structure HTML qui va bien, c'est à dire au moins un bloc avec la classe "regal-parallax" contenant des blocs avec la classe "regal-parallax-item".
	Un appel vers jQuery.
	Un appel vers le petchit plugin jQuery "jquery.regal.parallax.js"
	Suivis de la déclaration :
		
		$(document).ready(function () {
			$('.regal-parallax').regal-parallax();
		});
		
Plus de détails dans la page de démo "regal-parallax.html".
