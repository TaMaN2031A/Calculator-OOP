import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {calculatorServer} from "./calc.service"
import { AppComponent } from './app.component'
import { HttpClientModule} from '@angular/common/http'
import { TrialComponent } from './trial/trial.component'
@NgModule({
  declarations: [
    TrialComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [
    calculatorServer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
