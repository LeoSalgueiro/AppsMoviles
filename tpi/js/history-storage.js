const getHistory = () => {
  miStorage = window.localStorage;
  let history = JSON.parse(miStorage.getItem("history"));
  if (!history) {
    miStorage.setItem("history", JSON.stringify([]));
    history = JSON.parse(miStorage.getItem("history")); // will be []
  }
  return history;
};

const pushObjectToHistory = (historyObject) => {
  miStorage = window.localStorage;
  let historyArray = JSON.parse(miStorage.getItem("history"));
  historyArray.push(historyObject);
  miStorage.setItem("history", JSON.stringify(historyArray));
};

const showHistory = () => {
  // clean history childes
  $("#search-history-items").find("article").remove();

  // init history
  const history = getHistory();
  if (history.length) {
    for (let i = 0; i < history.length; i++) {
      const historyObject = history[i];
      buildHistoryCard($("#search-history-items"), historyObject, i);
    }
  } else {
    buildEmptyHistory($("#search-history-items"));
  }
};

const cleanHistory = () => {
  miStorage.setItem("history", JSON.stringify([]));
  history = JSON.parse(miStorage.getItem("history")); // will be []
  showHistory();
};
