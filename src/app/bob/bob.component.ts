import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { SubjectService } from '../services/subject.service'
@Component({
  selector: 'app-bob',
  templateUrl: './bob.component.html',
  styleUrls: ['./bob.component.scss']
})
export class BobComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  @Output() event = new EventEmitter();

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
  ngOnInit(): void {
    this.subjectService.aliceMsgsource$
    .subscribe(
      message => {
        this.sentMsgs.push(message);
      }
    )
  }
  
  sentMsgs: string[] = [];
  inputValue: String = '';
  bobMessage: string;
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
    this.bobMessage = '2'+message +' '+ this.time
    this.event.emit(this.bobMessage);
    this.sentMsgs.push(this.bobMessage);
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
    
    this.bobMessage = '2'+event.target.value + ' '+ this.time;
    this.event.emit(this.bobMessage);
    this.sentMsgs.push(this.bobMessage);
    this.inputValue = '';
  }


}
