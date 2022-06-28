const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_id: Number,
  repo_name: String,
  user_id: Number,
  user_name: String,
  github_url: String,
  created_at: String,
  watchers: Number,
  stargazers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // This function should save a repo or repos to
  // the MongoDB
  //repackage raw repo object
  let newRepo = new Repo({
    repo_id: repo.id,
    repo_name: repo.name,
    user_id: repo.owner.id,
    user_name: repo.owner.login,
    github_url: repo.html_url,
    created_at: repo.created_at,
    watchers: repo.watchers_count,
    stargazers: repo.stargazers_count
  });

  // save and catch errors, this works
  // come back and refactor schema to not make duplicates
  // newRepo.save()
  //   .catch(err => {
  //     console.log('error saving repos in database');
  //   })
}

let read = () => {
  // This function should retrieve repos if given a query
  // otherwise retrieve all repos
  // return results sorted

  //the limit method works
  return Repo.find()
    .sort({watchers: -1})
    .limit(25)

}

module.exports.save = save;
module.exports.read = read