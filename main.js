/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 2
*/



// file: translate.js

//general
Translation.addTranslation("Set both positions.",{
	ru:"Установите обе позиции.",
	en:"Set both positions.",
});
Translation.addTranslation("Don't valid command.",{
	ru:"Недействительная команда..",
	en:"Don't valid command.",
});
Translation.addTranslation("%count% block changed.",{
	ru:"%count% блок изменено.",
	en:"%count% block changed.",
});
Translation.addTranslation("%count% blocks changed.",{
	ru:"%count% блоков изменено.",
	en:"%count% blocks changed.",
});
Translation.addTranslation("%count% block.",{
	ru:"%count% блок.",
	en:"%count% block.",
});
Translation.addTranslation("%count% blocks.",{
	ru:"%count% блоков.",
	en:"%count% blocks.",
});
Translation.addTranslation("Block ID %id%:%data%.",{
	ru:"ID блока %id%:%data%.",
	en:"Block ID %id%:%data%.",
});
//set
Translation.addTranslation("Set all blocks inside the selection region to a specified block.", {
	ru:"Установите все блоки внутри выбранной области в указанный блок.",
	en:"Set all blocks inside the selection region to a specified block.",
});
//box
Translation.addTranslation("Build walls, floor, and ceiling.", {
	ru:"Построить стены, пол и потолок",
	en:"Build walls, floor, and ceiling.",
});
//set wool
Translation.addTranslation("Build the walls of the region (not including ceiling and floor).", {
	ru:"Построить стены региона (не включая потолок и пол).",
	en:"Build the walls of the region (not including ceiling and floor).",
});
//replace
Translation.addTranslation("Replace all blocks of the specified block(s) with another block inside the region.", {
	ru:"Замените все выбранные блоки другим блоком внутри региона.",
	en:"Replace all blocks of the specified block(s) with another block inside the region.",
});
//help
Translation.addTranslation("Help.", {
	ru:"Помощь.",
	en:"Help.",
});
Translation.addTranslation("===Help [Page %page%]===\n%cmd%===Help [Page %page%]===", {
	ru:"===Помощь(Страница %page%)===\n%cmd%===Помощь(Страница %page%)===",
	en:"===Help [Page %page%]===\n%cmd%===Help [Page %page%]===",
});
//pos
Translation.addTranslation("Set selection position #1 to the block above the one that you are standing on.", {
	ru:"Установить позицию 1 на блок выше того, на котором вы стоите.",
	en:"Set selection position #1 to the block above the one that you are standing on.",
});
Translation.addTranslation("Set selection position #2 to the block above the one that you are standing on.", {
	ru:"Установить позицию 2 на блок выше того, на котором вы стоите.",
	en:"Set selection position #2 to the block above the one that you are standing on.",
});
Translation.addTranslation("The first position is set to %x%,%y%,%z%.",{
	ru:"Первая позиция установлена в %x%,%y%,%z%.",
	en:"The first position is set to %x%,%y%,%z%.",
});
Translation.addTranslation("The second position is set to %x%,%y%,%z%.",{
	ru:"Вторая позиция установлена в %x%,%y%,%z%.",
	en:"The second position is set to %x%,%y%,%z%.",
});
Translation.addTranslation("The selected region is %sizeArea%",{
	ru:"Выбранный регион составляет %sizeArea%",
	en:"The selected region is %sizeArea%",
});
//undo
Translation.addTranslation("Undo your last action.", {
	ru:"Отменить последние действие.",
	en:"Undo your last action.",
});
Translation.addTranslation("Redo your last (undone) action. This command replays back history and does not repeat the command.", {
	ru:"Повторите последнее(отмененное) действие.",
	en:"Redo your last (undone) action. This command replays back history and does not repeat the command.",
});
//wand
Translation.addTranslation("Gives you the \"EditWand\" (by default, a wooden axe).", {
	ru:"Дает вам \"EditWand\" (по умолчанию - деревянный топор).",
	en:"Gives you the \"EditWand\" (by default, a wooden axe).",
});
//region
Translation.addTranslation("Work with the region.", {
	ru:"Работа с регионом.",
	en:"Work with the region.",
});
Translation.addTranslation("Commands for working with the region.", {
	ru:"Команды для работы с регионом.",
	en:"Commands for working with the region.",
});
Translation.addTranslation("Raise the selected region by the specified number of blocks.", {
	ru:"Поднять выделенный регион на указанное количество блоков.",
	en:"Raise the selected region by the specified number of blocks.",
});
Translation.addTranslation("Lower the selected region by the specified number of blocks.", {
	ru:"Опустить выделенный регион на указанное количество блоков.",
	en:"Lower the selected region by the specified number of blocks.",
});
Translation.addTranslation("The region is raised to %area%", {
	ru:"Регион поднят на %area%",
	en:"The region is raised to %area%",
});
Translation.addTranslation("The region is omitted in %area%", {
	ru:"Регион опущен на %area%",
	en:"The region is omitted in %area%",
});




// file: main.js

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
	description:Translation.translate("Set all blocks inside the selection region to a specified block."),
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message(Translation.translate("Don't valid command."));
			
		if(!WorldEdit.getValidPosition())
			return Game.message(Translation.translate("Set both positions."));

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
		
		var a = WorldEdit.getSizeArea();
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
	}
},
"//box":{
	name:"//box",
	description:Translation.translate("Build walls, floor, and ceiling."),
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message(Translation.translate("Don't valid command."));
			
		if(!WorldEdit.getValidPosition())
			return Game.message(Translation.translate("Set both positions."));
		
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
		
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
	}
},
"//wall":{
	name:"//wall",
	description:Translation.translate("Build the walls of the region (not including ceiling and floor)."),
	args:"<block>",
	func:function(args){
		if(!args[0])
			return Game.message(Translation.translate("Don't valid command."));
			
		if(!WorldEdit.getValidPosition())
			return Game.message(Translation.translate("Set both positions."));
		
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
		
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
	}
},
"//replace":{
	name:"//replace",
	description:Translation.translate("Replace all blocks of the specified block(s) with another block inside the region."),
	args:"[from_block] <to_block>",
	func:function(args){
		if(!args[0])
			return Game.message(Translation.translate("Don't valid command."));
			
		if(!WorldEdit.getValidPosition())
			return Game.message(Translation.translate("Set both positions."));
		
		
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
		
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
		
	}
},
"//help":{
	name:"//help",
	description:Translation.translate("Help."),
	args:"[page]",
	func:function(args){
		var page = args[0]?parseInt(args[0]):1;
		var _page = page - 1;
		var message = "";
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
		
		Game.message(Translation.translate("===Help [Page %page%]===\n%cmd%===Help [Page %page%]===").replace(/(%page)/g, page).replace("%cmd%", message));
	}
},
"//?":{
	name:"//?",
	description:Translation.translate("Help."),
	args:"[page]",
	func:function(args){
		Commands["//help"].func(args);
	}
},
"//r":{
	name:"//r",
	description:Translation.translate("Work with the region."),
	args:"<type> [args]",
	func:function(args){
		switch(args[0]){
			case "help":
			case "?":
			case undefined:
				var list = [
					["help", "<page>", Translation.translate("Commands for working with the region")],
					["up", "<count>", Translation.translate("Raise the selected region by the specified number of blocks")],
					["down", "<count>", Translation.translate("Lower the selected region by the specified number of blocks")],
					["pos1", "[<x> <y> <z>]", Commands["//pos1"].description],
					["pos2", "[<x> <y> <z>]", Commands["//pos2"].description],
				];
				
				var page = args[0]?parseInt(args[0]):1;
				var _page = page - 1;
				var message = "";
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
				
				Game.message(Translation.translate("===Help [Page %page%]===\n%cmd%===Help [Page %page%]===").replace(/(%page)/g, page).replace("%cmd%", message));
			break;
			case "up":
				if(!args[1])
					return Game.message(Translation.translate("Don't valid command."));
					
				if(!WorldEdit.getValidPosition())
					return Game.message(Translation.translate("Set both positions."));
				
				var up = parseInt(args[1]);
				if(isNaN(up))
					return Game.message(Translation.translate("Don't valid command."));
				
				WorldEdit.pos2.y += up;
				
				var a = up;
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea = Translation.translate("%count% block.").replace("%count%", a);
					else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				}else
					sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				
				Game.message(Translation.translate("The region is raised to %area%").replace("%area%",sizeArea));
				
			break;
			case "down":
				if(!args[1])
					return Game.message(Translation.translate("Don't valid command."));
				
				if(!WorldEdit.getValidPosition())
					return Game.message(Translation.translate("Set both positions."));
				
				var up = parseInt(args[1]);
				if(isNaN(up))
					return Game.message(Translation.translate("Don't valid command."));
				
				WorldEdit.pos1.y -= up;
				
				var a = up;
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea = Translation.translate("%count% block.").replace("%count%", a);
					else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				}else
					sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				
				Game.message(Translation.translate("The region is omitted in %area%").replace("%area%",sizeArea));
				
				
			break;
			case "pos1":
			case "pos2":
				var _args = args;
				_args.shift();
				Commands["//"+args[0]].func(_args);
			break;
			default:
				return Game.message(Translation.translate("Don't valid command."));
			break;
		}
	}
},
"//reg":{
	name:"//reg",
	description:Translation.translate("Work with the region."),
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//region":{
	name:"//region",
	description:Translation.translate("Work with the region."),
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//pos1":{
	name:"//pos1",
	description:Translation.translate("Set selection position #1 to the block above the one that you are standing on."),
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			WorldEdit.selectPosition(coords,null);
			var sizeArea = Translation.translate("%count% block.").replace("%count%", 1);
			if(WorldEdit.getValidPosition()){
				var a = WorldEdit.getSizeArea();
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea = Translation.translate("%count% block.").replace("%count%", a);
					else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				}else
					sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				
			}
			Game.message(Translation.translate("The first position is set to %x%,%y%,%z%.").replace("%x%",coords.x).replace("%y%",coords.y).replace("%z%",coords.z));
			Game.message("The selected region is %sizeArea%".replace("%sizeArea%", sizeArea));
		}else{
			if(!args[1] || !args[2]){
				return Game.message(Translation.translate("Don't valid command."));
			}else{
				WorldEdit.selectPosition({x:args[0],y:args[1],z:args[2]},null);
				var sizeArea = Translation.translate("%count% block.").replace("%count%", 1);
				if(WorldEdit.getValidPosition()){
					var a = WorldEdit.getSizeArea();
					a = a%100;
					if(a<10 || a > 20){
						a = a%10;
						if(a==1)
							sizeArea = Translation.translate("%count% block.").replace("%count%", a);
						else
							sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
					}else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
					
				}
				Game.message(Translation.translate("The first position is set to %x%,%y%,%z%.").replace("%x%",args[0]).replace("%y%",args[1]).replace("%z%",args[2]));
				Game.message("The selected region is %sizeArea%".replace("%sizeArea%", sizeArea));
			}
		}
	}
},
"//pos2":{
	name:"//pos2",
	description:Translation.translate("Set selection position #2 to the block above the one that you are standing on."),
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			WorldEdit.selectPosition(null, coords);
			var sizeArea = Translation.translate("%count% block.").replace("%count%", 1);
			if(WorldEdit.getValidPosition()){
				var a = WorldEdit.getSizeArea();
				a = a%100;
				if(a<10 || a > 20){
					a = a%10;
					if(a==1)
						sizeArea = Translation.translate("%count% block.").replace("%count%", a);
					else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				}else
					sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
				
			}
			Game.message(Translation.translate("The second position is set to %x%,%y%,%z%.").replace("%x%",coords.x).replace("%y%",coords.y).replace("%z%",coords.z));
			Game.message("The selected region is %sizeArea%".replace("%sizeArea%", sizeArea));
		}else{
			if(!args[1] || !args[2]){
				return Game.message(Translation.translate("Don't valid command."));
			}else{
				WorldEdit.selectPosition(null,{x:args[0],y:args[1],z:args[2]});
				var sizeArea = Translation.translate("%count% block.").replace("%count%", 1);
				if(WorldEdit.getValidPosition()){
					var a = WorldEdit.getSizeArea();
					a = a%100;
					if(a<10 || a > 20){
						a = a%10;
						if(a==1)
							sizeArea = Translation.translate("%count% block.").replace("%count%", a);
						else
							sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
					}else
						sizeArea = Translation.translate("%count% blocks.").replace("%count%", a);
					
				}
				Game.message(Translation.translate("The second position is set to %x%,%y%,%z%.").replace("%x%",args[0]).replace("%y%",args[1]).replace("%z%",args[2]));
				Game.message("The selected region is %sizeArea%".replace("%sizeArea%", sizeArea));
			}
		}
	}
},
"//undo":{
	name:"//undo",
	description:Translation.translate("Undo your last action."),
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
		
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
	},
},
"//redo":{
	name:"//redo",
	description:Translation.translate("Redo your last (undone) action. This command replays back history and does not repeat the command."),
	args:"",
	func:function(){
		var redo = WorldEdit.redo;
		var count = 0;
		for(var i = 0; i < redo.length; i++){
			count++;
			World.setBlock(redo[i][0], redo[i][1], redo[i][2], redo[i][3], redo[i][4]);
		}
		
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				sizeArea = Translation.translate("%count% block changed.").replace("%count%", a);
			else
				sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		}else
			sizeArea = Translation.translate("%count% blocks changed.").replace("%count%", a);
		Game.message(sizeArea);
	},
},
"//wand":{
	name:"//wand",
	description:Translation.translate("Gives you the \"EditWand\" (by default, a wooden axe)."),
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
		Game.message(Translation.translate("Block ID %id%:%data%.").replace("%id%",block.id).replace("%data%",block.data));
	}
	if(item.id == getWand()){
		Commands["//pos1"].func([coords.x, coords.y, coords.z]);
	}
});

Callback.addCallback("DestroyBlockStart", function (coords, block, player) {
	if(Player.getCarriedItem().id == getWand()){
		Commands["//pos2"].func([coords.x, coords.y, coords.z]);
		Game.prevent();
	}
});




