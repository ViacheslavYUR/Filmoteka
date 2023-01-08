// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  // connectAuthEmulator,
} from 'firebase/auth';

import { getDatabase, ref, set, child, get, update } from 'firebase/database';

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCrjIQ-i-DV-fkmDO-FB_HdRZGKiM7ste8',
  authDomain: 'filmoteka-project9.firebaseapp.com',
  projectId: 'filmoteka-project9',
  storageBucket: 'filmoteka-project9.appspot.com',
  messagingSenderId: '1031272501813',
  appId: '1:1031272501813:web:a2ca2d3955cbe4cf9a577c',
  measurementId: 'G-1NQ8JF0W90',
  databaseURL:
    'https://filmoteka-project9-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const auth = getAuth(firebaseApp);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(firebaseApp);

export const dbRef = ref(db);

// ================= запуск локального эмулятора =================

//из это папки >>> C:\Filmoteka
//запуск хоcтинга >>> firebase serve --only hosting
//запуск эмулятора >>> firebase emulators:start --only auth

// connectAuthEmulator(auth, 'http://localhost:9099/');

// ============================================================================

const refs = {
  btnCloseModal: document.querySelector('[data-signInModal-close]'),
  btnSignIn: document.querySelector('#signInModalOpen'),
  btnLogOut: document.querySelector('#logoutBtn'),
  btnLoginWithPhone: document.querySelector('#LogInWithPhoneBtn'),
  btnPhoneLogin: document.querySelector('#LogInPhone'),
  btnGoogleLogin: document.querySelector('#googleLoginBtn'),
  btnLoginWithEmail: document.querySelector('#loginWithEmailBtn'),
  btnLoginEmail: document.querySelector('#loginEmailBtn'),
  btnSignUpWithEmail: document.querySelector('#SignUpWitnEmailBtn'),
  btnSignUpEmail: document.querySelector('#SignUpBtn'),
  btnConfirmEmail: document.querySelector('#ConfirmEmail'),

  backdrop: document.querySelector('[data-signInModal]'),
  navigation: document.querySelector('.navigation__list'),
  boxUser: document.querySelector('.user__box'),
  boxSignInModal: document.querySelector('.signInModal__box'),
  boxSignInWithEmailModal: document.querySelector(
    '.signInModal__signInWithEmail'
  ),
  boxSignUpWithEmail: document.querySelector('.signInModal__signUpWithEmail'),
  boxLogInWithPhone: document.querySelector('.signInModal__LogInWithPhone'),
  boxRecaptcha: document.querySelector('.recaptcha-container'),

  loginEmail: document.querySelector('#email'),
  loginPassword: document.querySelector('#password'),
  signUpEmail: document.querySelector('#emailSignUp'),
  signUpPassword: document.querySelector('#passwordSignUp'),
  loginPhone: document.querySelector('#phone'),
  loginPhoneCode: document.querySelector('#loginPhoneCode'),
  modal: document.querySelector('[data-signInModal]'),
  userName: document.querySelector('.user__name'),
  formField: document.querySelector('.auth-form__field'),
  formTitle: document.querySelector('.auth-form__title'),
  body: document.querySelector('body'),
};

// close Modal Func auth =====================================================================================

const closeModalFunc = () => {
  refs.btnCloseModal.addEventListener('click', () => {
    refs.backdrop.classList.add('backdrop--hidden');
    refs.body.classList.remove('scroll-hidden');
  });

  window.addEventListener('keydown', e => {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;
    if (isEscKey) {
      refs.backdrop.classList.add('backdrop--hidden');
      refs.body.classList.remove('scroll-hidden');
    }
  });

  refs.backdrop.addEventListener('click', e => {
    if (event.currentTarget === event.target) {
      refs.backdrop.classList.add('backdrop--hidden');
      refs.body.classList.remove('scroll-hidden');
    }
  });

  if (refs.backdrop.classList.contains('backdrop--hidden')) {
    refs.btnCloseModal.removeEventListener('click', () => {
      refs.backdrop.classList.add('backdrop--hidden');
      refs.body.classList.remove('scroll-hidden');
    });

    window.removeEventListener('keydown', e => {
      const ESC_KEY_CODE = 'Escape';
      const isEscKey = e.code === ESC_KEY_CODE;
      if (isEscKey) {
        refs.backdrop.classList.add('backdrop--hidden');
        refs.body.classList.remove('scroll-hidden');
      }
    });

    refs.backdrop.removeEventListener('click', e => {
      if (event.currentTarget === event.target) {
        refs.backdrop.classList.add('backdrop--hidden');
        refs.body.classList.remove('scroll-hidden');
      }
    });
  }
};

// monitor Auth State =====================================================================================

const monitorAuthState = async () => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        // console.log(user);

        switch (true) {
          case user.displayName !== null && user.photoURL !== null:
            refs.boxUser.innerHTML = `<img class="user__img" src= ${user.photoURL} alt="" />
                                  <div class="user__info"><p class="user__greeting">Good to see You again</p>
                                  <p class="user__name"> ${user.displayName}</p></div>`;
            break;

          case user.displayName === null && user.photoURL === null:
            refs.boxUser.innerHTML = `<p class="user__greeting">Good to see You again</p>
                                  <p class="user__name">Logged in as ${user.email}</p>`;
            break;

          default:
            break;
        }
        refs.navigation.innerHTML = `<li class="navigation__item">
          <a class="navigation__link navigation__link--current" href="./index.html">HOME</a>
        </li>
        <li class="navigation__item">
          <a class="navigation__link" href="./my-library.html">MY LIBRARY</a>
        </li>`;

        refs.btnSignIn.classList.add('visually-hidden');
        refs.btnLogOut.classList.remove('visually-hidden');
        refs.backdrop.classList.add('backdrop--hidden');
        refs.btnLogOut.addEventListener('click', logOut);
        refs.btnSignIn.removeEventListener('click', onbtnSignInClick);
        refs.body.classList.remove('scroll-hidden');
      } else {
        refs.boxUser.innerHTML = `<p class="user__name">Hello Stranger</p>`;
        refs.navigation.innerHTML = ``;
        refs.btnSignIn.classList.remove('visually-hidden');
        refs.btnLogOut.classList.add('visually-hidden');
        refs.btnLogOut.removeEventListener('click', logOut);
        refs.btnSignIn.addEventListener('click', onbtnSignInClick);
      }
    });
  } catch (error) {
    showLoginError(error);
  }
};

monitorAuthState();

// on btn SignIn Click =====================================================================================

const onbtnSignInClick = e => {
  event.preventDefault();
  refs.backdrop.classList.remove('backdrop--hidden');
  refs.btnGoogleLogin.addEventListener('click', onBtnGoogleLoginClick);
  refs.btnLoginWithEmail.addEventListener('click', onbtnLoginWithEmailClick);
  refs.btnSignUpWithEmail.addEventListener('click', onBtnSignUpWithEmailClick);
  refs.body.classList.add('scroll-hidden');
  closeModalFunc();
};

const logOut = async () => {
  await signOut(auth);
  document.location.href = 'index.html';
};

// show Login Error =====================================================================================

const showLoginError = error => {
  if (error.message == 'Firebase: Error (auth/wrong-password).') {
    alert('Wrong password, Try again');
  }
  if (error.message == 'Firebase: Error (auth/invalid-email).') {
    alert(`Invalid email, Try again`);
  } else {
    alert(`${error.message}`);
  }
};

// create Account  =====================================================================================

const onBtnSignUpWithEmailClick = () => {
  refs.btnGoogleLogin.removeEventListener('click', onBtnGoogleLoginClick);
  refs.btnLoginWithEmail.removeEventListener('click', onbtnLoginWithEmailClick);
  refs.btnLoginEmail.removeEventListener('click', loginEmailPasspord);
  refs.btnSignUpEmail.addEventListener('click', createAccount);
  refs.boxSignUpWithEmail.classList.remove('visually-hidden');
  refs.boxSignInModal.classList.add('visually-hidden');
};

const createAccount = async e => {
  e.preventDefault();
  const email = refs.signUpEmail.value;
  const password = refs.signUpPassword.value;

  if (email && password) {
    refs.backdrop.classList.add('backdrop--hidden');
    refs.boxSignUpWithEmail.classList.add('visually-hidden');
    refs.boxSignInModal.classList.remove('visually-hidden');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    user = userCredential.user;

    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
  } catch (error) {
    showLoginError(error);
  }
};

// sign In With Email And Password auth =====================================================================================

const onbtnLoginWithEmailClick = () => {
  refs.btnGoogleLogin.removeEventListener('click', onBtnGoogleLoginClick);
  refs.btnLoginWithEmail.removeEventListener('click', onbtnLoginWithEmailClick);
  refs.btnLoginEmail.addEventListener('click', loginEmailPasspord);
  refs.boxSignInWithEmailModal.classList.remove('visually-hidden');
  refs.boxSignInModal.classList.add('visually-hidden');
};

const loginEmailPasspord = async e => {
  e.preventDefault();
  const email = refs.loginEmail.value;
  const password = refs.loginPassword.value;

  if (email && password) {
    refs.backdrop.classList.add('backdrop--hidden');
    refs.boxSignInWithEmailModal.classList.add('visually-hidden');
    refs.boxSignInModal.classList.remove('visually-hidden');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    showLoginError(error);
  }
};

// google auth =====================================================================================

const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

provider.setCustomParameters({
  login_hint: 'user@example.com',
});

export const onBtnGoogleLoginClick = e => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

      get(child(dbRef, `users/${user.uid}`))
        .then(snapshot => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
          } else {
            writeUserData(
              user.uid,
              user.displayName,
              user.email,
              user.photoURL
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// data base =================================================================================

// add User in DB ============================================================================

function writeUserData(userId, name, email, imageUrl) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

// add to watched ============================================================================

export const onAddToWatchedBtnClick = async filmId => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        AddToWatched(user.uid, filmId);
      } else {
        console.log('no user');
      }
    });
  } catch (error) {
    showLoginError(error);
  }
};

function AddToWatched(uid, filmId) {
  get(child(dbRef, `users/${uid}/watched`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const amount = Array.from(snapshot.val()).length;
        const postData = { [amount]: filmId };
        update(child(dbRef, `users/${uid}/watched`), postData);
      } else {
        const postData = { watched: { 0: filmId } };
        update(child(dbRef, `users/${uid}`), postData);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// remove from watched ============================================================================

export const onRemoveFromWatchedBtnClick = async filmId => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        removeFromWatched(user.uid, filmId);
      } else {
        console.log('no user');
      }
    });
  } catch (error) {
    showLoginError(error);
  }
};

function removeFromWatched(uid, filmId) {
  get(child(dbRef, `users/${uid}/watched`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const Data = Object.values(snapshot.val()).filter(
          item => item !== filmId
        );
        let postData = { watched: Object.assign({}, Data) };
        update(child(dbRef, `users/${uid}`), postData);
      } else {
        // const postData = { watched: { [filmId]: filmName } };
        // update(child(dbRef, `users/${uid}`), postData);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// add to queue ============================================================================

export const onAddToQueueBtnClick = async filmId => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        addToQueue(user.uid, filmId);
      } else {
        console.log('no user');
      }
    });
  } catch (error) {
    showLoginError(error);
  }
};

function addToQueue(uid, filmId) {
  get(child(dbRef, `users/${uid}/queue`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const amount = Array.from(snapshot.val()).length;
        const postData = { [amount]: filmId };
        update(child(dbRef, `users/${uid}/queue`), postData);
      } else {
        const postData = { queue: { 0: filmId } };
        update(child(dbRef, `users/${uid}`), postData);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// remove from queue ============================================================================

export const onRemoveFromQueueBtnClick = async filmId => {
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        removeFromQueue(user.uid, filmId);
      } else {
        console.log('no user');
      }
    });
  } catch (error) {
    showLoginError(error);
  }
};

function removeFromQueue(uid, filmId) {
  get(child(dbRef, `users/${uid}/queue`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const Data = Object.values(snapshot.val()).filter(
          item => item !== filmId
        );

        let postData = { queue: Object.assign({}, Data) };

        update(child(dbRef, `users/${uid}`), postData);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
