import {
    FBDB
} from './db/fb.js';
import {showLoading} from './components.js'
FBDB.InitDB();

var ElMCommentsBtnClose = document.getElementById("modal-comments-btn-close");
var ElBtnLogin = document.getElementById("btn-login");
var ElMLoginBtnClose = document.getElementById("modal-login-btn-close");
var ElMLoginBtnLLogin=document.getElementById("modal-login-btn-login");
var ElPLogin=document.getElementById("page-login");
function InitWP() {
    ElMCommentsBtnClose.addEventListener('click', () => closeCommentsModal());
    ElBtnLogin.addEventListener('click', () => openLoginModal());
    ElMLoginBtnClose.addEventListener('click',()=>closeMLogin());
    ElMLoginBtnLLogin.addEventListener('click',()=>Login());
}

function closeCommentsModal() {
    document.getElementById('modal-comments').style.display = "none";
}
export function onclickComments() {}

function openLoginModal() {
    document.getElementById('modal-login').style.display = 'block'
}
function closeMLogin(){
    document.getElementById('modal-login').style.display = 'none'
}
function closePLogin(){
    ElPLogin.style.display='none';
}
function Login(){    
    closeMLogin();
    closePLogin();
    showLoading();
    var password=document.getElementById('i-password').value;
    var username=document.getElementById('i-username').value;
    FBDB.SignIn(username,password);
}
InitWP();