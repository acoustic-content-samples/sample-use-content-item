# sample-use-content-item

This is a getting started sample, showing how to retrieve a single, ready, published content item from the content delivery service, and display elements of the content item on a page.

### Obtaining and running the sample

#### 1. Download the files

Download the application files (html, js, and css) from the 'public' folder into any folder on your workstation, or clone this respository to a local web project.

#### 2. Update the baseTenantAPIURL and baseTenantDeliveryURL

The baseTenantAPIURL and baseTenantDeliveryHostURL variable used to load the wchHelper in public/js/app.js must be set for your tenant. In the IBM Watson Content Hub user interface, open the user menu from the top navigation bar, then select "Hub information". The pop-up window shows your API URL, host and content hub ID for your Watson Content Hub tenant. Use this information to update the value of the baseTenantAPIURL variable in public/js/app.js, in the form https://{host}/api/{content hub tenant id}. For example it might look something like the following (except using your tenant host and tenant id)

const baseTenantAPIURL = "https://my12.digitalexperience.ibm.com/api/12345678-9abc-def0-1234-56789abcdef0";
const baseTenantDeliveryHostURL = "https://my12.digitalexperience.ibm.com";

#### 3. Load the sample article content

This application uses an "Article" content type and an article content item(s) that must be created for your tenant prior to running the sample the first time.

Follow the instructions at the [sample-article-content](https://github.com/ibm-wch/sample-article-content) repository, to download and push the sample article type and associated articles, for your content hub tenant.  Once pushed to your tenant, follow the instructions in that repository to move the article content items to the "Ready" state.   This sample retrieves published, delivery content, which only includes content items that have been marked "Ready".

#### 4. Enable CORS support for your tenant

To run a local web application that makes REST calls to the Watson Content Hub APIs, you will need to enable CORS support for your tenant. To control the CORS enablement for Watson Content Hub, go to Hub set up -> General settings -> Security tab. After adding your domain (or "*" for any domain), be sure to click the Save button at the top right of the screen.

#### 5. Load index.html in a browser

You can do this right from the file system in Firefox, Chrome, or Safari browsers. Alternatively you can make the files available on any web server and open index.html in a browser using your web server URL.

#### Loading other content items

To retrieve and display a different article from the sample-article-content package, find the contentId JS variable in app.js and change it to match the content id of a different article from the sample article content package.   To load a different type of content altogether, then you would need to update the HTML, css styles and HBS markup to match the elements in the new content type.

###Resources

API Explorer reference documentation: https://developer.ibm.com/api/view/id-618

Watson Content Hub developer center: https://developer.ibm.com/wch/

Watson Content Hub forum: https://developer.ibm.com/answers/smartspace/wch/
