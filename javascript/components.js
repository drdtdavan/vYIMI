import {
  onclickComments
} from './main.js'
import {
  FBDB
} from './db/fb.js';
import { homeOptO } from './objects.js';

const ELHomeHeader = document.getElementById('home-header');
const ELHomeContent = document.getElementById('home-content');
const ELComments = document.getElementById('modal-comments');
const ELPageHome=document.getElementById('page-home');
const ELNewUser=document.getElementById('new-user');


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

export function showLoading() {
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
  showLoading();
  ELPageHome.style.display="flex";
  
  ELComments.style.display = "none";
  ELHomeContent.style.display = "";
  var querySnapshot = await FBDB.getDBHome();
  hideHomeLoading();
  ELHomeContent.innerHTML = "";
 
  querySnapshot.forEach(doc => {
    var data = doc.data()
    var card = createCard(data);
    card.getElementsByClassName('comments')[0].addEventListener('click', () => onclickComments(data.subject, data.grade, data.topicid));
    console.log(card.getElementsByClassName('comments'));
    ELHomeContent.appendChild(card);
    ELHomeContent.appendChild(document.createElement('br'));
  });
  parse(ELHomeContent.getElementsByClassName("pmath"));
}

function exitComments(scrollTop) {
  ELComments.style.display = "none";
  ELHomeContent.style.display = "";
  document.getElementsByTagName('main')[0].scrollTop = scrollTop;

}
export async function createCommentsPage(subject, grade, topicid) {
  var scrollTop = document.getElementsByTagName('main')[0].scrollTop;
  showLoading();
  ELComments.style.display = "";
  ELHomeContent.style.display = "none";
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
export function showNewUserPage(){ 
ELPageHome.style.display="none";
ELNewUser.style.display="flex";
}