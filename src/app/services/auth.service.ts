import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController
  ) { }

  async loginGoogle() {
    return  this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
   
  }
  async createUser(user: any) {
    return await new Promise((resolve) => {
      this.afAuth
      .fetchSignInMethodsForEmail(user.email)
        .then(response => {
          if (response.length > 0) {
            if(response[0] == 'google.com'){
              this.presentToast('Este correo esta registrao gon login Social Google')
            }else{
              this.afAuth.signInWithEmailAndPassword(user.email,user.password)
              .then((resp)=>{
                resolve(true)
              })
              .catch((error)=>{
                this.presentToast(error)
              });
            }
          } 
          else {
            console.log('no esta')
            this.afAuth.createUserWithEmailAndPassword(
              user.email,
              user.password
              ).then(()=>{
                this.afAuth.signInWithEmailAndPassword(user.email,user.password);
                resolve(true)
              })
          }
        })
    });
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }


}
