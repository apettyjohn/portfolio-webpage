
const height = window.innerHeight;
const width = window.innerWidth;


window.addEventListener('DOMContentLoaded', () => {
    assignGridAreas();
    stackPanels();

    document.querySelector('#flag-text').addEventListener('click', hideShowFlag);
    document.querySelector('#flag-text').addEventListener('mouseenter', () => {
        arrowAnimation(0.4, 7)
    });
    document.querySelector('.fa-smile').addEventListener('click', (event) => {
        const icon = event.target;
        icon.classList.remove('fa-smile');
        icon.classList.add('fa-smile-beam');
        setTimeout(function () {
            const icon = event.target;
            icon.classList.remove('fa-smile-beam');
            icon.classList.add('fa-smile');
        }, 1000);

    });

    buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i ++){
        buttons[i].innerText
        if (buttons[i].innerText == "Connect"){
            buttons[i].addEventListener('click', hideShowFlag);
        };
        if (buttons[i].innerText == 'Works'){
            buttons[i].addEventListener('click', () => {
                let scrollHeight = getComputedStyle(document.querySelector(".panel")).height;
                console.log(scrollHeight);
                window.scrollTo(0, Number(scrollHeight.slice(0,scrollHeight.length - 2)) - 5);
            });
        }
        if (buttons[i].innerText == 'About'){
            buttons[i].addEventListener('click', () => {
                window.scrollTo(0, height * 2);
            });
        }
    };
    
    arrowAnimation(1, 10);
});

function assignGridAreas() {
    let navButtons = document.getElementsByClassName('nav-button');
    for (var i = 0; i < navButtons.length; i ++) {
        let iconName = navButtons[i].innerText.toLowerCase();
        navButtons[i].style.setProperty('grid-area', iconName);
    };
    let menuElements = document.getElementById('menu').children;
    console.log(menuElements);
    for (var i = 0; i < menuElements.length; i ++) {
        console.log(menuElements[i].dataset.area);
        menuElements[i].style.setProperty('grid-area', menuElements[i].dataset.area);    
    };
}

function stackPanels() {
    const panels = document.getElementsByClassName('panel');
    for (var i = 0; i < panels.length; i ++) {
        let panel = panels[i];
        let stackOrder = panels.length - Number(panel.dataset.order);
        panel.style.zIndex = `${stackOrder}`;
        panel.style.setProperty('background-color', panel.dataset.color);
    };
}

function arrowAnimation(duration, distance){
    const arrows = document.querySelectorAll('#flag-text > .fas');
    let margin = getComputedStyle(arrows[0]).getPropertyValue('margin-left');
    const start = Number(margin.slice(0,margin.length - 2));
    moveArrows(arrows, start, distance, duration, false);

    function moveArrows(array, start, distance, duration, halfway) {
    const frameRate = 5;
    let increment = (2 * distance) / ((duration * 1000) / frameRate);
    if (halfway === true) {
        if (increment > 0) {
            increment = 0 - increment;
        };
    };

    for (var i=0;i<array.length;i++){
        arrow = array[i];
        marginString = getComputedStyle(arrow).getPropertyValue('margin-left');
        margin = Number(marginString.slice(0,marginString.length - 2));
        arrow.style.setProperty('margin-left', (margin + increment).toString() + "px");
    };

    margin = Number(getComputedStyle(arrow).getPropertyValue('margin-left').slice(0,getComputedStyle(arrow).getPropertyValue('margin-left').length - 2));
    if (margin >= (start + distance)){
        halfway = true;
    } else if (margin <= start){
        return;
    };

    setTimeout(function () {moveArrows(array, start, distance, duration, halfway)}, frameRate);
    }
    return true;

}

function hideShowFlag() {
    const menu = document.querySelector('#container');
    const menuStyles = getComputedStyle(menu);
    const menuLeft = Number(menuStyles.getPropertyValue('left').slice(0,menuStyles.getPropertyValue('left').length - 2));
    if (menuLeft < 0) {
        switchMenuState(1, "expand")
    } else {
        switchMenuState(1, "collapse")
    };
}

function switchMenuState(count, state){

    const menu = document.querySelector('#container')
    const menuStyles = getComputedStyle(menu);
    const flag = document.querySelector('#flag')
    const flagStyles = getComputedStyle(flag);
    const menuWidth = Number(menuStyles.getPropertyValue('width').slice(0,menuStyles.getPropertyValue('width').length - 2)) + Number((2 * menuStyles.getPropertyValue('padding').slice(0,menuStyles.getPropertyValue('padding').length - 2)));
    const arrows = document.querySelectorAll('#flag-text > .fas');
    const timeFrame = 5;

    let flagDist = Number(flagStyles.getPropertyValue('left').slice(0,flagStyles.getPropertyValue('left').length - 2));
    let distance = Number(menuStyles.getPropertyValue('left').slice(0,menuStyles.getPropertyValue('left').length - 2));
    
    if (state == "expand"){
        maxVelocity = 3;
    } else if (state == "collapse"){
        maxVelocity = -3;
    };

    if (count <= menuWidth / Math.abs(maxVelocity)) {
        increment = count * (maxVelocity / (menuWidth / Math.abs(maxVelocity)));
    } else if (count > menuWidth / Math.abs(maxVelocity)) {
        increment = count * (-1 * maxVelocity / (menuWidth / Math.abs(maxVelocity))) + (2 * maxVelocity);
    };

    //console.log(distance, flagDist, count, increment, state);
    switch (state) {
        case("expand"):
            if (distance >= 0 || increment <= 0){
                menu.style.setProperty('left', "0px");
                flag.style.setProperty('left', (menuWidth.toString() + "px"));
                for (var i = 0;i < arrows.length;i++){
                    arrows[i].classList.remove('fa-caret-right');
                    arrows[i].classList.add('fa-caret-left');
                };
                return;
            } else if (distance < 0){
                menu.style.setProperty('left', ((distance + increment).toString() + "px"));
                flag.style.setProperty('left', ((flagDist + increment).toString() + "px"));
            };
            break;
        case("collapse"):
            if (distance <= (0 - menuWidth) || increment >= 0){
                menu.style.setProperty('left', ((-1 * menuWidth).toString() + "px"));
                flag.style.setProperty('left', "0px");
                for (var i = 0;i < arrows.length;i++){
                    arrows[i].classList.remove('fa-caret-left');
                    arrows[i].classList.add('fa-caret-right');
                };
                return;
            } else if (distance > (0 - menuWidth)){
                menu.style.setProperty('left', ((distance + increment).toString() + "px"));
                flag.style.setProperty('left', ((flagDist + increment).toString() + "px"));
            };
            break;
        default:
            console.log("menu is in an invalid state");
            return;
    };

    setTimeout(function () {switchMenuState(count + 1, state)}, timeFrame);
}

