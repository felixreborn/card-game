//init
myBase = {}
myBase.barracks = {}
myBase.barracks.current = 0
myBase.barracks.next = 1
myBase.townCenter = {}
myBase.townCenter.current = 0
myBase.townCenter.next = 1
myBase.wizardsTower = {}
myBase.wizardsTower.current = 0
myBase.wizardsTower.next = 1
myBase.gate1 = {}
myBase.gate1.x = 450
myBase.gate1.y = 585
myBase.gate1.w = 50
myBase.gate1.h = 30
myBase.gate2 = {}
myBase.gate2.x = 500
myBase.gate2.y = 585
myBase.gate2.w = 50
myBase.gate2.h = 30
//click events
elements = []
changes = []
functions = []

//lock same animations
openFGatePlaying = false

window.onload = function() {
	canvas = document.getElementById("canvas");
	canvas.removeEventListener("mouseup", elementClicked);
	canvas.addEventListener('mouseup', elementClicked);	
	canvas.width = 1500;
	canvas.height = 1000;
	//set it to full screen
	ctx = canvas.getContext("2d");
	draw();
	setInterval(start, 33); // 33 milliseconds = ~ 30 frames per sec
};


function start() {
	//work out what changed and redraw
	redraw();
}

function redraw(){
	var i = 0;
	while (i < changes.length){
		ctx.clearRect(changes[i].old.x, changes[i].old.y, changes[i].old.w, changes[i].old.h);
		ctx.fillRect(changes[i].new.x, changes[i].new.y, changes[i].new.w, changes[i].new.h);
		changes.splice(i, 1);
		i++;
	}
	var i = 0;
	while (i < functions.length){
		var tmpFunc = new Function(functions[i]);
		functions.splice(i, 1);
		tmpFunc();
		i++;
	}
}

function elementClicked(event){
	cw = canvas.width;
    ch = canvas.height;

    //scale offset for css rescale
    sx = cw / canvas.offsetWidth;
	sy = ch / canvas.offsetHeight;

	var x = Math.round(event.pageX * sx),
	    y = Math.round(event.pageY * sy);

	// Collision detection between click and element
	elements.forEach(function(element) {
	    if (y > element.top && y < element.top + element.height 
	        && x > element.left && x < element.left + element.width) {
	        console.log(element.name + ' was clicked');
	    	if (element.event != undefined){
	    		var tmpFunc = new Function(element.event);
				tmpFunc();
	    	}
	    }
	});
}

function openFGate(){
	if (!openFGatePlaying){
		openFGatePlaying = true
		openFGateAnimation(0, 1);
	}
}

function openFGateAnimation(count, modifier){
	if (count == 0 && modifier == -1){
		//stop
		drawFriendlyWall();
		openFGatePlaying = false
	}else{
		drawFriendlyWall();
		//newgate1
		newGate1 = {y :myBase.gate1.y, w:myBase.gate1.w, h:myBase.gate1.h}
		newGate1.x = myBase.gate1.x - modifier
		//oldvalue
		oldX = myBase.gate1.x
		oldGate = {x:oldX, y :myBase.gate1.y, w:myBase.gate1.w, h:myBase.gate1.h}
		//push changes and change base
		changes.push({old:oldGate, new:newGate1})
		myBase.gate1.x = myBase.gate1.x - modifier

		//newgate2
		newGate2 = {y :myBase.gate2.y, w:myBase.gate2.w, h:myBase.gate2.h}
		newGate2.x = myBase.gate2.x + modifier
		//oldvalue
		oldX = myBase.gate2.x
		oldGate = {x:oldX, y :myBase.gate2.y, w:myBase.gate2.w, h:myBase.gate2.h}
		//push changes and change base
		changes.push({old:oldGate, new:newGate2})
		myBase.gate2.x = myBase.gate2.x + modifier
		count = count + modifier	
		//go for 50 then close
		if (count == 50){
			modifier = -1
		}
		functions.push('openFGateAnimation(' + count + ',' + modifier + ')')
	}	
}


function drawFriendlyWall(){
	//base wall
	ctx.lineWidth=10;
	ctx.moveTo(0,600);
	ctx.lineTo(450,600);
	ctx.stroke();

	ctx.moveTo(550,600);
	ctx.lineTo(1000,600);
	ctx.stroke();
}

function draw() {
	//enemy base
	//ctx.fillRect(X,Y,W,H);

	//barracks
	elements.push({name: 'eBarracks',  left: 100, top: 50, width: 200, height: 100})
	ctx.fillRect(100,50,200,100);
	
	//town center
	elements.push({name: 'eTownCenter',  left: 400, top: 50, width: 200, height: 100})
	ctx.fillRect(400,50,200,100);
	
	//wizards tower
	elements.push({name: 'eWizardsTower', left: 700, top: 50, width: 200, height: 100})
	ctx.fillRect(700,50,200,100);

	//base wall
	ctx.lineWidth=10;
	ctx.moveTo(0,200);
	ctx.lineTo(450,200);
	ctx.stroke();

	ctx.fillRect(450,185,50,30);
	ctx.fillRect(500,185,50,30);

	ctx.moveTo(550,200);
	ctx.lineTo(1000,200);
	ctx.stroke();

	//friendly base

	ctx.fillRect(myBase.gate1.x,myBase.gate1.y,myBase.gate1.w,myBase.gate1.h);
	ctx.fillRect(myBase.gate2.x,myBase.gate2.y,myBase.gate2.w,myBase.gate2.h);

	drawFriendlyWall();

	//barracks
	ctx.fillRect(100,650,200,100);
	
	//town center
	elements.push({name: 'fTownCenter',  left: 400, top: 650, width: 200, height: 100, event: 'openFGate()'})
	ctx.fillRect(400,650,200,100);
	
	//wizards tower
	ctx.fillRect(700,650,200,100);

	//deck
	ctx.fillRect(50,800,100,200);

	//hand
	ctx.fillStyle = "brown";
	ctx.fillRect(200,800,700,200);

	//enemy active card
	ctx.fillStyle = "black";
	ctx.fillRect(1000,0,400,450);

	//friendly active card
	ctx.fillStyle = "black";
	ctx.fillRect(1000,500,400,550);
}