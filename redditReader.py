#!/usr/bin/python
import praw
import json

# Praw - create an instance using bot1
reddit = praw.Reddit('bot1')

# Select the subreddit to read
subreddit = reddit.subreddit("GifRecipes")

# Opens a file to write or append to -- (To be read by webserver)
opFile = open("redditDataRAW.json", "w+")

# Get the Posts from the given subreddit
submissionObjects = subreddit.hot(limit=7);

# Start the output string
outputJson = '{ "submissions" : ['

# For each Post in the Subreddit Checked Above: Generate a string of object attributes and properties
for sub in submissionObjects:
    outputJson += "{" + '"title":' + '"' + sub.title + '",'
    outputJson += '"author":' + '"' + str(sub.author) + '",'
    outputJson += '"thumbnail":' + '"' + sub.thumbnail + '",'
    outputJson += '"url":' + '"' + sub.url + '",'
    outputJson += '"score":' + '"' + str(sub.score) + '",'
    # Time stamp perhaps to help unique ID posts
    outputJson += '"created":' + '"' + str(sub.created) + '"' + "},"

# Removes the last comma to ensure valid JSON
outputJson = outputJson[:-1]
# Ends the Array and JSObject
outputJson += "] }"

# Print the final String
#print outputJson

# Write the final String to file
opFile.write(outputJson)