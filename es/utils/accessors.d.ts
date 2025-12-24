/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
export declare function accessor(data: any, field: any): any;
export declare const wrapAccessor: (acc: any) => (data: any) => any;
