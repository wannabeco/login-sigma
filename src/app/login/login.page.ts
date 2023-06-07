import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/autentication.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario = ""
  public clave = "";
  public isError = false;
  constructor(private  alertaPop:AlertController,private authService: AuthenticationService,private loadingCtrl: LoadingController,private router:Router) { }

  ngOnInit() {
  }



  async ingresar(){
    if(this.usuario == ""){
      this.alerta('Atención','Debe escribir el usuario');
    }
    else if(this.clave == ""){
      this.alerta('Atención','Debe escribir la contraseña');
    }
    else{
      

      const loading = await this.loadingCtrl.create({
        message: "Un momento por favor..."
      });
  
      loading.present();

      try {
        this.authService.authenticate(this.usuario, this.clave).subscribe(
          response => {
            // Manejar la respuesta de autenticación exitosa
            //console.log('Autenticación exitosa', response);
              console.dir(response);
              loading.dismiss();
              localStorage['session'] = response.session.accessToken;
              this.router.navigate(['/home']);
            },
            error => {
              console.dir(error);
              this.alerta('Atención',error.error.message);
              loading.dismiss();
          }
        );
      } catch (error) {
          console.log(error)
      }
      finally{
        loading.dismiss();
      }
      

    }
  }

  async alerta(titulo:any,mensaje:any,){
    const alert = await this.alertaPop.create({
      header: titulo,
      subHeader: '',
      message: mensaje,
      buttons: ['OK'],
    });
    
    await alert.present();
  }

  async showLoading(mensaje:string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje
    });

    return loading.present();
  }

}
