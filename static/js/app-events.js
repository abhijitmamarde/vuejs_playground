new Vue({
    el: '#events',
    delimiters: ['<%', '%>'],
    data: {
        event: { name: '', description: '', date: '' },
        event_backup: { name: '', description: '', date: '' },
        events: [],
        isActionAdd: true
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

        deleteEvent: function(index) {
            if(confirm("Are you sure you want to delete event: " + this.events[index].name + "?")) {

                this.$http.post('/vsd/default/remove_event', this.events[index]).then(response => {

                    console.log("success:");
                    console.log(response.body);
                    this.events.splice( index, 1 );

                }, response => {
                    console.log("error while remove");
                    console.log(response);
                });
            }
        },

        editEvent: function(event) {
            this.isActionAdd = false;
            this.event_backup = JSON.parse(JSON.stringify(event));
            this.event = event;
        },

        cancelEvent: function(event) {
            if(this.isActionAdd) {
                this.event = { name: '', description: '', date: '' };
            } else {
                // this.event = JSON.parse(JSON.stringify(this.event_backup));
                this.event.id = this.event_backup.id;
                this.event.name = this.event_backup.name;
                this.event.date = this.event_backup.date;
                this.event.description = this.event_backup.description;

                this.event_backup = { name: '', description: '', date: '' };
                this.event = { name: '', description: '', date: '' };
                this.isActionAdd = true;
            }
        },

        updateEvent: function() {
            
            this.$http.post('/vsd/default/update_event', this.event).then(response => {

                console.log("success:");
                console.log(response.body);
                this.isActionAdd = true;
                var index = this.events.indexOf(event);
                if(index != -1) {
                    this.events[index] =  JSON.parse(JSON.stringify(this.edit_event));
                }
                this.event = { name: '', description: '', date: '' };

            }, response => {
                console.log("error while update");
                console.log(response);
            });

        },
    }
});
