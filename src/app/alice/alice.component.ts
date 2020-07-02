import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { SubjectService } from '../services/subject.service';
@Component({
  selector: 'app-alice',
  templateUrl: './alice.component.html',
  styleUrls: ['./alice.component.scss']
})
export class AliceComponent implements OnInit {

  constructor(private subjectService: SubjectService) {}

  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('msg') itemElements: QueryList<any>;
  
  private scrollContainer: any;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    
  }
  
  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  today: Date
  ngOnInit(): void {
    this.today = new Date();
  }

  sentMsgs: string[] = [];
  inputValue: String = '';
  aliceMessage: string;
  date: Date;
  time: string;
  hours : number;
  minutes: any;

  sendMsg(message: String) {
    this.date = new Date();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    var ampm = this.hours >= 12 ? 'PM' : 'AM';
            this.hours = this.hours % 12;
            this.hours = this.hours ? this.hours : 12;
            this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
          this.time = this.hours +':'+this.minutes+' '+ampm;
    this.aliceMessage = '1'+message.trim() +' '+ this.time;
    this.subjectService.sendMsg(this.aliceMessage);
    this.sentMsgs.push(this.aliceMessage);
    this.inputValue = '';
  }
  send(event: any) {
    this.date = new Date();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    var ampm = this.hours >= 12 ? 'PM' : 'AM';
            this.hours = this.hours % 12;
            this.hours = this.hours ? this.hours : 12;
            this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
          this.time = this.hours +':'+this.minutes+' '+ampm;    
    this.aliceMessage = '1'+ event.target.value.trim() + ' '+ this.time;
    this.subjectService.sendMsg(this.aliceMessage);
    this.sentMsgs.push(this.aliceMessage);
    this.inputValue = '';
  }
  bobMsg(msg: string) {
    this.sentMsgs.push(msg);
  }
}
