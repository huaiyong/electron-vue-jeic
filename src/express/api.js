/* document.all.filter(e => {
  return e.style.font-family.toLowerCase().indexOf('yahei') > -1 || e.style.font-family.toLowerCase().indexOf('雅黑') > -1
}) */
const conn = require('./sqlite')
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('C:/Users/hy/myTest.db');

const sqls = require('./sql')
const app = require('./http')

// 注册 解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// 配置服务端口
const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('Listen at http://%s:%s', host, port)
})

const sqlObj = new sqls()

// getAll
app.get('/api/getAll', (req, res) => {
  const sql = sqlObj.GETALL_SQL_T_USER
  console.log(sql)
	conn.each('select * from t_user', function(err, result){
		if(err){
			return res.json({err_code: 0, msg: '查询失败', affectedRows: 0})
		} else {
			res.json({
				err_code: 1, msg: result, affectedRows: 0
			  })
		}
	});
})

// getById
app.get('/api/getById', (req, res) => {
  const id = req.query.id
  const sqlStr = sqlObj.GETBYID_SQL_T_USER 
	
	conn.run('delete from t_user where user_id =' + id, function(err, rows){
		if(err) return res.json({err_code: 1, msg: '获取数据失败', affectedRows: 0})
		if(rows.length !== 1) return res.json({err_code: 1, msg: '数据不存在', affectedRows: 0})
		res.json({
				err_code: 1,
				msg: rows[0],
				affectedRows: 0
		})
	});
	
})