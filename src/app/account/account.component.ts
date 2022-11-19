import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Student } from "../models/student";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  public studentNumber: Subscription;
  public id: number;
  public student: String;

  public controlnumber: string;
  public name: string;
  public curp: string;
  public age: number;
  public nip: number;
  public email: string;
  public career: string;
  public photo: string;

  public currentStudent: Student;

  constructor(private route: ActivatedRoute, private router: Router, private service: StudentService) { 

  }

  ngOnInit() {
    this.studentNumber = this.route.params.subscribe(params => {
      this.id = +params['studentNumber'];
      this.service.obtainStudent(this.id);

      this.currentStudent = this.service.getStudent(this.id);

      this.controlnumber = this.currentStudent['controlnumber']
      this.name = this.currentStudent['name'];
      this.curp = this.currentStudent['curp'];
      this.age = this.currentStudent['age'];
      this.nip = this.currentStudent['nip'];
      this.email = this.currentStudent['email'];
      this.career = this.currentStudent['career'];
      this.photo = this.currentStudent['photo'];
    });
  }
}
