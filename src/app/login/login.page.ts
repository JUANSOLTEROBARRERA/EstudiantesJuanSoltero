import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public numcontrol:string;
  public nip:string;
  public students: Student[];

  constructor(private router: Router, private studentService: StudentService,private alertController: AlertController) { 
    this.students = this.studentService.getStudents();

    this.numcontrol = ""
    this.nip = ""
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención!',
      subHeader: 'Usuario y/o contraseña incorrectas.',
      message: 'Favor de ingresar un usuario existente.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    localStorage.setItem('controlnumber', '');
  }

  public letmein() {
    let item: Student;
    item = this.students.find((students) => {
      return students.controlnumber == this.numcontrol;
    });

    if(this.nip!=''){
      let nip2:number;
      nip2 = parseInt(this.nip)

      if(item.nip == nip2 && item.controlnumber==='admin'){
        this.router.navigate(
          ['/home']
        );
        localStorage.setItem('controlnumber', item.controlnumber);
        return
      }

      if(item.nip == nip2){
        this.getStudentByControlNumber(item.controlnumber)
        localStorage.setItem('controlnumber', item.controlnumber);
      }else{
        this.presentAlert();
      }

    }else{
      this.presentAlert();
    }
  }

  public getStudentByControlNumber(cn: string): void {
    this.router.navigate(
      ['/view-student'],
      {
        queryParams: { controlnumber: cn }
      }
    );

  }

}
