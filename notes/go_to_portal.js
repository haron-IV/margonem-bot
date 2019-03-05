
function getPortal() {
	const portals = document.querySelectorAll('.mmp-gw');
	const portal = {
    	x: parseInt(portals[0].style.left.split(/[. px]/)[0]),
		y: parseInt(portals[0].style.top.split(/[. px]/)[0])
	}
	return	portal;
}