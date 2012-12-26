/*  script qui définit le control du bloc header et insère son template EJS dans le div header */
(function() {

    var Header = can.Control({

        defaults : {
            template : 'views/headerView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();

            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new Header('#header');
    });

})()