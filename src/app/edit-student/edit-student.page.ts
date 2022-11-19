import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {

  public student: Student;
  public myForm2: FormGroup;
  public validationMessages:Object;

  public controlnumber: string;
  public name: string;
  public curp: string;
  public age: number;
  public nip: number;
  public email: string;
  public career: string;
  public photo?: string;

  public nc: string;

  constructor(private router: Router,private studentService: StudentService, private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    //this.aroute.queryParams.subscribe(
    //  (params) => {
    //    console.log(params);
    //    this.student = this.studentService.getStudentByControlNumber(params.controlnumber);
    //    console.log("hola:"+this.student)
    // }
    //);

    this.nc = localStorage.getItem('controlnumber')

    if(this.nc != 'admin'){
      this.router.navigate(
        ['/login']
      );
    }


    this.myForm2 = this.fb.group(
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
  }

  public newStudent(): void{
    //CONSTRUIR EL OBJETO
    this.controlnumber = this.myForm2.get('controlnumber').value;
    this.name = this.myForm2.get('name').value;
    this.curp = this.myForm2.get('curp').value;
    this.age = this.myForm2.get('age').value;
    this.nip = this.myForm2.get('nip').value;
    this.email = this.myForm2.get('email').value;
    this.career = this.myForm2.get('career').value;
    this.photo = this.myForm2.get('photo').value;

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
  }

}
