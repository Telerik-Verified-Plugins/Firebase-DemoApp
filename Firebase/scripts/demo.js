// Change this to your own URL
var firebaseURL = "https://resplendent-fire-4211.firebaseio.com/";

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};
    
    var fbase;

    DemoViewModel = kendo.data.ObservableObject.extend({

        initFirebase: function () {
            if (!this.checkSimulator()) {
                // you can define a global var or init the Firebase object every time, here's a global definition
                fbase = new Firebase(firebaseURL);
            }
        },

        writeHello: function () {
            if (!this.checkSimulator()) {
                if (fbase === undefined) {
                    alert('Please init Firebase first');
                } else {
                    // the second argument is an optional callback which receives an Error object or null if all is fine
                    fbase.set(
                        { company : {name : "Telerik"}, message: "Hello World" },
                        function(msg) {console.log('Message written, error: ' + msg)}
                    );
                }
            }
        },

        writeGoodbye: function () {
            if (!this.checkSimulator()) {
                if (fbase === undefined) {
                    alert('Please init Firebase first');
                } else {
                    fbase.set({ company : {name : "Telerik"}, message: "Goodbye World" });
                }
            }
        },

        clearMessage: function () {
            if (!this.checkSimulator()) {
                // Open the REST location of your node and call .remove on it.
                new Firebase(firebaseURL + "message").remove(
                    // optional callback
                    function() {
                        console.log('cleared')
                    }
                );
            }
        },

        addLogRecord: function () {
            if (!this.checkSimulator()) {
                new Firebase(firebaseURL + "log").push(
                    // data to push
                    { time : new Date().getTime() },
                    // optional callback
                    function() {
                        alert('log record added')
                    }
                );
            }
        },

        readData: function () {
            if (!this.checkSimulator()) {
                if (fbase === undefined) {
                    alert('Please init Firebase first');
                } else {
                    fbase.child("message").on("value", function(snapshot) {
                        document.getElementById('datalog').innerHTML = 'Data read: ' + snapshot.val();
                    });
                }
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.Firebase === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);