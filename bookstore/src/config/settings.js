const localHost = 'http://localhost:1188';

const loginKey = {
    isLogin: 'ibook-islogin-key',
    phone: 'ibook-phone-key',
    role: 'ibook-role-key',
    userId: 'ibook-userid-key'
};

const urlImage = '/public/images/';

export default {
    host: localHost,
    loginKey: loginKey,
    urlImageKey: localHost + urlImage
}