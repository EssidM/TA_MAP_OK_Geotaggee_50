(function() {

    var InitStructure = can.Control({

        defaults : {
            template : 'views/initStructureView.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();

            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new InitStructure('body');
    });

})()