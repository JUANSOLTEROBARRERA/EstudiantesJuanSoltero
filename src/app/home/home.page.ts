import { Component, OnInit } from '@angular/core';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object;

  public students: Student[];
  public findcn: string;
  public currentStudent: Student;

  public editname: string;
  public editcurp: string;
  public editage: number;
  public editnip: number;
  public editemail: string;
  public editcareer: string;
  public editphoto: string;

  public open: Boolean;


  constructor(private studentService: StudentService, private alertController: AlertController, private router: Router) {
    this.students = this.studentService.getStudents();
    this.open = true;
  }

  ngOnInit() {


  }

  public async removeStudent(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.students = this.studentService.removeStudent(pos);
          }
        }
      ]
    });

    await alert.present();



  }

  public obtainStudent(pos: number) {
    this.studentService.obtainStudent(pos);
  }

  public getStudentByControlNumber(cn: string): void {
    this.router.navigate(
      ['/view-student'],
      {
        queryParams: { controlnumber: cn }
      }
    );

  }

  public addStudent() {
    this.router.navigate(
      ['/new-student']
    );
  }

  public edit(cn: string) {
    console.log(cn)
    this.router.navigate(
      ['/edit-student'],
      {
        queryParams: { controlnumber: cn }
      }
    );
  }

  public clean(): void {
    this.currentStudent = null;
    this.findcn = "";
  }

  public editStudent() {
    let item: Student;
    item = this.students.find(
      (students) => {
        return students.controlnumber == this.findcn;
      }
    );
    this.currentStudent = item;
    console.log(this.currentStudent)

    this.editname = this.currentStudent.name;
    this.editcurp = this.currentStudent.curp;
    this.editage = this.currentStudent.age;
    this.editnip = this.currentStudent.nip;
    this.editemail = this.currentStudent.email;
    this.editcareer = this.currentStudent.career;
    this.editphoto = this.currentStudent.photo;
  }

  public editStudent2(nc: string) {
    this.studentService.editStudent(nc);
  }

  public changeAction1() {
    this.studentService.selectAction("Agregar");
  }

  public changeAction2() {
    this.studentService.selectAction("Editar");
  }

  

  changevariables(cn: string) {

    if (cn != '') {
      this.addStudent();
      this.editStudent2(cn);
      this.changeAction2();
      
    }

  }

}
