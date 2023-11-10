$('.trigger').click(function () {
  $('.page_portfolio').css('opacity', '1');
  $('.page_portfolio').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
  $('.logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger').addClass('out');
  $('.slider_inner').addClass('in');
  setTimeout(function () {
    $('.slider_inner').click();

  }, 2500);
});

introComplete = false;

setTimeout(function () {
  introComplete = true;
}, 2500);

var scrollPosition = 0;
window.addEventListener('wheel', function (e) {

  if (e.deltaY > 0) {
    scrollPosition += 10;
    $('.content').css('top', -scrollPosition + 'px');
    console.log(e.deltaY);
    if (introComplete) {
      $('.page_portfolio').css('opacity', '1');
      $('.page_portfolio').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
      $('.logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger').addClass('out');
      $('.slider_inner').addClass('in');
      setTimeout(function () {
        $('.slider_inner').click();

      }, 2000);


    }
  } else {
    scrollPosition -= 10;
  }
});

$('.cats').click(function () {
  $(this).parent().addClass('clicked');
  $(this).parent().parent().parent().addClass('clicked');
  //$('.portfolio_home__work').css('opacity', 1);
  $('.portfolio_home__work').addClass('expand');

});
$('.img').click(function () {
  $(this).parent().addClass('clicked');
  $(this).parent().parent().parent().addClass('clicked');
  //$('.portfolio_home__work').css('opacity', 1);
  $('.portfolio_home__work').addClass('expand');

});

// Gross but only a demo

$(window).resize(function () {
  $('.slider_inner').css('left', $(document).width() / 2 - $('.slider_inner__slide').width() / 2);
});

$('.slider_inner').css('left', $(document).width() / 2 - $('.slider_inner__slide').width() / 2);

var dragging = false;
var endPosition = 0;
var threshold = 100;

$('.slider_inner').click(function () {
  $('.slider_inner__slide').css('animation', 'none');
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
});
$('.slider_inner').mousedown(function (e) {
  initX = e.clientX;
  dragging = true;
  //$('.slider_inner__slide').css('animation', 'none')
  cursor.style.transition = `transform 0s 0s`;

  console.log(cursor);
});

$('.slider_inner').mousemove(function (e) {

  if (dragging) {
    let mouseX = e.clientX;
    difference = mouseX - initX;


    //$('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)')
    position = parseInt($('.slider_inner').css('transform').split(',')[5]);
    //console.log('position is ' + position)
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 - Math.abs(difference / 200));

    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s');

    $('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(120px)`);


  }
});

// 520 -40 -600 -1150

// 560 


var offset = 760;
var margin = 0;

var index = 1;

$('.slider_inner').mouseup(function () {
  cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
  endPosition = parseInt($('.slider_inner').css('transform').split(',')[5]);


  if (difference < -160) {
    console.log('snap to next');
    if (index < 5) {
      index++;
      var threshold = offset - (offset + margin) * index;
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;

    } else {
      var threshold = offset - (offset + margin) * index;
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;

    }

  } else {
    if (difference > 160) {
      if (index > 0) {
        index--;
        var threshold = offset - (offset + margin) * index;
        $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
        endPosition = threshold;

      } else {
        var threshold = offset - (offset + margin) * index;
        $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
        endPosition = threshold;

      }

    } else {
      var threshold = offset - (offset + margin) * index;
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;

    }
  }

  dragging = false;
  console.log('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ')');
  $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1);
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + parseInt(index + 2) + ')').show();
  difference = 0;
});

// https://gist.github.com/ripper234/5757309

function drawMouseSpeedDemo() {
  var mrefreshinterval = 30; // update display every 500ms
  var lastmousex = -1;
  var lastmousey = -1;
  var lastmousetime;
  var mousetravel = 0;
  var mpoints = [];
  var mpoints_max = 30;
  var direction;

  $('html').mousemove(function (e) {
    var mousex = e.pageX;
    var mousey = e.pageY;
    if (lastmousex > -1) {
      mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
    }
    // console.log(mousex-lastmousex)

    if (mousex - lastmousex > 0) {
      direction = '+';
    } else {
      direction = '-';
    }

    //console.log(direction);

    lastmousex = mousex;
    lastmousey = mousey;
  });
  var mdraw = function () {
    var md = new Date();
    var timenow = md.getTime();
    if (lastmousetime && lastmousetime != timenow) {
      var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
      mpoints.push(pps);
      if (mpoints.length > mpoints_max)
      mpoints.splice(0, 1);
      mousetravel = 0;
      //console.log(pps)
      if (dragging) {
        let velocity = .5 - pps / 40000;



        $('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)');
        $('.slider_inner__slide').css('transition', 'all ' + velocity + 's');
        //console.log(velocity)
      }

    }
    lastmousetime = timenow;
    setTimeout(mdraw, mrefreshinterval);
  };
  // We could use setInterval instead, but I prefer to do it this way
  setTimeout(mdraw, mrefreshinterval);
};

drawMouseSpeedDemo();

/* -------------------------------------------------

Dynamic cursor

--------------------------------------------------- */

const cursorSettings = {
  'class': 'dynamicCursor',
  'size': '18',
  'expandedSize': '40',
  'expandSpeed': 0.4,
  'background': 'rgba(161, 142, 218, 0.25)',
  'opacity': '1',
  'transitionTime': '1.4s',
  'transitionEase': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  'borderWidth': '0',
  'borderColor': 'black',
  'iconSize': '11px',
  'iconColor': 'white',
  'triggerElements': {
    'trigger': {
      'className': 'trigger',
      'icon': '<i class="fa fa-plus"></i>' },

    'trigger2': {
      'className': 'slider_inner',
      'icon': '<i class="fa fa-arrows-h"></i>' } } };





function dynamicCursor(options) {

  document.write('<link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css">');

  var hold;
  cursor = document.createElement('div');
  let cursorIcon = document.createElement('div');

  cursorIcon.classList.add('cursorIcon');
  cursorIcon.style.position = 'absolute';
  cursorIcon.style.fontFamily = 'Raleway';
  cursorIcon.style.textTransform = 'uppercase';
  cursorIcon.style.fontWeight = '800';
  cursorIcon.style.textAlign = 'center';
  cursorIcon.style.top = '50%';
  cursorIcon.style.width = '100%';
  cursorIcon.style.transform = 'translateY(-50%)';
  cursorIcon.style.color = options.iconColor;
  cursorIcon.style.fontSize = options.iconSize;
  cursorIcon.style.opacity = 0;
  cursorIcon.style.transition = `opacity ${options.expandSpeed}s`;

  cursor.classList.add(options.class);
  cursor.style.boxSizing = 'border-box';
  cursor.style.width = `${options.size}px`;
  cursor.style.height = `${options.size}px`;
  cursor.style.borderRadius = `${options.expandedSize}px`;
  cursor.style.opacity = 0;

  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = 999;
  cursor.style.transition = `transform ${options.transitionTime} ${options.transitionEase}, width ${options.expandSpeed}s .2s, height ${options.expandSpeed}s .2s, opacity 1s .2s`;
  cursor.style.border = `${options.borderWidth}px solid ${options.borderColor}`;
  cursor.style.position = 'fixed';
  cursor.style.background = options.background;

  cursor.appendChild(cursorIcon);
  document.body.appendChild(cursor);

  setTimeout(function () {
    cursor.style.opacity = options.opacity;
  }, 500);

  var idle;

  document.onmousemove = e => {
    console.log('test');
    x = e.pageX;
    y = e.pageY;

    cursor.style.opacity = options.opacity;
    clearInterval(idle);

    idle = setTimeout(function () {
      cursor.style.opacity = 0;
    }, 4000);

    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.transform = `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%))`;
  };

  for (i in options.triggerElements) {

    let trigger = $(`.${options.triggerElements[i].className}`);

    console.log(trigger);


    let icon = options.triggerElements[i].icon;

    if (!trigger) {
      console.warn('You dont have any triggers');
    } else {
      trigger.each(function (el) {

        console.log();
        trigger[el].style.cursor = 'default';
        trigger[el].addEventListener('mouseover', () => {
          console.log('over');
          cursor.style.width = `${options.expandedSize}px`;
          cursor.style.height = `${options.expandedSize}px`;
          cursorIcon.innerHTML = icon;
          cursorIcon.style.opacity = 1;


          console.log($(this));


        });

        trigger[el].addEventListener('mouseout', () => {
          cursor.style.width = `${options.size}px`;
          cursor.style.height = `${options.size}px`;
          cursorIcon.style.opacity = 0;
        });
      });

    }
  }
}

dynamicCursor(cursorSettings);

$('.back').click(function () {
  $(this).parent().parent().removeClass('expand');
});


var initX = 0; // Initialize variables to track touch events
var dragging = false;
var difference = 0;
var index = 1;

// Touch start event handler
$('.slider_inner').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  initX = e.touches[0].clientX;
  dragging = true;
});

// Touch move event handler
$('.slider_inner').on('touchmove', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  if (dragging) {
    var mouseX = e.touches[0].clientX;
    difference = mouseX - initX;

    // Adjust elements based on touch movement
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 - Math.abs(difference / 200));
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s');
    $('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(120px)`);
  }
});

// Touch end event handler
$('.slider_inner').on('touchend', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  // Calculate threshold for slide transition
  var threshold = offset - (offset + margin) * index;

  if (difference < -160) {
    if (index < 5) {
      index++;
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;
    } else {
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;
    }
  } else {
    if (difference > 160) {
      if (index > 0) {
        index--;
        $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
        endPosition = threshold;
      } else {
        $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
        endPosition = threshold;
      }
    } else {
      $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
      endPosition = threshold;
    }
  }

  dragging = false;
  $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1);
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + parseInt(index + 2) + ')').show();
  difference = 0;
});

// Touch end event handler
$('.slider_inner').on('touchend', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
  endPosition = parseInt($('.slider_inner').css('transform').split(',')[5]);

  if (difference < -160) {
    console.log('snap to next');
    if (index < 5) {
      index++;
    }
  } else if (difference > 160) {
    if (index > 0) {
      index--;
    }
  }

  var threshold = offset - (offset + margin) * index;
  $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
  endPosition = threshold;

  dragging = false;
  console.log('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ')');
  $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1);
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + parseInt(index + 2) + ')').show();
  difference = 0;
});

// Touch event listener for the elements that trigger slideClone
$('.slider_inner__slide').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  // Toggle visibility of the corresponding slideClone
  var index = $(this).index();
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + (index + 2) + ')').show();
});

// ... Your existing code ...

// Touch start event handler for the slider
$('.slider_inner').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  initX = e.touches[0].clientX;
  dragging = true;
});

// Touch move event handler for the slider
$('.slider_inner').on('touchmove', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  if (dragging) {
    var mouseX = e.touches[0].clientX;
    difference = mouseX - initX;

    // Adjust elements based on touch movement
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 - Math.abs(difference / 200));
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s');
    $('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(120px)`);
  }
});

// Touch end event handler for the slider
$('.slider_inner').on('touchend', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
  endPosition = parseInt($('.slider_inner').css('transform').split(',')[5]);

  if (difference < -160) {
    console.log('snap to next');
    if (index < 5) {
      index++;
    }
  } else if (difference > 160) {
    if (index > 0) {
      index--;
    }
  }

  var threshold = offset - (offset + margin) * index;
  $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
  endPosition = threshold;

  dragging = false;
  console.log('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ')');
  $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1);
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + parseInt(index + 2) + ')').show();
  difference = 0;
});

// Touch event listener for the elements that trigger slideClone
$('.slider_inner__slide').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  // Toggle visibility of the corresponding slideClone
  var index = $(this).index();
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + (index + 2) + ')').show();
});

// Touch event handler for '.cats' and '.title'
$('.cats, .title').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  $(this).parent().addClass('clicked');
  $(this).parent().parent().parent().addClass('clicked');
  $('.portfolio_home__work').addClass('expand');
});

// Touch event handler for window resize
$(window).on('resize', function () {
  $('.slider_inner').css('left', $(document).width() / 2 - $('.slider_inner__slide').width() / 2);
});

$('.slider_inner').css('left', $(document).width() / 2 - $('.slider_inner__slide').width() / 2);

var initX = 0;
var dragging = false;
var endPosition = 0;
var threshold = 100;

// Touch event handler for '.slider_inner'
$('.slider_inner').on('touchstart', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  initX = e.touches[0].clientX;
  dragging = true;
  cursor.style.transition = `transform 0s 0s`;
});

// Touch event handler for '.slider_inner' on touchmove
$('.slider_inner').on('touchmove', function (e) {
  e.preventDefault(); // Prevent default touch behavior

  if (dragging) {
    let mouseX = e.touches[0].clientX;
    difference = mouseX - initX;

    position = parseInt($('.slider_inner').css('transform').split(',')[5]);
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 - Math.abs(difference / 200));
    $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s');
    $('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(120px)`);
  }
});

// Touch event handler for '.slider_inner' on touchend
$('.slider_inner').on('touchend', function (e) {
  e.preventDefault(); // Prevent default touch behavior
  cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
  endPosition = parseInt($('.slider_inner').css('transform').split(',')[5]);

  if (difference < -160) {
    console.log('snap to next');
    if (index < 5) {
      index++;
    }
  } else if (difference > 160) {
    if (index > 0) {
      index--;
    }
  }

  var threshold = offset - (offset + margin) * index;
  $('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
  endPosition = threshold;

  dragging = false;
  console.log('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ')');
  $('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1);
  $('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)');
  $('.slideClone').hide();
  $('.slideClone:nth-of-type(' + parseInt(index + 2) + ')').show();
  difference = 0;
});



const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const numbers = document.querySelector('.ms--numbers');
const lightVideo = document.getElementById('lightVideo');
const lightload = document.getElementById('lightload');
const darkVideo = document.getElementById("darkVideo");
const darkload = document.getElementById("darkload");

let isDarkMode = false;

toggle.addEventListener('click', function () {
  isDarkMode = !isDarkMode; // Toggle dark mode flag

  if (isDarkMode) {
    toggle.classList.remove('bi-moon');
    toggle.classList.add('bi-brightness-high-fill');
    body.style.background = 'black';
    body.style.color = 'white';
    body.style.transition = '2s';
    numbers.style.color = 'white'; // Hide light video
    darkVideo.style.visibility = 'visible';
    darkload.style.visibility = 'visble'; // Show dark video
    lightVideo.style.visibility = 'hidden';
    lightVideo.style.display = 'none';
  } else {
    toggle.classList.remove('bi-brightness-high-fill');
    toggle.classList.add('bi-moon');
    body.style.background = 'white';
    body.style.color = 'black';
    body.style.transition = '2s';
    numbers.style.color = 'black';
    darkVideo.style.display = 'none'; // Hide dark video
    lightVideo.style.display = 'block'; // Show light video
  }
});


    // Get references to the video elements
    var lightVid = document.getElementById("lightVideo");
    // var lightload = document.getElementById("lightload");

    // Add an "ended" event listener to each video element
    lightVideo.addEventListener("ended", function() {
        lightVideo.style.display = "none";
        darkVideo.style.display = "none";
        darkload.style.display = "none"; // Hide the video
    });

    lightload.addEventListener("ended", function() {
        lightload.style.display = "none";
        darkVideo.style.display = "none";
        darkload.style.display = "none"; // Hide the video
    });

    darkload.addEventListener("ended", function() {
        darkload.style.display = "none"; // Hide the video
    });

    darkVideo.addEventListener("ended", function() {
        darkVideo.style.display = "none"; // Hide the video
    });
// ... Your existing code ...


// make go back from page to slider again