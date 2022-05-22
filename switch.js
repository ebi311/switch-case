"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol'];
class Switch {
    cases = [];
    case(conditions, targetObject) {
        this.cases.push({
            conditions,
            targetObject,
        });
        return this;
    }
    _default;
    default(fn) {
        this._default = fn;
        return this;
    }
    // 対象オブジェクトの値を返す または 関数を実行し、その戻り値を返す
    _createReturnValues(value, result) {
        if (result === undefined)
            return result;
        if (typeof result === 'function') {
            return result(value);
        }
        else {
            return result;
        }
    }
    _evaluate(value, condition) {
        if (primitiveTypes.find((t) => typeof condition === t)) {
            return condition === value;
        }
        else if ('call' in condition) {
            return condition(value);
        }
    }
    _reduce(value) {
        const result = this.cases.find((c) => {
            const { conditions } = c;
            if (Array.isArray(conditions)) {
                return conditions.some((condition) => {
                    return this._evaluate(value, condition);
                });
            }
            else {
                return this._evaluate(value, conditions);
            }
        });
        return {
            found: !!result,
            result: result?.targetObject,
        };
    }
    reduce(value) {
        const result = this._reduce(value);
        if (!result.found && this._default !== undefined) {
            return this._createReturnValues(value, this._default);
        }
        return this._createReturnValues(value, result.result);
    }
}
exports.Switch = Switch;
