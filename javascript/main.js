import {
    FBDB
} from './db/fb.js';
import {showLoading} from './components.js';
import {userO} from './objects.js';
window.onload=FBDB.InitDB;

var ElMCommentsBtnClose = document.getElementById("modal-comments-btn-close");
var ElBtnNewUser = document.getElementById("btn-new-user");
function InitWP() {
    ElMCommentsBtnClose.addEventListener('click', () => closeCommentsModal());    
    ElBtnNewUser.addEventListener('click', () => saveNewUser());    
}

function closeCommentsModal() {
    document.getElementById('modal-comments').style.display = "none";
}
function saveNewUser(){
    userO.firstname=document.getElementById('inp-firstname').value;
    userO.surname=document.getElementById('inp-surname').value;
    userO.nickname=document.getElementById('inp-nickname').value;
    userO.school=document.getElementById('inp-school').value;
    userO.grade=document.getElementById('sel-grade').value;
    
}
export function onclickComments() {}

InitWP();