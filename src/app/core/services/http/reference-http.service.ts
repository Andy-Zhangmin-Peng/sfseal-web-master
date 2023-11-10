/*
 * Copyright 2020 WanYun Corporation. All Rights Reserved.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstant } from '../../../common/constant/url.constant';
import { ReferenceHttpServiceInterface } from './reference-http.service.interface';

@Injectable()
export class ReferenceHttpService implements ReferenceHttpServiceInterface {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * get reference data by category
   */
  getReferenceDataByCategory(category: string): Observable<any> {
    return this._httpClient.get(`${UrlConstant.REFERENCE}?category=${category}`);
  }
}
