import {
    FBDB
} from './db/fb.js';
FBDB.InitDB();

var ElMCBtnClose = document.getElementById("modal-comments-btn-close");
var ElMCBtnLogin = document.getElementById("btn-login");


function InitWP() {
    ElMCBtnClose.addEventListener('click', () => closeCommentsModal());
    ElMCBtnLogin.addEventListener('click', () => openLoginModal());
}

function closeCommentsModal() {
    document.getElementById('modal-comments').style.display = "none";
}
export function onclickComments() {}

function openLoginModal(){document.getElementById('modal-login').style.display='block'}
InitWP();