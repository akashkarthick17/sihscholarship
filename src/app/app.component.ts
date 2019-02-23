import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './core/services/http/http.service';
import { Logger } from './core/services/logger/logger.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'zep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(private http: HttpService, private translateService: TranslateService, private logger: Logger) {
    this.initializeApp();
  }

  initializeApp() {
    this.translateService.setDefaultLang(environment.defaultLanguage);
  }
}
