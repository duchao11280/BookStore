const db = require('../utls/database');
const bcrypt = require('bcryptjs');

async function signUp(req, res) {
    try {
        const phone = req.body?.phone || null;
        const password = req.body?.password || null;
        const address = req.body?.address || null;
        if (phone == null || password == null) {
            res.json({ 
                statusCode: 402,
                message: "Yêu cầu thông tin đăng ký" 
            });
            return;
        }
        if (await checkExistPhone(phone)) {
            res.json({ 
                statusCode: 402,
                message: "Số điện thoại đã được đăng ký" 
            });
            return;
        }

        const query = "INSERT INTO users (phone, `password`, address) VALUES(?, ?,?);"
        let conn = await db.getConnection();
        conn = await db.beginTransaction(conn);
        const result = await db.queryTransaction(conn, query, [phone, bcrypt.hashSync(password, 10), address]);
        await db.commitTransaction(conn);
        if (result) {
            res.json({ 
                statusCode: 200,
                message: "Đăng ký thành công" 
            });
            return;
        }
    } catch (ex) {
        res.json({ 
            statusCode: 500,
            message: "Có lỗi xảy ra, đăng ký thất bại"
        });
        return;
    }
}

async function checkExistPhone(phone) {
    try {
        const query = "SELECT * FROM users WHERE phone = ?";
        const result = await db.exeQuery(query, [phone]);
        return result.length ? true : false;
    } catch (error) {
        throw (error);
    }
}

async function login(req, res) {
    try {
        const phone = req.body?.phone || null;
        const password = req.body?.password || null;
        if (phone == null || password == null) {
            res.json({ 
                statusCode: 402,
                message: "Yêu cầu thông tin đăng nhập" 
            });
            return;
        }
        const query = 'SELECT phone, `password`, role FROM `users` WHERE phone = ?'
        const result = await db.exeQuery(query, [phone]);
        if (!result.length) {
            res.json({ 
                statusCode: 404,
                message: "Số điện thoại chưa được đăng ký" 
            });
            return;
        }
        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
            res.json({ 
                statusCode: 401,
                message: "Mật khẩu không chính xác" 
            });
            return;
        } else {
            res.json({ 
                statusCode: 200,
                message: "Đăng nhập thành công",
                data: {
                    phone: user.phone,
                    role: user.role
                }
            });
            return;
        }
    } catch (ex) {
        res.json({ 
            statusCode: 500,
            message: "Có lỗi xảy ra, đăng nhập thất bại"
        });
        return;
    }
}

module.exports = {
    signUp,
    login,
}