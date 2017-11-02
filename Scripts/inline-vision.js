
	define([
			"libs/hammer/hammer", "libs/hls/hls"
		],
		function(Hammer, Hls) {
			const skyOneUrl 			= "https://skyliverwwa-i.akamaihd.net/hls/live/570288/skyliverwwa/sky1rw.m3u8"
			const skyTwoUrl 			= "https://skyliverwwa-i.akamaihd.net/hls/live/570288/skyliverwwa/sky2rw.m3u8"

			var videoElem;
			var videoContainer;
			var offContainer;
			var endContainer;
			var loaded 					= false;	

			var thumbnail				= {};
				thumbnail.w				= 200;
				thumbnail.h				= 108
				thumbnail.ratio			= thumbnail.h / thumbnail.w;
				
			var max						= {};
				max.w					= window.innerWidth
				max.h					= window.innerWidth * thumbnail.ratio;
				
			if(max.h > window.innerHeight) {
				max.h					= window.innerHeight;
				max.w					= max.h / thumbnail.ratio;
			}		
			
			var slider 					= {};		
				slider.x				= 0;
				slider.y				= 0;
				slider.size 			= 'min';
				slider.w 				= slider.size == 'max' ? max.w : thumbnail.w;
				slider.h 				= slider.size == 'max' ? max.h : thumbnail.h;
				slider.positionX 		= 'right';
				slider.positionY 		= 'bottom';
				slider.margin 			= 0;			
				slider.sensitivity 		= 30 // % needed to trigger swipe			
				slider.maxY				= 'top';
				slider.maxX				= '';

			var page 					= {};
				page.width 				= window.innerWidth;
				page.height 			= window.innerHeight;		
			
			var vision_largetosmall;
			var vision_remove;
			var vision_smalltolarge;
			var vision_remove;
			var vision_turnon;
			var vision_snapleft;
			var vision_snapright;	
		
			function init() {
				endContainer = document.createElement('div');
				endContainer.className = "vision-end-container";			
				document.body.appendChild(endContainer);	
				
				offContainer = document.createElement('div');
				offContainer.className = "vision-off-container";			
				document.body.appendChild(offContainer);	
				// create video element, add url
				// put video element into body
				
				videoContainer = document.createElement('div');
				videoContainer.className = "inline-vision open";	
				videoElem = document.createElement('video');			
				videoContainer.appendChild(videoElem);
				// add video element
				document.body.appendChild(videoContainer);
				
				// add controls
				addTableControls();
				
				var elWidth  	= videoContainer.offsetWidth;				
				var elHeight  	= videoContainer.offsetHeight;			
				
				slider.margin	= parseInt(window.getComputedStyle(videoContainer).getPropertyValue('margin'));
				slider.w 		= elWidth;
				slider.h 		= elHeight;
				
				
				// gesture events
				eventsGestures();
				eventClick();
				//eventOrientation();			
				
				var defaultObj = {};				
					defaultObj.end = {};
					defaultObj.off = {};			
				
					defaultObj.end.x = 0;
					defaultObj.end.y = 0;
					defaultObj.end.w = slider.w;
					defaultObj.end.h = slider.h;
					defaultObj.end.margin = slider.margin;
					defaultObj.end.positionX = slider.positionX;
					defaultObj.end.positionY = slider.positionY;
					defaultObj.end.size = slider.size;		

					defaultObj.off.x = 0;
					defaultObj.off.y = 0;
					defaultObj.off.w = slider.w;
					defaultObj.off.h = slider.h;
					defaultObj.off.margin = slider.margin;
					defaultObj.off.positionX = slider.positionX;
					defaultObj.off.positionY = slider.positionY;
					defaultObj.off.size = slider.size;			

				videoContainer.style.removeProperty('top');
				videoContainer.style.removeProperty('bottom');		
				videoContainer.style.removeProperty('left');		
				videoContainer.style.removeProperty('right');	

				setPosition(videoContainer, slider, 'init');	
				
				setEndOffContainer(defaultObj);
			}
			
			function eventClick() {
				var finalPosition;	
				
				// video click			
				videoElem.addEventListener('click', () => {								
					finalPosition = (slider.positionY === slider.maxY) ? 'bottom' : 'top';					
					//visionSnapY(finalPosition);
				})
			}

			function eventsGestures() {

				//	------------
				// 	thumbnail
				// 	swipe up					> 	fullscreen
				// 	swipe left
				//		current position left	>	remove
				//		current position right	>	move to right
				// 	swipe right
				//		current position left	>	move to left
				// 		current position right	>	remove
				//	swipe down					>	hide video but play sound
				//	------------
				// 	fullscreen
				// 		swipe down				>	thumbnail view (left / right from previous thumb position)
				//	------------

				//Create object to handle any gestures
				var manager = new Hammer.Manager(videoContainer);
					manager.add( new Hammer.Pan({ threshold: 10, pointers: 0 }) );
					
				var hammerObj = {};
					hammerObj.percentage = 0;			
					hammerObj.initPanDirection = 0;			
					hammerObj.initPanDirectionText = 0;			
					hammerObj.currentPanDirection = 0;			
					hammerObj.currentPanDirectionText = 0;			
					
					hammerObj.start = {};
					hammerObj.start.x = 0;
					hammerObj.start.y = 0;
					hammerObj.start.w = 0;
					hammerObj.start.h = 0;
					hammerObj.start.margin = 0;
					hammerObj.start.positionX = '';
					hammerObj.start.positionY = '';
					hammerObj.start.size;
					
					hammerObj.start.xF = 0;
					hammerObj.start.yF = 0;				
					hammerObj.start.positionXF = '';
					hammerObj.start.positionYF = '';		
					
					hammerObj.end = {};
					hammerObj.end.x = 0;
					hammerObj.end.y = 0;
					hammerObj.end.w = 0;
					hammerObj.end.h = 0;
					hammerObj.end.margin = 0;	
					hammerObj.end.positionX = '';
					hammerObj.end.positionY = '';
					hammerObj.end.size;
									
					hammerObj.end.xF = 0;
					hammerObj.end.yF = 0;				
					hammerObj.end.positionXF = '';
					hammerObj.end.positionYF = '';							
					
					hammerObj.off = {};
					hammerObj.off.x = 0;
					hammerObj.off.y = 0;
					hammerObj.off.w = 0;
					hammerObj.off.h = 0;
					hammerObj.off.margin = 0;	
					hammerObj.off.positionX = '';
					hammerObj.off.positionY = '';
					hammerObj.off.size;
					
					hammerObj.off.xF = 0;
					hammerObj.off.yF = 0;				
					hammerObj.off.positionXF = '';
					hammerObj.off.positionYF = '';		
					
					hammerObj.ratio = {};
					hammerObj.ratio.x = 0;
					hammerObj.ratio.y = 0;
					hammerObj.ratio.w = 0;
					hammerObj.ratio.h = 0;
					hammerObj.ratio.margin = 0;
					
					hammerObj.current = {};
					hammerObj.current.x = 0;
					hammerObj.current.y = 0;
					hammerObj.current.w = 0;
					hammerObj.current.h = 0;
					hammerObj.current.positionX = '';
					hammerObj.current.positionY = '';
					hammerObj.current.margin = 0;			
				
					hammerObj.deltaY = 0;
					hammerObj.deltaX = 0;			
					
					hammerObj.endSuccess = false;
				
				manager.on( 'panstart', function( e ) {				
					hammerObj.initPanDirection = e.direction;
					hammerObj.initPanDirectionText = '';
					hammerObj.currentPanDirection = e.direction;
					hammerObj.currentPanDirectionText = '';
					hammerObj.finalPosition = undefined;
					hammerObj.stopMoving = false;
					
					/*
					hammerObj.start.x = slider.x;
					hammerObj.start.y = slider.y;
					hammerObj.start.w = videoContainer.offsetWidth;
					hammerObj.start.h = hammerObj.start.w * thumbnail.ratio;				
					hammerObj.start.margin = parseInt(window.getComputedStyle(videoContainer).getPropertyValue('margin'));						
					hammerObj.start.positionX = slider.positionX;
					hammerObj.start.positionY = slider.positionY;
					hammerObj.start.size = slider.size;
					*/
					
					console.log(slider.w);
					
					hammerObj.start.x = slider.x;
					hammerObj.start.y = slider.y;
					hammerObj.start.w = slider.w;
					hammerObj.start.h = slider.h;
					hammerObj.start.margin = slider.margin;
					hammerObj.start.positionX = slider.positionX;
					hammerObj.start.positionY = slider.positionY;
					hammerObj.start.size = slider.size;
					
					hammerObj.start.xF = slider.x;
					hammerObj.start.yF = slider.y;			
					hammerObj.start.positionXF = slider.positionX;
					hammerObj.start.positionYF = slider.positionY;
					
					hammerObj.off.w = videoContainer.offsetWidth;
					hammerObj.off.h = hammerObj.off.w * thumbnail.ratio;
					hammerObj.off.margin = parseInt(window.getComputedStyle(videoContainer).getPropertyValue('margin'));	
					hammerObj.off.positionX = slider.positionX;
					hammerObj.off.positionY = slider.positionY;
					hammerObj.off.size = slider.size;				
					
					hammerObj.end.positionX = hammerObj.start.positionX;
					hammerObj.end.positionY = hammerObj.start.positionY;
					hammerObj.end.positionXF = slider.positionX;
					hammerObj.end.positionYF = slider.positionY;
					hammerObj.end.size = "min";
					
					hammerObj.current.x = 0;
					hammerObj.current.y = 0;
					hammerObj.current.w = 0;
					hammerObj.current.h = 0;
					hammerObj.current.positionX = hammerObj.start.positionX;
					hammerObj.current.positionY = hammerObj.start.positionY;
					hammerObj.current.margin = 0;
					
					if( hammerObj.initPanDirection == 2){					
						hammerObj.initPanDirectionText = 'left';
					}else if( hammerObj.initPanDirection == 4) {
						hammerObj.initPanDirectionText = 'right';
					}else if( hammerObj.initPanDirection == 8) {
						hammerObj.initPanDirectionText = 'top';
					}else if( hammerObj.initPanDirection == 16) {
						hammerObj.initPanDirectionText = 'bottom';
					}							
		
				//	 top bottom
					if( hammerObj.initPanDirection == 8 || hammerObj.initPanDirection == 16 ) {				
						hammerObj.end.positionYF = hammerObj.start.positionY == "top" ? "bottom" : "top";
						hammerObj.off.x = 0;				
						hammerObj.off.y = -(videoContainer.offsetHeight + hammerObj.start.margin*2);
						
						hammerObj.end.x = 0;
						if(slider.maxY !== ''){
							console.log('1111');
							if( slider.positionY != slider.maxY ) {
								console.log('2222');
								// max
								hammerObj.end.w = page.width;
								hammerObj.end.h = thumbnail.ratio * hammerObj.end.w;

								// limit w/h
								if(hammerObj.end.h > window.innerHeight){
									hammerObj.end.h = window.innerHeight;
									hammerObj.end.w = hammerObj.end.h * (1/thumbnail.ratio);
								}
							
								hammerObj.end.y = page.height - hammerObj.end.h;
								hammerObj.end.size = "max";
							} else {
								console.log('3333');
								// min							
								hammerObj.end.w = thumbnail.w;
								hammerObj.end.h = thumbnail.ratio * hammerObj.end.w;						
								hammerObj.end.y = page.height - hammerObj.end.h;							
							}
						} else {
							console.log('4444');
							hammerObj.end.w = slider.w;
							hammerObj.end.h = thumbnail.ratio * hammerObj.end.w;
							hammerObj.end.y = page.height - hammerObj.end.h;
						}
					}

				// left right
					if( hammerObj.initPanDirection == 2 || hammerObj.initPanDirection == 4 ) {
						hammerObj.end.positionXF = hammerObj.start.positionX == "left" ? "right" : "left";
						hammerObj.off.x = -(videoContainer.offsetWidth + hammerObj.start.margin*2);
						hammerObj.off.y = 0;					
						
						hammerObj.end.y = 0;
						if(slider.maxX !== ''){
							if( slider.positionX != slider.maxX ) {
								// max
								hammerObj.end.h = page.height;
								hammerObj.end.w = (1/thumbnail.ratio) * hammerObj.end.h;

								// limit w/h
								if(hammerObj.end.w > window.innerWidth){
									hammerObj.end.w = window.innerWidth;
									hammerObj.end.h = hammerObj.end.w * thumbnail.ratio;
								}
								hammerObj.end.x = page.width - hammerObj.end.w < 0 ? 0 : page.width - hammerObj.end.w;
								hammerObj.end.size = "max";
							} else {
								// min
								hammerObj.end.h = slider.h;
								hammerObj.end.w = (1/thumbnail.ratio) * hammerObj.end.h;
								hammerObj.end.x = page.width - hammerObj.end.w;
							}
						} else {
							hammerObj.end.h = slider.h;
							hammerObj.end.w = (1/thumbnail.ratio) * hammerObj.end.h;
							hammerObj.end.x = page.width - hammerObj.end.w;
						}
					}
					
					hammerObj.off.xF = hammerObj.off.x;
					hammerObj.off.yF = hammerObj.off.y;
					hammerObj.off.positionXF = hammerObj.off.positionXF;
					hammerObj.off.positionYF = hammerObj.off.positionYF;
					

					// ---

					if( hammerObj.initPanDirection == 8 || hammerObj.initPanDirection == 16 )
						hammerObj.movementHeight = Math.abs(page.height - thumbnail.h);

					if( hammerObj.initPanDirection == 2 || hammerObj.initPanDirection == 4 )
						hammerObj.movementHeight = Math.abs(page.width - thumbnail.w);

					hammerObj.ratio.x = Math.abs((hammerObj.end.x - hammerObj.start.x) / hammerObj.movementHeight);
					hammerObj.ratio.y = Math.abs((hammerObj.end.y - hammerObj.start.y) / hammerObj.movementHeight);
					hammerObj.ratio.w = Math.abs((hammerObj.end.w - hammerObj.start.w) / hammerObj.movementHeight);
					hammerObj.ratio.h = Math.abs((hammerObj.end.h - hammerObj.start.h) / hammerObj.movementHeight);					
					
					console.log('------------');			
					console.log('startX ' + hammerObj.start.x, ' | startY ' + hammerObj.start.y, ' | startW ' + hammerObj.start.w, ' | startH ' + hammerObj.start.h, ' | startSize ' + hammerObj.start.size, ' | startPositionX ' + hammerObj.start.positionX, ' | startPositionY ' + hammerObj.start.positionY);
					console.log('endX ' + hammerObj.end.x, ' | endY ' + hammerObj.end.y, ' | endW ' + hammerObj.end.w, ' | endH ' + hammerObj.end.h, ' | endSize ' + hammerObj.end.size, ' | endPositionX ' + hammerObj.end.positionX, ' | endPositionY ' + hammerObj.end.positionY);
					console.log('endXF ' + hammerObj.end.xF, ' | endY ' + hammerObj.end.yF, ' | endPositionXF ' + hammerObj.end.positionXF, ' | endPositionYF ' + hammerObj.end.positionYF);
					console.log('offX ' + hammerObj.off.x, ' | offY ' + hammerObj.off.y, ' | offW ' + hammerObj.off.w, ' | offH ' + hammerObj.off.h, ' | offSize ' + hammerObj.off.size, ' | offPositionX ' + hammerObj.off.positionX, ' | offPositionY ' + hammerObj.off.positionY);
					console.log('ratio.x ' + hammerObj.ratio.x, ' | ratio.y ' + hammerObj.ratio.y, ' | ratio.w ' + hammerObj.ratio.w, ' | ratio.h ' + hammerObj.ratio.h);
					console.log('movtHeight ' + hammerObj.movementHeight);
					console.log('------------');
					
					setEndOffContainer(hammerObj);
					
					console.log(hammerObj);
					
					
				});			
				
				manager.on( 'pan', function( e ) {
					// 2-left   4-right-  8-top   16-bottom		
					hammerObj.currentPanDirection = e.direction;
					hammerObj.currentPanDirectionText = ''; 			
					
					if( hammerObj.currentPanDirection == 2){					
						hammerObj.currentPanDirectionText = 'left';
					}else if( hammerObj.currentPanDirection == 4) {
						hammerObj.currentPanDirectionText = 'right';
					}else if( hammerObj.currentPanDirection == 8) {
						hammerObj.currentPanDirectionText = 'top';
					}else if( hammerObj.currentPanDirection == 16) {
						hammerObj.currentPanDirectionText = 'bottom';
					}

					if( hammerObj.initPanDirectionText == "top" || hammerObj.initPanDirectionText == "bottom" ) {							
						swipeV(e, hammerObj);					
					}	
					
					if( hammerObj.initPanDirectionText == "left" || hammerObj.initPanDirectionText == "right" ) {
						if(slider.size !== "max") {				
							swipeH(e, hammerObj);					
						}
					}
			
				});

			}	
					
			function swipeV(e, obj) {				
				
				obj.deltaY = slider.positionY == 'top' ? -e.deltaY : e.deltaY;			
				obj.current.y = obj.start.y + -(obj.ratio.y * obj.deltaY);
				if(slider.positionY == slider.maxY) {
					obj.current.w = (obj.ratio.w * obj.deltaY) + obj.start.w;
				} else {
					obj.current.w = -(obj.ratio.w * obj.deltaY) + obj.start.w;					
				}		
				obj.current.h = (thumbnail.ratio) * obj.current.w;
				
				
				// limit width betwen thumbnail.w and max.w range
				obj.current.w = (obj.current.w >= max.w ? max.w : obj.current.w );	
				obj.current.w = (obj.current.w <= thumbnail.w ? thumbnail.w : obj.current.w );		
				obj.current.h = (thumbnail.ratio) * obj.current.w;
				
				// constraining width / height means that y position ratio doesnt sync correctly with mouse movement				
				// when height reaches min height, change obj.ratio.y to 1 
				if(obj.current.h === thumbnail.h)
					obj.current.y = obj.start.y + -(obj.deltaY);
				
				// y min > y max
				// slider - start min bottom - cannot go above page
				// slider - start min top - cannot go below page
				if( slider.maxY == obj.end.positionYF ) {
					if(obj.current.y >= obj.end.y) {
						obj.stopMoving = true;
						obj.current.y = obj.end.y;
					} else {
						obj.stopMoving = false;
					}
				}

				// y max
				// slider start max bottom - cannot go below page
				// slider start max top - cannot go above page
				if( slider.maxY == obj.end.positionY ) {
					if(obj.current.y < 0) {
						obj.stopMoving = true;
						obj.current.y = 0;
					} else {
						obj.stopMoving = false;
					}
				} else if( slider.maxY == obj.start.positionY ) {
					if(obj.current.y < 0) {
						obj.stopMoving = true;
						obj.current.y = 0;
					} else {
						obj.stopMoving = false;
					}
				} else {
					obj.stopMoving = false;
				}

				videoContainer.style.removeProperty('top');
				videoContainer.style.removeProperty('bottom');
				videoContainer.style.removeProperty('left');
				videoContainer.style.removeProperty('right');		
				setPosition(videoContainer, obj.current, 'swipeV');
				
				// Final Position
				if( slider.positionY == 'top' && e.offsetDirection == 8 ) {
					// console.log('left left');
					// distance to trigger action is half of video height		
					obj.percentage = 100 * ( e.deltaY / obj.current.h );
				} else if( slider.positionY == 'top' && e.offsetDirection == 16 ) {
					// console.log('left right');
					// distance to trigger action is half of page height		
					obj.percentage = 100 * ( e.deltaY / window.innerHeight );
				} else if(slider.positionY == 'bottom' && e.offsetDirection == 16 ) {
					// console.log('right right');
					// distance to trigger action is half of video height		
					obj.percentage = 100 * ( e.deltaY / obj.current.h );
				} else if(slider.positionY == 'bottom' && e.offsetDirection == 8 ) {
					// console.log('right left');
					// distance to trigger action is half of page height
					obj.percentage = 100 * ( e.deltaY / window.innerHeight );
				}
				
				/*-------*/
				// DEBUG
				var finalPosition;	
				if( obj.percentage <= -slider.sensitivity ) {
					finalPosition = obj.start.positionY === 'bottom' ? "end" : "off";					
				} else if( obj.percentage >= slider.sensitivity ) {				
					finalPosition = obj.start.positionY === 'bottom' ? "off" : "end";
				} else {
					finalPosition = "start";
				}				
				
				if( e.velocityY > 1 ) {
					finalPosition = obj.start.positionY === 'bottom' ? "off" : "end";
				} else if( e.velocityY < -1 ) {				
					finalPosition = obj.start.positionY === 'bottom' ? "end" : "off";
				}
				debugSnap(obj, finalPosition);

				/*-------*/
				
				if( e.isFinal && obj.stopMoving === false) {
					var finalPosition;

					if( obj.percentage <= -slider.sensitivity ) {
						console.log('aaa');
						finalPosition = obj.start.positionY === 'bottom' ? "end" : "off";					
					} else if( obj.percentage >= slider.sensitivity ) {				
						console.log('bbb');
						finalPosition = obj.start.positionY === 'bottom' ? "off" : "end";
					} else {
						console.log('ccc');
						finalPosition = "start";
					}

					if(obj.start.positionY === 'bottom') {				
						if( e.velocityY > 1 ) {
							if(obj.current.y > 0 ) { 
								finalPosition = 'start';
							} else {
								finalPosition == "off"
							}
						} else if( e.velocityY < -1 ) {				
							finalPosition = obj.start.positionY === 'bottom' ? "end" : "off";
						}
					}
					
					visionSnap(obj, finalPosition);
				}
			}
			
			function debugSnap(obj, position) {
				console.log
				
				if(position == "end") {			
					endContainer.classList.add( 'can-snap' );	
				} else {
					endContainer.classList.remove( 'can-snap' );	
				}			
			}
			
			function swipeH(e, obj) {
				
				obj.deltaX = slider.positionX == 'left' ? -e.deltaX : e.deltaX;			
				obj.current.x = obj.start.x + -(obj.ratio.x * obj.deltaX);		
				if(slider.positionX == slider.maxX) {
					obj.current.h = (obj.ratio.h * obj.deltaX) + obj.start.h;
				} else {
					obj.current.h = -(obj.ratio.h * obj.deltaX) + obj.start.h;
				}
				obj.current.w = (1/thumbnail.ratio) * obj.current.h;

				// limit width betwen thumbnail.h and max.h range
				obj.current.h = (obj.current.h >= max.h ? max.h : obj.current.h );
				obj.current.h = (obj.current.h <= thumbnail.h ? thumbnail.h : obj.current.h );
				obj.current.w = (1/thumbnail.ratio) * obj.current.h;

				// constraining width / height means that x position ratio doesnt sync correctly with mouse movement
				// when width reaches min width, change obj.ratio.x to 1
				if(obj.current.w === thumbnail.w)
					obj.current.x = obj.start.x + -(obj.deltaX);
				
				// x min > x max
				// slider - start min left - cannot off the page to the right
				// slider - start min right - cannot off the page to the left
				if( slider.maxX == obj.end.positionXF ) {
					if(obj.current.x >= obj.end.x) {
						obj.stopMoving = true;
						obj.current.x = obj.end.x;
					} else {
						obj.stopMoving = false;
					}
				}

				// x max
				// slider start max left - cannot go off the page to the left
				// slider start max right - cannot go off the page to the right
				if( slider.maxX == obj.end.positionX ) {
					if(obj.current.x < 0) {
						obj.stopMoving = true;
						obj.current.x = 0;
					} else {
						obj.stopMoving = false;
					}
				} else if( slider.maxX == obj.start.positionX ) {
					if(obj.current.x < 0) {
						obj.stopMoving = true;
						obj.current.x = 0;
					} else {
						obj.stopMoving = false;
					}
				} else {
					obj.stopMoving = false;
				}
				
				if(obj.start.w == page.width) {
					obj.stopMoving = true;
					obj.current.x = 0;
					obj.current.y = 0;
				}
				
				videoContainer.style.removeProperty('top');
				videoContainer.style.removeProperty('bottom');
				videoContainer.style.removeProperty('left');
				videoContainer.style.removeProperty('right');		
				setPosition(videoContainer, obj.current, 'swipeH');
				
				// Final Position
				if( slider.positionX == 'left' && e.offsetDirection == 2 ) {
					// console.log('left left');
					// distance to trigger action is half of video height		
					obj.percentage = 100 * ( e.deltaX / obj.current.w );
				} else if( slider.positionX == 'left' && e.offsetDirection == 4 ) {
					// console.log('left right');
					// distance to trigger action is half of page height		
					obj.percentage = 100 * ( e.deltaX / window.innerWidth );
				} else if(slider.positionX == 'right' && e.offsetDirection == 4 ) {
					// console.log('right right');
					// distance to trigger action is half of video height		
					obj.percentage = 100 * ( e.deltaX / obj.current.w );
				} else if(slider.positionX == 'right' && e.offsetDirection == 2 ) {
					// console.log('right left');
					// distance to trigger action is half of page height
					obj.percentage = 100 * ( e.deltaX / window.innerWidth );
				}		
				
				/*-------*/
				// DEBUG
				var finalPosition;	
				if( obj.percentage <= -slider.sensitivity ) {
					finalPosition = obj.start.positionX === 'right' ? "end" : "off";					
				} else if( obj.percentage >= slider.sensitivity ) {				
					finalPosition = obj.start.positionX === 'right' ? "off" : "end";
				} else {
					finalPosition = "start";
				}				
				
				if( e.velocityX > 1 ) {
					finalPosition = obj.start.positionX === 'right' ? "off" : "end";
				} else if( e.velocityX < -1 ) {				
					finalPosition = obj.start.positionX === 'right' ? "end" : "off";
				}
				debugSnap(obj, finalPosition);

				/*-------*/
				
				if( e.isFinal && obj.stopMoving === false) {
					var finalPosition;

					if( obj.percentage <= -slider.sensitivity ) {
						console.log('aaa');
						finalPosition = obj.start.positionX === 'right' ? "end" : "off";					
					} else if( obj.percentage >= slider.sensitivity ) {				
						console.log('bbb');
						finalPosition = obj.start.positionX === 'right' ? "off" : "end";
					} else {
						console.log('ccc');
						finalPosition = "start";
					}

					if(obj.start.positionX === 'right') {				
						if( e.velocityX > 1 ) {
							if(obj.current.x > 0 ) { 
								finalPosition = 'start';
							} else {
								finalPosition == "off"
							}
						} else if( e.velocityX < -1 ) {				
							finalPosition = obj.start.positionX === 'right' ? "end" : "off";
						}
					}
					
					visionSnap(obj, finalPosition);
				}			
			}
			
			function eventOrientation() {
				window
				.matchMedia('(orientation: portrait)')
				.addListener(function (m) {
					page.orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';				
				});
			}
			
			function addTableControls() {
				var table = buildTableLinks();
				appendHtml(document.body, table);

				// test elements
				vision_largetosmall 	= document.getElementById("vision_largetosmall");
				vision_showhide 		= document.getElementById("vision_showhide");
				vision_smalltolarge 	= document.getElementById("vision_smalltolarge");
				vision_remove 			= document.getElementById("vision_remove");
				vision_turnon 			= document.getElementById("vision_turnon");
				vision_snapleft 		= document.getElementById("vision_snapleft");
				vision_snapright 		= document.getElementById("vision_snapright");

				// small to large
				vision_smalltolarge.addEventListener('click', () => {
					visionSmalltolarge();
				})

				// large to small
				vision_largetosmall.addEventListener('click', () => {
					visionLargetosmall();
				})

				// remove
				vision_remove.addEventListener('click', () => {
					visionRemove();
				})

				// showhide
				vision_showhide.addEventListener('click', () => {
					visionShowHide();
				})

				// turn on
				vision_turnon.addEventListener('click', () => {
					visionTurnOn();
				})
				
				// snap left
				vision_snapleft.addEventListener('click', () => {
					visionTurnOn();
				})
				
				// snap right
				vision_snapright.addEventListener('click', () => {
					visionTurnOn();
				})
			}

			function setEndOffContainer(obj) {		
				console.log('setEndOffContainer');
				
				offContainer.style.removeProperty('top');
				offContainer.style.removeProperty('bottom');
				offContainer.style.removeProperty('left');
				offContainer.style.removeProperty('right');
				setPosition(offContainer, obj.off, 'setEndOffContainer - off');	
				
				endContainer.style.removeProperty('top');
				endContainer.style.removeProperty('bottom');
				endContainer.style.removeProperty('left');
				endContainer.style.removeProperty('right');			
				setPosition(endContainer, obj.end, 'setEndOffContainer - end');		
			}
			
			function setSliderProperties(container, obj) {		
				Object.keys(obj).map(function(key, index) {
				container.style.setProperty(key, obj[key] );
				});
			}
			
			function setPosition(container, obj, from) {		
				setSliderProperties(container, { [obj.positionX] : obj.x+'px'});
				setSliderProperties(container, { [obj.positionY] : obj.y+'px'});
				setSliderProperties(container, {'width': obj.w+'px', 'height': obj.h+'px', 'margin': obj.margin+'px'});
			}
			
			function visionRemove() {
				if(loaded){
					loaded = false;
					videoElem.pause();		
					videoContainer.classList.remove('open')	
				}
			}
			
			function visionShowHide() {
				videoContainer.classList.toggle('open');
			}
			
			function visionTurnOn() {
				loaded = true;
				changeChannel(skyOneUrl);
				videoContainer.classList.add('open');
			}
			
			function visionLargetosmall() {
				videoContainer.classList.remove('max');
			}
			
			function visionSmalltolarge() {
				videoContainer.classList.add('max');
			}		
		
			function visionSnap(obj, position) {
				console.log('visionSnap');
					
				var g = {};
				
				if(position == "start") {		
					g = obj.start;				
				} else if(position == "end") {						
					g = obj.end;
				} else if(position == "off") {		
					g = obj.off;
				}
				console.log(g);
				
				slider.x = g.xF;
				slider.y = g.yF;
				slider.w = g.w;
				slider.h = g.h;
				
				slider.positionX = g.positionXF;
				slider.positionY = g.positionYF;
				slider.size = g.size;
				
				
				videoContainer.style.removeProperty('top');
				videoContainer.style.removeProperty('bottom');
				videoContainer.style.removeProperty('left');
				videoContainer.style.removeProperty('right');		
				videoContainer.classList.add( 'is-animating' );
				setPosition(videoContainer, g, 'visionSnap');					
				
				/*
				slider.timer = setTimeout( function() {
					if(g.x > 0 || g.y > 0) {
						if(g.x != 0) {					
							g.positionX = obj.end.positionX == 'left' ? 'right' : 'left';
						}				
						if(g.y != 0) {	
							g.positionY = obj.end.positionY == 'top' ? 'bottom' : 'top';
						}				
						g.x = 0;
						g.y = 0;				
					}
					
					slider.positionX = g.positionX;
					slider.positionY = g.positionY;
					slider.size = g.size;
					videoContainer.classList.remove( 'is-animating' );		

					videoContainer.style.removeProperty('top');
					videoContainer.style.removeProperty('bottom');
					videoContainer.style.removeProperty('left');
					videoContainer.style.removeProperty('right');		

					setPosition(videoContainer, g, 'visionSnap - timer');				
					
				}, 400 );
				*/
				
				slider.timer = setTimeout( function() {				
					videoContainer.classList.remove( 'is-animating' );
				}, 400 );
				
			}
			
			function appendHtml(el, str) {
			var div = document.createElement('div');
			div.innerHTML = str;
			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
			}

			function buildTableLinks() {
				var html	= '<table class="vision-commands"><tr><td><a href="" id="vision_largetosmall">Max</a></td><td><a href="" id="vision_smalltolarge">Min</a></td><td><a href="" id="vision_showhide">Show/Hide</a></td><td><a href="" id="vision_snapleft">Left</a></td><td><a href="" id="vision_snapright">Right</a></td><td><a href="" id="vision_remove">Remove</a></td><td><a href="" id="vision_turnon">Turn on</a></td></tr></table>';
							
				return html;
			}

			function changeChannel(url) {
				videoElem.play();	
				
				var hls = new Hls();
				hls.loadSource(url);
				hls.attachMedia(videoElem);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoElem.play();
				});
			}

			return {
				init: init			
			} 
		}
	);

