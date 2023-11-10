/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { ExceptionalSituationModel } from './exceptional-situation.model';

export class ExceptionalSituationSearchModel extends ExceptionalSituationModel {
  
  reportStartTime: Date;

  reportEndTime: Date;

  typeList: Array<number>;
}
