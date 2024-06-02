import { views } from './utils/constants';
import Month from './Month';
import Day from './Day';
import Week from './Week';
// import WorkWeek from './WorkWeek'
const VIEWS = {
    [views.MONTH]: Month,
    [views.WEEK]: Week,
    //  [views.WORK_WEEK]: WorkWeek,
    [views.DAY]: Day,
};
export default VIEWS;
