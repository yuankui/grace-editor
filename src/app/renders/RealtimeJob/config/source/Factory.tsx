import KafkaSource from "./KafkaSource";
import {FC} from "react";

interface Props {
    value: any,
    onChange: (value: any) => void,
}

export const SourceMap: { [key: string]: FC<Props> } = {
    'kafka-auth': KafkaSource,
};