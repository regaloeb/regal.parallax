(function($) {

// Declaration de notre plugin
$.regalParallax = function(element, options) {

	// Référence à l'élément jQuery que le plugin affecte
	var $elem = $(element);
	// Référence à l'élément HTML que le plugin affecte
	var elem = element;

	// Mise en place des options par défaut
	//on récupère les data-values présente dans HTML (mais les values passées en JS prennent le dessus)
	var dataValues = $elem.attr('data-values');
	var dataObj = {};
	if(dataValues && dataValues.indexOf('{') >= 0){
		dataObj = JSON.parse(dataValues.replace(/'/g, '"'));
	}
	var defaults={};  

	// Pour éviter la confusion avec $(this)on declare plugin comme variable pour l'instance de notre plugin
	var plugin = this;

	// On crée un objet vide qui contiendra les options de notre plugin
	plugin.o = {}

	// La méthode dite "constructeur" qui sera appelée lorsque l'objet sera crée
	plugin.init = function() {
		// on stocke les options dans un objet en fusionnant les options par defaut et celles ajoutées en parametre
		plugin.o = $.extend({}, defaults, options);
		
		plugin.top = Math.round(parseInt($elem.offset().top, 10));
		plugin.height = Math.round(parseInt($elem.outerHeight(),10));
		plugin.bottom = plugin.top + plugin.height;
		plugin.middle = plugin.top + (plugin.height/2);
		
		plugin.moveBg = $elem.attr('data-bg');
		plugin.axe = $elem.attr('data-axe');
		plugin.sens = parseInt($elem.attr('data-sens'), 10);
		var bgpoz = $elem.css('background-position').split(' ');
		plugin.bgX = bgpoz[0];
		plugin.bgY = bgpoz[1];
		plugin.depth = ($elem.attr('data-depth') && $elem.attr('data-depth') != '') ? $elem.attr('data-depth') : 1;

		$(window).bind('scroll', watchScroll);
	}

	// Ici on va coder nos méthodes privées / publiques
	//publiques : plugin.nomFonction = function(){}
	//privées : var nomFonction = function(){}
	var watchScroll = function(){
		var nWindowHeight = $(window).height();
		var nScroll = $(window).scrollTop();
		var nBottom = nWindowHeight + nScroll;
		
		var that = $elem;
		var t = plugin.top;
		var b = plugin.bottom;
		var m = plugin.middle;
		var h = plugin.height;
		var sens = plugin.sens;
		var axe = plugin.axe;
		var depth = plugin.depth;
		var distanceT = nBottom - t;
		var distanceB = nBottom - b;
		if(distanceT > 0 && distanceB < nWindowHeight){
			var ratio = Math.round( (distanceT/(h+nWindowHeight))*100*depth );
			//bg animation
			if(plugin.moveBg && plugin.moveBg == '1'){
				var val = (axe == "vertic") ? plugin.bgX + ' XX_dyn_XX' : 'XX_dyn_XX ' + plugin.bgY;
				if(sens < 0){
					ratioBg = 100 - ratio;
				}
				else{
					ratioBg = ratio;
				}
				var bpos = (axe == "both") ? ratioBg + '% ' + ratioBg + '%' : val.replace('XX_dyn_XX', ratioBg + '%');
				that.css({'backgroundPosition':bpos});
			}
			//items animation
			that.find('.regalParallax-item').each(function(){
				depthItem = ($(this).attr('data-depth') && $(this).attr('data-depth') != '') ? $(this).attr('data-depth') : 1;
				ratioItem = ratio*depthItem;
				var param = {};
				if ($(this).attr('data-poy') && $(this).attr('data-poy') != ''){
					var poy0 = parseInt($(this).attr('data-poy').split('#')[0], 10);
					var poy1 = parseInt($(this).attr('data-poy').split('#')[1], 10);
					var deltaY = poy1 - poy0;
					param.top = poy0 + (ratioItem*deltaY/100);
				}
				if ($(this).attr('data-pox') && $(this).attr('data-pox') != ''){
					var pox0 = parseInt($(this).attr('data-pox').split('#')[0], 10);
					var pox1 = parseInt($(this).attr('data-pox').split('#')[1], 10);
					var deltaX = pox1 - pox0;
					param.left = pox0 + (ratioItem*deltaX/100);
				}
				if ($(this).attr('data-alpha') && $(this).attr('data-alpha') != ''){
					var alpha0 = parseInt($(this).attr('data-alpha').split('#')[0], 10);
					var alpha1 = parseInt($(this).attr('data-alpha').split('#')[1], 10);
					var deltaA = alpha1 - alpha0;
					param.opacity = (alpha0 + (ratioItem*deltaA/100))/100;
				}
				if ($(this).attr('data-width') && $(this).attr('data-width') != ''){
					var width0 = parseInt($(this).attr('data-width').split('#')[0], 10);
					var width1 = parseInt($(this).attr('data-width').split('#')[1], 10);
					var deltaW = width1 - width0;
					param.width = (width0 + (ratioItem*deltaW/100));
				}
				if ($(this).attr('data-height') && $(this).attr('data-height') != ''){
					var height0 = parseInt($(this).attr('data-height').split('#')[0], 10);
					var height1 = parseInt($(this).attr('data-height').split('#')[1], 10);
					var deltaH = height1 - height0;
					param.height = (height0 + (ratioItem*deltaH/100));
				}
				$(this).css(param);
			});
		}
	}
	// On appelle la méthode publique init qui va se charger de mettre en place toutes les méthodes de notre plugin pour qu'il fonctionne
	plugin.init();

}

// On ajoute le plugin à l'objet jQuery $.fn
$.fn.regalParallax = function(options) {

	// Pour chacun des élément du dom à qui on a assigné le plugin
	return this.each(function() {

		// Si le plugin n'as pas deja été assigné à l'élément
		if (undefined == $(this).data('regalParallax')) {

			// On crée une instance du plugin avec les options renseignées
			var plugin = new $.regalParallax(this, options);

			// on stocke une référence de notre plugin pour pouvoir accéder à ses méthode publiques
			// appel depuis ext : $('#objet').data('regalParallax').fonctionPublique(params);
			$(this).data('regalParallax', plugin);

		}

	});

}

})(jQuery);