var channels = [];
var pubnub = new PubNub({
    publishKey: "pub-c-38bbe3c0-6929-4c22-b4a6-5d8704430219",
    subscribeKey: "sub-c-1164dd6c-6747-11ea-9174-5e95b827fd71",
});





pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            console.log(statusEvent);
            
        }
    },
    message: function(message) {
        // handle message
        console.log(message);
        
    },
    presence: function(presenceEvent) {
        // handle presence
    }
});
setInterval(()=>{
    pubnub.fetchMessages(
        {
            channels: ['location'],
        },
        (status, response) => {
            console.log(response);
            let location = {latitude:response.channels.location[0].message.latitude,longitude:response.channels.location[0].message.longitude}
            moveMarker( location )
        }
    );
},5000)

pubnub.subscribe({
    channel: ['location']
});;

pubnub.hereNow(
    {
        channels: ["location"], 
        includeUUIDs: true,
        includeState: true 
    },
    function (status, response) {
        console.log(response);
        
    }
);