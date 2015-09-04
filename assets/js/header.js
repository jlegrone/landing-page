(function() {

    var width, height, canvas, ctx, circles, target, yAccel, xAccel, animateHeader = true;
    var hoverRadius = 50;
    var largeHeader = document.getElementById('large-header');

    // Main
    initHeader();
    addListeners();
    window.setTimeout(showHeaderContent, 400);

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
            _this.scale = 0.1+Math.random()*0.1;
            _this.alpha = 0.1+Math.random()*0.8;
            _this.Xvelocity = getRandomIntInclusive(-1, 1);
            _this.Yvelocity = getRandomIntInclusive(-1, 1);
        }

        function getRandomIntInclusive(min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min)*0.1;
        }

        var yPos, xPos, hypot = true;

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }

            yPos = _this.pos.y - target.y;
            xPos = _this.pos.x - target.x;

            hypot = Math.sqrt(xPos*xPos + yPos*yPos)

            if (hypot <= hoverRadius){
                ctx.fillStyle = 'rgba(69,196,164,'+ _this.alpha+')';
                _this.yAccel = 1/yPos*30;
                _this.xAccel = 1/xPos*30;
            }
            else if (!_this.yAccel) {
                _this.yAccel = _this.Yvelocity;
                _this.xAccel = _this.Xvelocity;
                ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            }
            else {
                ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            }

            _this.pos.y += _this.yAccel;
            _this.pos.x += _this.xAccel;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fill();
        };
    }

})();