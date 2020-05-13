const height = document.height;
const width = document.width;


document.addEventListener('DOMContentLoaded', () => {
    assignGridAreas();
    stackPanels();
 
});


function assignGridAreas() {
    let navButtons = document.getElementsByClassName('nav-button');
    console.log(navButtons);
    for (var i = 0; i < navButtons.length; i ++) {
        let iconName = navButtons[i].innerText.toLowerCase();
        console.log(iconName)
        navButtons[i].style.gridArea = iconName;
    };
}

function stackPanels() {
    const panels = document.getElementsByClassName('panel');
    console.log(panels);
    for (var i = 0; i < panels.length; i ++) {
        let panel = panels[i];
        let stackOrder = panels.length - Number(panel.dataset["order"]);
        panel.style.zIndex = `${stackOrder}`;
        panel.style.backgroundColor = panel.dataset["color"];
    };
}