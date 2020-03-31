import {Consumer} from "../../common";
import {useMemo} from "react";

export interface Notifier {
    notice(data?: any);

    listen(listener: Consumer<any>);
}

export function useNotifier(): Notifier {
    return useMemo(() => {
        let l: Consumer<any> | undefined = undefined;
        return <Notifier> {
            listen(listener: Consumer<any>) {
                l = listener;
            },
            notice(data: any) {
                if (l) {
                    l(data);
                }
            }
        }
    }, []);
}