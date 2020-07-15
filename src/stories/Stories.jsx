/** @format */

import React from "react";
import DatePicker from "react-datepicker";

const Stories = ({
  uniqueRowId, story, sp, epic, status, startedOn, completedOn, isNew = false, onDelete, onSave,
}) => {
  const [newStory, addNewStroy] = React.useState({
    story: '', epic: '', sp: '', status: '', startedOn: new Date(), completedOn: '', isNew: false, docId: ''
  });

  React.useEffect(() => {
    addNewStroy({
      story: story, epic: epic, sp: sp, status: status, startedOn: startedOn, completedOn: completedOn, isNew: isNew, docId: uniqueRowId
    });
  }, [uniqueRowId, story, sp, epic, status, startedOn, completedOn, isNew, onDelete, onSave]);

  const handleValueChage = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    addNewStroy({ ...newStory, [name]: value });
  };

  const saveRecord = (event) => {
    onSave(newStory.docId, { ...newStory }, newStory.isNew);
  };

  const deleteRecord = () => {
    onDelete(newStory.docId, newStory.isNew);
  };

  const handleDate = (keyName, value) => {
    addNewStroy({ ...newStory, [keyName]: value });
  };

  const statusToShow = newStory.status === "" ? "Open" : "Update";

  return (
    <div className="row form-group">
      <div className="col-md-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Story Number and description"
            name="story"
            value={newStory.story}
            onChange={handleValueChage}
          />
        </div>
      </div>
      <div className="col-md-1">
        <div className="form-group">
          <select
            className="form-control"
            placeholder="SP"
            name="sp"
            value={newStory.sp}
            onChange={handleValueChage}
            title="Story Point"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="13">13</option>
          </select>
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Epic story"
            name="epic"
            value={newStory.epic}
            onChange={handleValueChage}
          />
        </div>
      </div>
      <div className="col-md-3">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={newStory.startedOn}
                name="startedOn"
                onChange={(date) => handleDate("startedOn", date)}
                placeholderText="Started on"
                title="Start Date"
                dateFormat="yyyy-MM-dd"
              />
              {/* for date picker refer this https://reactdatepicker.com/ */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={newStory.completedOn}
                name="completedOn"
                onChange={(date) => handleDate("completedOn", date)}
                placeholderText="Done on"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={saveRecord}
                value={newStory.status || ""}
              >
                {statusToShow === "Open" ? (
                  <i className="fa fa-folder-open" />
                ) : (
                  <i className="fa fa-edit" />
                )}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={deleteRecord}
              >
                <i className="fa fa-trash-o" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
