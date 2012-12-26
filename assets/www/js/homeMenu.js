/*  script qui définit le control du bloc homeMenu et insère son template EJS dans le div content */
(function() {

    var HomeMenu = can.Control({

        defaults : {
            template : 'views/homeMenuView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();
            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new HomeMenu('#content');
    });

})()