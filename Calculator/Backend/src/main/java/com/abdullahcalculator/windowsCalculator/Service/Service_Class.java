package com.abdullahcalculator.windowsCalculator.Service;

import org.springframework.stereotype.Service;

@Service
// 5 + 8
public class Service_Class {
     public String output;
     //final String tobeCompared = "-?[0-9]+(.[0-9]*)?\\\\s+[-X+/]\\\\s+[0-9]+(.[0-9]*)?";
     // input wil be on the form x.x */-+ y.y
     public void handler(String input) {
          String output;
          String o1, o3;
          char o2;
          System.out.println(input);
          input = input.trim();
          String[] in = input.split(" ", 0);
          o1 = in[0];
          o2 = in[1].charAt(0);
          //System.out.println(o2);
          o3 = in[2];
          playMaker(o1, o2, o3);
     }
     public void playMaker (String op1, char operator, String op2) {
          double firstOp = Double.parseDouble(op1);
          double secondOP = Double.parseDouble(op2);
          if(operator == '+')
               output = Addition(firstOp, secondOP);
          else if(operator == '-')
               output = Subtraction(firstOp, secondOP);
          else if(operator == '*')
               output = Multiplication(firstOp, secondOP);
          else if(operator == '/')
               output = Division(firstOp, secondOP);
          else if(operator == 's')
               output = SqrRoot(firstOp);
          else if(operator == '%')
               output = TaxClaculator(firstOp, secondOP);
          else if(operator == 'p')
               output = Multiplication(firstOp, firstOp);
          else if(operator == 'o')
               output = Division(1, firstOp);
          System.out.println(output + "*****");
     }

     String TaxClaculator(double firstOp, double secondOp)
     {
          double result;
          String res;
          result = secondOp/100*firstOp ;
          res = String.valueOf(result);
          return res;
     }

     String Addition(double firstOp, double secondOp)
     {
          double result;
          String res;
          result = firstOp + secondOp;
          res = String.valueOf(result);
          return res;
     }

     String Subtraction(double firstOp, double secondOp)
     {
          double result;
          String res;
          result = firstOp - secondOp;
          res = String.valueOf(result);
          return res;
     }

     String Multiplication(double firstOp, double secondOp)
     {
          double result;
          String res;
          result = firstOp * secondOp;
          res = String.valueOf(result);
          return res;
     }

     String Division(double firstOp, double secondOp)
     {
          double result;
          String res;
          if(secondOp == 0)
               res = "E";
          else
          {
               result = firstOp / secondOp;
               res = String.valueOf(result);
          }
          return res;
     }

     String SqrRoot(double Op)
     {
          double result;
          String res;
          if(Op<0)
               res = "E";
          else
          {
               result = Math.sqrt(Op);
               res = String.valueOf(result);
          }
          return res;
     }


}
