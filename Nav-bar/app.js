const navToggle = document.querySelector('.btn');
const links = document.querySelector('.links');

navToggle.addEventListener('click',(e) => {
    links.classList.toggle('nav-links');
})