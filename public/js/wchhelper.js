/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
"use strict";

class WchHelper {
    constructor(url, debug) {
        this.baseTenantURL = url;
        this.debug = (debug ? debug: false);
        this.contentEndpoint =          '/delivery/v1/content';
        this.authoringContentEndpoint = '/authoring/v1/content';
        this.loginEndpoint =            '/login/v1/basicauth';
    }

    getContentById(contentId, endpoint) {
        let wch = this;
        return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.onload = resolve;
            req.withCredentials = true;
			req.onerror = function(err){ reject("Network Error");};
			req.open("GET", wch.baseTenantURL + endpoint + '/' + contentId);
			req.send();
		}).
        // extract the XHR from the event
		then(event => event.target).
		// extract the response body from the xhr request
		then(req => req.responseText).
		then(res => wch.debugLog(wch,res)).
		// parse the JSON
		then(JSON.parse);
    }

    getDeliveryContentById(contentId) {
        return this.getContentById(contentId, this.contentEndpoint);
    }

    getAuthoringContentById(contentId) {
        return this.getContentById(contentId, this.authoringContentEndpoint);
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.onload = resolve;
            req.onerror = reject;
            req.withCredentials = true;
            req.open("GET", this.baseTenantURL + this.loginEndpoint);
            req.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            req.send();
        }).
        // extract the XHR from the onload event
        then(event => event.target).
        // access the tenant id header - if we don't get one, something may have gone wrong even without error
        then(req => req.getResponseHeader("x-ibm-dx-tenant-id")).
        then(this.debugLog);
    }

    // Debug logging if enabled via optional second constructor arg
    // reference to this helper is passed in, since called from arrow function
    // within promise, which loses the original this binding
    debugLog(wch, val) {
        if (wch.debug)
            console.log("Debug: " + val);
        return val;
    }

}
