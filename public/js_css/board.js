var Board={

		initElement: function() {
			    dialog = $( "#dialog-form" ).dialog({
			      autoOpen: false,
			      height: 500,
			      width: 350,
			      modal: true,
			    });

			$("#btnNewProy").on( "click", function() {canvasActive=null; Board.showFormProyect(); });
			$("#btnEditProy").on( "click", function() { Board.showFormProyect(); });

			// localStorage.canvaspostit="";
			// localStorage.dataGeneral="";

			if( JSON.stringify(Board.read_localStorageGeneral())===JSON.stringify(Board.sizeScreen()) ){
				canvaspostit=Board.read_localStorage()
			}else{
				console.log("tama;o diferent");
				canvaspostit=Board.recalAllProyect()
				Board.update_localStorageGeneral(Board.sizeScreen())
				Board.update_localStorage(canvaspostit)
			}
	    Board.createListMenu();
	    Board.createListCanva();
	    Board.createPanelColors();
			Board.draw();
			Board.loadCanvas()
		},

			sizeScreen:function(){
				data={ width: $(window).width(), height: $(window).height() }
				return data
			},

			recalAllProyect:function(){
				proyects=Board.read_localStorage()
				sizeS=Board.read_localStorageGeneral()
				$.each(proyects, function(i,proyect){
					proyects[i].postits=Board.recalPositionPosits(sizeS,proyect.postits)
				})
				return proyects
			},

			recalPositionPosits:function(sizeS,dataProyect){
				sizeA=Board.sizeScreen();
				factorX = sizeA.width / sizeS.width
				factorY = sizeA.height / sizeS.height
				$.each(dataProyect, function(i,data) {
						dataProyect[i].px=(parseInt(data.px) * factorX).toFixed(0)+"px"
						dataProyect[i].py=(parseInt(data.py) * factorY).toFixed(0)+"px"
				})
				return dataProyect
			},

		draw:function(){
			$("#tablero").append('<a href="#" id="btnOpenMenu"><img src="iicons/menu.png"></a>')
			$("#closeMenu").on("click", function(){	$("#menu").css({'margin-left': "-210px"}); $("#btnOpenMenu").show({'display': "block"})});
			$("#btnOpenMenu").on("click", function(){ $("#menu").css({'margin-left': "0px"}); $("#btnOpenMenu").hide(1000)});

			$("#tablero").append('<a href="#" id="btnNewPostit"><img src="iicons/postits.png"></a>')
			$("#btnNewPostit").on("click", PostIt.new);
		},

		read_localStorage:function(){
		    localStorage.canvaspostit = localStorage.canvaspostit || JSON.stringify(canvaspostitIni);
		    return JSON.parse(localStorage.canvaspostit);
		},

		update_localStorage:function(){
			console.log("localStorage",canvaspostit);
			localStorage.canvaspostit = JSON.stringify(canvaspostit);
		},

		read_localStorageGeneral:function(){
				localStorage.general = localStorage.general || JSON.stringify(dataGeneral);
				return JSON.parse(localStorage.general);
		},

		update_localStorageGeneral:function(data){
			localStorage.general = JSON.stringify(data);
		},

		confirmFormProyect:function(){
			if(canvasActive){
				Board.updateProyect();
			}else{
				Board.addProyect();
			}
		},

		addProyect:function(){
			if($('#newProy').val()!=""){
				var h = new Date();
				var hoy = h.getDate()+"-"+(h.getMonth()+1)+"-"+h.getFullYear();

				obj={
					"title": $('#newProy').val(),
				  	"canvas":$('#listcanvas').val(),
		  			"date" : hoy,
					"postits":[]
				};
				canvaspostit.push(obj);
				canvasActive=canvaspostit.length-1;
				dialog.dialog( "close" );
				Board.createListMenu();
				Board.update_localStorage();
				Board.loadCanvas()
			}else{
				$("#newProy").addClass("inputNotData");
			}

		},
		showConfirmDel:function(){
			$('#confirmDel').css({"display":"block"})
		},

		delProyect:function(){
			dat=canvaspostit;
		    dat.splice(canvasActive, 1);

		    dialog.dialog( "close" );
		    Board.createListMenu();
			Board.update_localStorage();

			Board.loadCanvas()
		},

		updateProyect:function(){
			dat=canvaspostit;
			obj={
				"title": $('#newProy').val(),
			  	"canvas":$('#listcanvas').val(),
	  			"date" : canvaspostit[canvasActive].date,
				"postits":canvaspostit[canvasActive].postits
			};
	    dat.splice(canvasActive, 1,obj);
	    dialog.dialog( "close" );
	    Board.createListMenu();
			Board.update_localStorage();
			Board.loadCanvas(canvasActive)
		},

		showFormProyect:function(){
			$('#confirmDel').css({"display":"none"})
			$("#newProy").removeClass("inputNotData");
			dialog.dialog( "open" );
			if(canvasActive){
				titl=canvaspostit[canvasActive].title;
				vcanva=canvaspostit[canvasActive].canvas;
				$('#btnDelProy').css({"display":"block"})
				$('#btnDownProy').css({"display":"block"})
			}else{
				$('#btnDelProy').css({"display":"none"})
				$('#btnDownProy').css({"display":"none"})
				titl="";
				vcanva="vacio.png"
			}
			$("#newProy").val(titl);
			$("#listcanvas").val(vcanva);
			$("#imgPre").attr("src","canvas/"+vcanva)
			dialog.dialog( "open" );
		},

		createListMenu:function(){
			data=canvaspostit;
			if (data.length>1){
				$('#btnEditProy').css({"display":"block"})
				$("#listmenu").html("");
				var ldata="";
				for(var d=(data.length-1); d>0 ; d--) {
				    ldata+='<li><a href="#" onclick="Board.loadCanvas('+d+')">'+data[d].title+'</a></li>'
				}
				$("#listmenu").append(ldata);
			}
		},

		createListCanva:function(){
			var ldata="";
			for(var d in canvas) {
			    ldata+='<option value="'+canvas[d]+'">'+d+'</option>'
			}
			$("#listcanvas").append(ldata);
			$("#listcanvas").on("change", function(){ $("#imgPre").attr("src","canvas/"+$("#listcanvas").val()) });
		},

		createPanelColors:function(){
			var div = $("<div/>",{ id : "pcolors"});
			var ul = $("<ul/>",{ id : "colors" });
			for(var d in listcolors) {
					li = $("<li/>"),
					a = $("<a/>",{
					  href: "#",
					  style: 'background-color:'+listcolors[d],
					  onclick:"PostIt.changeColor(event,'"+d+"')"
					});
					a.appendTo(li)
					li.appendTo(ul);
			}
			ul.appendTo(div);
			$pcolors=div;
		},

		loadCanvas:function(id){
			id = (id>=0)? id : (canvaspostit.length-1)
			$("#tablero").html("");
			Board.draw();
			var lastid=0;
			canvasActive=id;
			d=canvaspostit[id];
			$("#tablero").css({'background': "url(canvas/"+d.canvas+") 100% 100%"});
				for(var p in d.postits) {
						PostIt.draw(d.postits[p])
						lastid=d.postits[p].id;
				}
			postNumber = lastid+1;
			$("#listmenu>li>a.active").removeClass("active");
			$element=$("#listmenu>li:nth-child("+(canvaspostit.length-canvasActive)+")>a");
			$element.addClass("active");
		}
};
