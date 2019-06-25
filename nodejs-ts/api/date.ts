const moment = require('moment');
import { NowRequest, NowResponse } from '@now/node';

module.exports = (req: NowRequest, res: NowResponse) => {
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

  res.end(currentTime);
};
