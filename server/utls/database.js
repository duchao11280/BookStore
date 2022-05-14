/**
 * Database utilities to process for mysql
 * Create by: ThangLD
 * Create at: 14/05/2022
 */

import mysql from 'mysql';
import settings from '../config/settings';

const pool = mysql.createPool({
    connectionLimit : settings.database.limit,
    host            : settings.database.host,
    port            : settings.database.port,
    database        : settings.database.database,
    user            : settings.database.user,
    password        : settings.database.passwrod,
    charset         : settings.database.charset
});

/**
 * Get mysql connection
 * @returns 
 */
function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

/**
 * Begin transaction sql
 * @param {mysql.Connection} conn 
 * @returns 
 */
function beginTransaction(conn) {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

/**
 * Execute query with transaction
 * @param {mysql.Connection} conn 
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
function queryTransaction(conn, sql, params = []) {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * Commit transaction mysql
 * @param {mysql.Connection} conn 
 * @returns 
 */
function commitTransaction(conn) {
    return new Promise((resolve, reject) => {
        conn.commit((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

function queryThenRelease(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query({sql, timeout: 5000}, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * Query without transaction
 * Should be select clause
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
async function exeQuery(sql, params = []) {
    let result = [];
    try {
        result = await queryThenRelease(sql, params);
    } catch (ex) {
        throw ex;
    }
    return result;
}

module.exports = {
    getConnection,
    beginTransaction,
    queryTransaction,
    commitTransaction,
    exeQuery
}