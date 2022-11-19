import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages:Object;

  public controlnumber: string;
  public name: string;
  public curp: string;
  public age: number;
  public nip: number;
  public email: string;
  public career: string;
  public photo?: string;

  public action: string;

  public nc: string;


  constructor(private alertController: AlertController, private router: Router,private toastController: ToastController,private studentService: StudentService, private fb: FormBuilder) {
    this.action = studentService.getAction();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención!',
      subHeader: 'Datos ingresados incompletos y/o erroneos.',
      message: 'Favor de ingresar todos los datos de forma correcta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {

    this.nc = localStorage.getItem('controlnumber')
    if(this.nc != 'admin'){
      this.router.navigate(
        ['/login']
      );
    }
    
    this.myForm = this.fb.group(
      {
        controlnumber:["", Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
        name:["", Validators.compose([Validators.required])],
        curp:["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{1})?([0-9]{1})?')])],
        age:["", Validators.compose([Validators.required, Validators.pattern('^([2-9][0-9]|1[7-9])$')])],
        nip:["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('^([0-9][0-9][0-9]?[0-9]?|10000|9)$')])],
        email:["", Validators.compose([Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\(.[a-z]{2,3})+')])],
        photo:["", Validators.compose([Validators.required, Validators.pattern('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')])],
        career:["", Validators.compose([Validators.required])]
      }
    );

    this.validationMessages = {
      controlnumber: [
        { type: 'required', message: "Número de control obligatorio"},
        { type: 'minlength', message: "El número de control debe ser de 8 dígitos" },
        { type: 'maxlength', message: "El numero de control debe ser de 8 digitos" },
        { type: 'pattern', message: "El número de control está mal formado" }
      ],
      name: [
        { type: 'required', message: "Nombre es obligatorio"},
      ],
      curp: [
        { type: 'required', message: "CURP es obligatorio"},
        { type: 'minlength', message: "La CURP debe ser de 18 dígitos" },
        { type: 'maxlength', message: "La CURP debe ser de 18 dígitos"},
        { type: 'pattern', message: "La CURP está mal formada" }
      ],
      age: [
        { type: 'required', message: "Edad es obligatorio"},
        { type: 'pattern', message: "Edad está mal formada" },
      ],
      nip: [
        { type: 'required', message: "NIP es obligatorio"},
        { type: 'minlength', message: "El NIP debe ser en un rango de 9-10000" },
        { type: 'maxlength', message: "El NIP debe ser en un rango de 9-10000"},
        { type: 'pattern', message: "El NIP está mal formado" }
      ],
      email: [
        { type: 'required', message: "Correo es obligatorio"},
        { type: 'pattern', message: "Correo está mal formado" },
      ],
      photo: [
        { type: 'required', message: "Foto es obligatoria"},
        { type: 'pattern', message: "URL de la foto está mal formada" },
      ],
      career: [
        { type: 'required', message: "Carrera es obligatoria"}
      ]
    }

    if(this.studentService.getStudent2()!=null){
      let currentStudent: Student;
      currentStudent = this.studentService.getStudent2();
      this.myForm.setValue({controlnumber:currentStudent.controlnumber,
                            name:currentStudent.name,
                            curp:currentStudent.curp,
                            age:currentStudent.age,
                            nip:currentStudent.nip,
                            email:currentStudent.email,
                            career:currentStudent.career,
                            photo:currentStudent.photo,})
    }else{
      this.cleanInputs();
    }

  }

  public default(){
    this.studentService.setStudent();
  }

  public newStudent(): void{
    if(this.myForm.get('controlnumber').valid 
        && this.myForm.get('name').valid
        && this.myForm.get('curp').valid
        && this.myForm.get('age').valid
        && this.myForm.get('nip').valid
        && this.myForm.get('email').valid
        && this.myForm.get('career').valid
        && this.myForm.get('photo').valid){
      //CONSTRUIR EL OBJETO
      this.controlnumber = this.myForm.get('controlnumber').value;
      this.name = this.myForm.get('name').value;
      this.curp = this.myForm.get('curp').value;
      this.age = this.myForm.get('age').value;
      this.nip = this.myForm.get('nip').value;
      this.email = this.myForm.get('email').value;
      this.career = this.myForm.get('career').value;
      this.photo = this.myForm.get('photo').value;

      this.student = {
        controlnumber: this.controlnumber, 
        name: this.name,
        curp: this.curp, 
        age: this.age, 
        nip: this.nip,
        email: this.email,
        career: this.career,
        photo: this.photo}

      this.studentService.newStudent(this.student);
    }else{
      this.presentAlert()
    }
  }
  public cleanInputs(){
    this.myForm.setValue({controlnumber:'',
      name:'',
      curp:'',
      age:'',
      nip:'',
      email:'',
      career:'',
      photo:''})
  }
  public updateStudent(){
    if(this.myForm.get('controlnumber').valid 
        && this.myForm.get('name').valid
        && this.myForm.get('curp').valid
        && this.myForm.get('age').valid
        && this.myForm.get('nip').valid
        && this.myForm.get('email').valid
        && this.myForm.get('career').valid
        && this.myForm.get('photo').valid){
    this.student = this.studentService.getStudentByControlNumber(this.myForm.get('controlnumber').value);
    this.student.controlnumber = this.myForm.get('controlnumber').value;
    this.student.name = this.myForm.get('name').value;
    this.student.career = this.myForm.get('career').value;
    this.student.curp = this.myForm.get('curp').value;
    this.student.age = this.myForm.get('age').value;
    this.student.nip = this.myForm.get('nip').value;
    this.student.email = this.myForm.get('email').value;
    this.student.photo = this.myForm.get('photo').value;
    
    this.studentService.getPosition(this.myForm.get('controlnumber').value);
    this.studentService.removeStudent(this.studentService.position);

    this.studentService.newStudent(this.student);

    this.presentToast('bottom');
  }else{
    this.presentAlert()
  }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Estudiante actualizado con éxito!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
