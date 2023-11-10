/*
 * Copyright 2020 WanYun Corporation. All Rights Reserved.
 */

import { Observable } from 'rxjs';

export interface ReferenceHttpServiceInterface {
  /**
   * get reference data by category
   */
  getReferenceDataByCategory(category: string): Observable<any>;
}
