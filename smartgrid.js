const smartgrid = require('smart-grid'); 

smartgrid('./assets', {
	outputStyle: 'sass',
	mobileFirst: false,
	columns: 12,
	offset: "10px",
	container: {
		maxWidth: "1824px"
	},
    breakPoints: {
        lgXX: {
            width: "1600px"
        },
        lgX: {
            width: "1440px"
        },
    	lg: {
    		width: "1280px"
    	},
        md: {
            width: "992px"
        },
        ms: {
        	width: "778px"
        },
        sm: {
            width: "720px"
        },
        xs: {
            width: "576px"
        }
    }
});
 

 