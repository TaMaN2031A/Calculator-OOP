import { Component, OnInit, ɵisSubscribable } from '@angular/core';
import {calculatorServer} from "./calc.service";
import { HttpErrorResponse } from '@angular/common/http';
import { TrialComponent } from './trial/trial.component';
import { delay } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'calculator_and_prequesities';
  op1: string = "";
  op2: string = "";
  operator: string = "";
  equation: string = "";
  history: string[] = [];
  result: string = '0';
  equalCounter: number = 0;
  opCounter: number = 0;


  constructor(private clclcl: calculatorServer){};


  public sendEquation(equation: string): void
  {
    this.clclcl.operate(equation).subscribe
    (
      {
      next: (x) => {
        console.log(x);
        this.result = x;
        this.op1 = x;
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
     }
    )
  }

  numberHandler(digit: string){

    if(this.history[this.history.length-2] != '=' && digit != '∓') // Loading operand mode, meaning no overwrite
    {
      if(this.opCounter == 0)
      {
        if(this.isDigit(digit) || !this.op1.includes('.'))
          this.op1 += digit;
      }
      else
      {
        if(this.isDigit(digit) || !this.op2.includes('.'))
          this.op2 += digit;
      }
    }
    else  // Try adding 8 to the result of 2+3 for example, it will overwrite it
    {
      if(digit != '∓')
      {
        this.erasors('CE');
        this.op1 += digit;
      }
      else
      {
        if(this.history[this.history.length-2] == '='){
          this.equation = "negate(" + this.result+")";
          if(this.result.charAt(0) != '-')
           this.result = this.op1 = '-'+this.op1;
          else
            this.result = this.op1 = this.op1.substring(1, this.op1.length);
        }
        else
        {
          if(this.opCounter == 0)
          {
            if(this.op1.charAt(0) != '-')
              this.op1 = '-'+this.op1;
            else
              this.op1 = this.op1.substring(1, this.op1.length);
          }
          else
          {
            if(this.op2.charAt(0) != '-')
              this.op2 = '-'+this.op2;
            else
              this.op2 = this.op2.substring(1, this.op2.length);
          }
        }
      }
    }
    //console.log("EH GABAK HENA")

  }

  erasors(eraseType: string)
  {
    if(eraseType == 'CE' || eraseType == 'C')
    {
      this.op1 = "";
      this.op2 = "";
      this.opCounter = 0;
      this.result = "0";
      this.operator = "";
      this.history.splice(0,this.history.length);
      this.equation = "";
    }
    else
    {
      if(this.opCounter == 0) // Same condition of number, telling me which operand I'm handelling.
      {
        if(this.op1.length != 0)
        this.op1 = this.op1.substring(0,this.op1.length-1); // google it
        else
          ;//Nothing to do
      }
      else // Try backsapcing the second operand. it will stop backspacing once the op2 is empty
      {
        if(this.op2.length != 0)
          this.op2 = this.op2.substring(0,this.op2.length-1); // google it
        else
          ;//Nothing to do
      }
    }

  }
  public isDigit(digitOrnot: any): any{
    if(digitOrnot == '0' || digitOrnot == '1'
     || digitOrnot == '2' || digitOrnot == '3' ||
     digitOrnot == '4' || digitOrnot == '5' ||
     digitOrnot == '6' || digitOrnot == '7' ||
     digitOrnot == '8' || digitOrnot == '9')
      return 1;
    else
      return 0;

  }
  isoperator(check: any): any{
    if(check == '+')
      return 1;
    else
      return 0;
  }
  mainOperatorsHandeler(operation: any){
    if(this.op1 == ""){
      this.op1 = "0";
      this.operator = operation;
      this.opCounter++;
    } //do nothing, we don't have op1
    else
    {
      if(this.isoperator(this.history.at(this.history.length-2)) == 0) // y3ni m4 md5l operator wara operatot fhzwd 3ady
        this.opCounter++;
      if(this.op2 != "") // Meaning there is already an equation
      {
        this.contactTheBackend();
      }
      this.operator = operation;
    }

  }

  contactTheBackend(){
    if(this.op2 == '0' && this.operator == '/')
    {
      this.erasors('CE');
      this.result = 'E';
    }
    else
    {
      this.equation = "";
      this.equation += this.op1 + " ";
      this.equation += this.operator + " ";
      this.equation += this.op2;

      this.sendEquation(this.equation);
      this.op2 = "";
      this.equalCounter++;
    }
    //this.op1 = this.result; // always do this
     // ama n4of hn3ml bek eh

  }

  equalChains(){
    if(this.op1 == ""){}
    else if(this.opCounter== 0)
      this.result = this.op1;
    else if(this.op2 == "")
    {
        this.op2 = this.op1;
        this.equalChains();
    }
    else
      this.contactTheBackend();
  }




  formulator(inp: string, operandX: string): any{
    if(inp == "%")
      return (this.op1 + " % " + this.op2);
    else if(inp == "x²")
      return (operandX+ " p " + "2");
    else if(inp == "√x")
      return (operandX+ " s " + "01")
    else if(inp == "¹/ₓ")
      return (operandX + " o " + "01")
  }

  nonMainOperator(oprtn: string){
    if(this.op1 == ""){
      if(oprtn == "¹/ₓ")
        this.result = "E";
    }
    else if(this.operator == "")
    {
      if(oprtn == '%')
      {
        this.erasors('CE');
      }
      else
      {
        let x = this.formulator(oprtn, this.op1);
        if(oprtn == "x²"){
          this.equation = "sqr(" + this.op1 + ")";
          this.clclcl.operate(x).subscribe(x => {this.op1 = x, this.result=x});
        }
        else if(oprtn == "√x"){
          if(this.op1.charAt(0)!='-'){
            this.clclcl.operate(x).subscribe(x => {this.op1 = x, this.result=x});
            this.equation = "sqrt(" + this.op1 + ")";
          }
          else
          {
            this.erasors('CE');
            this.result = "E";
          }
        }
        else if(oprtn == "¹/ₓ"){
          if(this.op1 != '0')
            this.equation = "1/(" + this.op1 + ")";
          else
            {
              this.erasors('C');
              this.result = 'E';
            }
        }
      }
    }
    else if(this.op2 == "")
    {
      // I'll asume that the % doesn't work but here only work when we have op1, op2
      this.op2 = this.op1;
      let x = this.formulator(oprtn, this.op1);
      if(oprtn == "%"){
        this.equation = this.op1 + " " + this.operator + " "+ oprtn+this.op2;
        this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
      }else if(oprtn == "x²"){
        this.equation = this.op1 + " " + this.operator + " "+ "sqr(" + this.op1 + ")";
        this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
      }else if(oprtn == "√x"){
        if(this.op1.charAt(0) != '-'){
          this.equation = this.op1 + " " + this.operator + " "+ "sqrt(" + this.op1 + ")";
          this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
        }
        else
        {
          this.erasors('CE');
          this.result = 'E';
        }
      }
      else if(oprtn == "¹/ₓ")
      {

        if(this.op1!='0'){
          this.equation = this.op1 + " " + this.operator + " "+ "1/(" + this.op1 + ")";
          this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
        }
        else
        {
          this.erasors('CE');
          this.result = 'E';
        }
      }
    }
    else{
      let x = this.formulator(oprtn, this.op2);

      if(oprtn == "%"){
        this.equation = this.op1 + " " + this.operator + " "+ oprtn+this.op2;
        this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
      }
      else if(oprtn == "x²")
      {
        this.equation = this.op1 + " " + this.operator + " "+ "sqr(" + this.op2 + ")";
        this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
      }
      else if(oprtn == "√x")
      {
        if(this.op2.charAt(0) != '-')
        {
          this.equation = this.op1 + " " + this.operator + " "+ "sqrt(" + this.op2 + ")";
          this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
        }
        else
        {
          this.erasors('CE');
          this.result = 'E';
        }
      }else if(oprtn == "¹/ₓ")
      {
        if(this.op2 != '0')
        {
          this.equation = this.op1 + " " + this.operator + " "+ "1/(" + this.op2 + ")";
          this.clclcl.operate(x).subscribe(x => {this.op2 = x, this.result=x});
        }
        else
        {
          this.erasors('CE');
          this.result = 'E';
        }
      }
    }
  }





public reciever($event: any){
      let input: any;
       if($event) {
         //console.log($event.target);
         //console.log($event.target.value);
         input = $event.target.value;
         console.log("button is clicked!, BUTTON IS", input);
         this.history.push(input);
         if(this.result == 'E')
          this.erasors('CE');
         if(Boolean(this.isDigit(input)) || input == '.' || input == '∓')
           this.numberHandler(input);
        else if(input == 'C' || input == 'CE' || input == "⌫")
           this.erasors(input);
        else if(input == '+' || input == 'X' || input == '/' || input == '-')
        {
           if(input == 'X')
            input = '*';
           this.mainOperatorsHandeler(input);
        }
        else if(input == '%' || input == 'x²' || input == '√x' || input == '¹/ₓ')
        {
          this.nonMainOperator(input);
        }
        else if(input == '='){
          this.equalChains();
        }

      }
    console.log(this.op1);
    console.log(this.op2);
    console.log(this.opCounter);
    console.log(this.result);

   }


}
