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