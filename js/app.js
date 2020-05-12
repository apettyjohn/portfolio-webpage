const height = document.height;
const width = document.width;


document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#face').addEventListener('animationend', () => {
        navbar = document.getElementsByClassName('navbar')
        console.log(navbar)
        for (var item = 0; item < navbar.length; item++) {
            navbar[item].style.visibility = 'visible';
        }
        
    });
    document.querySelector('#face').style.animationPlayState = 'running';
})