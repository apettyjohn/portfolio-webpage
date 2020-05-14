const height = document.height;
const width = document.width;


window.addEventListener('DOMContentLoaded', () => {
    assignGridAreas();
    stackPanels();

    document.querySelector('#flag-text').addEventListener('click', hideShowFlag());
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
    
}
