import {
    FBDB
} from '/db/fb.js';
import {showLoading} from './components.js'
FBDB.InitDB();

var ElMCommentsBtnClose = document.getElementById("modal-comments-btn-close");
function InitWP() {
    ElMCommentsBtnClose.addEventListener('click', () => closeCommentsModal());    
}

function closeCommentsModal() {
    document.getElementById('modal-comments').style.display = "none";
}
export function onclickComments() {}

InitWP();