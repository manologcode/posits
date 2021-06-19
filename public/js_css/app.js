document.addEventListener("DOMContentLoaded", function(event) {
	Board.initElement();
});

var postNumber = 0;

var $pcolors;

var listcolors = {"amarillo":"#FEF1B5","azul":"#b5d6fe","verde":"#cefeb5","naranja":"#ffc36b","rosa":"#fab5fe"};

var canvas = {"Vacio":"vacio.png","kanban":"kanban.png","kanban 1":"kanban1.png", "dafo":"dafo.png", "empatia":"empatia.png","canvas":"canvas.png"};

var canvasActive=null;

var canvaspostitIni=[
	  { "title":"init",
	  	"canvas":"ini.png",
	  	"date" : "01-02-2017",
			"postits":[
							{"id": 0, "px":300, "py":300, "tex":"post-it Demo", "col":"#b5d6fe"},
					  ]
		}
	];
var dataGeneral={}
