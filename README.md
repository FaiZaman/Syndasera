# Syndasera

This is a Rails application implementing the synthetic data service available at `https://github.com/noo-rashbass/synthetic-data-service`. The service generates synthetic data from real data using a suite of machine learning algoritms. The data generated is both realistic enough to draw insights from and conduct research into, and confidential enough so that no identifying details for any of the real patients can be acquired.

# Getting started

To get started with the app, first clone the repo and `cd` into the directory:

```
$ git clone https://github.com/FaiZaman/Syndasera.git
$ cd Syndasera
```

Then install the required packages:

```
$ bundle update
$ bundle install
```

Finally, migrate the database:

```
$ rails db:migrate
```

# Running

To deploy the app locally, run:

```
$ rails server
```

Navigate to `http://127.0.0.1:3000/` to view the app.


### Note on uploading file to S3
In order to upload files directly to AWS S3 bucket, specify the identity pool id and bucket name in your environment variables. 

In Windows, type `set` in the terminal to see the list of environment variables. 

To add AWS credentials to environment variables, type the following in the terminal
`set IDENTITYPOOLID = ABCDEF123`
`set BUCKETNAME = bucket123`
