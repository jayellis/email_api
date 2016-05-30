var express = require('express');
var emails = require('./emails.js');
var router = express.Router();

/* GET home page. */
router.all('/gordonroad/enquire.:format?', function(req, res, next) {
  var enquire = req.body || req.query
    , format = req.params.format;

  emails.gordonRoadEnquiry(enquire, function( message ) {
    if( format != 'json' ) {
      res.redirect('http://no5hastings.co.uk');
    } else {
      res.sendStatus(200);
    }
  });
});

router.all('/influence-affluence/enquire.:format?', function( req, res, next ) {
  var enquire = req.body || req.query
    , format = req.params.format;

  emails.influenceaffluence( enquire, function( message ) {
    if( format != 'json' ) {
      res.redirect('http://www.influenceandaffluence.co.uk');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
