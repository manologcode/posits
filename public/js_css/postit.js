var PostIt={

		new: function(){
			px=$(window).width()-300;
			obj={"id": postNumber , "px":px , "py":100, "tex" : "", "col":"#FEF1B5" }
			this.obj=obj;
			PostIt.draw(obj);
			PostIt.addData(obj);
			postNumber+=1;
		},

		draw: function(obj){

		    $("#tablero").append('<div class="post-it" id="'+obj.id+'" style="background-color: '+obj.col+'"><div class="header"><a href="#" class="opti">·</a><a href="#" class="close">X</a></div><div contenteditable="true" class="content">'+obj.tex+'</div></div>');

		    $("#"+obj.id).css({'top': obj.py, 'left': obj.px});

		    $(".post-it").draggable({handle: ".header",stop: function() {
			        	PostIt.changeData(PostIt.propierties(this.id).dindex,PostIt.propierties(this.id).dscreen);
			    }, containment: "window" });

		    $("a.close").on("click", PostIt.delete);
		    $("a.opti").on("click", PostIt.showColor);

			$("#"+obj.id).on("focusout",function(){PostIt.changeData(PostIt.propierties(this.id).dindex,PostIt.propierties(this.id).dscreen);});

		},

		delete: function(e){
		    var $parent = this.parentElement.parentElement;

			PostIt.deleteData($parent.id);
			//falta buscar el index del id
		    $parent.remove();
		    index=PostIt._findObjecData($parent.id);
		    PostIt.deleteData(index);

		},

		changeColor: function(e,c){
		    var $pc = e.target.parentElement.parentElement.parentElement;
		    $pit=$pc.parentElement;
			$($pit).css({'background-color':listcolors[c]});
			//falta buscar el index del id
		    $pc.remove();

		    PostIt.changeData(PostIt.propierties($pit.id).dindex,PostIt.propierties($pit.id).dscreen);

		},

		showColor: function(e){
			var $parent = this.parentElement.parentElement;
			$($parent).prepend($pcolors);
		},

		propierties:function(id){
			obj={}
				var e=document.getElementById(id);
				obj.dscreen={
					"id": id,
					"px": e.style.left,
					"py": e.style.top,
					"tex": e.querySelector(".content").innerHTML,
					"col": e.style.backgroundColor,
				}

			obj.dindex=PostIt._findObjecData(id);
			return obj;
		},

		addData:function(data){
			dat=canvaspostit[canvasActive].postits;
		    dat.push(data);
		    Board.update_localStorage();
		},

		changeData:function(index,data){
			dat=canvaspostit[canvasActive].postits;
		    dat.splice(index, 1, data);
		    Board.update_localStorage();

		},

		deleteData:function(index){

			dat=canvaspostit[canvasActive].postits;
		    dat.splice(index, 1);
		    Board.update_localStorage();
		},

		_findObjecData:function(value){
			dat=canvaspostit[canvasActive].postits;
			index=dat.findIndex(function(x){ return x.id==value});
			return index;
		}

};
