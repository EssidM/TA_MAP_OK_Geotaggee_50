
/*  script qui définit le control du bloc region et insère son template EJS dans le div content */

(function() {

    var Region = can.Control({

        defaults : {
            template : 'views/regionView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();

            element.html(can.view(this.options.template))
        },
        '.menu click' : function (){
           
              can.route.attr('view', 'homeMenu');
            
              new HomeMenu('body');
        },
    })
    $(document).ready(function() {
        new Region('#content');
    });

})()
