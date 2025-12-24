import Month from './Month';
import Day from './Day';
declare const VIEWS: {
    [x: string]: typeof Month | typeof Day;
};
export default VIEWS;
