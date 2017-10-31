define(["libs/hammer/hammer"], function(Hammer) {
    var pageContainer = null,
        snapTimer = null;
        menu = null,
        menuItems = [],
        effect = null,
        currentPageNum = -1,
        totalNumPages = -1,
        switchPageAfterPx = 200;

    function snapToPage(pageIdx) {
        console.log("Snapping to page", pageIdx);
        
        stopSnap();

        //Style
        pageContainer.classList.add("snapping");
        translatePageContainer(null);
        pageContainer.dataset.selectedPage = pageIdx;

        //Stop smooth
        snapTimer = setTimeout(function() {
            pageContainer.classList.remove("snapping");
        }, 700);
    }

    function stopSnap() {
        clearTimeout(snapTimer);
        pageContainer.classList.remove("snapping");
    }

    function translatePageContainer(dist) {
        if (dist !== null) {
            //Store
            var translateX = dist;

            //Style
            pageContainer.style.transform = "translateX(" + translateX + "px)";
        } else {
            pageContainer.style.transform = "";
        }
    }

    function apply() {
        pageContainer = document.querySelector("pages");
        menu = document.querySelector(".navMenu");
        menuItems = menu.querySelectorAll(".navMenuItem");
        effect = menu.querySelector(".effect");

        totalNumPages = menuItems.length;

        switchToPage(1);

        applyCarousel();
        applyNav();
        applySwipe();
    }

    function applyCarousel() {
        var carouselItems = document.querySelectorAll(".carouselItem"),
            carouselBg = document.querySelector(".carouselBackground"),
            carouselBgImg = carouselBg.querySelector("img");

        [].forEach.call(carouselItems, function(carouselItem) {
            carouselItem.addEventListener("click", function() {
                if (carouselItem.classList.contains("race")) {
                    carouselBgImg.src = "Images/Carousel/race.jpg";
                } else if (carouselItem.classList.contains("dog")) {
                    carouselBgImg.src = "Images/Carousel/dog.jpg";
                } else {
                    carouselBgImg.src = "Images/Carousel/trot.jpg";
                }
            });
        });
    }

    function applyNav() {
        [].forEach.call(menuItems, function(menuItem, idx) {
            menuItem.addEventListener("click", function() {
                switchToPage(idx+1);
            });
        });
    }

    function switchToPage(pageNum) {
        currentPageNum = pageNum;

        console.log("Switching to page", currentPageNum);

        [].forEach.call(menuItems, function(menuItem) {
            menuItem.classList.remove("selected");
        });

        var newSelectedItem = menuItems.item(pageNum);
        
        newSelectedItem.classList.add("selected");

        effect.style.left = parseInt(newSelectedItem.offsetLeft) +  "px";

        snapToPage(pageNum);
    }

    function switchToNextPage() {
        if (currentPageNum < totalNumPages) {
            switchToPage(currentPageNum + 1);
        } else {
            switchToPage(currentPageNum);
        }
    }

    function switchToPrevPage() {
        if (currentPageNum > 1) {
            switchToPage(currentPageNum - 1);
        } else {
            switchToPage(currentPageNum);
        }
    }

    function applySwipe() {
        var elem = document.querySelector("pages");

        //Create object to handle any gestures
        var manager = new Hammer.Manager(elem);

        //Create object to handle all pan gestures
        var panner = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 });
        manager.add(panner);

        manager.on("panend", function(event) {
            if (totalDistance > switchPageAfterPx) {
                switchToPrevPage();
            } else if (totalDistance < -switchPageAfterPx) {
                switchToNextPage();
            } else {
                switchToPage(1);
            }
        });

        var elem = document.getElementById("slideOutMenuButton"),
            totalDistance;

        manager.on("panmove", function(event) {
            var dist = event.deltaX;
            translatePageContainer(dist);
            totalDistance = dist;
        });
    }

    function init() {
        
    }

    return {
        init: init,
        apply: apply
    }
});