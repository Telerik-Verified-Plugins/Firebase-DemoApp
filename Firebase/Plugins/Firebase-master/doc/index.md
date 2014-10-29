<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# com.firebase.sdk

Firbase provides powerful API to store and sync data in realtime. When data changes, apps built with Firebase update instantly across every device.

`Firebase` object is available in window scope after the device `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(device.cordova);
    }

## Installation

You can install the Firebase Cordova plugin using the following command:

    cordova plugin add #PATH_TO_FIREBASE_REPO#

## Getting started

### Create Firebase instance

    var fb = new Firebase("FIREBASE_URL");

### Save Data

Firebase stores data as standard JSON. You can either save a single object in the following way:

    fb.set({ name : "Telerik", message: "Hello World" });

Or you can do multiple via push operation for a given node:

    fb.push({ name : "Telerik", message: "Hello World" });


### Listen to Data Changes

Firebase responds immediately to any data changes as they occur.

    fb.on("value", function(data) {
      var name = data.val() ? data.val().name : "";
      alert("My name is " + name);
    });

In case of push operation, it will look like:

    fb.on("child_added", function(snapshot){
       var data = snapshot.val();
       alert(data.name + "said: " + data.message);
    });


## Supported Platforms

- iOS
- Android

## Resources

For more information, please refer to the [Firbase Getting Started](https://www.firebase.com/how-it-works.html).
