(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};
    
    var fbase;

    DemoViewModel = kendo.data.ObservableObject.extend({

        initFirebase: function () {
            if (!this.checkSimulator()) {
              	// Change these properties to your own, grab them by creating an App for Web in the Firebase console
                var config = {
                  apiKey: "AIzaSyCh1m8__Zpl3TU27ZvmJZFjS4CSQ4cpiyk",
                  authDomain: "n-plugin-test.firebaseapp.com",
                  databaseURL: "https://n-plugin-test.firebaseio.com"
                };

                window.firebase.initializeApp(config);
              
                fbase = window.firebase.database();
            }
        },

        writeHello: function () {
            if (!this.checkSimulator()) {
                if (fbase === undefined) {
                    alert('Please init Firebase first');
                } else {
                    // the second argument is an optional callback which receives an Error object or null if all is fine
                    // note that this call wipes all other data in the root
                    fbase.ref().set(
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
                    // note that this call wipes all other data in the root
                    fbase.ref().set({ company : {name : "Telerik"}, message: "Goodbye World" });
                }
            }
        },

        clearMessage: function () {
            if (!this.checkSimulator()) {
                // Open the REST location of your node and call .remove on it.
                fbase.ref("message").remove(
                    // optional callback
                    function() {
                        console.log('cleared')
                    }
                );
            }
        },

        addLogRecord: function () {
            if (!this.checkSimulator()) {
                fbase.ref("log").push(
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
                    fbase.ref().child("message").on("value", function(snapshot) {
                        document.getElementById('datalog').innerHTML = 'Data read: ' + snapshot.val();
                    });
                }
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.firebase === undefined) {
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