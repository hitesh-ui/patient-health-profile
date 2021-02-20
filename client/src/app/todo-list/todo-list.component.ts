import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public data: any = [];
  public healthStatus: any;
  public MedicalCondition: any;
  public Personalinfo: any;
  constructor(private todos: TodoService) { }

  ngOnInit() {
    this.data = [
      {
        "HealthStatus": {
          "Height": "175 cms",
          "Weight": "65 kg",
          "PulseRate": "88 bpm",
          "BP": "120/160",
          "BMI": 25
        },
        "MedicalCondition": {
          "HeartDisease": false,
          "Diabetics": true,
          "BloodPressure": {
          "HighBP": true,
          "LowBP": false
          }
        },
        "Personalinfo": {
          "Name": "John Doe",
          "Email": "john.doe@gmail.com",
          "Phone": "9876543210",
          "Age": "25 years"
        },
        "Timestamp": "YYYY-MM-DD hh:mm:ss"
      }
    ]
    this.healthStatus = this.data[0].HealthStatus;
    this.MedicalCondition = this.data[0].MedicalCondition;
    this.Personalinfo = this.data[0].Personalinfo;
  }
}
