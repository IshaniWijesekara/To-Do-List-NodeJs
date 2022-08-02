var connection = require("../config/connection");

function Todo() {
  this.get = function (res) {
    connection.acquire(function (err, con) {
      con.query("select * from todo_list", function (err, result) {
        con.release();
        res.send(result);
        console.log("Get successful");
      });
    });
  };
  this.getByID = function (id, res) {
    connection.acquire(function (err, con) {
      con.query(
        "select * from todo_list where id = ?",
        id,
        function (err, result) {
          con.release();
          res.send(result);
          console.log("Get by ID successful");
        }
      );
    });
  };
  this.create = function (todo, res) {
    console.log(todo.id);
    connection.acquire(function (err, con) {
      let data = [todo.id, todo.name, todo.date];
      let sql = "INSERT INTO todo.todo_list(id,name,date) VALUES(?,?,?)";
      con.query(sql, data, function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 500, message: "TODO creation fail" });
        } else {
          res.send({ status: 200, message: "TODO create success" });
          console.log("Post successful");
        }
      });
    });
  };
  this.update = function (todo, id, res) {
    connection.acquire(function (err, con) {
      con.query(
        "update todo_list set name = ? where id = ?",
        [todo, id],
        function (err, result) {
          con.release();
          if (err) {
            res.send({ status: 500, message: "TODO update fail" });
          } else {
            res.send({ status: 200, message: "TODO update success" });
            console.log("Put successful");
          }
        }
      );
    });
  };
  this.delete = function (id, res) {
    connection.acquire(function (err, con) {
      con.query(
        "delete from todo_list where id = ?",
        id,
        function (err, result) {
          con.release();
          if (err) {
            res.send({ status: 500, message: "TODO delete fail" });
          } else {
            res.send({ status: 200, message: "TODO delete success" });
            console.log("Delete successful");
          }
        }
      );
    });
  };
}

module.exports = new Todo();
