export type CaseFunction<T, P = unknown> = [
  T | ((value: T) => boolean),
  P | ((value: T) => P),
];

const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol'];

export class Switch<T, P = void> {
  private cases: CaseFunction<T, P>[] = [];
  public case(caseFn: CaseFunction<T, P>) {
    this.cases.push(caseFn);
    return this;
  }
  private _default?: CaseFunction<T, P>[1];
  public default(fn: CaseFunction<T, P>[1]) {
    this._default = fn;
    return this;
  }

  private _createReturnValues(
    value: T,
    result: CaseFunction<T, P>[1] | undefined,
  ) {
    if (result === undefined) return result;
    if (typeof result === 'function') {
      return (result as (value: T) => P)(value);
    } else {
      return result;
    }
  }
  private _reduce(value: T) {
    const result = this.cases.find((c) => {
      const condition = c[0];
      if (primitiveTypes.find((t) => typeof condition === t)) {
        return condition === value;
      } else if ('call' in condition) {
        return condition(value);
      }
    });
    return {
      found: !!result,
      result: result?.[1],
    };
  }
  public exec(value: T): P | undefined {
    const result = this._reduce(value);
    if (!result.found && this._default !== undefined) {
      return this._createReturnValues(value, this._default);
    }
    return this._createReturnValues(value, result.result);
  }
}
