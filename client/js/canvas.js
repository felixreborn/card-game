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
elements = []

window.onload = function() {
	canvas = document.getElementById("canvas");	
	draw();
};


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
	    }
	});
}

function draw() {
	canvas.removeEventListener("mouseup", elementClicked);
	canvas.addEventListener('mouseup', elementClicked);	
	//set it to full screen
	ctx = canvas.getContext("2d");
	canvas.width = 1500;
	canvas.height = 1000;

	//enemy base
	//ctx.fillRect(X,Y,W,H);

	//barracks
	elements.push({name: 'eBarracks',  left: 100, top: 50, width: 200, height: 100})
	ctx.fillRect(100,50,200,100);
	
	//town center
	elements.push({name: 'eTownCenter',  left: 400, top: 50, width: 200, height: 100})
	ctx.fillRect(400,50,200,100);
	
	//wizards tower
	elements.push({name: 'eWizardsTower',  left: 700, top: 50, width: 200, height: 100})
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

	//base wall
	ctx.lineWidth=10;
	ctx.moveTo(0,600);
	ctx.lineTo(450,600);
	ctx.stroke();

	ctx.fillRect(450,585,50,30);
	ctx.fillRect(500,585,50,30);

	ctx.moveTo(550,600);
	ctx.lineTo(1000,600);
	ctx.stroke();

	//barracks
	ctx.fillRect(100,650,200,100);
	
	//town center
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