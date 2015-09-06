!function(){function e(){document.getElementById("main-title").className=""}function t(){r=window.innerWidth,c=window.innerHeight,h={x:9999999,y:9999999},w.style.height=c+"px",p=document.getElementById("demo-canvas"),p.width=r,p.height=c,m=p.getContext("2d"),d=[];for(var e=0;.5*r>e;e++){var t=new i;d.push(t)}l()}function a(){"ontouchstart"in window||window.addEventListener("mousemove",n),window.addEventListener("scroll",o),window.addEventListener("resize",s)}function n(e){var t=posy=0;e.pageX||e.pageY?(t=e.pageX,posy=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),h.x=t,h.y=posy}function o(){y=document.body.scrollTop>c?!1:!0}function s(){r=window.innerWidth,c=window.innerHeight,w.style.height=c+"px",p.width=r,p.height=c}function l(){if(y){m.clearRect(0,0,r,c);for(var e in d)d[e].draw()}requestAnimationFrame(l)}function i(){function e(e){a.pos.x=Math.random()*r,a.pos.y=Math.random()*c,a.scale=.1+.15*Math.random(),a.alpha=.1+.8*Math.random(),a.Xvelocity=t(-1,1),a.Yvelocity=t(-1,1)}function t(e,t){return.05*(Math.floor(Math.random()*(t-e+1))+e)}var a=this;!function(){a.pos={},e()}(),this.draw=function(){(a.alpha<=0||a.pos.x>r||a.pos.y>c)&&e(),g=a.pos.y-h.y,u=a.pos.x-h.x,v=Math.sqrt(u*u+g*g),a.Yvelocity=a.Yvelocity+g/(v*v*a.scale*a.scale)*f,a.Xvelocity=a.Xvelocity+u/(v*v*a.scale*a.scale)*f,a.pos.y+=a.Yvelocity,a.pos.x+=a.Xvelocity,a.alpha-=5e-4,m.beginPath(),m.fillStyle="rgba(255,255,255,"+a.alpha+")",m.arc(a.pos.x,a.pos.y,10*a.scale,0,2*Math.PI,!1),m.fill()}}var r,c,p,m,d,h,g,u,v,y=!0,f=-.01,w=document.getElementById("large-header");t(),a(),window.setTimeout(e,500)}(),function(){function e(e){return e.join(";")}smoothScroll.init({speed:500,easing:"easeOutCubic",updateURL:!1});var t=document.forms.contact_form,a=document.getElementById("contact");t.onsubmit=function(e){e.preventDefault(),a.className="form-sending",minAjax({url:"https://formspree.io/dev@jacoblegrone.com",method:"POST",type:"json",data:{name:t.name.value,_replyto:t.replyto.value,message:t.message.value,_gotcha:t._gotcha.value},success:function(e){a.className="form-sent"},stateChange:function(e,t){}})};var n=["color: rgb(100,100,100)","text-align: center","font-weight: bold","font-size: 18px","font-family: lato"],o=n.slice();o[0]="color: rgb(49,176,144)",console.log("%cThanks for checking out my portfolio! To view the source for this site, please visit %chttps://github.com/jlegrone/jlegrone.github.io%c.",e(n),e(o),e(n))}();var webSamples=[{name:"SC Health Atlas",linkUrl:"schealthatlas.org",tags:["Python","Google Maps API","ArcGIS","Web Scraping","jQuery","Responsive"],description:"The South Carolina Health Atlas is a source of health and social services data for South Carolina. The Atlas aims to provide South Carolinians with data and tools necessary to explore the availability of health and social services in their communities, and link people to the care they need.",views:[{title:"SC Health Atlas",displayUrl:"schealthatlas.org",img:"schealth.png"},{title:"SC Health Atlas",displayUrl:"schealthatlas.org",img:"schealth-search.png"},{title:"SC Health Atlas",displayUrl:"schealthatlas.org",img:"schealth-directions.png"},{title:"SC Health Atlas",displayUrl:"schealthatlas.org/?services=hospital,publichealth,substanceabuse,schoolclinic,freemed",img:"schealth-share.png"},{title:"SC Health Atlas",displayUrl:"schealthatlas.org/?type=dark",img:"schealth-heatmap.png"},{title:"SC Health Atlas | Data",displayUrl:"schealthatlas.org/data",img:"schealth-data.png"}]},{name:"Country Dance & Song Society Dance Map",linkUrl:"map.cdss.org",tags:["Python","Google AppEngine","Facebook Graph API","Google Maps API","Google Calendar API","Mandrill API","jQuery","Responsive"],description:"The Country Dance and Song Society sponsors folk dancing organizations around the world. They wished to provide an interactive and community maintained map of dance venues.",views:[{title:"CDSS Dance Map",displayUrl:"map.cdss.org",img:"cdssmap.png"},{title:"CDSS Dance Map",displayUrl:"map.cdss.org/#id=5659313586569216",img:"cdssmap-rsvp.png"},{title:"Edit Venue - Charlotte NC",displayUrl:"map.cdss.org/dances/5659313586569216/edit",img:"cdssmap-edit.png"},{title:"About",displayUrl:"map.cdss.org/about",img:"cdssmap-about.png"}]},{name:"Engineers Without Borders USC Chapter",linkUrl:"ewbusc.org",tags:["PHP","Bootstrap","Responsive"],description:"The Student Chapter of EWB-USA at the University of South Carolina (EWB-USC), founded in 2010, is a strong interdisciplinary team from a variety of colleges and majors. Our student members come from the College of Engineering and Computing, the College of Arts and Sciences, the Arnold School of Public Health, and the Darla Moore School of Business.",views:[{title:"EWB | USC Chapter",displayUrl:"www.ewbusc.org",img:"ewbusc.png"},{title:"EWB | USC Chapter",displayUrl:"www.ewbusc.org/events",img:"ewbusc-events.png"},{title:"EWB | USC Chapter",displayUrl:"www.ewbusc.org/projects",img:"ewbusc-projects.png"}]},{name:"Personal Blog",linkUrl:"blog.jacoblegrone.com",tags:["HTML5","CSS3","Responsive"],description:"I designed the styling for my personal 'contra dance calling' blog, which is hosted on the Tumblr platform.",views:[{title:"Jacob LeGrone",displayUrl:"blog.jacoblegrone.com/about",img:"jacobblog.png"},{title:"Jacob LeGrone",displayUrl:"blog.jacoblegrone.com/dances",img:"jacobblog-dances.png"},{title:"Jacob LeGrone",displayUrl:"blog.jacoblegrone.com/post/101954150202/travelers-delight-by-jacob-legrone",img:"jacobblog-post.png"}]}],expInfo=[{heading:"Software Stack",items:[["Front end","HTML5, CSS3, JavaScript"],["Back end","Python, PHP, Node.js"],["Databases","NDB (NoSQL), MySQL"],["Platforms","Google AppEngine, Heroku, Wordpress"]]},{heading:"Tools & Software",items:[["Frameworks & Libraries","Bootstrap, Django, React.js, D3.js, jQuery"],["Build Tools","NPM, Bower, Gulp/Grunt, SASS/LESS"],["Image Manipulation","GIMP, PhotoShop, Illustrator"],["Other Software Packages","ArcGIS, Google Earth, R, Excel"]]},{heading:"Web APIs",items:[[null,"Google Maps JavaScript V3"],[null,"Facebook JavaScript & Python SDK"],[null,"Google Docs, Calendar, and Mail APIs"],[null,"Mandrill & Mailchimp REST APIs"],[null,"PayPal Instant Payment Notification"]]}],ExperienceColumnComponent=React.createClass({displayName:"ExperienceColumnComponent",render:function(){var e=this.props.data.items.map(function(e){return React.createElement("span",null,e[0],React.createElement("li",null,e[1]))});return React.createElement("div",{className:"four columns"},React.createElement("h5",null,this.props.data.heading),React.createElement("ul",null,e))}}),ExperienceRowComponent=React.createClass({displayName:"ExperienceRowComponent",render:function(){var e=this.props.data.map(function(e){return React.createElement(ExperienceColumnComponent,{data:e})});return React.createElement("div",null,React.createElement("div",{className:"highlight"},React.createElement("h2",{className:"container"},"Skills")),React.createElement("div",{className:"container"},React.createElement("div",{className:"row"},e)))}}),SiteInfoComponent=React.createClass({displayName:"SiteInfoComponent",render:function(){var e=this.props.data.tags.map(function(e){return React.createElement("li",null,e)});return React.createElement("div",{className:"five columns siteInfo"},React.createElement("h4",null,this.props.data.name),React.createElement("p",null,this.props.data.description),React.createElement("a",{className:"button",href:"http://"+this.props.data.linkUrl},"Visit ",this.props.data.linkUrl),React.createElement("ul",{className:"siteTags"},e))}}),ReactCSSTransitionGroup=React.addons.CSSTransitionGroup,SitePreviewComponent=React.createClass({displayName:"SitePreviewComponent",getInitialState:function(){return{page:0,last:this.props.views.length-1}},handleClick:function(e){this.state.page<this.state.last?this.setState({page:this.state.page+1}):this.setState({page:0})},render:function(){return React.createElement("div",{className:"seven columns sitePreview"},React.createElement("div",{className:"browser_wrapper"},React.createElement("div",{className:"browser_header"},React.createElement("h1",{className:"name"},this.props.views[this.state.page].title),React.createElement("div",{className:"address_bar"},React.createElement("a",{href:"http://"+this.props.views[this.state.page].displayUrl},"http://",this.props.views[this.state.page].displayUrl))),React.createElement("div",{className:"browser_content"},React.createElement(ReactCSSTransitionGroup,{transitionName:"example",transitionAppear:!0},React.createElement("img",{src:"assets/img/"+this.props.views[this.state.page].img,onClick:this.handleClick})))))}}),ProjectRowComponent=React.createClass({displayName:"ProjectRowComponent",render:function(){var e=this.props.data.map(function(e,t){var a=React.createElement(SitePreviewComponent,{views:e.views}),n=React.createElement(SiteInfoComponent,{data:e});return React.createElement("div",{className:"row projectRow"},React.createElement("div",{className:"container"},a,n))});return React.createElement("div",null,React.createElement("div",{className:"highlight"},React.createElement("h2",{className:"container"},"Sample Projects")),e)}});React.render(React.createElement(ProjectRowComponent,{data:webSamples}),document.getElementById("samples")),React.render(React.createElement(ExperienceRowComponent,{data:expInfo}),document.getElementById("skills"));