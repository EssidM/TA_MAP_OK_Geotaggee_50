/*  script qui définit le control du bloc headerAction et insère son template EJS dans le div header */
(function() {

    var headerAction = can.Control({

        defaults : {
            template : 'views/headerActionView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();

            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new headerAction('#header');
    });

})()