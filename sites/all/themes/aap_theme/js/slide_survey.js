(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.slide_survey = {
			attach: function(context) { 
				// Proceed only if the page has a .surveymonkey-drupal-popup element
				if ($('.surveymonkey-drupal-popup')) {
					// After a set amount of time (we will not make it configurable now) the specific
					// survery pane is moved from footer to first child of the body and opened with slide effect

					// TODO: Do all of this based on cookie aap_survey_tracker
					// Hint1: Refer this for working with cookie - https://github.com/code4aap/drupal-webroot/issues/18
					// Hint2: Use CSS ID of the pane for cookie value
					setTimeout(function(){
						// TODO: A 'Close' button needs to be added as last element in .surverymonkey-drupal-popup
						// which should close the survery and set the cookie value to not show it again
						$('body').scrollTop(0);
						survey = $('.surveymonkey-drupal-popup').detach();
						$('body').children().first().before(survey);
						survey.slideDown('slow');
					}, 6000);
				}
			}
	}	

}
)(jQuery, Drupal, this, this.document); 