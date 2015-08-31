var ExperienceColumnComponent = React.createClass({displayName: "ExperienceColumnComponent",
    render: function() {
        var listItems = this.props.data.items.map(function(item) {
            return (
                React.createElement("span", null, item[0], 
                React.createElement("li", null, item[1]))
            );
        });
        return (
            React.createElement("div", {className: "four columns"}, 
                React.createElement("h5", null, this.props.data.heading), 
                React.createElement("ul", null, 
                    listItems
                )
            )
        );
    }
});

var ExperienceRowComponent = React.createClass({displayName: "ExperienceRowComponent",
    render: function() {
        var columnNodes = this.props.data.map(function (column) {
            return (
                React.createElement(ExperienceColumnComponent, {data: column})
            );
        });
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row"}, 
                    columnNodes
                )
            )
        );
    }
});

var SiteInfoComponent = React.createClass({displayName: "SiteInfoComponent",
    render: function() {
        var tags = this.props.data.tags.map(function(tag) {
            return (
                React.createElement("li", null, tag)
            );
        });
        return (
            React.createElement("div", {className: "five columns siteInfo"}, 
                React.createElement("h4", null, this.props.data.name), 
                    React.createElement("p", null, this.props.data.description), 
                React.createElement("a", {className: "button", href: "http://" + this.props.data.linkUrl}, "Visit ", this.props.data.linkUrl), 
                React.createElement("ul", {className: "siteTags"}, 
                    tags
                )
            )
        );
    }
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SitePreviewComponent = React.createClass({displayName: "SitePreviewComponent",
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
            React.createElement("div", {className: "seven columns sitePreview"}, 
                React.createElement("div", {className: "browser_wrapper"}, 
                    React.createElement("div", {className: "browser_header"}, 
                        React.createElement("h1", {className: "name"}, this.props.views[this.state.page].title), 
                        React.createElement("div", {className: "address_bar"}, React.createElement("a", {href: "http://" + this.props.views[this.state.page].displayUrl}, "http://", this.props.views[this.state.page].displayUrl))
                    ), 
                    React.createElement("div", {className: "browser_content"}, 
                        React.createElement(ReactCSSTransitionGroup, {transitionName: "example", transitionAppear: true}, 
                            React.createElement("img", {src: "assets/img/" + this.props.views[this.state.page].img, onClick: this.handleClick})
                        )
                    )
                )
            )
        );
    }
});

var ProjectRowComponent = React.createClass({displayName: "ProjectRowComponent",
    render: function() {
        var projectNodes = this.props.data.map(function (site, index) {
            var siteView = React.createElement(SitePreviewComponent, {views: site.views});
            var siteInfo = React.createElement(SiteInfoComponent, {data: site});
            return (
                React.createElement("div", {className: "row projectRow"}, 
                    React.createElement("div", {className: "container"}, 
                        siteView, 
                        siteInfo
                    )
                )
            );
        });
        return (
            React.createElement("div", null, 
                projectNodes
            )
        );
    }
});

React.render(
    React.createElement(ProjectRowComponent, {data: webSamples}),
    document.getElementById('samples')
);

React.render(
    React.createElement(ExperienceRowComponent, {data: expInfo}),
    document.getElementById('experience')
);