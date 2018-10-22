import {
    FBDB
} from './db/fb.js';
import {showLoading} from './components.js'
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
    var firstname=document.getElementById('inp-firstname').value;
    var surname=document.getElementById('inp-surname').value;
    var nickname=document.getElementById('inp-nickname').value;
    var school=document.getElementById('inp-school').value;
    var grade=document.getElementById('sel-grade').value;
    
}
export function onclickComments() {}

InitWP();