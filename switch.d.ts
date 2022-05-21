export declare type CaseFunction<T, P = unknown> = [
    T | ((value: T) => boolean),
    P | ((value: T) => P)
];
export declare class Switch<T, P = void> {
    private cases;
    case(caseFn: CaseFunction<T, P>): this;
    private _default?;
    default(fn: CaseFunction<T, P>[1]): this;
    private _createReturnValues;
    private _reduce;
    exec(value: T): P | undefined;
}
