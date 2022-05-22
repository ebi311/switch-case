/** @format */
export declare type ConditionType<T> = T | ((value: T) => boolean);
export declare type TargetObjectType<T, P> = P | ((value: T) => P);
export declare type CaseFunction<T, P = unknown> = {
    conditions: ConditionType<T> | ConditionType<T>[];
    targetObject?: TargetObjectType<T, P>;
};
export declare class Switch<T, P = void> {
    private cases;
    case(conditions: ConditionType<T> | ConditionType<T>[], targetObject: TargetObjectType<T, P>): this;
    private _default?;
    default(fn: TargetObjectType<T, P>): this;
    private _createReturnValues;
    private _evaluate;
    private _reduce;
    reduce(value: T): P | undefined;
}
