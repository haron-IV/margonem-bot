
function getPortal() {
	const portals = document.querySelectorAll('.mmp-gw');
	const portal = {
    	x: parseInt(portals[0].style.left.split(/[. px]/)[0]),
        y: parseInt(portals[0].style.top.split(/[. px]/)[0]),
        width: parseInt(portals[0].style.width.split(/[. px]/)[0]),
        height: parseInt(portals[0].style.height.split(/[. px]/)[0]),
	}
	return	portal;
}

function addSquareAfterPortal(){
    const map = document.querySelector('.mmpMap');
    const portal = getPortal();
    const square = document.createElement('div');

    square.id = "squarePortal";
    square.style.width = portal.width;
    square.style.height = portal.height;
    square.style.left = portal.x + 20 + 'px';
    square.style.top = portal.y + 20 + 'px';
    square.style.backgroundColor = "rgba(150, 107, 223, .9)";
    square.style.position = "absolute";

    map.appendChild(square);
}