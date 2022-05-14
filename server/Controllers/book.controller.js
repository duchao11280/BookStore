const {exeQuery} = require('../utls/database')
const datetime = require('../utls/datetime')
exports.getAllBooks = async (req,res) =>{
    console.log(datetime.getDateWithString())
    try {
        const result = await exeQuery(`Select * from books`);
        
        res.status(200).json({message: "Lấy dữ liệu thành công", data: result});
    } catch (error) {
        res.status(500).json({message: "Thất bại", data: error});
    }
    
}

