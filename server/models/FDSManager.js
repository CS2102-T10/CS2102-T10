const db = require("../database");

class FDSManager {
    static queryTotalNewCustomers(month, year, callback) {  
        db.query(
            'SELECT COUNT(*) as num FROM Accounts a1 join Customers c1 on a1.account_id = c1.cid WHERE (SELECT EXTRACT(MONTH FROM date_created)) = $1 and (SELECT EXTRACT(YEAR FROM date_created)) = $2;',
            [month, year], 
            function (err, res) {
                if (err.error) {
                    console.log("Error occurred at FDSManagerModel#queryTotalNewCustomers");
                    return callback(err);
                }
                callback(err, res[0]);
            });
    }

    static queryMonthOrders(month, year, callback) {
        db.query(
            'SELECT COUNT(*) as num FROM Orders o1 WHERE (SELECT EXTRACT(MONTH FROM order_placed)) = $1 and (SELECT EXTRACT(YEAR FROM order_placed)) = $2;',
            [month, year],
            (err, res) => {
                if (err.error) {
                    console.log("Error occurred at FDSManagerModel#queryMonthOrders");
                }
                callback(err, res[0]);
            }
        );
    }

    static queryMonthlyOrderCost(month, year, callback) {
        db.query(
            'SELECT SUM(total_price) as price FROM Orders o1 WHERE (SELECT EXTRACT(MONTH FROM order_placed)) = $1 and (SELECT EXTRACT(YEAR FROM order_placed)) = $2;',
            [month, year],
            (err, res) => {
                if (err.error) {
                    console.log("Error occurred at FDSManagerModel#queryMonthlyOrderCost");
                }
                callback(err, res[0]);
            }
        );
    }

}

module.exports = FDSManager;
