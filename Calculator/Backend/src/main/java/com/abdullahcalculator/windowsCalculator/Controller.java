package com.abdullahcalculator.windowsCalculator;

import com.abdullahcalculator.windowsCalculator.Service.Service_Class;
import org.springframework.web.bind.annotation.*;

//  //   / /operate
@RestController
@CrossOrigin
public class Controller  {
    final Service_Class Calc = new Service_Class();

    @RequestMapping(value="/operate", method = RequestMethod.POST)
    public String Handler(@RequestBody String input) {
        Calc.handler(input);
        return Calc.output;
    }

}
