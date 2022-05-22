/** @format */

export type ConditionType<T> = T | ((value: T) => boolean);
export type TargetObjectType<T, P> = P | ((value: T) => P);

export type CaseFunction<T, P = unknown> = {
  conditions: ConditionType<T> | ConditionType<T>[];
  targetObject?: TargetObjectType<T, P>;
};

const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol'];

export class Switch<T, P = void> {
  private cases: CaseFunction<T, P>[] = [];
  public case(
    conditions: ConditionType<T> | ConditionType<T>[],
    targetObject: TargetObjectType<T, P>,
  ) {
    this.cases.push({
      conditions,
      targetObject,
    });
    return this;
  }
  private _default?: TargetObjectType<T, P>;
  public default(fn: TargetObjectType<T, P>) {
    this._default = fn;
    return this;
  }
  // 対象オブジェクトの値を返す または 関数を実行し、その戻り値を返す
  private _createReturnValues(value: T, result?: TargetObjectType<T, P>) {
    if (result === undefined) return result;
    if (typeof result === 'function') {
      return (result as (value: T) => P)(value);
    } else {
      return result;
    }
  }
  private _evaluate(value: T, condition: ConditionType<T>) {
    if (primitiveTypes.find((t) => typeof condition === t)) {
      return condition === value;
    } else if ('call' in condition) {
      return condition(value);
    }
  }
  private _reduce(value: T) {
    const result = this.cases.find((c) => {
      const { conditions } = c;
      if (Array.isArray(conditions)) {
        return conditions.some((condition) => {
          return this._evaluate(value, condition);
        });
      } else {
        return this._evaluate(value, conditions);
      }
    });
    return {
      found: !!result,
      result: result?.targetObject,
    };
  }
  public reduce(value: T): P | undefined {
    const result = this._reduce(value);
    if (!result.found && this._default !== undefined) {
      return this._createReturnValues(value, this._default);
    }
    return this._createReturnValues(value, result.result);
  }
}
