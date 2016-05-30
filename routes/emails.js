//reqiure block {{{1
var jade = require('jade')
  , path = require('path')
  , util = require('util')
  , config = require('../config.js')
  , AmazonSES = require('amazon-ses');

//Send {{{1
module.exports = {
  send: function(template, mailOptions, templateOptions, fn) {
    var error;
    mailOptions.to = mailOptions.to;
    jade.renderFile(path.join(__dirname, '../views', template), templateOptions, function(err, text) {
      if( err ) {
        error = err;
        console.log( err );
      }
      // Add the rendered Jade template to the mailOptions
      mailOptions.body = {
        text: text.replace(/<(?:.|\n)*?>/gm, ''),
        html: text
      };
      //Decode AWS keys
      var ses = new AmazonSES( config.AWS_KEY, config.AWS_SECRET );
      ses.send(mailOptions,
        function(err, result) {
          if (err) {
            error = err;
            console.log( err );
          }
          fn( error || { message: 'email sent' } );
        }
      );
    });
  },

  gordonRoadEnquiry: function(enquire, fn) {
    this.send('gordonRoadEnquiry.jade', {
      to: [ 'info@no5hastings.co.uk', 'jay@dec0de.com' ],
      from: 'info@no5hastings.co.uk',
      subject: 'Gordon Road Availability Request'
    }, { 
      enquire: enquire
    }, function(message) {
      fn(message)
    });
  },

  influenceaffluence: function(enquire, fn) {
    this.send('influenceandaffluence.jade', {
      to: [ 'russell.marriott@influenceandaffluence.co.uk', 'jay@dec0de.com' ],
      from: 'admin@influenceandaffluence.co.uk',
      subject: 'Website enquiry'
    }, {
      enquire: enquire
    }, function( message ) {
      fn( message )
    });
  }
};

