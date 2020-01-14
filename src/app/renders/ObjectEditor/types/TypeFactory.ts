import JsonTypeBoolean from "./JsonTypeBoolean";
import JsonTypeNull from "./JsonTypeNull";
import JsonTypeNumber from "./JsonTypeNumber";
import JsonTypeString from "./JsonTypeString";
import JsonTypeObject from "./JsonTypeObject";
import JsonTypeArray from "./JsonTypeArray";
import JsonTypeInvalid from "./JsonTypeInvalid";

const types: any = [
    JsonTypeBoolean,
    JsonTypeNull,
    JsonTypeNumber,
    JsonTypeString,
    JsonTypeArray,
    JsonTypeObject,
];

const TypeFactory = (value: object): any => {
    for (let JsonType of types) {

        if (new JsonType().checkType(value)) {
            return JsonType;
        }
    }

    return JsonTypeInvalid as any;
};

export default TypeFactory;