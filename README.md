# aws-reddit-recipes

Repo for Reddit Scrape Python Bot -> AWS MEAN and ReactNative Apps
Info blog: http://redditrecipes.blogspot.com/

To Deploy after push:
#npm run-script deploy
I put this into a deploy script - just use ./deploy

Deployment is handled by pm2 - synced up between local and EC2
public URL of app:
http://ec2-52-15-121-129.us-east-2.compute.amazonaws.com/#/

To View Console Output
pm2 logs
or 
pm2 logs [app-name]

Travis CI is now working - verify build status at:
https://travis-ci.org/nscheu/aws-reddit-recipes/builds

Also added Jasmine for testing, tests to be added this week - week of 7/17/17

Update 5/19/17:
AWS Account Setup -* 
Ubuntu VM Setup Complete -*
Node Server Running port 3000 -*
nginx setup and open at port 80 -*
nginx points Node Server to use port 80 -*
Git repo created to push to AWS and github -*


