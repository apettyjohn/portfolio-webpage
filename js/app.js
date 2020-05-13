const height = document.height;
const width = document.width;


document.addEventListener('DOMContentLoaded', () => {
    face = document.querySelector('#face');
    face.style.animationName = 'shrink';
    face.style.animationPlayState = 'running';
    document.querySelector('#face').addEventListener('animationend', () => {
        document.querySelector('#container').style.width = '12%';

        face.style.animationName = '';
        face.style.width = '100%';
        face.style.marginTop = '0px';

        navbar = document.querySelector('.navbar')
        navbar.style.visibility = 'visible';
        
    });  
})