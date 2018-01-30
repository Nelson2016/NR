export default {
    'nullMessage': '该项不可为空',
    'maxLengthMessage': '内容超出了限定内容长度',
    'password': {
        message: '密码为6-16位字符，可包含.或_',
        regExp: /^[a-zA-Z0-9._]{6,16}$/
    },
    'username': {
        message: '用户名为4-16字母或数字。',
        regExp: /^[a-zA-Z0-9]{4,16}$/
    },
    'mail': {
        message: '邮箱地址输入有误',
        regExp: /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    }
}