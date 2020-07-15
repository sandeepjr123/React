/** @format */

import React from "react";
import "./DashBoard.scss";
import Stories from "../stories/Stories";
import WeeklyTaskDetails from "../WeeklyTaskDetails/WeeklyTaskDetails";
import serviceClient from "../serviceClient";
import LoadingIndicator from "../spinner/LoadingIndicator";
import Alert from "../alerts/Alert";

const Dashboard = () => {
  const [stories, addStory] = React.useState([]);

  const [weeklyStatus, setWeeklyStatus] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);

  const[message, setMessage] = React.useState("");

  const alertRef = React.useRef();

  React.useEffect(() => {
    setLoading(true);

    const loadstatusfromApi = async () => {
      try{
        const response = await serviceClient.get("/dashboard-initial-load", "");

        if (response && response.weeklyStatus) {
          setWeeklyStatus(response.weeklyStatus);
        }

        if (response && response.stories) {
          addStory(response.stories);
        }

        setLoading(false);
        setMessage("");
      }catch(err){
        showAlert("Something went wrong to load dashboard. Try after sometime!!!");
        setLoading(false);
      }
    };

    loadstatusfromApi();
  }, []);

  const addNewStory = () => {
    setupStory();
    getStories();
  };

  const setupStory = () => {
    const prevState = stories && stories.length ? [...stories] : [];
    const newStory = {
      story: "",
      sp: "1",
      epic: "",
      status: "",
      startedOn: formatDateToYYYYMMDDWithDashes(new Date()),
      docId: new Date().getTime(),
      isNew: true,
    };
    prevState.push(newStory);
    addStory(prevState);
  };

  const handleDelete = async (uniqueRowId, isNew) => {
    if (isNew) {
      addStory(stories.filter((story) => story.docId !== uniqueRowId));
    }else{
      try{
        setLoading(true);
        await serviceClient.deleteResource(`/stories/${uniqueRowId}`);
        addStory(stories.filter((story) => story.docId !== uniqueRowId));
        setLoading(false);
      }catch(err){
        showAlert("Something went wrong. Please try after sometime!!!");
        setLoading(false);
      }
    }
  };

  const createNewStory = async (updatedRecord) => {
      try {
        setLoading(true);
        const availableStories = await serviceClient.post("/stories", updatedRecord);
        addStory(availableStories);
        setLoading(false);
      }catch(err){
        setLoading(false);
        showAlert("Something went wrong. Please try after sometime!!!");
      }
  }

  const updateStory = async (uniqueRowId, updatedRecord, updatedStory) => {
    const docId = updatedRecord.docId;
      delete updatedRecord.docId;
      const otherStories = stories.filter(
        (story) => story.docId !== uniqueRowId
      );
      console.log(otherStories);
      otherStories.push({...updatedStory, isNew: false});

    try{
      setLoading(true);
      await serviceClient.put(`/stories/${docId}`, updatedRecord);
      addStory([...otherStories]);
      setLoading(false);
    }catch(err){
      setLoading(false);
      showAlert("Something went wrong. Please try after sometime!!!");
    }
  }

  const handleStorySave = async (uniqueRowId, updatedStory, isNew) => {
    const storyToSave = stories.filter(
      (story) => story.docId === uniqueRowId
    )[0];
    delete updatedStory.isNew;
    const updatedRecord = {...updatedStory, status: updatedStory.completedOn ? 'completed' : 'in-progress', startedOn: formatDateToYYYYMMDDWithDashes(updatedStory.startedOn)};
    if(isNew){
      delete updatedRecord.docId;
      createNewStory(updatedRecord);
    }else{
      updateStory(uniqueRowId, updatedRecord, updatedStory);
    }
  };

  const showAlert = (message) => {
    setTimeout(() => {
      setMessage("");
    }, 30000);
    setMessage(message);
    alertRef.current.focus();
  }

  const handleWeeklyStatusSave = async (updatedFullWeekStatus, docId) => {
    setLoading(true);
    setMessage("");
    if(docId){
      console.log("wit doc id", docId, updatedFullWeekStatus);
      setLoading(false);
    }else{
      try{
        const updatedStatus = await serviceClient.post("/weekly-statuss", updatedFullWeekStatus);
        setWeeklyStatus(...updatedStatus);
      }catch(err){
        showAlert("Something went wrong. Please try after sometime!!!");
      }
      setLoading(false);
    }
  };

 const formatDateToYYYYMMDDWithDashes = (selectedDate) => {
    const date = new Date(selectedDate);
    const month = ('' + (date.getMonth() + 1)).padStart(2, '0');
    const day = ('' + date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return [year, month, day].join('-');
}

  const getStories = () => {
    return (
      stories &&
      stories.map((currStory, idx) => {
        return (
          <Stories
            key={idx}
            uniqueRowId={currStory.docId}
            story={currStory.story}
            sp={currStory.sp}
            epic={currStory.epic}
            status={currStory.status}
            startedOn={new Date(currStory.startedOn)}
            isNew={currStory.isNew}
            onDelete={handleDelete}
            onSave={handleStorySave}
          />
        );
      })
    );
  };

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {message && <Alert alertType="ERROR" message={message} focusRef={alertRef}/>}
      {!isLoading && (
        <>
          <div className="row line-height displayInline">
            Stories working for. Add new story{" "}
            <button
              className="btn btn-primary btn-inline"
              onClick={addNewStory}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
          {getStories()}
          <hr />
          <WeeklyTaskDetails
            fetchedStatus={weeklyStatus}
            onSave={handleWeeklyStatusSave}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
