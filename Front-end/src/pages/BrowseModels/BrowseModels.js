import React, { useEffect, useState } from "react";
import ModelsArray from "../../containers/Dashboard/ModelsArray/ModelsArray";
import NoMatches from "../../components/Dashboard/NoMatches/NoMatches";
import PageTitle from "../../components/Dashboard/PageTitle/PageTitle";
import classes from "./BrowseModels.module.css";
import data from "./data";

const BrowseModels = (props) => {
  const [models, setModels] = useState([]);
  const [originalModels, setOriginalModels] = useState([]);
  const [fetchedModels, setFetchedModels] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const [noMatches, setNoMatches] = useState(false);
  const modelsFetchedPerLoad = 6;

  useEffect(() => {
    setModels([...data]);
    setOriginalModels([...data]);
  }, []);

  useEffect(() => {
    setFetchedModels(models.slice(0, modelsFetchedPerLoad));
    if (models.length <= modelsFetchedPerLoad) {
      setAllFetched(true);
    } else {
      setAllFetched(false);
    }
  }, [models]);

  const loadMoreClickHandler = () => {
    const toBeFetched = fetchedModels.length + modelsFetchedPerLoad;
    if (toBeFetched >= models.length) {
      setAllFetched(true);
    }
    setFetchedModels([...fetchedModels, ...models.slice(toBeFetched - modelsFetchedPerLoad, toBeFetched)]);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const query = e.target.value;
    if (query.trim() === "") {
      setModels([...originalModels]);
    }
    const re = RegExp(`.*${query.toLowerCase()}.*`);
    const modelMatches = originalModels.filter((v) => v.name.toLowerCase().match(re));
    const userMatches = originalModels.filter((v) => v.user.toLowerCase().match(re));
    const output = modelMatches.concat(userMatches);
    const matches = output.filter(function (item, pos) {
      return output.indexOf(item) === pos;
    });
    if (matches.length === 0) {
      setNoMatches(true);
    } else {
      setNoMatches(false);
    }
    setModels([...matches]);
  };

  return (
    <div className={classes.BrowseModels}>
      <PageTitle>Browse Models</PageTitle>
      <div className={classes.searchbarParent}>
        <h2>Search available models by keywords</h2>
        <div className={classes.searchbar}>
          <input type="text" placeholder="Search by model name or user name" onChange={(e) => searchHandler(e)} />
          <i className="fa fa-search"></i>
        </div>
      </div>
      {noMatches ? <NoMatches>Sorry! we can't find any models that meet your search keywords.</NoMatches> : <ModelsArray models={fetchedModels} />}

      {!allFetched ? (
        <div className={classes.loadMoreBtn}>
          <button onClick={loadMoreClickHandler}>Load more</button>
        </div>
      ) : null}
    </div>
  );
};

export default BrowseModels;
