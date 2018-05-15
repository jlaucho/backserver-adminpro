// Semilla de Token
module.exports.SEED = 'unicoToken';


var dataGoogle = {"web":
{
    "client_id":"93893239551-gel75jmtht3jkd75uajebfuluufqpice.apps.googleusercontent.com",
    "project_id":"login-admin-pro-1523283734881",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"uWxPOE8-jBBtX7DaKJ52RB4Y",
        "javascript_origins":
        [
            "http://localhost:3000",
            "http://localhost:4200"
        ]
    }
}
// Autenticacion de google
module.exports.client_id = dataGoogle.web.client_id;
module.exports.secret_id = dataGoogle.web.client_secret;
