/*  script qui définit le control du bloc Menu et insère son template EJS dans le div menu */
(function() {

    var Menu = can.Control({

        defaults : {
            template : 'views/menuView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();

            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new Menu('#menu');
    });

})()