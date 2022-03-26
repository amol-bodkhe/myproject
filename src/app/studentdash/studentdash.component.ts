import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentDashModel } from './student.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  formValue!:FormGroup;
  StudentModelObj:StudentDashModel=new StudentDashModel();
  studentAll:any;

  showAdd:boolean=true;
  showUpdate:boolean=true;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      fees:[''],
    })
    this.getAllStudents()
  }
  
  clickAddStudent()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  postStudent(){
    this.StudentModelObj.firstName=this.formValue.value.firstName;
    this.StudentModelObj.lastName=this.formValue.value.lastName;
    this.StudentModelObj.mobile=this.formValue.value.mobile;
    this.StudentModelObj.email=this.formValue.value.email;
    this.StudentModelObj.fees=this.formValue.value.fees;

    this.api.postStudent(this.StudentModelObj).subscribe(res=>{
      console.log(res);
      alert("Student Data Added Succesfully");
      this.formValue.reset();  //form reseting
      this.getAllStudents();
    },
    err=>{
      alert("Something went wrong!!!");
    });
  }

    getAllStudents()
    {
      this.api.getStudent().subscribe(res=>{
        this.studentAll = res;
      });
    }
    
  deleteStudents(data:any)
  {
  this.api.deleteStudent(data.id).subscribe(res=>{
    alert("Record Deleted Succesfully..");
    this.getAllStudents();
  })
  }
  onEdit(data:any)
  {
    this.showAdd=false;
    this.showUpdate=true;
    this.StudentModelObj.id=data.id;
  this.formValue.controls['firstName'].setValue(data.firstName);
  this.formValue.controls['lastName'].setValue(data.lastName);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['fees'].setValue(data.fees);
  }
  updateStudentDetails()
  {
    this.StudentModelObj.firstName=this.formValue.value.firstName;
    this.StudentModelObj.lastName=this.formValue.value.lastName;
    this.StudentModelObj.mobile=this.formValue.value.mobile;
    this.StudentModelObj.email=this.formValue.value.email;
    this.StudentModelObj.fees=this.formValue.value.fees;

    this.api.updateStudent(this.StudentModelObj,this.StudentModelObj.id).subscribe(res=>{
      alert("Data Updated Succesfully..!");
      this.formValue.reset();
      this.getAllStudents();
    });

  }

}
