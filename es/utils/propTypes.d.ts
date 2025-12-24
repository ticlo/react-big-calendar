import PropTypes from 'prop-types';
export declare let accessor: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any)>>;
export declare let dateFormat: PropTypes.Requireable<any>;
export declare let dateRangeFormat: PropTypes.Requireable<(...args: any[]) => any>;
/**
 * accepts either an array of builtin view names:
 *
 * ```
 * views={['month', 'day', 'agenda']}
 * ```
 *
 * or an object hash of the view name and the component (or boolean for builtin)
 *
 * ```
 * views={{
 *   month: true,
 *   week: false,
 *   workweek: WorkWeekViewComponent,
 * }}
 * ```
 */
export declare let views: PropTypes.Requireable<NonNullable<any[] | {
    [x: string]: unknown;
}>>;
export declare const DayLayoutAlgorithmPropType: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any)>>;
