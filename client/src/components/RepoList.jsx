import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map(repo => {
        console.log(repo)
        return <RepoEntry repo={repo} key={repo.repo_id}/>
      })}
    </ul>
  </div>
)

export default RepoList;