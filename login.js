var battery = require('../data/battery');

module.exports = {
  get: function(req, res){
    res.render('signup');
  },

  post: function(req, res){
    var username = req.body.key;

    if (req.body.key === battery.key) {
      req.session.user_id = battery.key;
    }
    res.render('thanks');
  }
};
