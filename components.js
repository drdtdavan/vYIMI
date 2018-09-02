import {
  onclickComments
} from './main.js'
import {
  FBDB
} from './db/fb.js';
import { homeOptO } from './objects.js';

const ELHomeHeader = document.getElementById('home-header');
const ELHomeBody = document.getElementById('home-body');
const ELComments = document.getElementById('comments');
const ELPageHome=document.getElementById('page-home');
const ELPageLogin=document.getElementById('page-login');

export function showLoginPage(){
ELPageLogin.style.display='block';
ELPageHome.style.display='none';
}
function createCard(data) {
  var card = document.createElement("div");
  card.className = 'card container';
  card.innerHTML =
    `<div class='card header'>
   <img class='avatar' src=${data.profileUrl}>
   <div>
     <p class='card header lb'>${data.nickname}</p>
     <p class='card header m'>${data.school}</p>
     <p class='card header m'>${data.grade}</p>
   </div>
 </div>
 <p class="card title">${data.title}</p>
 <div class="card body"><img src=${data.picUrl}><p class="pmath">${data.body}</p></div>
 <div class="card footer">
   <button class="reply">
     <span class="icon-reply"></span>
     Reply
   </button>
   <button class="comments">
     <span class="icon-comments"></span>Comments
   </button>
 </div>`;
  return card;
}

function showHomeLoading() {
  document.getElementById("spinner").style.display = "flex";
}

function hideHomeLoading() {
  document.getElementById("spinner").style.display = "none";
}

export function updateHomeHeader(){
  document.getElementById('hSchool').textContent=homeOptO.school;
  document.getElementById('hGrade').textContent=homeOptO.grade;
  document.getElementById('hSubject').textContent=homeOptO.subject;

}
export async function createHomePage() {
  ELPageHome.style.display="flex";
  showHomeLoading();
  ELComments.style.display = "none";
  ELHomeBody.style.display = "";
  var querySnapshot = await FBDB.getDBHome();
  hideHomeLoading();
  ELHomeBody.innerHTML = "";
 
  querySnapshot.forEach(doc => {
    var data = doc.data()
    var card = createCard(data);
    card.getElementsByClassName('comments')[0].addEventListener('click', () => onclickComments(data.subject, data.grade, data.topicid));
    console.log(card.getElementsByClassName('comments'));
    ELHomeBody.appendChild(card);
    ELHomeBody.appendChild(document.createElement('br'));
  });
  parse(ELHomeBody.getElementsByClassName("pmath"));
}

function exitComments(scrollTop) {
  ELComments.style.display = "none";
  ELHomeBody.style.display = "";
  document.getElementsByTagName('main')[0].scrollTop = scrollTop;

}
export async function createCommentsPage(subject, grade, topicid) {
  var scrollTop = document.getElementsByTagName('main')[0].scrollTop;
  showHomeLoading();
  ELComments.style.display = "";
  ELHomeBody.style.display = "none";
  var querySnapshot = await FBDB.getDBComments(subject, grade, topicid);
  hideHomeLoading();
  var commentHeader = document.createElement('div');
  commentHeader.style.display = "flex";
  var commentBackButton = document.createElement('button');
  commentBackButton.addEventListener('click', () => exitComments(scrollTop))
  commentBackButton.textContent = " <";
  commentBackButton.className = "back-comments"
  ELComments.innerHTML = "";
  commentHeader.appendChild(commentBackButton);
  ELComments.appendChild(commentHeader);
  querySnapshot.forEach(doc => {
    var data = doc.data()
    var card = createCard(data);
    ELComments.appendChild(card);
    ELComments.appendChild(document.createElement('br'));
  });
  parse(document.getElementById('comments').getElementsByClassName("pmath"));
}


function parse(nodelist) {
  console.log(nodelist);
  for (let child of nodelist) {
    M.parseMath(child);
  }
}