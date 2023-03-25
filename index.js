const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PivotTableSample.sqlite');
db.loadExtension('./pivotvtab.dylib')
db.serialize(() => {
    db.run('CREATE TABLE 銷售資料\n' +
               '(\n' +
               '    產品名稱 text,\n' +
               '    年份     integer,\n' +
               '    銷售額   integer\n' +
               ');')
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('蘋果', 2020, 100);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('蘋果', 2021, 120);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('蘋果', 2022, 130);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('蘋果', 2023, 140);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('鳳梨', 2020, 10);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('鳳梨', 2021, 20);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('鳳梨', 2022, 40);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('鳳梨', 2023, 80);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('葡萄', 2020, 80);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('葡萄', 2021, 75);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('葡萄', 2022, 78);");
    db.run("INSERT INTO 銷售資料 (產品名稱, 年份, 銷售額) VALUES ('葡萄', 2023, 80);");
    db.run('CREATE VIRTUAL TABLE v_銷售資料 USING pivot_vtab\n' +
               '(\n' +
               '    (SELECT DISTINCT 產品名稱 FROM 銷售資料),\n' +
               '    (SELECT DISTINCT 年份,年份 FROM 銷售資料 ORDER BY 年份),\n' +
               '    (SELECT sum(銷售額) FROM 銷售資料 WHERE 產品名稱 = ?1 AND 年份 = ?2)\n' +
               ');')
    db.all("select * from v_銷售資料;", (err, rows) => {
        console.log(rows)
    })
});
