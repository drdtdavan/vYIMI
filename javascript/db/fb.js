import {
    userO,
    homeOptO
} from '../objects.js'
import {
    updateHomeHeader,
    createHomePage,
    showNewUserPage,
    hideLoading,
    showLoading
} from '../components.js'
export class FBDB {

    static InitDB() {
        this.config = {
            apiKey: "AIzaSyBju6njNYfjon_6jv7z8XOAbVl25w2nYOs",
            authDomain: "yimi-vanilla.firebaseapp.com",
            databaseURL: "https://yimi-vanilla.firebaseio.com",
            projectId: "yimi-vanilla",
            storageBucket: "yimi-vanilla.appspot.com",
            messagingSenderId: "191754954339"
        };
        firebase.initializeApp(this.config);
        firebase.firestore().enablePersistence().then(() => {
           
        })
        firebase.auth().onAuthStateChanged((userA) => {
            if (!userA) {
                var provider = new firebase.auth.GoogleAuthProvider();
                showLoading();
                firebase.auth().signInWithRedirect(provider).then(()=>hideLoading());

            } else {
                console.log(userA);
                userO.uid = userA.uid;

                if (FBDB.isOldUser()) {
                   console.log("this is a old user"); //createHomePage();
                } else {
                    showNewUserPage();
                }

            }

        })
    }


    static isOldUser() {
        firebase.firestore().collection('users')
            .doc(userO.uid)
            .get()
            .then((UO) => {
                return UO.exists;
            });
    }
    static getDBHome() {
        return firebase.firestore().collection("topics-Maths")
            .get()

    }
    static getDBComments(subject, grade, topicid) {
        return firebase.firestore().collection(`topics-${subject}-${grade}/${topicid}/comments`)
            .get()

    }

    static getUser(uid) {
        console.log(userO);
        firebase.firestore().collection('users').doc(uid).get().then((UO) => {
            Object.assign(userO, UO.data());
            homeOptO.grade = userO.grade;
            homeOptO.school = userO.school;
            homeOptO.subject = 'Maths';
            updateHomeHeader();
        })
    }

    static saveNewUser() {
        firebase.firestore().collection('users')
            .doc(userO.uid)
            .set(userO)
            .then(() => createHomePage())
    }
    /*     static SignIn(email, password) {
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
        } */
}