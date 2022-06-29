import React from 'react';

const RepoEntry = (props) => (
  <li>
    <span>Title: <a href={props.repo.github_url}>{props.repo.repo_name}</a></span>
    <span>Watchers: {props.repo.watchers}</span>
  </li>
)

export default RepoEntry;