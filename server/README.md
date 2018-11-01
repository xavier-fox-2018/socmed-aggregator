# hacktivgit

ROUTES | METHOD | DESCRIPTION | JSON/QUERY
--- | --- | --- | ---
/api/repo | **GET** | Find all your repository (insert one query after repo for searching with queries) | /api/repo?name=kosasih
/api/repo/star | **GET** | Find all your starred repositories | none
/api/repo/star/:id | **GET** | Search starred by its ID | /api/repo/star/155508196
/api/repo | **POST** | Make new repository, insert ONLY name, description, homepage, and private(boolean) | { "name","description","homepage" (URL),"private" (BOOLEAN) }
/api/unstar/:name/:repoName | **DELETE** | Unstar repositories from your starred list with parameters owner.name & repository's name | /api/unstar/senecamanu/hacktivgit-from-api
/api/star/:name/:repoName | **PUT** | Star repositories to your starred list with parameters owner.name & repository's name | /api/star/senecamanu/hacktivgit-from-api
/api/:name | **GET** | Find all repo from a github user | /api/senecamanu

**Note:**
1. Insert your Github token inside .env file.
1. ":" means you have to fill in yourself