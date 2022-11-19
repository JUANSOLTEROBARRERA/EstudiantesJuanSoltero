import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;
  public nc: string;

  constructor(private studentService:StudentService, private aroute:ActivatedRoute) {

  }

  ngOnInit() {
    this.aroute.queryParams.subscribe(
      (params) => {
        console.log(params);
        this.student = this.studentService.getStudentByControlNumber(params.controlnumber);
      }
    );

    this.nc = localStorage.getItem('controlnumber')
    
  }

}
