import {useEffect, useMemo} from "react";
import {createSampleQueue, MessageQueue} from "./SampleQueue";

export function useSampleQueue<T>(interval: number): [MessageQueue<T>, MessageQueue<T>] {
    const [valueInput, valueOutput, close] = useMemo(() => {
        // 500 毫秒保存一次
        return createSampleQueue<T>(interval);
    }, []);
    useEffect(() => {
        return () => close();
    }, []);

    return [valueInput, valueOutput];
}