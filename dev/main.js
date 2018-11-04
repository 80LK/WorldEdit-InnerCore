var WorldEdit = {
	wand:true,
	
	pos1:{x:Infinity,y:Infinity,z:Infinity},
	pos2:{x:Infinity,y:Infinity,z:Infinity},
	
	sp1:{x:Infinity,y:Infinity,z:Infinity},
	sp2:{x:Infinity,y:Infinity,z:Infinity},
	
	undo:[],
	redo:[],
	
	copy:[],
	
	getSizeArea:function(){
		if(!WorldEdit.getValidPosition())return 1;
		
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
	},
	
	getMessageSize:function(count, type){
		if(!type)type=1;
		var a = count;
		a = a%100;
		if(a<10 || a > 20){
			a = a%10;
			if(a==1)
				return Translation.translate(type==1?"%count% block changed.":"%count% block.").replace("%count%", a);
			else
				return Translation.translate(type==1?"%count% blocks changed.":"%count% blocks.").replace("%count%", a);
		}else
			return Translation.translate(type==1?"%count% blocks changed.":"%count% blocks.").replace("%count%", a);
		
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
	description:"Set all blocks inside the selection region to a specified block.",
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
		Game.message(WorldEdit.getMessageSize(a));
	}
},
"//box":{
	name:"//box",
	description:"Build walls, floor, and ceiling.",
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
		
		Game.message(WorldEdit.getMessageSize(count));
	}
},
"//wall":{
	name:"//wall",
	description:"Build the walls of the region (not including ceiling and floor).",
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
		
		Game.message(WorldEdit.getMessageSize(count));
	}
},
"//replace":{
	name:"//replace",
	description:"Replace all blocks of the specified block(s) with another block inside the region.",
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
		
		Game.message(WorldEdit.getMessageSize(count));
		
	}
},
"//help":{
	name:"//help",
	description:"Help.",
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
			message+= "- "+Translation.translate(cmd.description)+"\n";
		}
		
		Game.message(Translation.translate("===Help [Page %page%]===\n%cmd%===Help [Page %page%]===").replace(/(%page)/g, page).replace("%cmd%", message));
	}
},
"//?":{
	name:"//?",
	description:"Help.",
	args:"[page]",
	func:function(args){
		Commands["//help"].func(args);
	}
},
"//r":{
	name:"//r",
	description:"Work with the region.",
	args:"<type> [args]",
	func:function(args){
		switch(args[0]){
			case "help":
			case "?":
			case undefined:
				var list = [
					["help", "<page>", "Commands for working with the region"],
					["up", "<count>", "Raise the selected region by the specified number of blocks"],
					["down", "<count>", "Lower the selected region by the specified number of blocks"],
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
					message+= "- "+Translation.translate(cmd[2])+"\n";
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
	description:"Work with the region.",
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//region":{
	name:"//region",
	description:"Work with the region.",
	args:"<type> [args]",
	func:function(args){
		Commands["//r"].func(args);
	}
},
"//pos1":{
	name:"//pos1",
	description:"Set selection position #1 to the block above the one that you are standing on.",
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			coords.x = Math.round(coords.x);
			coords.y = Math.round(coords.y);
			coords.z = Math.round(coords.z);
			WorldEdit.selectPosition(coords,null);			
			Game.message(Translation.translate("The first position is set to %x%,%y%,%z%.").replace("%x%",coords.x).replace("%y%",coords.y).replace("%z%",coords.z));
			Game.message(Translation.translate("The selected region is %sizeArea%").replace("%sizeArea%", WorldEdit.getMessageSize(WorldEdit.getValidPosition()?WorldEdit.getSizeArea():1,0)));
		}else{
			if(!args[1] || !args[2]){
				return Game.message(Translation.translate("Don't valid command."));
			}else{
				WorldEdit.selectPosition({x:Math.round(args[0]),y:Math.round(args[1]),z:Math.round(args[2])},null);
				Game.message(Translation.translate("The first position is set to %x%,%y%,%z%.").replace("%x%",args[0]).replace("%y%",args[1]).replace("%z%",args[2]));
				Game.message(Translation.translate("The selected region is %sizeArea%").replace("%sizeArea%", WorldEdit.getMessageSize(WorldEdit.getValidPosition()?WorldEdit.getSizeArea():1,0)));
			}
		}
	}
},
"//pos2":{
	name:"//pos2",
	description:"Set selection position #2 to the block above the one that you are standing on.",
	args:"[<x> <y> <z>]",
	func:function(args){
		if(!args[0]){
			var coords = Player.getPosition();
			coords.x = Math.round(coords.x);
			coords.y = Math.round(coords.y);
			coords.z = Math.round(coords.z);
			WorldEdit.selectPosition(null, coords);
			Game.message(Translation.translate("The second position is set to %x%,%y%,%z%.").replace("%x%",coords.x).replace("%y%",coords.y).replace("%z%",coords.z));
			Game.message(Translation.translate("The selected region is %sizeArea%").replace("%sizeArea%", WorldEdit.getMessageSize(WorldEdit.getValidPosition()?WorldEdit.getSizeArea():1,0)));
		}else{
			if(!args[1] || !args[2]){
				return Game.message(Translation.translate("Don't valid command."));
			}else{
				WorldEdit.selectPosition(null,{x:Math.round(args[0]),y:Math.round(args[1]),z:Math.round(args[2])});
				Game.message(Translation.translate("The second position is set to %x%,%y%,%z%.").replace("%x%",args[0]).replace("%y%",args[1]).replace("%z%",args[2]));
				Game.message(Translation.translate("The selected region is %sizeArea%").replace("%sizeArea%", WorldEdit.getMessageSize(WorldEdit.getValidPosition()?WorldEdit.getSizeArea():1,0)));
			}
		}
	}
},
"//undo":{
	name:"//undo",
	description:"Undo your last action.",
	args:"",
	func:function(){
		if(WorldEdit.undo.length == 0)return;
		var undo = WorldEdit.undo[WorldEdit.undo.length-1];
		WorldEdit.redo = [];
		var count = 0;
		for(var i = 0; i < undo.length; i++){
			WorldEdit.redo.push([undo[i][0], undo[i][1], undo[i][2],World.getBlock(undo[i][0], undo[i][1], undo[i][2]).id,World.getBlock(undo[i][0], undo[i][1], undo[i][2]).data]);
			count++;
			World.setBlock(undo[i][0], undo[i][1], undo[i][2], undo[i][3], undo[i][4]);
		}
		WorldEdit.undo.pop();
		Game.message(WorldEdit.getMessageSize(count));
	},
},
"//redo":{
	name:"//redo",
	description:"Redo your last (undone) action. This command replays back history and does not repeat the command.",
	args:"",
	func:function(){
		var redo = WorldEdit.redo;
		if(redo.length == 0)return;
		var count = 0;
		for(var i = 0; i < redo.length; i++){
			count++;
			World.setBlock(redo[i][0], redo[i][1], redo[i][2], redo[i][3], redo[i][4]);
		}
		
		Game.message(WorldEdit.getMessageSize(count));
	},
},
"//clearhistory":{
	name:"//clearhistory",
	description:"Clear your history.",
	args:"",
	func:function(){
		WorldEdit.undo = [];
		WorldEdit.redo = [];
		Game.message(Translation.translate("History cleared."));
	},
},
"//wand":{
	name:"//wand",
	description:"Gives you the \"EditWand\" (by default, a wooden axe).",
	args:"",
	func:function(){
		Player.addItemToInventory(getWand(), 1);
	},
},
"//copy":{
	name:"//copy",
	description:"Copy the selected area.",
	args:"[-a]",
	func:function(args){
		var air = args.indexOf("-a")!=-1?true:false;
		WorldEdit.copy = [];
		var count = 0;
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					var block = World.getBlock(x, y, z);
					var coord = Player.getPosition();
					coord.x = Math.round(coord.x);
					coord.y = Math.round(coord.y);
					coord.z = Math.round(coord.z);
					if(block.id == 0 && air == false)continue;
					WorldEdit.copy.push([coord.x - x, coord.y - y, coord.z - z,block]);
					count++;
				}	
			}
		}
		
		Game.message(Translation.translate("Region copied."));
	},
},
"//cut":{
	name:"//cut",
	description:"Cut the selected area.",
	args:"[-a]",
	func:function(args){
		var air = args.indexOf("-a")!=-1?true:false;
		WorldEdit.copy = [];
		var count = 0;
		for(var x = WorldEdit.pos1.x; x <= WorldEdit.pos2.x; x++){
			for(var y = WorldEdit.pos1.y; y <= WorldEdit.pos2.y; y++){
				for(var z = WorldEdit.pos1.z; z <= WorldEdit.pos2.z; z++){
					var block = World.getBlock(x, y, z);
					var coord = Player.getPosition();
					coord.x = Math.round(coord.x);
					coord.y = Math.round(coord.y);
					coord.z = Math.round(coord.z);
					if(block.id == 0 && air == false)continue;
					WorldEdit.copy.push([coord.x - x, coord.y - y, coord.z - z,block]);
					World.setBlock(x,y,z,0,0);
					count++;
				}	
			}
		}
		
		Game.message(Translation.translate("Region cut."));
	},
},
"//paste":{
	name:"//paste",
	description:"Paste the copied area.",
	args:"",
	func:function(args){
		if(WorldEdit.copy.length==0)return;
		var copy = WorldEdit.copy;
		var count = 0;
		
		for(var i = 0; i < copy.length; i++){
			var coord = Player.getPosition();
			coord.x = Math.round(coord.x);
			coord.y = Math.round(coord.y);
			coord.z = Math.round(coord.z);
			World.setBlock(	coord.x - copy[i][0],
							coord.y - copy[i][1],
							coord.z - copy[i][2], copy[i][3].id, copy[i][3].data);
			count++;
		}
		
		Game.message(WorldEdit.getMessageSize(count));
	}
},
"//size":{
	name:"//size",
	description:"Get size area.",
	args:"",
	func:function(){
		Game.message(WorldEdit.getMessageSize(WorldEdit.getSizeArea(), 0));
	}
},
"//toggleeditwand":{
	name:"//toggleeditwand",
	description:"Toggles the edit wand selection mode, allowing you to use the edit wand item normally.",
	args:"",
	func:function(){
		WorldEdit.wand = !WorldEdit.wand;
		Game.message(Translation.translate("Mode wand edit switched."));
	}
},
"//desel":{
	name:"//desel",
	description:"Deselects the current selection.",
	args:"",
	func:function(){
		WorldEdit.pos1 = {x:Infinity,y:Infinity,z:Infinity};
		WorldEdit.pos2 = {x:Infinity,y:Infinity,z:Infinity};
	
		WorldEdit.sp1 = {x:Infinity,y:Infinity,z:Infinity};
		WorldEdit.sp2 = {x:Infinity,y:Infinity,z:Infinity};
		
		Game.message(Translation.translate("The current selection is canceled."));
	}
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
	if(item.id == getWand() && WorldEdit.wand == true){
		Commands["//pos1"].func([coords.x, coords.y, coords.z]);
	}
});

Callback.addCallback("DestroyBlockStart", function (coords, block, player) {
	if(Player.getCarriedItem().id == getWand() && WorldEdit.wand == true){
		Commands["//pos2"].func([coords.x, coords.y, coords.z]);
		Game.prevent();
	}
});

Callback.addCallback("LevelLeft", function(){
	WorldEdit.undo = [];
	WorldEdit.redo = [];	
});