import KafkaSource from "./KafkaSource";
import {FC} from "react";
import SquirrelSinkPlugin from "./SquirrelSinkPlugin";
import TairPlugin from "./TairPlugin";

interface Props {
    value: any,
    onChange: (value: any) => void,
}

export const SourceMap: { [key: string]: FC<Props> } = {
    'kafka-auth': KafkaSource,
    'squirrel': SquirrelSinkPlugin,
    // 'tair': TairPlugin,
};