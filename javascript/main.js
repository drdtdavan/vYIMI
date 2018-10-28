import {
    FBDB
} from './db/fb.js';
import {
    showLoading
} from './components.js';
import {
    userO
} from './objects.js';
window.onload = FBDB.InitDB();

var ElMCommentsBtnClose = document.getElementById("modal-comments-btn-close");
var ElBtnNewUser = document.getElementById("btn-new-user");

function InitWP() {
    ElMCommentsBtnClose.addEventListener('click', () => closeCommentsModal());
    ElBtnNewUser.addEventListener('click', () => saveNewUser());
}

function closeCommentsModal() {
    document.getElementById('modal-comments').style.display = "none";
}

function saveNewUser() {
    var firstname = document.getElementById('inp-firstname').value;
    var surname = document.getElementById('inp-surname').value;
    var nickname = document.getElementById('inp-nickname').value;
    var school = document.getElementById('inp-school').value;
    var grade = document.getElementById('sel-grade').value;
    if (firstname && surname && nickname && school && grade) {
        userO.firstname = firstname;
        userO.surname = surname;
        userO.nickname = nickname;
        userO.school = school;
        userO.grade = grade;
        FBDB.saveNewUser();
    } else showErrorModal("Fill in the empty fields")
}
function showErrorModal(msg){
    var x = document.getElementById("snackbar");
    x.innerText=msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
export function onclickComments() {}

InitWP();