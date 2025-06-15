import React from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import {
  ContentState, EditorState, convertFromHTML, convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import DynamicOptionList from './dynamic-option-list';
import { get } from './stores/requests';
import ID from './UUID';
import IntlMessages from './language-provider/IntlMessages';

const toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
};

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
    };
  }

  toggleRequired() {
    // const this_element = this.state.element;
  }

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or h6
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  onEditorStateChange(index, property, editorContent) {
    // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, ' ');
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById('optionsApiUrl').value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then(data => {
        this.props.element.options = [];
        const { options } = this.props.element;
        data.forEach(x => {
          // eslint-disable-next-line no-param-reassign
          x.key = ID.uuid();
          options.push(x);
        });
        const this_element = this.state.element;
        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }

  render() {
    if (this.state.dirty) {
      this.props.element.dirty = true;
    }
    
    const this_checked = this.props.element.hasOwnProperty.call('required') ? this.props.element.required : false;
    const this_read_only = this.props.element.hasOwnProperty.call('readOnly') ? this.props.element.readOnly : false;
    const this_default_today = this.props.element.hasOwnProperty.call('defaultToday') ? this.props.element.defaultToday : false;
    const this_show_time_select = this.props.element.hasOwnProperty.call('showTimeSelect') ? this.props.element.showTimeSelect : false;
    const this_show_time_select_only = this.props.element.hasOwnProperty.call('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
    const this_show_time_input = this.props.element.hasOwnProperty.call('showTimeInput') ? this.props.element.showTimeInput : false;
    const this_checked_inline = this.props.element.hasOwnProperty.call('inline') ? this.props.element.inline : false;
    const this_checked_bold = this.props.element.hasOwnProperty.call('bold') ? this.props.element.bold : false;
    const this_checked_italic = this.props.element.hasOwnProperty.call('italic') ? this.props.element.italic : false;
    const this_checked_center = this.props.element.hasOwnProperty.call('center') ? this.props.element.center : false;
    const this_checked_page_break = this.props.element.hasOwnProperty.call('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
    const this_checked_alternate_form = this.props.element.hasOwnProperty.call('alternateForm') ? this.props.element.alternateForm : false;

    const {
      canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue,
    } = this.props.element;
    const canHaveImageSize = (this.state.element.element === 'Image' || this.state.element.element === 'Camera');

    const this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
      this_files.unshift({ id: '', file_name: '' });
    }

    let editorState;
    if (this.props.element.hasOwnProperty.call('content')) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty.call('h6')) {
      editorState = this.convertFromHTML(this.props.element.h6);
    }
    console.log(this.props.element);
    return (
      <div>
        <div className="clearfix">
          <h4 className="float-left">{this.props.element.text}</h4>
          <i onKeyDown={() => {}} role='button' tabIndex={0} className="float-right fas fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
        </div>
        { this.props.element.hasOwnProperty.call('content') &&
          <div className="form-group">
            <h6 className="control-h6"><IntlMessages id="text-to-display" />:</h6>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')}
              stripPastedStyles={true} />
          </div>
        }
        { this.props.element.hasOwnProperty.call('file_path') &&
          <div className="form-group">
            <h6 className="control-h6" htmlFor="fileSelect"><IntlMessages id="choose-file" />:</h6>
            <select id="fileSelect" className="form-control" defaultValue={this.props.element.file_path} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
              {this_files.map((file) => {
                const this_key = `file_${file.id}`;
                return <option value={file.id} key={this_key}>{file.file_name}</option>;
              })}
            </select>
          </div>
        }
        { this.props.element.hasOwnProperty.call('href') &&
          <div className="form-group">
            <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.href} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'href', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty.call('h6') &&
          <div className="form-group">
            <h6><IntlMessages id="display-h6" /></h6>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'h6')}
              stripPastedStyles={true} />
            <br />
            <div className="custom-control custom-checkbox">
              <input id="is-required" className="custom-control-input" type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} />
              <h6 className="custom-control-h6" htmlFor="is-required">
              <IntlMessages id="required" />
              </h6>
            </div>
            { this.props.element.hasOwnProperty.call('readOnly') &&
              <div className="custom-control custom-checkbox">
                <input id="is-read-only" className="custom-control-input" type="checkbox" checked={this_read_only} value={true} onChange={this.editElementProp.bind(this, 'readOnly', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="is-read-only">
                <IntlMessages id="read-only" />
                </h6>
              </div>
            }
            { this.props.element.hasOwnProperty.call('defaultToday') &&
              <div className="custom-control custom-checkbox">
                <input id="is-default-to-today" className="custom-control-input" type="checkbox" checked={this_default_today} value={true} onChange={this.editElementProp.bind(this, 'defaultToday', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="is-default-to-today">
                <IntlMessages id="default-to-today" />?
                </h6>
              </div>
            }
            { this.props.element.hasOwnProperty.call('showTimeSelect') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-select" className="custom-control-input" type="checkbox" checked={this_show_time_select} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelect', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="show-time-select">
                <IntlMessages id="show-time-select" />?
                </h6>
              </div>
            }
            { this_show_time_select && this.props.element.hasOwnProperty.call('showTimeSelectOnly') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-select-only" className="custom-control-input" type="checkbox" checked={this_show_time_select_only} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="show-time-select-only">
                <IntlMessages id="show-time-select-only" />?
                </h6>
              </div>
            }
            { this.props.element.hasOwnProperty.call('showTimeInput') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-input" className="custom-control-input" type="checkbox" checked={this_show_time_input} value={true} onChange={this.editElementProp.bind(this, 'showTimeInput', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="show-time-input">
                <IntlMessages id="show-time-input" />?
                </h6>
              </div>
            }
            { (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal &&
              <div className="custom-control custom-checkbox">
                <input id="display-horizontal" className="custom-control-input" type="checkbox" checked={this_checked_inline} value={true} onChange={this.editElementProp.bind(this, 'inline', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="display-horizontal">
                <IntlMessages id="display-horizontal" />
                </h6>
              </div>
            }
          </div>
        }
        { this.props.element.hasOwnProperty.call('src') &&
          <div>
            <div className="form-group">
              <h6 className="control-h6" htmlFor="srcInput"><IntlMessages id="link-to" />:</h6>
              <input id="srcInput" type="text" className="form-control" defaultValue={this.props.element.src} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'src', 'value')} />
            </div>
          </div>
        }
        { canHaveImageSize &&
          <div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input id="do-center" className="custom-control-input" type="checkbox" checked={this_checked_center} value={true} onChange={this.editElementProp.bind(this, 'center', 'checked')} />
                <h6 className="custom-control-h6" htmlFor="do-center">
                <IntlMessages id="center" />?
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="control-h6" htmlFor="elementWidth"><IntlMessages id="width" />:</h6>
                <input id="elementWidth" type="text" className="form-control" defaultValue={this.props.element.width} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'width', 'value')} />
              </div>
              <div className="col-sm-3">
                <h6 className="control-h6" htmlFor="elementHeight"><IntlMessages id="height" />:</h6>
                <input id="elementHeight" type="text" className="form-control" defaultValue={this.props.element.height} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'height', 'value')} />
              </div>
            </div>
          </div>
        }
        {this.state.element.element === 'FileUpload' && (
          <div>
            <div className='form-group'>
              <h6 className='control-h6' htmlFor='fileType'>
                <IntlMessages id='choose-file-type' />:
              </h6>
              <select
                id='fileType'
                className="form-control"
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, 'fileType', 'value')}
              >
                {[
                  {
                    type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*',
                    typeName: 'All File Type',
                  },
                  { type: 'image', typeName: 'Image' },
                  { type: 'application/pdf', typeName: 'PDF' },
                  {
                    type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    typeName: 'Word',
                  },
                  {
                    type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    typeName: 'Excel',
                  },
                  {
                    type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    typeName: 'Powerpoint',
                  },
                  {
                    type: 'video/mp4,video/x-m4v,video/*',
                    typeName: 'Videos',
                  },
                ].map((file, index) => (
                  <option value={file.type} key={index}>
                    {file.typeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {this.state.element.element === 'Signature' && this.props.element.readOnly
          ? (
            <div className="form-group">
              <h6 className="control-h6" htmlFor="variableKey"><IntlMessages id="variable-key" />:</h6>
              <input id="variableKey" type="text" className="form-control" defaultValue={this.props.element.variableKey} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'variableKey', 'value')} />
              <p className="help-block"><IntlMessages id="variable-key-desc" />.</p>
            </div>
          )
          : (<div/>)
        }

        {canHavePageBreakBefore &&
          <div className="form-group">
            <h6 className="control-h6"><IntlMessages id="print-options" /></h6>
            <div className="custom-control custom-checkbox">
              <input id="page-break-before-element" className="custom-control-input" type="checkbox" checked={this_checked_page_break} value={true} onChange={this.editElementProp.bind(this, 'pageBreakBefore', 'checked')} />
              <h6 className="custom-control-h6" htmlFor="page-break-before-element">
              <IntlMessages id="page-break-before-elements" />?
              </h6>
            </div>
          </div>
        }

        {canHaveAlternateForm &&
          <div className="form-group">
            <h6 className="control-h6"><IntlMessages id="alternate-signature-page" /></h6>
            <div className="custom-control custom-checkbox">
              <input id="display-on-alternate" className="custom-control-input" type="checkbox" checked={this_checked_alternate_form} value={true} onChange={this.editElementProp.bind(this, 'alternateForm', 'checked')} />
              <h6 className="custom-control-h6" htmlFor="display-on-alternate">
              <IntlMessages id="display-on-alternate-signature-page" />?
              </h6>
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('step') &&
          <div className="form-group">
            <div className="form-group-range">
              <h6 className="control-h6" htmlFor="rangeStep"><IntlMessages id="step" /></h6>
              <input id="rangeStep" type="number" className="form-control" defaultValue={this.props.element.step} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'step', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('min_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <h6 className="control-h6" htmlFor="rangeMin"><IntlMessages id="min" /></h6>
              <input id="rangeMin" type="number" className="form-control" defaultValue={this.props.element.min_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.min_h6} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_h6', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('max_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <h6 className="control-h6" htmlFor="rangeMax"><IntlMessages id="max" /></h6>
              <input id="rangeMax" type="number" className="form-control" defaultValue={this.props.element.max_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.max_h6} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_h6', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('default_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <h6 className="control-h6" htmlFor="defaultSelected"><IntlMessages id="default-selected" /></h6>
              <input id="defaultSelected" type="number" className="form-control" defaultValue={this.props.element.default_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'default_value', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('static') && this.props.element.static &&
          <div className="form-group">
            <h6 className="control-h6"><IntlMessages id="text-style" /></h6>
            <div className="custom-control custom-checkbox">
              <input id="do-bold" className="custom-control-input" type="checkbox" checked={this_checked_bold} value={true} onChange={this.editElementProp.bind(this, 'bold', 'checked')} />
              <h6 className="custom-control-h6" htmlFor="do-bold">
              <IntlMessages id="bold" />
              </h6>
            </div>
            <div className="custom-control custom-checkbox">
              <input id="do-italic" className="custom-control-input" type="checkbox" checked={this_checked_italic} value={true} onChange={this.editElementProp.bind(this, 'italic', 'checked')} />
              <h6 className="custom-control-h6" htmlFor="do-italic">
              <IntlMessages id="italic" />
              </h6>
            </div>
          </div>
        }
        { this.props.element.showDescription &&
          <div className="form-group">
            <h6 className="control-h6" htmlFor="questionDescription"><IntlMessages id="description" /></h6>
            <TextAreaAutosize type="text" className="form-control" id="questionDescription" defaultValue={this.props.element.description} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'description', 'value')} />
          </div>
        }
        { this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty.call('options') &&
          <div className="form-group">
            <h6 className="control-h6" htmlFor="correctAnswer"><IntlMessages id="correct-answer" /></h6>
            <input id="correctAnswer" type="text" className="form-control" defaultValue={this.props.element.correct} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'correct', 'value')} />
          </div>
        }
        { this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty.call('options') &&
          <div className="form-group">
            <h6 className="control-h6" htmlFor="optionsApiUrl"><IntlMessages id="populate-options-from-api" /></h6>
            <div className="row">
              <div className="col-sm-6">
                <input className="form-control" style={{ width: '100%' }} type="text" id="optionsApiUrl" placeholder="http://localhost:8080/api/optionsdata" />
              </div>
              <div className="col-sm-6">
                <button onClick={this.addOptions.bind(this)} className="btn btn-success"><IntlMessages id="populate" /></button>
              </div>
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty.call('options') &&
          <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn}
            canHaveOptionCorrect={canHaveOptionCorrect}
            canHaveOptionValue={canHaveOptionValue}
            data={this.props.preview.state.data}
            updateElement={this.props.updateElement}
            preview={this.props.preview}
            element={this.props.element}
            key={this.props.element.options.length} />
        }
      </div>
    );
  }
}
FormElementsEdit.defaultProps = { className: 'edit-element-fields' };
