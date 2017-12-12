import React, { Component } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { Scrollbars } from 'react-custom-scrollbars';

export default class FroalaEditorComponent extends Component {
  state = {
    content: '<span>Type here to start creating a custom email template!</span>',
    preview: ''
  };

  handleModelChange = (model) => this.setState({ content: model, preview: model })

  render () {
    const { input } = this.props;
    const { content, preview } = this.state;
    return(
      <div className="editor-container">
        <h4>Template Editor:</h4>
        <div className="content">
          <Scrollbars
            style={{ width: '100%', zDepth: 1300 }}
            autoHeight
            autoHeightMin={50}
            autoHeightMax={250}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderThumbVertical={props => <div {...props} className="scrollbar"/>}
            >
              <FroalaEditor
                model={content}
                onModelChange={(model) => {
                  this.handleModelChange(model)
                  input.onChange(model)
                }}
              />
            </Scrollbars>
        </div>
        <div className="rendered-content">
          <h4>Preview:</h4>
          <Scrollbars
            style={{ width: '100%', border: '1px solid black' }}
            autoHeight
            autoHeightMin={50}
            autoHeightMax={250}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderThumbVertical={props => <div {...props} className="scrollbar"/>}
            >
              <div className="content-preview">
                <FroalaEditorView model={preview} />
              </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
