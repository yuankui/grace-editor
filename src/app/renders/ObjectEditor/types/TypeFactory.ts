import JsonType from "./JsonType";
import JsonTypeBoolean from "./JsonTypeBoolean";
import JsonTypeNull from "./JsonTypeNull";
import JsonTypeNumber from "./JsonTypeNumber";
import JsonTypeString from "./JsonTypeString";
import JsonTypeObject from "./JsonTypeObject";
import JsonTypeArray from "./JsonTypeArray";
import JsonTypeInvalid from "./JsonTypeInvalid";

const types: Array<()=>JsonType> = [
    () => new JsonTypeBoolean(),
    () => new JsonTypeNull(),
    () => new JsonTypeNumber(),
    () => new JsonTypeString(),
    () => new JsonTypeArray(),
    () => new JsonTypeObject(),
];

const TypeFactory = (value: object): JsonType => {
    for (let factory of types) {
        const jsonType = factory();
        if (jsonType.checkType(value)) {
            return jsonType;
        }
    }

    return new JsonTypeInvalid();
};

export default TypeFactory;