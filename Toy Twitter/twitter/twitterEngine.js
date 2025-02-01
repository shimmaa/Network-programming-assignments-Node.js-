//====================================
//tiwtterEngine.js
//=====================================
//1. DO NOT CREATE any global variables

var TwitterEngine = function(){

    //2.IMPLEMENT: tweet(user, text)
    //input: a usernmae, a text of a tweet
    //output: OK if the tweet < 140 char and not empty, KO otherwise
    this.tusers={};
    this.tweet = function(user,text){
        if(text.length>0  && text.length<140)
        {
            if(this.tusers[user])
                this.tusers[user].push(text);
            else
                this.tusers[user]=[text];
            return 'OK';
        }    
        else
            return 'KO';
    };

    //3.IMPLEMENT: timelime(user)
    //input: some user
    //output: an array of the previous tweet of the user or NO_TIMELINE if the
    //        user has not tweeted before
    this.timeline = function(user){
        if(this.tusers[user])
            return this.tusers[user];
        else
            return 'NO_TIMELINE|'+user;  
    }

    //3.USERS: users()
    //input: not input
    //output and array of the user name who tweeted before, which 
    //can also be an empty list
    this.users = function(){
        var ur = [];
        for(u in this.tusers)
            ur.push(u);
        if(ur.length==0)
            return 'NO_USERS';
        else
            return ur;  
    }
}

//3. Export your engine
module.exports = TwitterEngine;
