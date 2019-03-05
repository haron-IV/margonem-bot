function getMapInfo() {
    const map = document.querySelector('.mmpMap');
    const mapInfo = {
        width: parseInt(map.style.width.split(/[. px]/)[0]),
        height: parseInt(map.style.height.split(/[. px]/)[0])
    }

    return mapInfo;
}


function getPortal() {
    const portals = document.querySelectorAll('.mmp-gw');
    
	const portal = {
    	x: parseInt(portals[0].style.left.split(/[. px]/)[0]),
        y: parseInt(portals[0].style.top.split(/[. px]/)[0]),
        width: parseInt(portals[0].style.width.split(/[. px]/)[0]),
        height: parseInt(portals[0].style.height.split(/[. px]/)[0]),
        position: []
    }

    return portal;
}

function setPortlaPosition(){
    const portal = getPortal();
    const map = getMapInfo();

    if (portal.x <= map.width / 2) {
        portal.position.push('left');
    } else if (portal.x >= map.width / 2) {
        portal.position.push('right');
    }

    if (portal.y <= map.height / 2) {
        portal.position.push('top');
    } else if (portal.y >= map.height / 2) {
        portal.position.push('bottom');
    }

    return portal;
}

function addSquareAfterPortal(){
    const map = document.querySelector('.mmpMap');
    const portal = setPortlaPosition();
    const square = document.createElement('div');
    const offset = portal.width;

    if ( portal.position[0] === 'left' ){
        square.style.left = `${portal.x + offset}px`;
    } else if ( portal.position[0] === 'right' ) {
        square.style.left = `${portal.x - offset}px`;
    }

    if ( portal.position[1] === 'top' ){
        square.style.top = `${portal.y + offset}px`;
    } else if ( portal.position[1] === 'bottom' ) {
        square.style.top = `${portal.y - offset}px`;
    }

    square.id = "squarePortal";
    square.style.width = portal.width + 'px';
    square.style.height = portal.height + 'px';
    square.style.backgroundColor = "rgba(150, 107, 223, .9)";
    square.style.position = "absolute";

    map.appendChild(square);
}

addSquareAfterPortal();