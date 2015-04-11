/**
 * Created by shawnmccarthy on 3/15/15.
 * Modified by Nicole Cranon on 4/11/15
 */

module.exports = {
    passwordCheck: passwordCheck,
};

function passwordCheck(username, password, cb) {
    var passwordOk = (username === 'nic' && password === 'cran');
    cb(null, passwordOk);
}
