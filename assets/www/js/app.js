/*  script qui contient les definitions  de tous les blocs et leurs controls dans ce meme fichier...
 * 
 *  c'est pas pratique pour la maintenance et pour la 
 *  */
(function(){
	
    can.route( 'filter/:view' );
    can.route('', {view: 'views' });

    
//    Router = can.Control({
//        "filter/views route" : function(data){
//          console.log( "showing recipe", data.id );
//          alert('ok');
//
//        }
//      });
    
    var Header = can.Control({

        defaults:{
            template:'views/headerView.ejs',
            butSelector:'.but',
            bodySelector:'.body'
        }

    },{
        init:function(element, options){

            element.empty();

            element.html( can.view(this.options.template))
        },

        '{butSelector} click' : function (){
            this.element.find(this.options.bodySelector).toggle()
        }

    })
    
      var Map = can.Control({

        defaults:{
            template:'views/mapView.ejs',
          
        }

    },
    {
        init:function(element, options){
        alert("init Mapcontrol");
       
            element.empty();

            element.html( can.view(this.options.template));
            initMap();
        },

        

     

    })

var Region = can.Control({

        defaults:{
            template:'views/regionView.ejs',
            butSelector:'.but',
            bodySelector:'.body'
        }

    },{
        init:function(element, options){

            element.empty();

            element.html( can.view(this.options.template))
        },

        '{butSelector} click' : function (){
            this.element.find(this.options.bodySelector).toggle()
        }
        ,

        '.menu click' : function (){
            can.route.attr('view', 'homeMenu');
            can.route.url({ view: "views",  route: "filter/:view"}) 
                
            //can.route.link("Edit",{ view: "views",  })  ; 
            new HomeMenu('body');
         //  $("#btn").attr("href",can.route.url({view:"homeMenu"},true))
        },
//        '.neplus click' : function (){
//            alert('neplus');
//            
//            new Map('body');
//           },
        
       
    })
    
    var Menu = can.Control({

        defaults:{
            template:'views/menuView.ejs',
            butSelector:'.but',
            bodySelector:'.body'
        }

    },{
        init:function(element, options){

            element.empty();

            element.html( can.view(this.options.template))
        },

       /* '.btn_debutez click' : function(el){  
                window.open("homeMenu.html");
            
            
        } */ 
        

    })

   
       var HomeMenu = can.Control({

        defaults:{
            template:'views/homeMenuView.ejs',
            butSelector:'.but',
            bodySelector:'.body'
        }

    },{
        init:function(element, options){

            element.empty();

            element.html( can.view(this.options.template))
        },

        '{butSelector} click' : function (){
            this.element.find(this.options.bodySelector).toggle()
        }

    })

   
  
	
	$(document).ready(function(){
		/* $.when(Category.findAll(), Contact.findAll()).then(function(categoryResponse, contactResponse){
			var categories = categoryResponse[0], 
				contacts = contactResponse[0];
	
		});
		*/
	
		//   new Region('body');
	   // new Map('body');
	});
})()