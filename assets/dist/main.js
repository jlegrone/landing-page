(function() {

    var canvas, largeHeader, width, height, hoverRadius, hoverRadiusMultiplier, accelMultiplier, ctx, circles, target, yVector, xVector, hypot, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        largeHeader = document.getElementById('large-header');
        canvas = document.getElementById('demo-canvas');

        // Set canvas sizing
        setSizing()

        // calc hoverRadius and accelMultiplier constants
        setConstants();

        ctx = canvas.getContext('2d');
        target = {x: 9999999, y: 9999999};

        // initialize circles
        addCircles();
        animate();

        // Display header text & menu
        window.setTimeout(showHeaderContent, 500);

        function showHeaderContent(){
            document.getElementById('main-title').className = '';
        }
    }

    function setSizing() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
        setConstants();
    }

    function setConstants(e){
        var form = document.getElementById('animation_settings');
        if (e && e.type == "reset"){
            accelMultiplier = form.acceleration.defaultValue;
            hoverRadiusMultiplier = form.effectradius.defaultValue;
        }
        else {
            accelMultiplier = form.acceleration.value;
            hoverRadiusMultiplier = form.effectradius.value;
        }
        hoverRadius = width * hoverRadiusMultiplier/100;

        form.acceleration.title = Math.floor(1000 * accelMultiplier/form.acceleration.max)/10 + "%";
        form.effectradius.title = Math.floor(hoverRadius).toString() + " pixels";
    }

    // Create particles
    function addCircles(){
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            c.init();
            circles.push(c);
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        document.getElementById('animation_settings').addEventListener('change', setConstants, false);
        document.getElementById('animation_settings').addEventListener('reset', setConstants, false);
        optimizedResize.add(resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        // Set canvas sizing
        setSizing();
        // Fill new canvas with circles
        addCircles();
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        this.init = function() {  
            _this.pos = {};          
            _this.pos.x = Math.random()*width;
            _this.pos.y = Math.random()*height;
            _this.scale = 0.1+Math.random()*0.15;
            _this.alpha = 0.1+Math.random()*0.8;
            _this.Xvelocity = getRandomIntInclusive(-1, 1);
            _this.Yvelocity = getRandomIntInclusive(-1, 1);

            function getRandomIntInclusive(min, max) {
                return (Math.random() * (max - min) + min)*0.05;
            }
        }

        this.draw = function() {
            // reinitialize if circle becomes transparent or goes off canvas
            if(_this.pos.x > width || _this.pos.x < 0 || _this.pos.y > height || _this.pos.y < 0) {
                _this.init();
            }

            yVector = _this.pos.y - target.y;
            xVector = _this.pos.x - target.x;

            hypot = Math.sqrt(xVector*xVector + yVector*yVector)

            if (hypot < hoverRadius){
                _this.Yvelocity = _this.Yvelocity + yVector/(hypot*hypot*_this.scale*_this.scale) * accelMultiplier;
                _this.Xvelocity = _this.Xvelocity + xVector/(hypot*hypot*_this.scale*_this.scale) * accelMultiplier;
            }

            _this.pos.y += _this.Yvelocity;
            _this.pos.x += _this.Xvelocity;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fill();
        };
    }

})();
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

var webSamples = [
    {
        name: "Bernie Sanders 2016 - Ground Control",
        linkUrl: "organize.berniesanders.com",
        tags: ["Node", "React", "Relay", "Postgres", "Webpack", "Moment.js", "ES6", "Heroku"],
        description: "Ground Control is the central portal for volunteers who want to get involved with the Sanders campaign and also serves as a hub for managing campaign data, volunteers and events. Jacob works primarily on the Campaign's event management system, database administration, and application deployment.",
        views: [
            {
                title: "Ground Control",
                displayUrl: "organize.berniesanders.com/admin/events",
                img: "ground-control-event-admin.png"
            },
            {
                title: "Ground Control",
                displayUrl: "organize.berniesanders.com/signup",
                img: "ground-control-signup.png"
            },
            {
                title: "Ground Control",
                displayUrl: "organize.berniesanders.com/events/create",
                img: "ground-control-create-event-1.png"
            },
            {
                title: "Ground Control",
                displayUrl: "organize.berniesanders.com/events/create",
                img: "ground-control-create-event-2.png"
            }
        ]
    },
    {
        name: "SC Health Atlas",
        linkUrl: "schealthatlas.org",
        tags: ["Python", "Google Maps API", "ArcGIS", "Web Scraping", "jQuery", "Responsive"],
        description: "The South Carolina Health Atlas is a source of health and social services data for South Carolina. The Atlas aims to provide South Carolinians with data and tools necessary to explore the availability of health and social services in their communities, and link people to the care they need.",
        views: [
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth-search.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth-directions.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org/?services=hospital,publichealth,substanceabuse,schoolclinic,freemed",
                img: "schealth-share.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org/?type=dark",
                img: "schealth-heatmap.png"
            },
            {
                title: "SC Health Atlas | Data",
                displayUrl: "schealthatlas.org/data",
                img: "schealth-data.png"
            }
        ]
    },
    {
        name: "Country Dance & Song Society Dance Map",
        linkUrl: "map.cdss.org",
        tags: ["Python", "Google AppEngine", "Facebook Graph API", "Google Maps API", "Google Calendar API", "Mandrill API", "jQuery", "Responsive"],
        description: "The Country Dance and Song Society sponsors folk dancing organizations around the world. They wished to provide an interactive and community maintained map of dance venues.",
        views: [
            {
                title: "CDSS Dance Map",
                displayUrl: "map.cdss.org",
                img: "cdssmap.png"
            },
            {
                title: "CDSS Dance Map",
                displayUrl: "map.cdss.org/#id=5659313586569216",
                img: "cdssmap-rsvp.png"
            },
            {
                title: "Edit Venue - Charlotte NC",
                displayUrl: "map.cdss.org/dances/5659313586569216/edit",
                img: "cdssmap-edit.png"
            },
            {
                title: "About",
                displayUrl: "map.cdss.org/about",
                img: "cdssmap-about.png"
            }
        ]
    },
    {
        name: "Engineers Without Borders USC Chapter",
        linkUrl: "ewbusc.org",
        tags: ["PHP", "Bootstrap", "Responsive"],
        description: "The Student Chapter of EWB-USA at the University of South Carolina (EWB-USC), founded in 2010, is a strong interdisciplinary team from a variety of colleges and majors. Our student members come from the College of Engineering and Computing, the College of Arts and Sciences, the Arnold School of Public Health, and the Darla Moore School of Business.",
        views: [
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org",
                img: "ewbusc.png"
            },
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org/events",
                img: "ewbusc-events.png"
            },
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org/projects",
                img: "ewbusc-projects.png"
            }
        ]
    },
    {
        name: "Personal Blog",
        linkUrl: "blog.jacoblegrone.com",
        tags: ["HTML5", "CSS3", "Responsive"],
        description: "I developed the theme for my personal 'contra dance calling' blog, where I post dance calling programs and other related material.",
        views: [
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/about",
                img: "jacobblog.png"
            },
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/dances",
                img: "jacobblog-dances.png"
            },
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/post/101954150202/travelers-delight-by-jacob-legrone",
                img: "jacobblog-post.png"
            }
        ]
    }
];

var expInfo = [
    {
        heading: "Software Stack",
        items: [
            ["Front end", "HTML5, CSS3, JavaScript"],
            ["Back end", "Python, Node.js"],
            ["Databases", "NDB (NoSQL), Postgres, GraphQl"],
            ["Platforms", "Google AppEngine, Heroku, Wordpress"]
        ]
    },
    {
        heading: "Tools & Software",
        items: [
            ["Frameworks & Libraries", "React, Relay, jQuery, Django, Flask, Bootstrap"],
            ["Build Tools", "NPM, Babel, Webpack, Gulp, SASS & LESS"],
            ["Image Manipulation", "GIMP, PhotoShop"],
            ["Other Software Packages", "ArcGIS, Google Earth, Excel, NumPy, SciPy, Matplotlib"]
        ]
    },
    {
        heading: "Web APIs",
        items: [
            [null, "Google Maps JavaScript API"],
            [null, "Facebook Graph API"],
            [null, "Google Docs, Calendar, Apps Script"],
            [null, "Mandrill, Mailchimp, and Mailgun"],
            [null, "PayPal & Stripe"]
        ]
    }
];
(function() {

    var ExperienceColumnComponent = React.createClass({displayName: "ExperienceColumnComponent",
        render: function() {
            var listItems = this.props.data.items.map(function(item, index) {
                return (
                    React.createElement("span", {key: 'item' + index}, 
                        item[0], 
                        React.createElement("li", null, item[1])
                    )
                );
            });
            return (
                React.createElement("div", {className: "four columns"}, 
                    React.createElement("h5", null, this.props.data.heading), 
                    React.createElement("ul", null, 
                        listItems
                    )
                )
            );
        }
    }); 

    var ExperienceRowComponent = React.createClass({displayName: "ExperienceRowComponent",
        render: function() {
            var columnNodes = this.props.data.map(function (column, index) {
                return (
                    React.createElement(ExperienceColumnComponent, {key: 'column' + index, data: column})
                );
            });
            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "highlight"}, 
                        React.createElement("h2", {className: "container"}, "Skills")
                    ), 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", {className: "row"}, 
                        columnNodes
                        )
                    )
                )
            );
        }
    }); 

    var SiteInfoComponent = React.createClass({displayName: "SiteInfoComponent",
        render: function() {
            var tags = this.props.data.tags.map(function(tag, index) {
                return (
                    React.createElement("li", {key: 'tag' + index}, tag)
                );
            });
            return (
                React.createElement("div", {className: "five columns siteInfo"}, 
                    React.createElement("h4", null, this.props.data.name), 
                        React.createElement("p", null, this.props.data.description), 
                    React.createElement("a", {className: "button", href: "http://" + this.props.data.linkUrl}, "Visit ", this.props.data.linkUrl), 
                    React.createElement("ul", {className: "siteTags"}, 
                        tags
                    )
                )
            );
        }
    }); 

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;  

    var SitePreviewComponent = React.createClass({displayName: "SitePreviewComponent",
        getInitialState: function() {
            return {
                page: 0,
                last: this.props.views.length - 1
            };
        },
        handleClick: function(event) {
            if (this.state.page < this.state.last){
                this.setState({page: this.state.page + 1});
            }
            else {
                this.setState({page: 0});
            }
        },
        render: function() {
            return (
                React.createElement("div", {className: "seven columns sitePreview"}, 
                    React.createElement("div", {className: "browser_wrapper"}, 
                        React.createElement("div", {className: "browser_header"}, 
                            React.createElement("h1", {className: "name"}, this.props.views[this.state.page].title), 
                            React.createElement("div", {className: "address_bar"}, React.createElement("a", {href: "http://" + this.props.views[this.state.page].displayUrl}, "http://", this.props.views[this.state.page].displayUrl))
                        ), 
                        React.createElement("div", {className: "browser_content"}, 
                            React.createElement(ReactCSSTransitionGroup, {transitionName: "example", transitionAppear: true}, 
                                React.createElement("img", {src: "assets/img/" + this.props.views[this.state.page].img, onClick: this.handleClick})
                            )
                        )
                    )
                )
            );
        }
    }); 

    var ProjectRowComponent = React.createClass({displayName: "ProjectRowComponent",
        render: function() {
            var projectNodes = this.props.data.map(function (site, index) {
                var siteView = React.createElement(SitePreviewComponent, {views: site.views});
                var siteInfo = React.createElement(SiteInfoComponent, {data: site});
                return (
                    React.createElement("div", {key: 'project' + index, className: "row projectRow"}, 
                        React.createElement("div", {className: "container"}, 
                            siteView, 
                            siteInfo
                        )
                    )
                );
            });
            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "highlight"}, 
                        React.createElement("h2", {className: "container"}, "Sample Projects")
                    ), 
                    projectNodes
                )
            );
        }
    }); 

    React.render(
        React.createElement(ProjectRowComponent, {data: webSamples}),
        document.getElementById('samples')
    );  

    React.render(
        React.createElement(ExperienceRowComponent, {data: expInfo}),
        document.getElementById('skills')
    );

})();
