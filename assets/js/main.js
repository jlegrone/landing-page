(function() {

	smoothScroll.init({
	    speed: 500,
	    easing: 'easeOutCubic',
	    updateURL: false
	});
	
	var contact_form = document.forms.contact_form;
	var contact_section = document.getElementById('contact');

	contact_form.onsubmit = function(e) {
		e.preventDefault();

		contact_section.className = 'form-sending';

		minAjax({
		    url: "https://formspree.io/dev@jacoblegrone.com",
		    method: "POST",
		    type: "json",
		    data: {
		      name: contact_form.name.value,
		      _replyto: contact_form.replyto.value,
		      message: contact_form.message.value,
		      _gotcha: contact_form._gotcha.value
		    },
		    success: function(data){
		      contact_section.className = 'form-sent';
		    },
		    stateChange: function(data, state){
		      // contact_section.className = 'form-sending';
		    }
		});
	};

	var consoleStyle = [
	    'color: rgb(100,100,100)',
	    'text-align: center',
	    'font-weight: bold',
	    'font-size: 18px',
	    'font-family: lato'
	];	

	var linkStyle = consoleStyle.slice();
	linkStyle[0] = 'color: rgb(49,176,144)';	

	function css(styleArray){
		return styleArray.join(';');
	}	

	console.log("%cThanks for checking out my portfolio! To view the source for this site, please visit %chttps://github.com/jlegrone/jlegrone.github.io%c.", css(consoleStyle), css(linkStyle), css(consoleStyle));

})();
