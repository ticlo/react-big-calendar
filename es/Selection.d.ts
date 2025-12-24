export declare function getEventNodeFromPoint(node: any, { clientX, clientY }: {
    clientX: any;
    clientY: any;
}): Element;
export declare function getShowMoreNodeFromPoint(node: any, { clientX, clientY }: {
    clientX: any;
    clientY: any;
}): Element;
export declare function isEvent(node: any, bounds: any): boolean;
export declare function isShowMore(node: any, bounds: any): boolean;
declare class Selection {
    container: any;
    globalMouse: boolean;
    longPressThreshold: number;
    validContainers: any[];
    selecting: boolean;
    isDetached: boolean;
    _initialEvent: any;
    _listeners: any;
    _removeTouchMoveWindowListener: any;
    _removeKeyDownListener: any;
    _removeKeyUpListener: any;
    _removeDropFromOutsideListener: any;
    _removeDragOverFromOutsideListener: any;
    _onInitialEventListener: any;
    _initialEventData: any;
    _selectRect: any;
    _lastClickData: any;
    _removeInitialEventListener: any;
    _removeEndListener: any;
    _onEscListener: any;
    _removeMoveListener: any;
    ctrl: boolean;
    constructor(node: any, { global, longPressThreshold, validContainers }?: {
        global?: boolean;
        longPressThreshold?: number;
        validContainers?: any[];
    });
    on(type: any, handler: any): {
        remove(): void;
    };
    emit(type: any, ...args: any[]): any;
    teardown(): void;
    isSelected(node: any): boolean;
    filter(items: any): any;
    _addLongPressListener(handler: any, initialEvent: any): () => void;
    _addInitialEventListener(): void;
    _dropFromOutsideListener(e: any): void;
    _dragOverFromOutsideListener(e: any): void;
    _handleInitialEvent(e: any): void;
    _isWithinValidContainer(e: any): boolean;
    _handleTerminatingEvent(e: any): any;
    _handleClickEvent(e: any): any;
    _handleMoveEvent(e: any): void;
    _keyListener(e: any): void;
    isClick(pageX: any, pageY: any): boolean;
}
/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
export declare function objectsCollide(nodeA: any, nodeB: any, tolerance?: number): boolean;
/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export declare function getBoundsForNode(node: any): any;
export default Selection;
