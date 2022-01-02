module.exports.settings = {
    Authentication: {
        Header_NotFound: "No Authorization header was found",
        Bearer_NotFound: "Format is Authorization: Bearer [token]",
        Bearee_Format: "Bearer",
        Invalid_Token: 'Invalid Token!',
        Type: "jwt", // types available jwt/bcrypt/nosecurity
        ACCESS_TOKEN_SECRET: "Power@1234",
        ALGORITHM: "HS256",
        EXPIRESIN: "1m"
    },
    Password: {
        MinLength: 8,
        MaxLength: 50,
        Expiry_Days: 60,
        History_Count: 6
    },
    aws_s3: {
        "AWSS3_ID": "",
        "AWSS3_SECRET": "",
        "AWSS3_BUCKET_NAME": "",
        "AWSS3_REGION": "us-east-2",
        "AWSS3_signedUrlExpireSeconds": 600
    },
    Mailgun: {
        API_Key: "your-key-goes-here",
        Api_Url: "https://api.mailgun.net/v3",
        Domain: "your-domain-goes-here"
    },
    App: {
        DocumentProvider: '',
        OcrProvider: '',
        CompanyCode: "CODE",
        EmailProvider: "Mailgun", //Mailgun/AWSSES
        SmsProvider: "Nexmo" //Nexmo/Plivo
    },
    Email: {
        From: "hello <hello@mailgun.com>",
        Subject_ForgotPassword: "Forgot Password",
        Subject_EmailVerification: "Email Verification",
        TemplateUrl_ForgotPassword: "templates/emailTemplates/forgotPassword",
        Verification_UserName: "User"
    },
    Security: {
        JwtSecurityKey: "your-key",
        JwtTokenExpiryTime: "",
        JwtTokenExpiryTime_InSec: 28800,
        SaltRounds: 10,
        bcryptSecurityKey: "your-key"
    },
    CryptoJSSecurity: {
        EncryptionKey: "your-key",
        ivKey: "your-key",
    },
    data: {
        "temp": {
            "path": process.env.SAILS_TEMP_FOLDER_PATH
        },
        "code": {
            "path": process.env.SAILS_CODE_GEN_FOLDER_PATH
        },
    },
    templates: {
        "word": {
            "path": process.env.WORD_TEMPLATES_FOLDER_PATH
        }
    }
};
