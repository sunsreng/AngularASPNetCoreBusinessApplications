import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class BaseService {
  apiUrl = environment.apiUrl;

  constructor() { }

}
