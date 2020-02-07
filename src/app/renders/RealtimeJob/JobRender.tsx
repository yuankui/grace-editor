import {RenderProps} from "../renders";
import React, {FC, useState} from "react";
import SourceConfigList from "./config/SourceConfigList";
import {JobConfig} from "./Models";
import {changeValue} from "./utils";

export const JobRender: FC<RenderProps> = (props) => {
    const config: JobConfig = {
        "labels": [
            {
                "collector": {
                    "type": "none",
                    "config": {}
                },
                "dimId": 2,
                "extractor": "{\n  \"type\": \"java\",\n  \"config\": {\n    \"name\": \"rtUsrCartSkuExtractor\"\n  }\n}",
                "labelId": 10134,
                "labelName": "rt_usr_cart_sku",
                "parallelism": 4,
                "sourceId": 4,
                "storageId": 0
            }
        ],
        "sources": [
            {
                "config": {
                    "uid": "app.encrypted_waimai_order_shard",
                    "name": "app.encrypted_waimai_order_shard",
                    "namespace": "rz_waimai_namespace",
                    "format": "binlogV2"
                },
                "name": "app.encrypted_waimai_order_shard",
                "sourceId": 1,
                "type": "kafka-auth"
            },
            {
                "config": {
                    "uid": "app.waimai_flow_pv_new",
                    "name": "app.waimai_flow_pv",
                    "namespace": "rz_waimai_namespace",
                    "format": "json"
                },
                "name": "app.waimai_flow_pv",
                "sourceId": 3,
                "type": "kafka-auth"
            },
            {
                "config": {
                    "uid": "app.mafka.waimai_c_shoppingcart_change_msg",
                    "name": "app.mafka.waimai_c_shoppingcart_change_msg",
                    "namespace": "rz_waimai_namespace",
                    "format": "json"
                },
                "name": "app.mafka.waimai_c_shoppingcart_change_msg",
                "sourceId": 4,
                "type": "kafka-auth"
            }
        ],
        "storages": [
            {
                "config": {
                    "cluster": "redis-ups-server_stage",
                    "category": "poi",
                    "timeout": 400
                },
                "dimId": 1,
                "id": 0,
                "parallelism": 8,
                "type": "squirrel"
            },
            {
                "config": {
                    "cluster": "redis-ups-server_stage",
                    "category": "poi",
                    "timeout": 400
                },
                "dimId": 2,
                "id": 0,
                "parallelism": 8,
                "type": "squirrel"
            },
            {
                "config": {
                    "area": 15,
                    "prefix": "realtime_user:",
                    "remoteKey": "com.sankuai.tair.qa.perf",
                    "ttl": 2592000,
                    "timeout": 500
                },
                "dimId": 2,
                "id": 0,
                "parallelism": 8,
                "type": "tair"
            },
            {
                "config": {
                    "name": "app.upsserver_dspas_user_cart"
                },
                "dimId": 2,
                "id": 0,
                "parallelism": 4,
                "type": "kafka"
            }
        ]
    };

    const [value, onChange] = useState(config);

    const change =changeValue(value, onChange);

    return <div style={{overflow: 'auto'}}>
        <SourceConfigList value={value.sources} onChange={change('sources')}/>
    </div>
};