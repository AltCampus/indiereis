import React from 'react';
import $ from 'jquery'; 

/*MENU*/
$(".menu, nav").click(function() {
  if ($(".menu").hasClass("active")) {
    $("nav ul").removeClass("active");
    $("nav")
      .delay(800)
      .fadeOut("slow");
    setTimeout(function() {
      $(".menu").removeClass("active");
      $(".section-wrap").removeClass("active");
    }, 800);
  } else {
    $(".menu").addClass("active");
    $("nav").fadeIn("slow");
    $("nav").addClass("active");
    $("nav ul").addClass("active");
    $(".section-wrap").addClass("active");
  }
});

/*MOUSEMOVE TRANSFORM 3D*/

!(function($doc, $win) {
  var screenWidth = $win.screen.width / 2,
    screenHeight = $win.screen.height / 2,
    $elems = $doc.getElementsByClassName("elem"),
			console.log($elems)
    validPropertyPrefix = "",
    otherProperty = "perspective(1000px)",
    elemStyle = $elems.style;

  if (typeof elemStyle.webkitTransform == "string") {
    validPropertyPrefix = "webkitTransform";
  } else if (typeof elemStyle.MozTransform == "string") {
    validPropertyPrefix = "MozTransform";
  }

  $doc.addEventListener("mousemove", function(e) {
    var centroX = e.clientX - screenWidth,
      centroY = screenHeight - (e.clientY + 13),
      degX = centroX * 0.04,
      degY = centroY * 0.01,
      $elem;

    for (var i = 0; i < $elems.length; i++) {
      $elem = $elems[i];
      $elem.style[validPropertyPrefix] =
        otherProperty + "rotateY(" + degX + "deg)  rotateX(" + degY + "deg)";
    }
  });
})(document, window);

$("nav ul li").on("click", function() {
  /*here we make a variable to get the name of the clicked li*/
  var elementName = $(this).attr("name");
  $(".page.active")
    .fadeOut(800)
    .removeClass("active");
  $(".page." + elementName)
    .delay(1000)
    .fadeIn(1000)
    .addClass("active");
});



class LandingPage extends React.Component {
	render(){
		return(
			<React.Fragment>
					< button class = "menu" > < span > < /span></button >
						<
						div class = "wrapper" >
						<
						nav role = 'navigation' >
						<
						div class = "elem"
					style = "transform: perspective(1000px) rotateY(0deg) rotateX(0deg);" >
						<
						ul >
						<
						li name = "home" > < a href = "#" > Home < /a></li >
						<
						li name = "about" > < a href = "#" > About < /a></li >
						<
						li name = "works" > < a href = "#" > Works < /a></li >
						<
						li name = "contact" > < a href = "#" > Contact < /a></li >
						<
						/ul> <
						/div> <
						/nav> <
						/div>   <
						div class = "section-wrap" >

						<
						section class = "page home active" >
						<
						div class = "vertical-align" >
						<
						div class = "wrap" >
						<
						h2 > Welcome to the Homepage < /h2> <
						p > Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quaerat ipsum quae fuga eaque error, commodi, excepturi.Numquam, sit magnam blanditiis corporis vitae at, asperiores!Consequuntur hic ab ipsum nulla quod. < /p> <
						/div> <
						/div> <
						/section>

						<
						section class = "page about" >
						<
						div class = "vertical-align" >
						<
						div class = "wrap" >
						<
						h2 > Learn more about us < /h2> <
						p > Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quaerat ipsum quae fuga eaque error, commodi, excepturi.Numquam, sit magnam blanditiis corporis vitae at, asperiores!Consequuntur hic ab ipsum nulla quod. < /p> <
						/div> <
						/div> <
						/section> <
						/div>
			</React.Fragment>
		)
	}
}

export default LandingPage;