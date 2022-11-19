import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
  private action: string;
  private student: Student;
  public position: number;

  constructor(private router: Router) { 
    this.students = [
      {
        controlnumber: "admin",
        age: 22,
        career: "ISC",
        curp: "SOBJ000116HNTLRNA4",
        email: "juansolteroba@ittepic.edu.mx",
        name: "admin",
        nip: 123,
        photo: "https://picsum.photos/201"
      },
      {
        controlnumber: "18401205",
        age: 22,
        career: "ISC",
        curp: "SOBJ000116HNTLRNA4",
        email: "juansolteroba@ittepic.edu.mx",
        name: "Juan Antonio Soltero Barrera",
        nip: 123,
        photo: "https://picsum.photos/201"
      },
      {
        controlnumber: "18401158",
        age: 22,
        career: "ISC",
        curp: "AJH382JASJDSNA23A",
        email: "gumarinle@ittepic.edu.mx",
        name: "Gustavo Marin Lemus",
        nip: 123,
        photo: "https://picsum.photos/202"
        
      },
      {
        controlnumber: "18401214",
        age: 22,
        career: "ISC",
        curp: "AJSHDJSA239JASJSA121",
        email: "julisaucedoga@ittepic.edu.mx",
        name: "Juan Luis Saucedo Garcia",
        nip: 123,
        photo: "https://picsum.photos/203"
      }
    ]
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public getStudent(pos:number): Student{
    return this.students[pos];
  }

  public getStudentByControlNumber(cn:string): Student{
    let item: Student;
    item = this.students.find(
      (student) => {
        return student.controlnumber==cn;
      }
    );
    return item;
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public selectAction(a: string){
    this.action = a;
  }

  public getAction(): string{
    return this.action;
  }
  
  public obtainStudent(pos:number){
    console.log(this.students[pos].name);
  }

  public editStudent(nc: string){
    this.student = this.getStudentByControlNumber(nc);
    console.log("hola, si llegue")
    console.log(this.student)
  }

  public setStudent(){
    this.student = null;
  }

  public newStudent(student:Student):void{
    this.students.push(student);
    console.log(this.students);

    this.router.navigate(
      ['/home']
      );
  }
  public getStudent2():Student{
    return this.student;
  }

  public getPosition(cn: string): boolean{
    let flag = false;
    for(let i = 0; i<=this.students.length-1;i++){
      if(cn === this.students[i].controlnumber){
        flag = true;
           this.position=i;
           return flag;
       }else{
        flag = false;
       }
    }
    return flag;
  }


}
