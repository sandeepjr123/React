/** @format */

import React from "react";
import "./WeeklyTaskDetails.scss";

const WeeklyTaskDetails = (props) => {
  const [dayStatus, setDayStatus] = React.useState({});

  const [weeklyStatus, setWeeklyStatus] = React.useState({
    dayStatus: [],
    weekDate: "",
    uid: "",
    docId: ""
  });

  const [isLoading, setLoading] = React.useState(false);

  const loadOnDayStatus = (date) => {
    const status = [...weeklyStatus.dayStatus];
    const selectedStatus = status.filter(
      (currData) => currData.date === date
    )[0];
    setDayStatus({ ...selectedStatus });
  };

  const sumHours = (regular, addon) => {
    const regularHours = isNaN(regular) ? 0 : Number(regular);
    const addOnHours = isNaN(addon) ? 0 : Number(addon);

    return regularHours + addOnHours;
  };

  const handleWhenChange = (event) => {
    const status = { ...dayStatus };
    const name = event.target.name;
    const value = event.target.value;
    const updatedValue = { ...status, [name]: value };
    setDayStatus({ ...updatedValue });
  };

  React.useEffect(() => {
    setLoading(false);
    const weeklyStatus = props.fetchedStatus;
    setWeeklyStatus(weeklyStatus);

    const status = weeklyStatus.dayStatus && weeklyStatus.dayStatus.legth && weeklyStatus.dayStatus
      .filter((node) => node.active)
      .slice(-1)[0];
    setDayStatus({ ...status });
    setLoading(true);
  }, [props.fetchedStatus]);

  const weekStartDate =
  weeklyStatus.dayStatus && weeklyStatus.dayStatus.length && weeklyStatus.dayStatus[0].date;
  const weekEndDate =
  weeklyStatus.dayStatus && weeklyStatus.dayStatus.length && weeklyStatus.dayStatus[4].date;

  const hoursLoggedSoFar = weeklyStatus.dayStatus && weeklyStatus.dayStatus
    .filter((node) => node.active)
    .map((stats) => {
      const hoursWorked = isNaN(stats.hoursWored)
        ? 0
        : Number(stats.hoursWored);
      const hoursExtended = isNaN(stats.hoursExtended)
        ? 0
        : Number(stats.hoursExtended);
      return hoursWorked + hoursExtended;
    })
    .reduce((a, b) => a + b, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const status = { ...dayStatus };

    const currentRecord = weeklyStatus.dayStatus.findIndex(
      (node) => node.date === status.date
    );

    const updatedFullWeekStatus = [...weeklyStatus.dayStatus];

    const prevStatus = { ...updatedFullWeekStatus[currentRecord] };

    const updatedStatus = { ...prevStatus, ...status };

    updatedFullWeekStatus[currentRecord] = { ...updatedStatus };

    props.onSave({ ...weeklyStatus, dayStatus: [...updatedFullWeekStatus] }, weeklyStatus.docId);
  };

  return (
    <>
      {isLoading && weeklyStatus && weeklyStatus.dayStatus && (
        <>
          <div className="row line-height displayInline">
            My Weekly updates{" "}
            <span className="bold">
              ({weekStartDate} - {weekEndDate})
            </span>{" "}
            Total Hours :{" "}
            <span className="bold colorGreen">{hoursLoggedSoFar} Hrs</span> of{" "}
            <span className="bold">40 Hrs</span>
          </div>
          <div className="row">
            <div className="col-md-7">
              {weeklyStatus && weeklyStatus.dayStatus &&
                weeklyStatus.dayStatus.map((status) => {
                  if (status.active) {
                    return (
                      <div
                        className="displayFlex statusView"
                        onClick={() => loadOnDayStatus(status.date)}
                        key={status.date}
                      >
                        <span>{status.date}:</span>
                        <span>{status.workedOn}</span>
                        <span>
                          ({sumHours(status.hoursWored, status.hoursExtended)})
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      className="displayFlex statusView futureDate"
                      key={status.date}
                    ></div>
                  );
                })}
            </div>
            <div className="col-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="3"
                        name="workedOn"
                        value={dayStatus.workedOn}
                        onChange={handleWhenChange}
                        placeholder="Worked on"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="3"
                        name="blockers"
                        value={dayStatus.blockers}
                        onChange={handleWhenChange}
                        placeholder="Blockers if any..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Hours Worked</label>
                      <select
                        className="form-control"
                        placeholder="Hours Worked"
                        name="hoursWored"
                        value={dayStatus.hoursWored}
                        onChange={handleWhenChange}
                      >
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Hours Extended</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0.0"
                        name="hoursExtended"
                        value={dayStatus.hoursExtended}
                        onChange={handleWhenChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9" />
                  <div className="col-md-3">
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        <i className="fa fa-save" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WeeklyTaskDetails;
