new Vue({
    el: '#events',
    delimiters: ['<%', '%>'],
    data: {
        event: { name: '', description: '', date: '' },
        events: []
    },
    mounted: function() {
        this.fetchEvents();
    },
    methods: {
        fetchEvents: function() {

            this.$http.get('/vsd/default/get_events').then(response => {

                console.log("success:");
                console.log(response.body);
                this.events = response.body;

            }, response => {
                console.log("error while fetch");
                console.log(response);
            });
            
        },

        // Adds an event to the existing events array
        addEvent: function() {
            if(this.event.name) {
                this.$http.post('/vsd/default/add_event', this.event).then(response => {

                    console.log("success:");
                    console.log(response.body);
                    this.event.id = parseInt(response.body);
                    this.events.push(this.event);

                    this.event = { name: '', description: '', date: '' };

                }, response => {
                    console.log("error while add");
                    console.log(response);
                });
                
            }
        },

        deleteEvent: function(event) {
            if(confirm("Are you sure you want to delete this event?")) {

                this.$http.post('/vsd/default/remove_event', event).then(response => {

                    console.log("success:");
                    console.log(response.body);
                    var index = this.events.indexOf(event);
                    if(index != -1) {
                        this.events.splice( index, 1 );
                    }

                }, response => {
                    console.log("error while remove");
                    console.log(response);
                });
            }
        }
    }
});
