// obstacles
	
	
	AFRAME.registerComponent("obstacle-component", {

					
				init: function () {
				
				  this.el.addEventListener('collide', function (e) {
					 if (e.detail.body.el.id === 'player') {
						document.querySelector('#bounceSound').play();
					 }
					});
				
				}
				
				});
				
				
				
		const obstacles = [
				{x: -6, z:-10, size: 2, entity: null}, {x: -5, z:-50, size: 1, entity: null},{x: -5, z:-90, size: 2, entity: null},
				{x: 1, z:-110, size: 1, entity: null}, {x: 6, z:-150, size: 1, entity: null},{x: 6, z:-190, size: 1, entity: null},
				{x: -4, z:-210, size: 2, entity: null}, {x: -3, z:-250, size: 2, entity: null},{x: -2, z:-290, size: 2, entity: null},
				{x: 2, z:-310, size: 2, entity: null}, {x: 6, z:-350, size: 1, entity: null},{x: 4, z:-390, size: 2, entity: null},
				{x: -3, z:-410, size: 1, entity: null}, {x: 6, z:-450, size: 1, entity: null},{x: -6, z:-490, size: 2, entity: null},
				{x: 6, z:-510, size: 2, entity: null}, {x: -2, z:-550, size: 2, entity: null},{x: 5, z:-590, size: 1, entity: null},
				{x: 4, z:-610, size: 2, entity: null}, {x: 6, z:-650, size: 1, entity: null},{x: 6, z:-690, size: 2, entity: null},
				{x: 2, z:-710, size: 2, entity: null}, {x: 5, z:-750, size: 1, entity: null},{x: -3, z:-790, size: 2, entity: null},
				{x: -6, z:-810, size: 2, entity: null}, {x: 1, z:-850, size: 2, entity: null},{x: -1, z:-890, size: 2, entity: null},
				{x: 6, z:-910, size: 1, entity: null}, {x: 6, z:-950, size: 1, entity: null},{x: 6, z:-990, size: 2, entity: null},
				{x: -6, z:-1010, size: 2, entity: null}, {x: -6, z:-1050, size: 1, entity: null},{x: 6, z:-1090, size: 2, entity: null},
				{x: 4, z:-1110, size: 2, entity: null}, {x: 3, z:-1150, size: 1, entity: null},{x: 4, z:-1190, size: 2, entity: null},
				{x: -6, z:-1210, size: 2, entity: null}, {x: 6, z:-1250, size: 2, entity: null},{x: 6, z:-1290, size: 2, entity: null},
				{x: 6, z:-1310, size: 2, entity: null}, {x: -6, z:-1350, size: 1, entity: null},{x: 5, z:-1390, size: 1, entity: null},
				{x: -1, z:-1410, size: 2, entity: null}, {x: 2, z:-1450, size: 1, entity: null},{x: -6, z:-1490, size: 2, entity: null},
				{x: 2, z:-1510, size: 2, entity: null}, {x: 3, z:-1550, size: 1, entity: null},{x: 1, z:-1590, size: 2, entity: null},
				{x: 5, z:-1610, size: 1, entity: null}, {x: -6, z:-1650, size: 1, entity: null},{x: -6, z:-1690, size: 2, entity: null},
				{x: -6, z:-1710, size: 2, entity: null}, {x: 1, z:-1750, size: 1, entity: null},{x: -6, z:-1790, size: 1, entity: null},
				{x: 4, z:-1810, size: 2, entity: null}, {x: 6, z:-1850, size: 1, entity: null},{x: 3, z:-1890, size: 2, entity: null},
				{x: 6, z:-1910, size: 2, entity: null}, {x: -5, z:-1950, size: 1, entity: null},{x: 6, z:-1990, size: 2, entity: null},
				{x: 3, z:-2010, size: 2, entity: null}, {x: 6, z:-2050, size: 2, entity: null},{x: -2, z:-2090, size: 2, entity: null},
				{x: -6, z:-2110, size: 2, entity: null}, {x: -2, z:-2150, size: 1, entity: null},{x: 6, z:-2190, size: 1, entity: null},
				{x: 5, z:-2210, size: 2, entity: null}, {x: 4, z:-2250, size: 1, entity: null},{x: -1, z:-2290, size: 2, entity: null},
				{x: 1, z:-2310, size: 1, entity: null}, {x: 6, z:-2350, size: 1, entity: null},{x: 5, z:-2390, size: 2, entity: null},
				{x: -6, z:-2410, size: 2, entity: null}, {x: -6, z:-2450, size: 1, entity: null},{x: 6, z:-2490, size: 1, entity: null},
				{x: 6, z:-2510, size: 2, entity: null}, {x: 4, z:-2550, size: 2, entity: null},{x: -4, z:-2590, size: 2, entity: null},
				{x: -3, z:-2610, size: 1, entity: null}, {x: -6, z:-2650, size: 1, entity: null},{x: 1, z:-2690, size: 2, entity: null},
				{x: 6, z:-2710, size: 2, entity: null}, {x: 5, z:-2750, size: 1, entity: null},{x: 6, z:-2790, size: 2, entity: null},
				{x: -6, z:-2810, size: 1, entity: null}, {x: -6, z:-2850, size: 2, entity: null},{x: -3, z:-2890, size: 1, entity: null},
				{x: 6, z:-2910, size: 2, entity: null}, {x: 3, z:-2950, size: 1, entity: null},{x: -6, z:-2990, size: 2, entity: null},
				{x: -3, z:-3010, size: 1, entity: null}, {x: -6, z:-3050, size: 1, entity: null},
				];			
	
	createObstacles = function() {
	
			let sceneEl = document.getElementById('mainScene');
			
				for (i in obstacles) {
					obstacles[i].entity = document.createElement('a-entity');
					obstacles[i].entity.setAttribute('geometry', {
					  primitive: 'box',
					  height: obstacles[i].size,
					  width: obstacles[i].size,
					  depth: obstacles[i].size,
		 
					});
					obstacles[i].entity.setAttribute('position', {
					  x: obstacles[i].x,
					  y: 10,
					  z: obstacles[i].z
					});
				   obstacles[i].entity.setAttribute('material', {
					  src:'#boxTexture'
					  });
				   obstacles[i].entity.setAttribute('obstacle-component','');
				   obstacles[i].entity.setAttribute('dynamic-body','');
				
				   obstacles[i].entity.setAttribute("sound", "src", "#buzzSound");
				   obstacles[i].entity.setAttribute("sound", "autoplay", "true");
				   obstacles[i].entity.setAttribute("sound", "loop", "true");

				   sceneEl.appendChild(obstacles[i].entity);
				   }
	};