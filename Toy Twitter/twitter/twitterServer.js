var net = require('net');
var TwitterEngine = require('./twitterEngine.js');
var LineReader = require('./lineReader.js');


//======= Toy twittter protocol =============


// CLIENT-ACTION			=>  SERVER_RESPONSE
// --------------------------------------------
// client connects 			=> "WELCOME;"
// tweet|<user>|<text>; 		=> "OK;" or "KO;"
// timeline|<user>; 			=> "<text1>|<text2>|....;" or "NO_TIMELINE|<user>;"
// users;					=> "<user1>|<user2>|....;" or "NO_USERS;"		
// quit;						=> "BYE;" and closes the connection

//================== Notes ===================
// 1. you should not depend on \r\n for sending and receiving messages.
// 2. the server is assumed to delete \r, \n from any messages part of the message it receives
// 3. a batch of messages of the form "tweet|sameh|hi;tweet|mahmoud|hello;" in a single write
//    should be accepted as two tweets
// 4. if two tweets for the same user were received from difference connections, the timeline
//    should include both tweets.
// 5. Once the server is closed, the message are deleted.

app={};
var te = new TwitterEngine;
var server = net.createServer(function(conn){
    conn.setEncoding('utf8');    
	conn.write("WELCOME;");

    var id =conn.remotePort;
    app[id]=conn;

    var lr = new LineReader;

    conn.on('data', function (data) {
        curcon = conn.remotePort;
        ct=0;
        lr.putData(data,curcon);
    });


    lr.on('line', function (line,cc,j) {
        if(j==ct)
        {
            ct++;
            console.log("Answer To: "+cc);
            var sl = line.split("|");
	        if (sl[0]=='tweet' && sl.length==3) 
            {
                var t =te.tweet(sl[1],sl[2]); 
    	       if(t=='KO')
                {
                    app[cc].write(t+';');
                    return ;
                }
                app[cc].write(t+';');  
        
            } else if (sl[0]=='timeline' && sl.length==2) {
                var tn=te.timeline(sl[1]);
                if(tn!='NO_TIMELINE|'+sl[1])
                    tn=tn.join('|');
                app[cc].write(tn+';');
            } else if (sl[0]=='users' && sl.length==1) {
                var u = te.users();
                if(u!='NO_USERS')
                    u=u.join('|');
                app[cc].write(u+';');
            } else if (sl[0]=='quit' && sl.length==1) {
                app[cc].end('BYE;');
                delete app[cc];
            } else {
                app[cc].write('INVALID_CMD;');
            }
        }
        
    });
    conn.on('close', function () {
        console.log('user left');
   });
});


server.listen(3000, function(){
    console.log("server is listening on port 3000\n");
})
