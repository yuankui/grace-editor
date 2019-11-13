const fetch = require('node-fetch').default;
const {Base64} = require('js-base64');

function getHosts(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => {
                r.text()
                    .then(
                        text => {
                            const str = Base64.decode(text);
                            const hosts = str.split("\n")
                                .map(h => {
                                    if (!h.startsWith('ssr://')) {
                                        return null;
                                    }

                                    const b = h.substring("ssr://".length)
                                    const hosts = Base64.decode(b);
                                    return parseHost(hosts);
                                })
                                .filter(o => o != null);

                            resolve(hosts);
                        }
                    )
                    .catch(err => reject(err))
            })
            .catch(err => reject(err));
    })
}

const testHost = 'hk8.kozow.com:60100:auth_aes128_md5:aes-256-cfb:http_simple:YTNMV3daMQ/?obfsparam=MWIxNDAxNDYzLm1pY3Jvc29mdC5jb20&protoparam=MTQ2MzpabWd0blU&remarks=djLpppnmuK9IS0Llo7nlgI0xfOWliOmjng&group=QW15Y2xvdWQ';

function parseHost(str) {
    const [s1, s2] = str.split('/?');
    const [server, server_port, protocol, method, obfs, base64_password] = s1.split(":");
    const obj = s2.split('&')
        .map(kv => {
            const [k, base64v] = kv.split("=");
            return [k, Base64.decode(base64v)];
        })
        .reduce((map, entry) => {
            const [k, v] = entry;
            map[k] = v;
            return map;
        }, {});

    const {
        obfsparam,
        protoparam,
        remarks,
        group,
    } = obj;

    return {
        server,
        server_port,
        protocol,
        method,
        password: Base64.decode(base64_password),
        obfs: obfs,
        obfs_param: obfsparam,
        protocol_param: protoparam,
        timeout: 200,
        local_port: 1086,
        local_address: '127.0.0.1',
        group,
        remarks,
    }
}

// const host = parseHost(testHost);
// console.log(host);

const url = 'https://www.ssrzero.xyz/link/mRNW5NawDzpEKWgF';

const {checkHost} = require('./check');

getHosts(url)
    .then(hosts => {
        hosts.forEach(host => {
            const hostPort = `${host.server}:${host.server_port}`;
            checkHost(hostPort)
                .then(time=> {
                    console.log(time, host.remarks, hostPort);
                })
                .catch(err => {
                    console.log('error', host.remarks, err.toString());
                })
        })
    })
    .catch(e => console.log('error=>', e));

