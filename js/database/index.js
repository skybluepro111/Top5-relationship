import * as firebase from "firebase";

class Database {

  
  static createUser(name, phoneNumber) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/users/" + phoneNumber + "/name"] = name;
    return firebase.database().ref().update(updates)
  }

  static setContacts(phoneNumber, contactInfo) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/users/" + phoneNumber + "/contacts"] = contactInfo;
    return firebase.database().ref().update(updates)
  }

    static saveContactsDescription(phoneNumber, recordID, description) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/users/" + phoneNumber + "/contacts/" + recordID + "/description"] = description;
    return firebase.database().ref().update(updates)
  }
  
   static setFavouriteContact(phoneNumber, contactRecordId) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/users/" + phoneNumber + "/favourite/" + contactRecordId] = contactRecordId;
    return firebase.database().ref().update(updates)
  }

    static removeFavorites(phoneNumber, contactRecordId) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    
    let userDataPath = "/users/" + phoneNumber + "/favourite/" + contactRecordId;
    return firebase.database().ref(userDataPath).remove()
  }

    static getFavoritesContact(phoneNumber, callback) {
    let userDataPath = "/users/"+phoneNumber+"/";
    firebase.database().ref(userDataPath).once('value', (snapshot) => {
      debugger;
      
      let userData = {}          // get children as an array
        if(snapshot.val()!==undefined){
          let userObj = JSON.parse(JSON.stringify(snapshot.val()))
          
          console.warn(userObj);
          let contactList = [];
          let favList = [];
          let name = "";
          Object.keys(userObj).forEach((key)=>{
            
            if(key == "contacts"){
              let contactObj = userObj[key]
                Object.keys(contactObj).forEach((keyContact)=>{
                  let contact = contactObj[keyContact]
                    contactList.push(contact)
                })
            }
            else if(key == "favourite"){
              let favObj = userObj[key]
                Object.keys(favObj).forEach((keyFav)=>{
                    favList.push(keyFav)
                })
            }
            else if(key == "name"){
              name = userObj[key];
            }
            
          })

          userData = {contactList: contactList, favList: favList, name: name};

          
        }

      callback(userData)
  });
    }
  
}

module.exports = Database;
