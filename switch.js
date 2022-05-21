"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol'];
class Switch {
    cases = [];
    case(caseFn) {
        this.cases.push(caseFn);
        return this;
    }
    _default;
    default(fn) {
        this._default = fn;
        return this;
    }
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
    _reduce(value) {
        const result = this.cases.find((c) => {
            const condition = c[0];
            if (primitiveTypes.find((t) => typeof condition === t)) {
                return condition === value;
            }
            else if ('call' in condition) {
                return condition(value);
            }
        });
        return {
            found: !!result,
            result: result?.[1],
        };
    }
    exec(value) {
        const result = this._reduce(value);
        if (!result.found && this._default !== undefined) {
            return this._createReturnValues(value, this._default);
        }
        return this._createReturnValues(value, result.result);
    }
}
exports.Switch = Switch;
