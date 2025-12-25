import Month from './Month';
import Day from './Day';
import WorkWeek from './WorkWeek';
declare const VIEWS: {
    [x: string]: typeof Month | typeof Day | typeof WorkWeek;
};
export default VIEWS;
