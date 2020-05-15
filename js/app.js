
const height = document.height;
const width = document.width;


window.addEventListener('DOMContentLoaded', () => {
    assignGridAreas();
    stackPanels();

    document.querySelector('#flag-text').addEventListener('click', () => {
        hideShowFlag(event)
    });
    document.querySelector('#flag-text').addEventListener('mouseenter', () => {
        arrowAnimation(0.5, 8)
    });
    
    const arrows = document.getElementsByClassName('fa-caret-right');
    for (var i=0;i < arrows.length;i++){
        arrows[i].style.marginLeft = '18px';
    };
    arrowAnimation(1, 10);
});

function assignGridAreas() {
    let navButtons = document.getElementsByClassName('nav-button');
    for (var i = 0; i < navButtons.length; i ++) {
        let iconName = navButtons[i].innerText.toLowerCase();
        console.log(iconName)
        navButtons[i].style.gridArea = iconName;
    };
}

function stackPanels() {
    const panels = document.getElementsByClassName('panel');
    for (var i = 0; i < panels.length; i ++) {
        let panel = panels[i];
        let stackOrder = panels.length - Number(panel.dataset["order"]);
        panel.style.zIndex = `${stackOrder}`;
        panel.style.backgroundColor = panel.dataset["color"];
    };
}

function arrowAnimation(duration, distance){
    const arrows = document.getElementsByClassName('fa-caret-right');
    let margin = arrows[0].style.marginLeft;
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
        margin = arrow.style.marginLeft;
        arrow.style.marginLeft = (Number(margin.slice(0,margin.length - 2)) + increment).toString() + "px";
    };

    margin = Number(arrow.style.marginLeft.slice(0,arrow.style.marginLeft.length - 2));
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
    let leftDist = getComputedStyle(document.querySelector('#flag')).getPropertyValue('left');
    let menuWidth = getComputedStyle(document.querySelector('#container')).getPropertyValue('width');
    console.log(leftDist, menuWidth);
    const time = 1;
    switch (leftDist) {
        case "0px":
            expandMenu(time, 1);
        case menuWidth:
            collapseMenu(time);
        default:
            console.log("menu is in an inbetween state");
    }
}

function expandMenu(time, count){

    const menu = document.querySelector('#container')
    const menuStyles = getComputedStyle(menu);
    const flag = document.querySelector('#flag')
    const flagStyles = getComputedStyle(flag);
    const menuWidth = Number(menuStyles.getPropertyValue('width').slice(0,menuStyles.getPropertyValue('width').length - 2)) + Number((2 * menuStyles.getPropertyValue('padding').slice(0,menuStyles.getPropertyValue('padding').length - 2)));
    let flagDist = Number(flagStyles.getPropertyValue('left').slice(0,flagStyles.getPropertyValue('left').length - 2));
    let distance = Number(menuStyles.getPropertyValue('left').slice(0,menuStyles.getPropertyValue('left').length - 2));
    const maxVelocity = 4;
    const timeFrame = 5;
    const iterations = (time * 1000) / timeFrame;
    if (count <= menuWidth / maxVelocity) {
        increment = count * (maxVelocity / (menuWidth / maxVelocity));
    } else if (count > menuWidth / maxVelocity) {
        increment = count * (-1 * maxVelocity / (menuWidth / maxVelocity)) + (2 * maxVelocity);
    };
    

    console.log(distance, count, increment);

    if (distance >= 0 || increment <= 0){
        menu.style.setProperty('left', "0px");
        flag.style.setProperty('left', (menuWidth.toString() + "px"));
        return;
    } else if (distance < 0){
        menu.style.setProperty('left', ((distance + increment).toString() + "px"));
        flag.style.setProperty('left', ((flagDist + increment).toString() + "px"));
    };

    setTimeout(function () {expandMenu(time, count + 1)}, timeFrame);
}

