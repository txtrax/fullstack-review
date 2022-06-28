import React from 'react';

const RepoEntry = (props) => (
  <li>
    <a href={props.repo.github_url}>
    {props.repo.repo_name}
    </a>
  </li>
)

export default RepoEntry;