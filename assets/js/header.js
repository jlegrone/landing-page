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
        hoverRadius = width * hoverRadiusMultiplier;
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

        form.acceleration.title = accelMultiplier.toString() + " px/sec^2";
        form.effectradius.title = hoverRadius.toString() + " pixels";
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