$( document ).ready(function(element) {        
            $(".card-title").addClass("animate__animated  animate__flip");
            $(".card-title").delay(1000).queue(function() {  // Wait for 1 second.
                $(this).removeClass("animate__animated  animate__flip").dequeue();
            });        

            $(".card-title").hover( function() {
           
                $(".card-title").addClass("animate__animated  animate__hinge");
                },function () {
                    $(this).removeClass("animate__animated  animate__hinge");
                });        
 });
