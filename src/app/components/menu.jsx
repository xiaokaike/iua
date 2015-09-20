/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let Menu = React.createClass({

  childContextTypes: {
    
  },

  getChildContext() {
    
  },

  componentWillMount() {
    
  },

  render() {

    return (
      <div>
        menu
      </div>
    );
  },

  _handleTouchTap() {
    
  }

});

module.exports = Menu;
