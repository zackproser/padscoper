var Database = function() {
    this.properties = [];
    this.init(); 
}; 

Database.prototype.init = function() {
    this.properties = [
        {
            id: 1,
            address: '535 Mission St.',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            lat: 37.788840,
            long: -122.398129,
            image_url: '//lh5.ggpht.com/JQznu-TQhz5dy7cAYNjaXAC2X84gAZXAdOP3Op9eAn6CvRuC9r_u_Zxz6iZ7XBXLSyB7w4LBZKR0omlX0i8kjN-X79vW2CPz'
        }, {
            id: 2,
            address: '1 Telegraph Hill Blvd',
            city: 'San Francisco',
            state: 'CA',
            zip: 94133,
            lat: 37.802378,
            long: -122.405283,
            image_url: '//upload.wikimedia.org/wikipedia/commons/4/4c/Coit_Tower_aerial.jpg'
        }, {
            id: 3,
            address: '900 North Point St',
            city: 'San Francisco',
            state: 'CA',
            zip: 94109,
            lat: 37.805576,
            long: -122.422947,
            image_url: '//upload.wikimedia.org/wikipedia/commons/a/a5/Ghirardelli_Square_1.jpg '
        }, {
            id: 4,
            address: '24 Willie Mays Plaza',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            lat: 37.778175,
            long: -122.390725,
            image_url: '//media-cdn.tripadvisor.com/media/photo-s/09/0b/8f/cf/at-t-park.jpg'
        }, {
            id: 5,
            address: '3750 18 th St',
            city: 'San Francisco',
            state: 'CA',
            zip: 94114,
            lat: 37.761717,
            long: -122.427315,
            image_url: '//sanfrancisco.placeilive.com/photos/streetViewPhoto/XRuUN/300/200'
        }, {
            id: 6,
            address: '712 Steiner St',
            city: 'San Francisco',
            state: 'CA',
            zip: 94117,
            lat: 37.776128,
            long: -122.432684,
            image_url: '//maps.googleapis.com/maps/api/streetview?channel=rdc-ldp-streetview&client=gme-movesalesinc&location=712+Steiner+St%2CSan+Francisco%2CCA%2C94117&size=640x480&signature=jN0pwslt4iRvw99eDNMtEVPz2a0='
        }, {
            id: 7,
            address: '490 Jamestown Ave',
            city: 'San Francisco',
            state: 'CA',
            zip: 94124,
            lat: 37.713531,
            long: -122.386139,
            image_url: '//1.bp.blogspot.com/-13fLlNoMJuM/UJWjMfNQzXI/AAAAAAAAC7c/2ybBK6q14IM/s1600/Stadium_TheRock.jpg'
        }, {
            id: 8,
            address: '1301 2 nd Ave',
            city: 'Seattle',
            state: 'WA',
            zip: 98101,
            lat: 47.607828,
            long: -122.338134,
            image_url: '//x.lnimg.com/photo/poster_768/edebe0efa14749c385f1f12bbb906d21.jpg'
        }, {

            id: 9,
            address: '1401 N.Shoreline Blvd',
            city: 'Mountain View',
            state: 'CA',
            zip: 94043,
            lat: 37.414323,
            long: -122.077321,
            image_url: '//upload.wikimedia.org/wikipedia/commons/4/4e/Computer_history_museum.jpg'
        }, {
            id: 10,
            address: '7000 Coliseum Way',
            city: 'Oakland',
            state: 'CA',
            zip: 94621,
            lat: 37.750268,
            long: -122.202609,
            image_url: '//farm2.staticflickr.com/1474/26060790381_de06ec3852_z.jpg'
        }
    ];
};

Database.prototype.getProperties = function() {
    return this.properties;
};

//Export the Database module so it can be required properly
module.exports = Database; 
