var ExperienceColumnComponent = React.createClass({
    render: function() {
        var listItems = this.props.data.items.map(function(item) {
            return (
                <span>{item[0]}
                <li>{item[1]}</li></span>
            );
        });
        return (
            <div className="four columns">
                <h5>{this.props.data.heading}</h5>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
});

var ExperienceRowComponent = React.createClass({
    render: function() {
        var columnNodes = this.props.data.map(function (column) {
            return (
                <ExperienceColumnComponent data={column}/>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {columnNodes}
                </div>
            </div>
        );
    }
});

var SiteInfoComponent = React.createClass({
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

var SitePreviewComponent = React.createClass({
    getInitialState: function() {
        return {
            page: 0,
            last: this.props.views.length - 1
        };
    },
    handleClick: function(event) {
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

var ProjectRowComponent = React.createClass({
    render: function() {
        var projectNodes = this.props.data.map(function (site, index) {
            var siteView = <SitePreviewComponent views={site.views}/>;
            var siteInfo = <SiteInfoComponent name={site.name} description={site.description} displayUrl={site.displayUrl} linkUrl={site.linkUrl}/>;
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
    <ProjectRowComponent data={webSamples} />,
    document.getElementById('samples')
);

React.render(
    <ExperienceRowComponent data={expInfo} />,
    document.getElementById('experience')
);