var data = [
    {
        name: "SC Health Atlas",
        linkUrl: "schealthatlas.org",
        description: "The South Carolina Health Atlas is a source of health and social services data for South Carolina. The Atlas aims to provide South Carolinians with data and tools necessary to explore the availability of health and social services in their communities, and link people to the care they need.",
        views: [
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth-search.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org",
                img: "schealth-directions.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org/?services=hospital,publichealth,substanceabuse,schoolclinic,freemed",
                img: "schealth-share.png"
            },
            {
                title: "SC Health Atlas",
                displayUrl: "schealthatlas.org/?type=dark",
                img: "schealth-heatmap.png"
            },
            {
                title: "SC Health Atlas | Data",
                displayUrl: "schealthatlas.org/data",
                img: "schealth-data.png"
            }
        ]
    },
    {
        name: "Country Dance & Song Society Dance Map",
        linkUrl: "map.cdss.org",
        description: "The Country Dance and Song Society sponsors folk dancing organizations around the world. They wished to provide an interactive and community maintained map of dance venues.",
        views: [
            {
                title: "CDSS Dance Map",
                displayUrl: "map.cdss.org",
                img: "cdssmap.png"
            },
            {
                title: "CDSS Dance Map",
                displayUrl: "map.cdss.org/#id=5659313586569216",
                img: "cdssmap-rsvp.png"
            },
            {
                title: "Edit Venue - Charlotte NC",
                displayUrl: "map.cdss.org/dances/5659313586569216/edit",
                img: "cdssmap-edit.png"
            },
            {
                title: "About",
                displayUrl: "map.cdss.org/about",
                img: "cdssmap-about.png"
            }
        ]
    },
    {
        name: "Engineers Without Borders USC Chapter",
        linkUrl: "ewbusc.org",
        description: "The Student Chapter of EWB-USA at the University of South Carolina (EWB-USC), founded in 2010, is a strong interdisciplinary team from a variety of colleges and majors. Our student members come from the College of Engineering and Computing, the College of Arts and Sciences, the Arnold School of Public Health, and the Darla Moore School of Business.",
        views: [
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org",
                img: "ewbusc.png"
            },
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org/events",
                img: "ewbusc-events.png"
            },
            {
                title: "EWB | USC Chapter",
                displayUrl: "www.ewbusc.org/projects",
                img: "ewbusc-projects.png"
            }
        ]
    },
    {
        name: "Personal Blog",
        linkUrl: "blog.jacoblegrone.com",
        description: "Example Description",
        views: [
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/about",
                img: "jacobblog.png"
            },
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/dances",
                img: "jacobblog-dances.png"
            },
            {
                title: "Jacob LeGrone",
                displayUrl: "blog.jacoblegrone.com/post/101954150202/travelers-delight-by-jacob-legrone",
                img: "jacobblog-post.png"
            }
        ]
    }
]

var SiteInformation = React.createClass({
    render: function() {
        return (
            <div className="five columns siteInfo">
                <h4>{this.props.name}</h4>
                    <p>{this.props.description}</p>
                <a className="button" href={"http://" + this.props.linkUrl}>Visit {this.props.linkUrl}</a>
            </div>
        );
    }
});

var SitePreview = React.createClass({
    getInitialState: function() {
        return {
            page: 0,
            last: this.props.views.length - 1
        };
    },
    handleClick: function(event) {
        //this.setState({liked: !this.state.liked});
        console.log(this.state);
        if (this.state.page < this.state.last){
            this.setState({page: this.state.page + 1});
        }
        else {
            this.setState({page: 0});
        }
    },
    render: function() {
        return (
            <div className="seven columns sitePreview">
                <div className="browser_wrapper">
                    <div className="browser_header">
                        <h1 className="name">{this.props.views[this.state.page].title}</h1>                            
                        <div className="address_bar"><a href={"http://" + this.props.views[this.state.page].displayUrl}>http://{this.props.views[this.state.page].displayUrl}</a></div>
                    </div>
                    <div className="browser_content">
                        <img src={"assets/img/" + this.props.views[this.state.page].img} onClick={this.handleClick}/>
                    </div>
                </div>
            </div>
        );
    }
});

var ProjectRow = React.createClass({
    render: function() {
        var projectNodes = this.props.data.map(function (site, index) {
            var siteView = <SitePreview views={site.views}/>;
            var siteInfo = <SiteInformation name={site.name} description={site.description} displayUrl={site.displayUrl} linkUrl={site.linkUrl}/>;
            return (
                <div className="row projectRow">
                    <div className="container">
                        {siteView}
                        {siteInfo}
                    </div>
                </div>
            );
        });
        return (
            <div>
                {projectNodes}
            </div>
        );
    }
});

React.render(
    <ProjectRow data={data} />,
    document.getElementById('samples')
);

