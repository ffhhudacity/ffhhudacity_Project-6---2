/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test which has been written by the original coder. THe following describes its function:
         *it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. I used "forEach" to loop through an array instead of a "for..in". I also defined the url is not empty.
         */
        it('have URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. I used "forEach" to loop through an array instead of a "for..in". I also defined the name should not be empty.
         */ 
        it('have name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility', function(){
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });
      });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // Load feed with 0 index
            loadFeed(0,done);
        });
       // define the initial entryies should not be empty./
        it('have at least a single element', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
     });


    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        var oldFeed = null;
        var newFeed = null;
    
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous. Define the new feed is not the old feed so as to ensure the content changes when a new feed is loaded.
         */

        beforeEach(function (done) {
            loadFeed(1, function() {
                oldFeed = $('.feed .entry p').map(function () {
                    return $(this).text();
                }).get().join();

                loadFeed(2, function() {
                    newFeed = $('.feed .entry p').map(function() {
                        return $(this).text();
                    }).get().join();
                    done();
                });
            });
        });

        it('should update content when a new feed is loaded', function (done) {
            expect(newFeed).not.toBe(oldFeed);
            done();
        });
    });
}());
