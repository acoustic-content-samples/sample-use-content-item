/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

// The API URL, along with the host and content hub id for your tenant, may be
// found in the "Hub Information" dialog off the "User menu" in the authoring UI
// eg const baseTenantAPIURL = "https://content-eu-4.content-cms.com/api/00000000-1111-2222-3333-444444444444";
const baseTenantAPIURL = "https://{tenant-host}/api/{tenant-id}";

// The base tenant delivery host URL is the host where published content url elements may be loaded from.
// Find the tenant host in the "Hub Information" dialog of the Authoring UI
// eg const baseTenantDeliveryHostURL = "https://content-eu-4.content-cms.com";
const baseTenantDeliveryHostURL = "https://{tenant-host}";

// The Content Item ID that we are going to load for this application
// This should match a content id from the sample-article-content package.
let contentId = 'b7abe31d-7763-41a9-b8d5-f7cf78565cbd';

debug = true;
wchHelper = new WchHelper(baseTenantAPIURL, debug);

function renderContentItem(settings, scriptId, targetId, contentItem) {
    let template = document.getElementById(scriptId).innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    fixContentUrls(settings, contentItem);
    let html = compiledTemplate(contentItem);
    let targetNode = document.getElementById(targetId);
    targetNode.innerHTML = html;
}

// Add server to URLs within content item
function fixContentUrls(settings, obj) {
    for (var k in obj) {
        if (k == 'url') {
            obj[k] = settings.serverBaseUrl + obj[k];
        }
        if (typeof obj[k] == "object" && obj[k] !== null) {
            fixContentUrls(settings, obj[k]);
        }
        else {}
    }
}

function showBodyText() {
    document.getElementById('bodyText').style.display='block';
}

wchHelper.getDeliveryContentById(contentId)
    .then(content => { renderContentItem({serverBaseUrl:baseTenantDeliveryHostURL}, "articleTemplate", "mainContainer", content) })
    .catch(err =>    { alert("getDeliveryContentById encountered an error: " + err); });
