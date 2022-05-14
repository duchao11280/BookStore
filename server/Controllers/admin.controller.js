const db = require('../utls/database')

exports.disableBookByBookId = async (req, res) => {
    try {
        const id = req.params.id;
        let conn = await db.getConnection();
        conn = await db.beginTransaction(conn);
        const query = `Update books set isDisable = 1 Where bookId = ?`
        const result = await db.queryTransaction(conn, query, [id]);
        conn = await db.commitTransaction(conn);
        res.status(200).json({ message: "Xóa dữ liệu thành công" });
    } catch (error) {
        res.status(500).json({message: "Thất bại", data: error});
    }
}