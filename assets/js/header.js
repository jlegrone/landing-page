(function() {

    var width, height, canvas, ctx, circles, target, yVector, xVector, hypot, animateHeader = true;
    var hoverRadius = 70;
    var accelMultiplier = -0.1;
    var largeHeader = document.getElementById('large-header');

    // Main
    initHeader();
    addListeners();
    window.setTimeout(showHeaderContent, 500);

    function showHeaderContent(){
        document.getElementById('main-title').className = '';
    }

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 9999999, y: 9999999};
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
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
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
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

        // constructor
        (function() {
            _this.pos = {};
            init();
            // console.log(_this);
        })();

        function init(fromOrigin) {            
            _this.pos.x = Math.random()*width;
            _this.pos.y = Math.random()*height;
            _this.scale = 0.1+Math.random()*0.15;
            _this.alpha = 0.1+Math.random()*0.8;
            _this.Xvelocity = getRandomIntInclusive(-1, 1);
            _this.Yvelocity = getRandomIntInclusive(-1, 1);
        }

        function getRandomIntInclusive(min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min)*0.07;
        }

        this.draw = function() {
            // reinitialize if circle becomes transparent or goes off canvas
            if(_this.alpha <= 0 || _this.pos.x > width || _this.pos.y > height) {
                init();
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
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fill();
        };
    }

})();