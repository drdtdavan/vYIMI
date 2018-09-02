import {
    userO,
    homeOptO
} from '../objects.js'
import {
    updateHomeHeader,
    createHomePage,
    showLoginPage
} from '../components.js'
export class FBDB {

    static InitDB() {

        this.config = {
            apiKey: "AIzaSyAKNXfgIH5O82jNFw7UFS-umPvjt4u_5us",
            authDomain: "yimikusasa.firebaseapp.com",
            databaseURL: "https://yimikusasa.firebaseio.com",
            projectId: "yimikusasa",
            storageBucket: "yimikusasa.appspot.com",
            messagingSenderId: "426917757022"
        };
        firebase.initializeApp(this.config);
        firebase.firestore().enablePersistence().then(() => {
            this.db = firebase.firestore()
        })
        if (!firebase.auth.Auth.currentUser) {
           showLoginPage();
        } else {
            createHomePage()
        }
    }



    static getDBHome() {
        return this.db.collection("topics-Maths")
            .get()

    }
    static getDBComments(subject, grade, topicid) {
        return this.db.collection(`topics-${subject}-${grade}/${topicid}/comments`)
            .get()

    }

    static getUser(uid) {
        console.log(userO);
        this.db.collection('users').doc(uid).get().then((UO) => {
            Object.assign(userO, UO.data());
            homeOptO.grade = userO.grade;
            homeOptO.school = userO.school;
            homeOptO.subject = 'Maths';
            updateHomeHeader();
        })
    }
    static SignIn(email, password) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userC) => {
                this.getUser(userC.user.uid);
                createHomePage()
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage);
            });
    }
}