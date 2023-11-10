
Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

var Maze = function (args) {
  if (args === undefined) var args = {};
  var _self = this;
  this.levels = args.levels || 12;
  this.wallSize = args.wallSize || 6;
  this.walls = [];
  this.separation = args.separation || 147;
  this.halfSeparation = this.separation / 2;
  this.rotation = 30;
  this.totalHurdles = args.totalHurdles || 1;
  this.rotate = args.rotate || true;
  this.hurdles = args.hurdles || true;
  var _angle = Math.random() * 360;
  this.opacity = 0;

  this.fadeIn = function () {
    if (_self.opacity < 1) {
      _self.opacity += 0.01; // Adjust the speed of the fade-in by changing the increment
      _self.render(); // Update the maze's rendering with the new opacity
      // requestAnimationFrame(_self.fadeIn);
    }
  };

  this.setup = function () {
    this.walls = [];
    this.halfSeparation = this.separation / 2;
    var radius = this.separation;
    var rotateClockwise = true; // Variable to alternate rotation direction

    for (var i = 1; i <= this.levels; i++) {
      var _slice = 360 / i;
      var _rand = Math.ceil(Math.random() * i);

      // Determine rotation direction based on the 'rotateClockwise' variable
      var rotationDirection = rotateClockwise ? 1 : -1;

      this.walls.push(
        new Wall({
          angle: _angle,
          radius: radius,
          index: this.levels - i,
          rotationDirection: rotationDirection, // Pass rotation direction to Wall constructor
        })
      );
      _angle = (_slice * _rand) + Math.random() * _slice;
      radius += this.separation;
      rotateClockwise = !rotateClockwise; // Toggle rotation direction
    }
  };

  function init() {
    _self.canvas = document.createElement("canvas");
    document.body.appendChild(_self.canvas);
    _self.context = _self.canvas.getContext("2d");
    setSize();

    // Create an image element and set its source
    var imageElement = new Image();
    imageElement.src = "SB ICON_2colour transparent.png"; // Replace with the actual path to your image
    imageElement.style.position = "absolute";
    imageElement.style.width = "280px";
    imageElement.style.height = "280px";

    // Calculate the size of the first circle (assuming it's the first element in the walls array)

    // Center the image
    imageElement.style.left = "50%";
    imageElement.style.top = "50%";
    imageElement.style.transform = "translate(-50%, -50%)"; // Center the image

    // Append the image element to the document
    document.body.appendChild(imageElement);

    window.addEventListener("resize", setSize, false);
    _self.setup();
  }

  function setSize() {
    _self.canvas.width = window.innerWidth;
    _self.canvas.height = window.innerHeight;
    _self.center = {
      x: _self.canvas.width / 2,
      y: _self.canvas.height / 2
    };
  }

  function animate() {
    requestAnimationFrame(animate);
    _self.rotation += 0.005;
    if (_self.opacity < 1) {
      _self.opacity += 0.005;
    }

    _self.render();
  }

  this.render = function () {
    _self.context.clearRect(0, 0, _self.canvas.width, _self.canvas.height);
    _self.context.strokeStyle = "#C68019";
    // _self.context.lineCap = "round";
    _self.context.lineWidth = this.wallSize;
    _self.context.save();
    _self.context.translate(_self.center.x, _self.center.y);
    for (var i = 0; i < _self.walls.length; i++) {
      _self.walls[i].draw();
    }
    _self.context.restore();
  }

  var Wall = function (args) {
    this.start = Math.radians(args.angle);
    this.radius = args.radius || 10;
    this.stop = Math.radians(args.angle + (356 - args.index));
    this.rotation = Math.random();
    this.velocity = Math.random() * 0.0008 - 0.0004;
    this.barriers = [];
    this.draw = function () {
      _self.context.beginPath();
      if (_self.rotate) {
        this.rotation = this.rotation + this.velocity;
        _self.context.rotate(this.rotation);
      }
      _self.context.arc(0, 0, this.radius, this.start, this.stop, false);
      _self.context.stroke();
      _self.context.closePath();

      if (_self.hurdles) {
        for (i = 0; i < this.barriers.length; i++) {
          this.barriers[i].draw();
          this.barriers[i].addClickListener(i); // Add a click listener to each hurdle
        }
      }

    }
    this.getPos = function (a, b, _radius) {
      return {
        x: Math.cos(a) * _radius,
        y: Math.sin(b) * _radius
      };
    }
    this.setHurdles = function () {
      var _slice = Math.radians(360 / _self.totalHurdles);
      var _angle = this.start + _slice;
      var random = Math.floor(Math.random() * _self.totalHurdles);
      for (var i = 0; i < _self.totalHurdles; i++) {
        if (i == random) {
          var _from = this.getPos(_angle, _angle, this.radius - _self.halfSeparation);
          var _to = this.getPos(_angle, _angle, this.radius + _self.separation);
        } else {
          var _from = this.getPos(_angle, _angle, this.radius - _self.halfSeparation);
          var _to = this.getPos(_angle, _angle, this.radius + _self.halfSeparation);
        }
        this.barriers.push(new Hurdle(_from, _to, _angle));
        _angle += _slice;
      }
    }
    // this.setHurdles();
    return this;
  }

  var Hurdle = function (_from, _to, _angle) {
    this.angle = _angle;
    this.x0 = _from.x;
    this.y0 = _from.y;
    this.x = _to.x;
    this.y = _to.y;
    this.clicked = false;
    this.draw = function (color) {
      _self.context.beginPath();
      if (_self.rotate) {
        this.rotation = this.rotation + this.velocity;
        _self.context.rotate(this.rotation);
      }

      // Change the color based on whether it has been clicked
      if (this.clicked) {
        _self.context.strokeStyle = "red";
      } else {
        _self.context.strokeStyle = "#C68019";
      }
      _self.context.moveTo(this.x0, this.y0);
      _self.context.lineTo(this.x, this.y);
      _self.context.stroke();
      // _self.context.strokeStyle("red";
      _self.context.closePath();
      this.addClickListener = function (index) {
        _self.canvas.addEventListener('click', (event) => {
          var canvasRect = _self.canvas.getBoundingClientRect();
          var clickX = event.clientX - canvasRect.left;
          var clickY = event.clientY - canvasRect.top;
          var distance = Math.sqrt((clickX - _self.center.x) ** 2 + (clickY - _self.center.y) ** 2);
          if (distance >= _self.halfSeparation && distance <= _self.radius) {
            this.clicked = true; // Mark the hurdle as clicked
            // hurdleClickHandler(index); // hurdleClickHandler is not defined in this code
          }
        });
      }
    }
    return this;
  }

  init();
  animate();
  this.fadeIn();
  return this;
}

// Create a new instance of the Maze and append its canvas element to the document
// Append the maze's canvas to the document



$('.maze').zPath({
  draw: 'terminusDelayed',
  delay: 20,
  shuffle: false,
  drawTime: 100
});
var _draw = "";
var _delay = 30;
var _speed = 100;
var _shuffle = false;

$(".draw, .delay, .speed, .shuffle").change(function () {
  //$('.maze').zPath({action:'destroy'});
  _draw = $('.draw').val();
  _delay = $('.delay').val();
  _speed = $('.speed').val();
  _shuffle = $('.shuffle').is(":checked");
  updateMaze(_draw, _delay, _speed, _shuffle);
});

function updateMaze(a, b, c, d) {
  console.log(a, b, c, d);
  $('.maze').zPath({
    action: 'destroy'
  });

  var obj = {
    action: 'start',
    draw: '' + a,
    delay: Number(b),
    drawTime: Number(c),
    shuffle: Boolean(d)
  }
  $('.maze').zPath(obj);
}


function switchMazes() {
  // Get references to the two maze elements
  var firstMaze = document.querySelector(".maze:first-child");

  // Create a function to gradually reduce opacity
  function fadeOut(element) {
    var opacity = 1;
    var timer = setInterval(function () {
      if (opacity <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none'; // Hide the element when it's completely transparent
      }
      element.style.opacity = opacity;
      opacity -= 0.1;
    }, 100); // Adjust the speed of the fadeout by changing the interval duration
  }

  // Fade out the first maze
  setTimeout(function () {
    fadeOut(firstMaze);
  }, 6000); // 7000 milliseconds = 7 seconds

  // Fade in the second maze after hiding the first one
  setTimeout(function () {
    firstMaze.style.display = "none"; // Hide the first maze completely
    var maze = new Maze();
    maze.setup(); // Initialize the maze setup
    document.body.appendChild(maze.canvas); // Set opacity to 1 for fade-in effect
  }, 8000);

  // Create and fade in the second maze after hiding the first one
  setTimeout(function () {
    maze.canvas.style.opacity = "0"; // Set opacity to 0 for fade-in effect
    maze.canvas.style.display = "block"; // Show the second maze
    var fadeInInterval = setInterval(function () {
      if (parseFloat(maze.canvas.style.opacity) >= 1) {
        clearInterval(fadeInInterval);
      }
      var currentOpacity = parseFloat(maze.canvas.style.opacity) || 0;
      maze.canvas.style.opacity = (currentOpacity + 0.05).toString(); // Adjust the increment for a smoother fade-in
    }, 100); // Adjust the speed of the fade-in by changing the interval duration
  }, 8000); // Wait for 7 seconds (hide animation) + 1 second (transition time) = 8 seconds
}

// Call the switchMazes function to start the animation
switchMazes();
