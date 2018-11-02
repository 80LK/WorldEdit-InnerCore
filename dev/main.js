var WorldEdit = {
	pos1:{x:Infinity,y:Infinity,z:Infinity},
	pos2:{x:Infinity,y:Infinity,z:Infinity},
	
	sp1:{x:Infinity,y:Infinity,z:Infinity},
	sp2:{x:Infinity,y:Infinity,z:Infinity},
	
	undo:[],
	redo:[],
	
	getSizeArea:function(){
		var x = this.pos2.x - this.pos1.x +1;
		var y = this.pos2.y - this.pos1.y +1;
		var z = this.pos2.z - this.pos1.z +1;
		return Math.abs(x*y*z);
	},
	
	getValidPosition:function(){
		if(WorldEdit.pos1.x == Infinity || WorldEdit.pos1.y == Infinity || WorldEdit.pos1.z == Infinity || WorldEdit.pos2.x == Infinity || WorldEdit.pos2.y == Infinity || WorldEdit.pos2.z == Infinity)
			return false;
		
		return true;
	},
	
	selectPosition:function(p1,p2){
		if(p1!=null){
			WorldEdit.sp1 = p1;
		}
		if(p2!=null){
			WorldEdit.sp2 = p2;
		}
		
		if(WorldEdit.sp1.x > WorldEdit.sp2.x){
			WorldEdit.pos2.x = WorldEdit.sp1.x;
			WorldEdit.pos1.x = WorldEdit.sp2.x;
		}else{
			WorldEdit.pos2.x = WorldEdit.sp2.x;
			WorldEdit.pos1.x = WorldEdit.sp1.x;
		}
		
		if(WorldEdit.sp1.y > WorldEdit.sp2.y){
			WorldEdit.pos2.y = WorldEdit.sp1.y;
			WorldEdit.pos1.y = WorldEdit.sp2.y;
		}else{
			WorldEdit.pos2.y = WorldEdit.sp2.y;
			WorldEdit.pos1.y = WorldEdit.sp1.y;
		}
		
		if(WorldEdit.sp1.z > WorldEdit.sp2.z){
			WorldEdit.pos2.z = WorldEdit.sp1.z;
			WorldEdit.pos1.z = WorldEdit.sp2.z;
		}else{
			WorldEdit.pos2.z = WorldEdit.sp2.z;
			WorldEdit.pos1.z = WorldEdit.sp1.z;
		}	
	}
	
}

function getWand(){
	if(__config__.access("wand_stick")==true)
		return 280;//Палка
	else
		return 271;//Деревянный топорик
}

function getGetIdWand(){
	if(__config__.access("wand_stick")==true)
		return 288;//Перо
	else
		return 268;//Деревянный меч
}

var Commands = {
"//set":{
	name:"//set",
	description:"Установить во всей области <block>",
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message("Укажите команду в виде //set <id>[:data]");
			
		if(!WorldEdit.getValidPosition())
			return Game.message("Установите обе позиции");

		var block = args[0].split(":");
		var id = parseInt(block[0]);
		var data = block[1]?parseInt(block[1]):0;
		var undo = [];
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					undo.push([x,y,z,World.getBlock(x, y, z).id,World.getBlock(x, y, z).data]);
					World.setBlock(x, y, z, id, data);
				}	
			}
		}
		WorldEdit.undo.push(undo);
		
		var a = sizeArea = WorldEdit.getSizeArea();
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
	}
},
"//box":{
	name:"//box",
	description:"Установить коробку из <block> по указаным координатам",
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message("Укажите команду в виде //box <id>[:data]");
			
		if(!WorldEdit.getValidPosition())
			return Game.message("Установите обе позиции");
		
		var count = 0;
		var block = args[0].split(":");
		var id = parseInt(block[0]);
		var data = block[1]?parseInt(block[1]):0;
		var undo = [];
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					undo.push([x,y,z,World.getBlock(x, y, z).id,World.getBlock(x, y, z).data]);
					if(x == WorldEdit.pos1.x || x == WorldEdit.pos2.x || y == WorldEdit.pos1.y || y == WorldEdit.pos2.y || z == WorldEdit.pos1.z || z == WorldEdit.pos2.z){
						World.setBlock(x, y, z, id, data);
						count++;
					}
				}	
			}
		}
		WorldEdit.undo.push(undo);
		
		var a = sizeArea = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
	}
},
"//room":{
	name:"//room",
	description:"Установить коробку из <block> по указаным координатам",
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message("Укажите команду в виде //room <id>[:data]");
			
		if(!WorldEdit.getValidPosition())
			return Game.message("Установите обе позиции");
		
		var count = 0;
		var block = args[0].split(":");
		var id = parseInt(block[0]);
		var data = block[1]?parseInt(block[1]):0;
		var undo = [];
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					undo.push([x,y,z,World.getBlock(x, y, z).id,World.getBlock(x, y, z).data]);
					if(x == WorldEdit.pos1.x || x == WorldEdit.pos2.x || z == WorldEdit.pos1.z || z == WorldEdit.pos2.z){
						World.setBlock(x, y, z, id, data);
						count++;
					}
				}	
			}
		}
		WorldEdit.undo.push(undo);
		
		var a = sizeArea = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
	}
},
"//replace":{
	name:"//replace",
	description:"Заменить [from_block] на <to_block> в выбранной области",
	args:"[from_block] <to_block>",
	func:function(args){
		if(!args[0])
			return Game.message("Укажите команду в виде //replace [from_block] <to_block>");
			
		if(!WorldEdit.getValidPosition())
			return Game.message("Установите обе позиции");
		
		
		var count = 0;
		var undo = [];
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					undo.push([x,y,z,World.getBlock(x, y, z).id,World.getBlock(x, y, z).data]);
					if(!args[1]){
						var block = args[0].split(":");
						var id = parseInt(block[0]);
						var data = block[1]?parseInt(block[1]):0;
						if(World.getBlock(x, y, z).id!=0){
							World.setBlock(x, y, z, id, data);
							count++;
						}
					}else{
						var block = args[0].split(":");
						var id = parseInt(block[0]);
						var data = block[1]?parseInt(block[1]):-1;
						if(World.getBlock(x, y, z).id == id && (data == -1 || World.getBlock(x, y, z).data == data)){
							var block2 = args[1].split(":");
							var id2 = parseInt(block2[0]);
							var data2 = block2[1] ? parseInt(block2[1]) :0;
							World.setBlock(x, y, z, id2, data2);
							count++;
						}
						
					}
				}	
			}
		}
		WorldEdit.undo.push(undo);
		
		var a = sizeArea = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
		
	}
},
"//help":{
	name:"//help",
	description:"Список команд",
	args:"[page]",
	func:function(args){
		var page = args[0]?parseInt(args[0]):1;
		var _page = page - 1;
		var message = "===Помощь(Страница "+page+")===\n";
		var count = 0;
		for(var i in Commands){
			count++;
			if(count <= 6*_page && count > 6*page)continue;
			var cmd = Commands[i];
			message+= cmd.name+" ";
			if(cmd.args != null)
				message+= cmd.args+" ";
			message+= "- "+cmd.description+"\n";
		}
		message+="===Помощь(Страница "+page+")===";
		
		Game.message(message);
	}
},
"//?":{
	name:"//?",
	description:"Список команд",
	args:"[page]",
	func:function(args){
		Commands["//help"].func(args);
	}
},
"//r":{
	name:"//r",
	description:"Работа с регионом. Аналогично //region",
	args:"<type> [args]",
	func:function(args){
		switch(args[0]){
			case "help":
			case "?":
			case undefined:
				var list = [
					["help", "<page>", "Список команд для работы с регионом"],
					["up", "<count>", "Поднять выделенную територию на count блоков"],
					["down", "<count>", "Опустить выделенную територию на count блоков"],
					["pos1", "[<x> <y> <z>]", "Установить первую позицию"],
					["pos2", "[<x> <y> <z>]", "Установить вторую позицию"],
				];
				
				var page = args[0]?parseInt(args[0]):1;
				var _page = page - 1;
				var message = "===Помощь(Страница "+page+")===\n";
				var count = 0;
				for(var i in list){
					count++;
					if(count <= 6*_page && count > 6*page)continue;
					var cmd = list[i];
					message+= "//region "+cmd[0]+" ";
					if(cmd[1] != null)
						message+= cmd[1]+" ";
					message+= "- "+cmd[2]+"\n";
				}
				message+="===Помощь(Страница "+page+")===";
				
				Game.message(message);
			break;
			case "up":
				if(!args[1])
					return Game.message("Введите команду в виде //region up <count>");
				
					
				if(!WorldEdit.getValidPosition())
					return Game.message("Установите обе позиции");
				
				var up = parseInt(args[1]);
				if(isNaN(up))
					return Game.message("Count должен быть числом");
				
				WorldEdit.pos2.y += up;
				
				var a = sizeArea = up;
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea+=" блок";
					else if(a<=4 && a > 1)
						sizeArea+=" блока";
					else
						sizeArea+=" блоков";
				}else
					sizeArea+=" блоков";
				
				Game.message("Регион поднят на "+sizeArea);
				
			break;
			case "down":
				if(!args[1])
					return Game.message("Введите команду в виде //region down <count>");
				
				if(!WorldEdit.getValidPosition())
					return Game.message("Установите обе позиции");
				
				var up = parseInt(args[1]);
				if(isNaN(up))
					return Game.message("Count должен быть числом");
				
				WorldEdit.pos1.y -= up;
				
				var a = sizeArea = up;
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea+=" блок";
					else if(a<=4 && a > 1)
						sizeArea+=" блока";
					else
						sizeArea+=" блоков";
				}else
					sizeArea+=" блоков";
				
				Game.message("Регион опущен на "+sizeArea);
				
			break;
			case "pos1":
			case "pos2":
				var _args = args;
				_args.shift();
				Commands["//"+args[0]].func(_args);
			break;
			default:
				Game.message("Не известная команда, воспользуйтесь помощью //region help");
			break;
		}
	}
},
"//reg":{
	name:"//reg",
	description:"Работа с регионом. Аналогично //region",
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//region":{
	name:"//region",
	description:"Работа с регионом.",
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//pos1":{
	name:"//pos1",
	description:"Установить первую позицию. Аналогично //region pos1",
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			WorldEdit.selectPosition(coords,null);
			var sizeArea = "1 блок";
			if(WorldEdit.getValidPosition()){
				var a = sizeArea = WorldEdit.getSizeArea();
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea+=" блок";
					else if(a<=4 && a > 1)
						sizeArea+=" блока";
					else
						sizeArea+=" блоков";
				}else
					sizeArea+=" блоков";
			}
			Game.message("Первая позиция установлена в:"+coords.x+","+coords.y+","+coords.z);
			Game.message("Выбранная область составляет "+sizeArea);
		}else{
			if(!args[1] || !args[2]){
				return Game.message("Введите команду в виде //region pos1 <x> <y> <z>");
			}else{
				WorldEdit.selectPosition({x:args[0],y:args[1],z:args[2]},null);
				var sizeArea = "1 блок";
				if(WorldEdit.getValidPosition()){
					var a = sizeArea = WorldEdit.getSizeArea();
					a = a%100;
					if(a<10 || a > 20){
						a = a%10;
						if(a==1)
							sizeArea+=" блок";
						else if(a<=4 && a > 1)
							sizeArea+=" блока";
						else
							sizeArea+=" блоков";
					}else
						sizeArea+=" блоков";
				}
				Game.message("Первая позиция установлена в:"+args[0]+","+args[1]+","+args[2]);
				Game.message("Выбранная область составляет "+sizeArea);
			}
		}
	}
},
"//pos2":{
	name:"//pos2",
	description:"Установить вторую позицию. Аналогично //region pos2",
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			WorldEdit.selectPosition(null, coords);
			var sizeArea = "1 блок";
			if(WorldEdit.getValidPosition()){
				var a = sizeArea = WorldEdit.getSizeArea();
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea+=" блок";
					else if(a<=4 && a > 1)
						sizeArea+=" блока";
					else
						sizeArea+=" блоков";
				}else
					sizeArea+=" блоков";
			}
			Game.message("Вторая позиция установлена в:"+coords.x+","+coords.y+","+coords.z);
			Game.message("Выбранная область составляет "+sizeArea);
		}else{
			if(!args[1] || !args[2]){
				return Game.message("Введите команду в виде //region pos1 <x> <y> <z>");
			}else{
				WorldEdit.selectPosition(null,{x:args[0],y:args[1],z:args[2]});
				var sizeArea = "1 блок";
				if(WorldEdit.getValidPosition()){
					var a = sizeArea = WorldEdit.getSizeArea();
					a = a%100;
					if(a<10 || a > 20){
						a = a%10;
						if(a==1)
							sizeArea+=" блок";
						else if(a<=4 && a > 1)
							sizeArea+=" блока";
						else
							sizeArea+=" блоков";
					}else
						sizeArea+=" блоков";
				}
				Game.message("Вторая позиция установлена в:"+args[0]+","+args[1]+","+args[2]);
				Game.message("Выбранная область составляет "+sizeArea);
			}
		}
	}
},
"//undo":{
	name:"//undo",
	description:"Отменить последнее действие",
	args:"",
	func:function(){
		var undo = WorldEdit.undo[WorldEdit.undo.length];
		WorldEdit.redo = [];
		var count = 0;
		for(var i = 0; i < undo.length; i++){
			WorldEdit.redo.push([undo[i][0], undo[i][1], undo[i][2],World.getBlock(undo[i][0], undo[i][1], undo[i][2]).id,World.getBlock(undo[i][0], undo[i][1], undo[i][2]).data]);
			count++;
			World.setBlock(undo[i][0], undo[i][1], undo[i][2], undo[i][3], undo[i][4]);
		}
		
		var a = sizeArea = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
	},
},
"//redo":{
	name:"//redo",
	description:"Отменить последную отмену",
	args:"",
	func:function(){
		var redo = WorldEdit.redo;
		var count = 0;
		for(var i = 0; i < redo.length; i++){
			count++;
			World.setBlock(redo[i][0], redo[i][1], redo[i][2], redo[i][3], redo[i][4]);
		}
		
		var a = sizeArea = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea+=" блок";
			else if(a<=4 && a > 1)
				sizeArea+=" блока";
			else
				sizeArea+=" блоков";
		}else
			sizeArea+=" блоков";
		Game.message(sizeArea+" изменено.");
	},
}
"//wand":{
	name:"//wand",
	description:"Выдать топорик",
	args:"",
	func:function(){
		Player.addItemInventory(getWand(), 1);
	},
}

};

Callback.addCallback("NativeCommand", function(command){
	var cmd = command.split(" ");
	if(Commands.hasOwnProperty(cmd[0])){
		Commands[cmd[0]].func(typeof(cmd[1]) != "undefined" ? command.split(cmd[0] + " ")[1].split(" ") : []);
		Game.prevent();
	}
});

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id == getGetIdWand()){
		Game.message("ID блока "+block.id+":"+block.data);
	}
	if(item.id == getWand()){
		WorldEdit.selectPosition(coords,null);
		var sizeArea = "1 блок";
		if(WorldEdit.getValidPosition()){
			var a = sizeArea = WorldEdit.getSizeArea();
			a = a%100;
			if(a<10 || a > 20){
				a = a%10;
				if(a==1)
					sizeArea+=" блок";
				else if(a<=4 && a > 1)
					sizeArea+=" блока";
				else
					sizeArea+=" блоков";
			}else
				sizeArea+=" блоков";
		}
		Game.message("Первая позиция установлена в:"+coords.x+","+coords.y+","+coords.z);
		Game.message("Выбранная область составляет "+sizeArea);
	}
});

Callback.addCallback("DestroyBlockStart", function (coords, block, player) {
	if(Player.getCarriedItem().id == getWand()){
		WorldEdit.selectPosition(null,coords)
		var sizeArea = "1 блок";
		if(WorldEdit.getValidPosition()){
			var a = sizeArea = WorldEdit.getSizeArea();
			a = a%100;
			if(a<10 || a > 20){
				a = a%10;
				if(a==1)
					sizeArea+=" блок";
				else if(a<=4 && a > 1)
					sizeArea+=" блока";
				else
					sizeArea+=" блоков";
			}else
				sizeArea+=" блоков";
		}
		Game.message("Вторая позиция установлена в:"+coords.x+","+coords.y+","+coords.z);
		Game.message("Выбранная область составляет "+sizeArea);
		Game.prevent();
	}
});