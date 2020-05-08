exports.default = async function(configuration) {
    // do not include passwords or other sensitive data in the file
    // rather create environment variables with sensitive data
    const CERTIFICATE_NAME = process.env.WINDOWS_SIGN_CERTIFICATE_NAME;
    const TOKEN_PASSWORD = process.env.WINDOWS_SIGN_TOKEN_PASSWORD;

    require("child_process").execSync(
        `your command here ${CERTIFICATE_NAME} ${TOKEN_PASSWORD}`,
        {
            stdio: "inherit"
        }
    );
};

`java -jar ./sign/jsign-3.1.jar --keystore hardwareToken.cfg --storepass "your password here" --storetype PKCS11 --tsaurl http://timestamp.digicert.com --alias /link/to/cert.pem`