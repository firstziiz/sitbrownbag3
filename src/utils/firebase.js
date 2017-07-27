/* global firebase */

export const ref = firebase.database().ref()

const provider = new firebase.auth.FacebookAuthProvider()

export function firebaseLogout () {
  return firebase.auth().signOut()
}

export function firebaseAuth () {
  return firebase.auth().signInWithPopup(provider)
}

export function currentUser () {
  return firebase.auth().currentUser
}

export function saveTopic (user, topic) {
  return ref.child(`topics/${user.uid}`)
    .set({
      title: topic.title,
      detail: topic.detail
    })
    .then((data) => data)
}

export function checkHaveTopic (user) {
  return ref.child(`topics/${user.uid}`)
    .once('value').then(snapshot => snapshot.val())
}