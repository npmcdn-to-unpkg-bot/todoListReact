/**
 * Created by sashok123351 on 15.06.2016.
 */

var Timer = React.createClass({
getInitialState: function () {
    return {
        seconds: 0
    }
},
tick: function () {
    this.setState({seconds: this.state.seconds + 1})
},
    componentDidMount: function () {
     this.timer = setInterval(this.tick,1000)
    },
    render: function () {
        return (
            <h4>Уже прошло {this.state.seconds} секунд</h4>
        )
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
    }
});

ReactDOM.render(<Timer/>,
document.getElementById("container")
);
