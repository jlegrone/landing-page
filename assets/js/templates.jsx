var ExperienceColumnComponent = React.createClass({
    render: function() {
        var listItems = this.props.data.items.map(function(item, index) {
            return (
                <span key={'item' + index}>
                    {item[0]}
                    <li>{item[1]}</li>
                </span>
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
        var columnNodes = this.props.data.map(function (column, index) {
            return (
                <ExperienceColumnComponent key={'column' + index} data={column}/>
            );
        });
        return (
            <div>
                <div className="highlight">
                    <h2 className="container">Skills</h2>
                </div>
                <div className="container">
                    <div className="row">
                    {columnNodes}
                    </div>
                </div>
            </div>
        );
    }
});

var SiteInfoComponent = React.createClass({
    render: function() {
        var tags = this.props.data.tags.map(function(tag, index) {
            return (
                <li key={'tag' + index}>{tag}</li>
            );
        });
        return (
            <div className="five columns siteInfo">
                <h4>{this.props.data.name}</h4>
                    <p>{this.props.data.description}</p>
                <a className="button" href={"http://" + this.props.data.linkUrl}>Visit {this.props.data.linkUrl}</a>
                <ul className="siteTags">
                    {tags}
                </ul>
            </div>
        );
    }
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
                            <img src={"assets/img/" + this.props.views[this.state.page].img} onClick={this.handleClick}/>
                        </ReactCSSTransitionGroup>
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
            var siteInfo = <SiteInfoComponent data={site}/>;
            return (
                <div key={'project' + index} className="row projectRow">
                    <div className="container">
                        {siteView}
                        {siteInfo}
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div className="highlight">
                    <h2 className="container">Sample Projects</h2>
                </div>
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
    document.getElementById('skills')
);