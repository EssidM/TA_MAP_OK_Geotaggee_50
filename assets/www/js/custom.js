$(document).ready(function() {
	
   // $("#imageid1").rotateRight(45);
    //$('#menu1').style.webkitTransform = 'rotate(15deg)';
    // $('#menu1').animate({rotate: '30deg', scale: '1.25'}, 10000);
    //$("#menu1").css("display", "none");
    //$("#menu1").fadeIn(1000);
    
	
	$("#menu2").css("display", "none");
    $("#menu2").fadeIn(2000);
    
    $("#menu3").css("display", "none");
    $("#menu3").fadeIn(3000);
    
   
    $("#menu4").css("display", "none");
    $("#menu4").fadeIn(4000);
    
    $("#menu5").css("display", "none");
    $("#menu5").fadeIn(5000);
    
    $("#menu6").css("display", "none");
    $("#menu6").fadeIn(6000);
    
    
    
    $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);      
    });
        
  
	function redirectPage() {
		window.location = linkLocation;
	}
	
	
});

