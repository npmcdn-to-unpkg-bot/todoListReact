/**
 * Created by sashok123351 on 15.06.2016.
 */

    var Note = React.createClass({

   render: function () {
       var style = {backgroundColor: this.props.color};
       return(
           <div className="note" style={style}>
               <span className="delete-note" onClick={this.props.onDelete}>x</span>
               {this.props.children}</div>
       )
   }
});
    var NotesGrid = React.createClass({
        componentDidMount : function () {
            var grid = this.refs.grid;
            this.msnry = new Masonry(grid,{
                itemSelector: '.note',
                columnWidth:220,
                gutter: 10
            })
        },
        componentDidUpdate : function (prevProps) {
          if( this.props.notes.length !== prevProps.notes.length){
              this.msnry.reloadItems();
              this.msnry.layout();
          }
        },
       render: function () {
           var onNoteDelete = this.props.onNoteDelete;
           return(
               <div className="notes-grid" ref="grid">
                   {
                       this.props.notes.map(function (item) {
                           return(
                               <Note
                                   onDelete = {onNoteDelete.bind(null,item)}
                                   key={item.id}
                                   color={item.color}>
                                   {item.text}
                               </Note>
                           )
                       })
                   }
               </div>
           )
       }
    });
var NoteEditor = React.createClass({
getInitialState: function () {
    return{
        text: ''
    }
},

    handleTextChange : function (event) {
      this.setState({
          text: event.target.value
      })
    },
    handleNoteAdd : function (event) {
        var note = {
            text: this.state.text,
            color: "yellow",
            id: Date.now()
        }
        this.setState({text: ''});
        this.props.onNoteAdd(note);
    },
    render: function () {
        return(
            <div className="note-editor">
                <textarea placeholder="Enter your note here..."
                          rows={5}
                          className="textarea"
                          value={this.state.text}
                          onChange={this.handleTextChange}/>
               <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        )
    }
});
var NotesApp = React.createClass({
    getInitialState: function () {
      return {
    notes: [{
        id:0,
        text:"Lorem ipsum dolor sit amet" ,
        color: "#FFD700"
    },{
        id:1,
        text:"Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit. Quisque at " +
        "dapibus mi. Duis sodales temp" +
        "us sodales. Quisque in " +
        "maximus metus, ac facilis" +
        "is mi. Morbi et ipsum at ex euismod sollicitudin. Fusce dictum fini" +
        "bus nisi et pretium. Quisque non nisl augue. Praesent lacinia commodo lorem " +
        "at aliquet. Integer arcu est, eleifend non cursus quis",
        color: "#20b2aa"
    },{
        id:2,
        text:"Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit. Quisque at " +
        "dapibus mi. Duis sodales temp" +
        "us sodales. Quisque in",
        color: "#90ee90"
    },{
        id:3,
        text:"Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit. Quisque at " +
        "dapibus mi. Duis sodales temp" +
        "us sodales. Quisque in " +
        "maximus metus, ac facilis" +
        "is mi. Morbi et ipsum at ex euismod sollicitudin. Fusce dictum fini" +
        "bus nisi et pretium. Quisque non nisl augue. Praesent lacinia commodo lorem " +
        "at aliquet. Integer arcu est, eleifend non cursus quis",
        color: "#FFD700"
    },{
        id:4,
        text:"Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit",
        color: "#FFD700"
    },{
        id:5,
        text:"Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit. Quisque at " +
        "dapibus mi. Duis sodales temp" +
        "us sodales. Quisque in " +
        "maximus metus, ac facilis" +
        "is mi. Morbi et ipsum at ex euismod sollicitudin. Fusce dictum fini" +
        "bus nisi et pretium. Quisque non nisl augue. Praesent lacinia commodo lorem " +
        "at aliquet. Integer arcu est, eleifend non cursus quis",
        color: "#FFD700"
    }]
      }
    },
    componentDidMount: function () {
      var localNotes = JSON.parse(localStorage.getItem('notes'));
        if(localNotes){
            this.setState({
                notes: localNotes
            })
        }
    },
    componentDidUpdate: function () {
         this._updateLocalStorage();
    },
    handleNoteDelete: function (note) {
   var noteId = note.id;
        var newNotes = this.state.notes.filter(function (note) {
            return note.id != noteId;
        });
        this.setState({notes: newNotes})
    },
    _updateLocalStorage: function () {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes)
    },
    handleNoteAdd : function (newNote) {
    var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState( {
            notes: newNotes
        })
    },

    render: function () {
        return (
            <div className="notes-app" className="app-header">NodesApp
            <NoteEditor onNoteAdd={this.handleNoteAdd}/>
            <NotesGrid onNoteDelete={this.handleNoteDelete}  notes={this.state.notes}/>
                </div>
        )
    }
});

ReactDOM.render(<NotesApp/>,
document.getElementById("container"));