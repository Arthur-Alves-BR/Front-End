'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const button = document.querySelector('.show-modal');
const close_modal = document.querySelector('.close-modal');

button.addEventListener('click', () => {
    toggleElements();
});

overlay.addEventListener('click', () => {
    toggleElements();
});

close_modal.addEventListener('click', () => {
    toggleElements();
});

document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape') {
        if (!modal.classList.contains('hidden')) {
            toggleElements();
        }
    }
});

function toggleElements() {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}
