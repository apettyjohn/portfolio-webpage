const height = document.height;
const width = document.width;


document.addEventListener('DOMContentLoaded', () => {
    assignGridAreas();
 
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

