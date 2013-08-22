(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.redirect_to_donate_page = {
			attach: function(context) { 
				$(".shs-hierarchy li:nth-child(1)").addClass("state");
				$(".shs-hierarchy li:nth-child(2)").addClass("district");
				$(".shs-hierarchy li:nth-child(3)").addClass("constituency");
			}
	}	

}
)(jQuery, Drupal, this, this.document); 