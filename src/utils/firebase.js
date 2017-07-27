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
  return ref.child(`topics/${user.uid}/topic`)
    .set({
      topic: topic.title,
      uid: topic.detail
    })
    .then(() => user)
}