//====================================
//tiwtterEngine.js
//=====================================
//1. DO NOT CREATE any global variables


var TwitterEngine = function(){

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
 var tweeting= mongoose.model('tweeting', { tuser: String , tweeta: String });

    //2.IMPLEMENT: tweet(user, text)
    //input: a usernmae, a text of a tweet
    //output: OK if the tweet < 140 char and not empty, KO otherwise
    this.tweet = function(user,text){
        if(text.length>0  && text.length<140)
        { 
          var ust = new tweeting({tuser:user,tweeta: text});
          ust.save(function(err, ust) {
          if (err) return console.log('0'+err)
            console.log('user: '+ust.tuser+', tw: '+ust.tweeta);
          });
            return 'OK';
        }    
        else
            return 'KO';
    };

    //3.IMPLEMENT: timelime(user)
    //input: some user
    //output: an array of the previous tweet of the user or NO_TIMELINE if the
    //        user has not tweeted before
    this.timeline = function(user,ac){
        var i;
        var t=[];
        tweeting.find({'tuser': user },function(err, tweetss) {
          if (err) return console.log(err+'1');
          for(i in tweetss)
            t[i]=tweetss[i].tweeta;
          if(t.length==0)
            t='NO_TIMELINE|'+user; 
          ac(t);
        });
    };

    //3.USERS: users()
    //input: not input
    //output and array of the user name who tweeted before, which 
    //can also be an empty list
    this.users = function(ac){
        var ur = [];
        tweeting.find().distinct('tuser', function(err, usrs) {
        if (err) return console.log(err+'2');//console.error(err+'2');
        if(usrs.length==0)
          usrs = 'NO_USERS';
        ac(usrs);
        });
    }

}

//3. Export your engine
module.exports = TwitterEngine;
