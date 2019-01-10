
// player

	AFRAME.registerComponent("player-component", {
		
		schema: {
		 
		  playerMessage: {type: 'string', default: "I'm ready to roll!"},
		
		},
			
		init: function () {
		  this.onKeydown = this.onKeydown.bind(this);
		  this.onKeyup = this.onKeyup.bind(this);
		  this.createRecord = this.createRecord.bind(this);
		  window.addEventListener('keydown', this.onKeydown);
		  window.addEventListener('keyup', this.onKeyup);
		  this.turnLeft = false;
		  this.turnRight = false;
		  this.camera = document.getElementById('cameraPlayer');
			
		  this.gameFinished = false;
		  this.topSpeed = -100
		  this.initialPosition = {x: 0, y: -2, z: 0};
		  this.el.setAttribute('position', {x: this.initialPosition.x, y: this.initialPosition.y, z: this.initialPosition.z});
		  
		  
		  // Let's handle some collisions here
		  
		  this.el.addEventListener('collide', function (e) {
		  
		  
				// ToDo
		  
		  });

		  this.el.setAttribute("visible",false);
		  console.log(this.data.playerMessage);

		},
		
		tick: function () {
			 
			 const playerPosition = this.el.getAttribute('position');
			 let actualSpeed = this.el.body.velocity.z;
			 

			 if(gameOn && this.el.body.velocity.z > this.topSpeed) {
				this.el.body.applyImpulse(
					new CANNON.Vec3(0, 0, 0.1), // Impulse
					new CANNON.Vec3().copy(this.el.getAttribute('position')) ); // World position
											}
			else if (gameOn) {	
			   this.el.body.velocity.set(this.el.body.velocity.x,this.el.body.velocity.y,this.topSpeed);

											}
			 else { // Game is finished or about to start
				
				if (this.gameFinished) {
					actualSpeed = actualSpeed < 0 ? actualSpeed + 0.2 : 0; // Let's brake!
					this.el.body.velocity.set(0,this.el.body.velocity.y,actualSpeed);
				} else {
				  
					this.el.body.velocity.set(0,0.2,0);

				};
			 };
											
			this.camera.setAttribute('position', {x: playerPosition.x, y: playerPosition.y, z: playerPosition.z + (actualSpeed * 0.02)});
			
			if (this.turnLeft) {
			   this.el.body.applyImpulse(
				  new CANNON.Vec3(0.1, 0, 0), // Impulse
				  new CANNON.Vec3().copy(this.el.getAttribute('position')) // World position
				);
			};
			
			if (this.turnRight) {
			   this.el.body.applyImpulse(
				  new CANNON.Vec3(-0.1, 0, 0), // Impulse
				  new CANNON.Vec3().copy(this.el.getAttribute('position')) // World position
											);
			};
			
			
			let speedometer = document.getElementById('speedometer');
			speedometer.innerHTML ='Speed: ' + (this.el.body.velocity.z).toFixed(2) * -1;

			if (playerPosition.z <= -3100 && gameOn) {
				
				gameOn = false;
				this.gameFinished = true;
				document.getElementById('info_01').className= "info_none";
				let yourResult = document.getElementById('yourResult');
				let finalTime = this.getTime()
				yourResult.innerHTML = `Your time has been ${finalTime} seconds. Waiting report from the server.` ;
				let myRecord = { player: 'unknown', time: finalTime}; // ToDo
				this.createRecord(myRecord);
				document.getElementById('splash_02').className= "splash";
				
			} else {		
				let watchstop =  document.getElementById('watchstop');
				watchstop.innerHTML ='Time: ' + this.getTime();
			}

		},

		onKeydown: function (evt) {
				// ToDo
				// console.log("Keydown: ", evt.keyCode);

				if (evt.keyCode === 32) {
				   let myRecord = { player: 'unknown', time: (Math.random() * 3) + 60};
				   this.createRecord(myRecord);
				};
	
				if (evt.keyCode === 65) {											
					this.turnLeft = true;																	
				} else if (evt.keyCode === 68) {
					this.turnRight = true;									
				};

			},

		onKeyup: function (evt) {
		
				if (evt.keyCode === 65) {
					this.turnLeft = false;														
				} else if (evt.keyCode === 68) {		
					this.turnRight = false;							
				};
		 
		},

		getTime: function(){
			
			if (!gameOn && !this.gameFinished) return 0;
			let stop = Date.now();
			return ((stop - start) / 1000);
		
		},
		
		createRecord: function(myRecord) {
			console.log('Creating Record...');
			fetch('/api/records', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(myRecord),
			}).then(response => {
				if (response.ok) {
					response.json().then((record) => {
						console.log(record);
						record = JSON.parse(record);
						let report = `Your time is ${record.time} seconds. Your position is number ${record.position} out of ${record.length} participants and your Unique ID is ${record._id}.`;	
						// ToDo
						//console.log(report);
						let yourResult = document.getElementById('yourResult');
						yourResult.innerHTML = report;
					});
				} else {
					response.json().then(error => {
					alert("Failed to create Record: " + error.message)});
				};
			}).catch(err => {
				alert("Error in sending data to server: " + err.message);
			});
		},

	})